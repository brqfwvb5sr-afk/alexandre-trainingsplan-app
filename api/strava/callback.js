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
  try {
    if (req.method !== "GET") {
      res.statusCode = 405;
      res.setHeader("Allow", "GET");
      res.end("Method Not Allowed");
      return;
    }

    const config = getConfig();
    const state = verifyState(req.query.state, config.cookieSecret);
    const profile = normalizeProfile(state?.profile);
    if (!state || !profile || !req.query.code) {
      res.statusCode = 400;
      res.end("Invalid Strava callback");
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
    res.statusCode = 302;
    res.setHeader("Location", appendParams(state.returnTo, { strava: "connected", profile }));
    res.end();
  } catch (error) {
    sendError(res, error);
  }
};
