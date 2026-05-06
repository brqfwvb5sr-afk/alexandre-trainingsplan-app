const {
  normalizeProfile,
  readSession,
  sendJson
} = require("../../lib/strava");

module.exports = async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.statusCode = 405;
      res.setHeader("Allow", "GET");
      res.end("Method Not Allowed");
      return;
    }

    const profile = normalizeProfile(req.query.profile);
    if (!profile) {
      sendJson(res, 400, { error: "Invalid profile" });
      return;
    }
    if (profile !== "ale") {
      sendJson(res, 403, { error: "Strava is only enabled for Ale" });
      return;
    }

    const missing = ["STRAVA_CLIENT_ID", "STRAVA_CLIENT_SECRET", "STRAVA_REDIRECT_URI"]
      .filter((name) => !process.env[name]);
    const configured = missing.length === 0;
    const cookieSecret = process.env.STRAVA_COOKIE_SECRET || process.env.STRAVA_CLIENT_SECRET || "";
    const config = {
      clientId: process.env.STRAVA_CLIENT_ID || "",
      clientSecret: process.env.STRAVA_CLIENT_SECRET || "",
      redirectUri: process.env.STRAVA_REDIRECT_URI || "",
      cookieSecret
    };
    const cookieName = `tp_strava_${profile}`;
    const cookieHeader = req.headers.cookie || "";
    const session = configured && cookieSecret ? readSession(req, profile, config) : null;
    const redirectUri = config.redirectUri ? new URL(config.redirectUri) : null;

    sendJson(res, 200, {
      profile,
      available: true,
      configured,
      missing,
      connected: Boolean(session),
      cookiePresent: cookieHeader.includes(`${cookieName}=`),
      athlete: session?.athlete || null,
      tokenExpiresAt: session?.expires_at || null,
      redirectUriHost: redirectUri?.host || null,
      redirectUriPath: redirectUri?.pathname || null,
      appOriginConfigured: Boolean(process.env.APP_ORIGIN),
      expectedScope: "read,activity:read_all"
    });
  } catch (error) {
    sendJson(res, 500, {
      error: error.message || "Strava status check failed"
    });
  }
};
