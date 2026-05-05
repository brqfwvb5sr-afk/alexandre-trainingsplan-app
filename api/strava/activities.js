const {
  fetchActivities,
  getConfig,
  normalizeProfile,
  readSession,
  refreshSession,
  sendError,
  sendJson,
  setSessionCookie
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
      sendJson(res, 400, { error: "Invalid profile" });
      return;
    }

    let session = readSession(req, profile, config);
    if (!session || session.profile !== profile) {
      console.info("Strava activities missing session", {
        profile,
        hasCookieHeader: Boolean(req.headers.cookie)
      });
      sendJson(res, 401, { connected: false, error: "Strava not connected" });
      return;
    }

    session = await refreshSession(session, config);
    setSessionCookie(res, req, profile, session, config);

    const activities = await fetchActivities(session);
    const runs = activities.filter((activity) => activity.isRun);
    console.info("Strava activities synced", {
      profile,
      athleteId: session.athlete?.id || null,
      activities: activities.length,
      runs: runs.length
    });
    sendJson(res, 200, {
      connected: true,
      athlete: session.athlete,
      activities,
      runs
    });
  } catch (error) {
    sendError(res, error);
  }
};
