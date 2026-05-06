const {
  appendParams,
  athleteFromToken,
  exchangeCodeForToken,
  getConfig,
  normalizeProfile,
  sendError,
  setSessionCookie,
  verifyState
} = require("../../lib/strava");

module.exports = async function handler(req, res) {
  let returnTo = null;
  let profile = null;
  try {
    if (req.method !== "GET") {
      res.statusCode = 405;
      res.setHeader("Allow", "GET");
      res.end("Method Not Allowed");
      return;
    }

    const config = getConfig();
    const state = verifyState(req.query.state, config.cookieSecret);
    profile = normalizeProfile(state?.profile);
    returnTo = state?.returnTo;

    if (!state || !profile) {
      res.statusCode = 400;
      res.end("Invalid Strava callback");
      return;
    }
    if (profile !== "ale") {
      redirectWithError(res, returnTo, profile, "Strava ist nur für Ale aktiviert.");
      return;
    }

    if (req.query.error) {
      redirectWithError(res, returnTo, profile, "Strava-Zugriff wurde abgebrochen.");
      return;
    }

    if (!req.query.code) {
      redirectWithError(res, returnTo, profile, "Strava hat keinen Login-Code gesendet. Bitte erneut verbinden.");
      return;
    }

    const token = await exchangeCodeForToken(req.query.code, config);
    const session = {
      profile,
      athlete: athleteFromToken(token),
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_at: token.expires_at,
      connected_at: new Date().toISOString()
    };

    setSessionCookie(res, req, profile, session, config);
    console.info("Strava callback connected", {
      profile,
      athleteId: session.athlete?.id || null
    });
    res.statusCode = 302;
    res.setHeader("Location", appendParams(state.returnTo, { strava: "connected", profile }));
    res.end();
  } catch (error) {
    console.warn("Strava callback failed", {
      profile,
      statusCode: error.statusCode || 500,
      message: error.message || "Server error"
    });
    if (returnTo && profile) {
      redirectWithError(res, returnTo, profile, "Strava-Verbindung fehlgeschlagen. Bitte Client ID, Client Secret und Callback Domain prüfen.");
      return;
    }
    sendError(res, error);
  }
};

function redirectWithError(res, returnTo, profile, message) {
  res.statusCode = 302;
  res.setHeader("Location", appendParams(returnTo, {
    strava: "error",
    profile,
    message
  }));
  res.end();
}
