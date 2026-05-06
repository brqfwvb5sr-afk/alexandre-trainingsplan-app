const {
  STRAVA_AUTH_URL,
  appendParams,
  createState,
  getConfig,
  normalizeProfile,
  safeReturnTo,
  sendError
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
    const profile = normalizeProfile(req.query.profile);
    if (!profile) {
      res.statusCode = 400;
      res.end("Invalid profile");
      return;
    }
    if (profile !== "ale") {
      res.statusCode = 403;
      res.end("Strava is only enabled for Ale");
      return;
    }

    const returnTo = safeReturnTo(req.query.returnTo, req);
    const state = createState({ profile, returnTo, iat: Date.now() }, config.cookieSecret);
    const url = appendParams(STRAVA_AUTH_URL, {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: "code",
      approval_prompt: "force",
      scope: "read,activity:read_all",
      state
    });

    res.statusCode = 302;
    res.setHeader("Location", url);
    res.end();
  } catch (error) {
    sendError(res, error);
  }
};
