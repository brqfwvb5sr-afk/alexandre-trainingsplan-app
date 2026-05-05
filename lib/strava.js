const crypto = require("crypto");

const STRAVA_AUTH_URL = "https://www.strava.com/oauth/authorize";
const STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token";
const STRAVA_ACTIVITIES_URL = "https://www.strava.com/api/v3/athlete/activities";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`Missing environment variable ${name}`);
    error.statusCode = 500;
    throw error;
  }
  return value;
}

function getConfig() {
  return {
    clientId: requireEnv("STRAVA_CLIENT_ID"),
    clientSecret: requireEnv("STRAVA_CLIENT_SECRET"),
    redirectUri: requireEnv("STRAVA_REDIRECT_URI"),
    cookieSecret: process.env.STRAVA_COOKIE_SECRET || requireEnv("STRAVA_CLIENT_SECRET")
  };
}

function normalizeProfile(value) {
  const profile = String(value || "").trim().toLowerCase();
  if (profile === "ale" || profile === "nevio") return profile;
  return null;
}

function createState(payload, secret) {
  const body = toBase64Url(JSON.stringify(payload));
  const signature = hmac(body, secret);
  return `${body}.${signature}`;
}

function verifyState(state, secret) {
  const [body, signature] = String(state || "").split(".");
  if (!body || !signature) return null;
  const expected = hmac(body, secret);
  if (!safeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(body));
    if (!payload.iat || Date.now() - payload.iat > 10 * 60 * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

function getOrigin(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

function safeReturnTo(value, req) {
  const fallback = `${getOrigin(req)}/`;
  try {
    const url = new URL(value || fallback, fallback);
    if (!["https:", "http:"].includes(url.protocol)) return fallback;
    if (url.protocol === "http:" && !["localhost", "127.0.0.1"].includes(url.hostname)) return fallback;
    const allowedOrigin = process.env.APP_ORIGIN || new URL(fallback).origin;
    if (url.origin !== allowedOrigin) return fallback;
    return url.toString();
  } catch {
    return fallback;
  }
}

function appendParams(url, params) {
  const target = new URL(url);
  Object.entries(params).forEach(([key, value]) => target.searchParams.set(key, value));
  return target.toString();
}

function sessionCookieName(profile) {
  return `tp_strava_${profile}`;
}

function setSessionCookie(res, req, profile, session, config) {
  const encrypted = encryptSession(session, config.cookieSecret);
  const secure = isSecureRequest(req) ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${sessionCookieName(profile)}=${encrypted}; HttpOnly${secure}; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE}`);
}

function readSession(req, profile, config) {
  const cookie = parseCookies(req.headers.cookie || "")[sessionCookieName(profile)];
  if (!cookie) return null;
  return decryptSession(cookie, config.cookieSecret);
}

function parseCookies(header) {
  return header.split(";").reduce((cookies, item) => {
    const index = item.indexOf("=");
    if (index === -1) return cookies;
    const key = item.slice(0, index).trim();
    const value = item.slice(index + 1).trim();
    cookies[key] = decodeURIComponent(value);
    return cookies;
  }, {});
}

function encryptSession(session, secret) {
  const key = crypto.createHash("sha256").update(secret).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(session), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return toBase64Url(JSON.stringify({
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    data: encrypted.toString("base64")
  }));
}

function decryptSession(value, secret) {
  try {
    const payload = JSON.parse(fromBase64Url(value));
    const key = crypto.createHash("sha256").update(secret).digest();
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(payload.iv, "base64"));
    decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(payload.data, "base64")),
      decipher.final()
    ]);
    return JSON.parse(decrypted.toString("utf8"));
  } catch {
    return null;
  }
}

async function exchangeCodeForToken(code, config) {
  const response = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      grant_type: "authorization_code"
    })
  });
  return parseStravaResponse(response);
}

async function refreshSession(session, config) {
  if (session.expires_at && session.expires_at > Math.floor(Date.now() / 1000) + 300) {
    return session;
  }

  const response = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: "refresh_token",
      refresh_token: session.refresh_token
    })
  });
  const token = await parseStravaResponse(response);
  return {
    ...session,
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    expires_at: token.expires_at
  };
}

async function fetchActivities(session) {
  const response = await fetch(`${STRAVA_ACTIVITIES_URL}?per_page=30&page=1`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });
  const activities = await parseStravaResponse(response);
  return activities.map(normalizeActivity);
}

async function parseStravaResponse(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || "Strava request failed");
    error.statusCode = response.status;
    error.details = body;
    throw error;
  }
  return body;
}

function normalizeActivity(activity) {
  const distanceKm = Number(activity.distance || 0) / 1000;
  const movingTime = Number(activity.moving_time || 0);
  const paceSecondsPerKm = distanceKm > 0 ? movingTime / distanceKm : 0;
  const type = activity.sport_type || activity.type || "Unknown";

  return {
    id: activity.id,
    name: activity.name,
    type,
    startDate: activity.start_date,
    startDateLocal: activity.start_date_local,
    distanceKm: Number(distanceKm.toFixed(2)),
    distance: `${distanceKm.toFixed(2)} km`,
    durationSeconds: movingTime,
    duration: formatDuration(movingTime),
    paceSecondsPerKm: Math.round(paceSecondsPerKm),
    pace: paceSecondsPerKm ? `${formatDuration(Math.round(paceSecondsPerKm))}/km` : "-",
    isRun: type === "Run" || activity.type === "Run"
  };
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = Math.floor(seconds % 60);
  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function athleteFromToken(token) {
  const athlete = token.athlete || {};
  return {
    id: athlete.id,
    firstname: athlete.firstname,
    lastname: athlete.lastname,
    username: athlete.username
  };
}

function isSecureRequest(req) {
  const proto = req.headers["x-forwarded-proto"];
  const host = req.headers.host || "";
  return proto === "https" || !host.includes("localhost");
}

function hmac(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

function sendError(res, error) {
  sendJson(res, error.statusCode || 500, {
    error: error.message || "Server error"
  });
}

module.exports = {
  STRAVA_AUTH_URL,
  appendParams,
  athleteFromToken,
  createState,
  exchangeCodeForToken,
  fetchActivities,
  getConfig,
  normalizeProfile,
  readSession,
  refreshSession,
  safeReturnTo,
  sendError,
  sendJson,
  setSessionCookie,
  verifyState
};
