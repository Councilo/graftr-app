// In-app voice calls between the customer and the courier on a delivery.
//
// The audio never touches this server: the two phones connect to each other
// (WebRTC), so nothing is recorded or stored. All this server does is carry the
// "hello" messages needed to set the call up (the caller's offer, the callee's
// answer), remember who called whom and when, and clean up calls that were
// abandoned. Everything goes through plain requests the app already knows how to
// make, so there is nothing to keep open on a serverless host.
//
// A call is one row in `calls`:
//   RINGING -> ACTIVE (callee answered) -> ENDED
//   RINGING -> DECLINED (callee said no) | CANCELLED (caller gave up) | MISSED (nobody answered)
const { sql } = require('./db');

const RING_SECONDS = 45;      // how long a call rings before it counts as missed
const HEARTBEAT_SECONDS = 20; // an active call whose two apps have both gone quiet is over
const MAX_SDP_LENGTH = 20000;

// Marks abandoned calls as finished, so a closed browser can't leave a job stuck
// "in a call" and unable to start another.
async function expireStaleCalls() {
  const ringingBefore = new Date(Date.now() - RING_SECONDS * 1000).toISOString();
  await sql`UPDATE calls SET status = 'MISSED', ended_at = now() WHERE status = 'RINGING' AND created_at < ${ringingBefore}`;
  const quietBefore = new Date(Date.now() - HEARTBEAT_SECONDS * 1000).toISOString();
  await sql`UPDATE calls SET status = 'ENDED', ended_at = now() WHERE status = 'ACTIVE' AND heartbeat_at < ${quietBefore}`;
}

// The servers the two phones use to find each other across networks. STUN is
// free and works for most connections; some mobile networks block direct
// connections, and those need a TURN relay, which is a paid service the owner
// sets up (TURN_URLS / TURN_USERNAME / TURN_CREDENTIAL). Without it, some calls
// between phones on certain mobile networks will fail to connect.
function iceServers() {
  const servers = [{ urls: 'stun:stun.l.google.com:19302' }];
  const urls = String(process.env.TURN_URLS || '').split(',').map((u) => u.trim()).filter(Boolean);
  if (urls.length && process.env.TURN_USERNAME && process.env.TURN_CREDENTIAL) {
    servers.push({ urls, username: process.env.TURN_USERNAME, credential: process.env.TURN_CREDENTIAL });
  }
  return servers;
}

module.exports = { RING_SECONDS, HEARTBEAT_SECONDS, MAX_SDP_LENGTH, expireStaleCalls, iceServers };
