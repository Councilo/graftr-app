// Vendaru — in-app voice calls between the customer and the courier on a delivery.
//
// The call is phone-to-phone (WebRTC): the audio never passes through Vendaru's
// servers and is not recorded. The server only carries the set-up messages (see
// lib/calls.js and handlers/call-*.js). Nobody's phone number is involved, which is
// why this is a call "in the app" rather than a dial-out.
//
// Both people need Vendaru open on their phone for it to ring: a web page can't wake
// a locked phone. So the app checks for an incoming call every few seconds while
// there is a delivery under way, and rings if one arrives.
//
// This file owns its own screen (#calls-root), outside the app's #app, so the app's
// regular redraws can never wipe a call in progress.
(function () {
  'use strict';

  const app = () => window.VendaruApp || {};
  const API = (path, opts) => app().api(path, opts);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const toast = (m, kind) => { if (window.VendaruPanels) window.VendaruPanels.toast(m, kind); };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const RING_TIMEOUT_MS = 45000; // matches the server: an unanswered call is missed after 45 s
  const INCOMING_CHECK_MS = 3000;
  const RINGING_POLL_MS = 1000;
  const ACTIVE_POLL_MS = 2000;
  const ICE_GATHER_MS = 4000;
  const DISCONNECT_GRACE_MS = 8000;

  let host = null;
  let session = null;   // the call we are in or making: { id, jobId, role, peer, pc, stream, audio, phase, ... }
  let incoming = null;  // a call ringing on this phone that has not been answered yet: { id, jobId, from, offer }
  let watchTimer = null;
  let ringTimer = null;
  let audioCtx = null;

  function supported() {
    return !!(window.RTCPeerConnection && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.isSecureContext);
  }

  // ------------------------------------------------------------------ the screen
  function ensureHost() {
    if (host) return;
    host = document.createElement('div');
    host.id = 'calls-root';
    document.body.appendChild(host);
    host.addEventListener('click', (e) => {
      const el = e.target.closest('[data-call]');
      if (!el) return;
      const action = el.dataset.call;
      if (action === 'accept') accept();
      else if (action === 'decline') decline();
      else if (action === 'hangup') hangup();
      else if (action === 'mute') toggleMute();
    });
  }

  function initialsOf(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    return parts.length ? (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() : '?';
  }
  const clock = (ms) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

  const PHONE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  const MIC_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5"/></svg>';
  const MIC_OFF_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6M17 16.95A7 7 0 0 1 5 12M19 10v2a7 7 0 0 1-.11 1.23M12 19v3"/></svg>';

  // What is on screen depends only on the current state.
  function render() {
    ensureHost();
    let view = null;
    if (session) {
      const s = session;
      const status = { starting: 'Starting…', calling: 'Calling…', connecting: 'Connecting…', connected: clock(Date.now() - s.connectedAt), ended: s.endedText || 'Call ended' }[s.phase];
      const buttons = s.phase === 'ended' ? ''
        : s.phase === 'connected' || s.phase === 'connecting'
          ? `<button type="button" class="call-btn call-btn-mute ${s.muted ? 'is-on' : ''}" data-call="mute" aria-pressed="${s.muted ? 'true' : 'false'}" aria-label="${s.muted ? 'Unmute' : 'Mute'}">${s.muted ? MIC_OFF_ICON : MIC_ICON}</button>
             <button type="button" class="call-btn call-btn-end" data-call="hangup" aria-label="End call">${PHONE_ICON}</button>`
          : `<button type="button" class="call-btn call-btn-end" data-call="hangup" aria-label="Cancel call">${PHONE_ICON}</button>`;
      view = { name: s.peer, status, buttons, label: s.phase === 'ended' ? 'Call ended' : 'Voice call' };
    } else if (incoming) {
      view = {
        name: incoming.from,
        status: 'Incoming call…',
        buttons: `<button type="button" class="call-btn call-btn-end" data-call="decline" aria-label="Decline call">${PHONE_ICON}</button>
                  <button type="button" class="call-btn call-btn-accept" data-call="accept" aria-label="Answer call">${PHONE_ICON}</button>`,
        label: 'Incoming voice call',
      };
    }
    if (!view) { host.innerHTML = ''; document.documentElement.classList.remove('call-open'); return; }
    const alreadyThere = host.querySelector('.call-card');
    document.documentElement.classList.add('call-open');
    host.innerHTML = `
      <div class="call-overlay" role="dialog" aria-modal="true" aria-label="${esc(view.label)}" aria-live="polite">
        <div class="call-card">
          <div class="call-avatar" aria-hidden="true">${esc(initialsOf(view.name))}</div>
          <div class="call-name">${esc(view.name)}</div>
          <div class="call-status" id="call-status">${esc(view.status)}</div>
          <div class="call-actions">${view.buttons}</div>
          <div class="call-note">Voice call inside Vendaru · not recorded · no phone numbers shared</div>
        </div>
      </div>`;
    if (!alreadyThere) {
      const primary = host.querySelector('.call-btn-accept') || host.querySelector('.call-btn-end');
      if (primary) primary.focus();
    }
  }

  // Only the timer text changes every second; redrawing the whole screen would drop focus.
  function tickClock() {
    const el = host && host.querySelector('#call-status');
    if (el && session && session.phase === 'connected') el.textContent = clock(Date.now() - session.connectedAt);
  }

  // ------------------------------------------------------------------ ringing
  function startRing(kind) {
    stopRing();
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.resume) audioCtx.resume();
    } catch (e) { audioCtx = null; }
    const beep = () => {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = kind === 'incoming' ? 880 : 440;
        gain.gain.value = 0.07;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        setTimeout(() => { try { osc.stop(); } catch (e) { /* already stopped */ } }, 380);
      } catch (e) { /* silent ring is better than none */ }
    };
    beep();
    ringTimer = setInterval(beep, 2000);
    if (kind === 'incoming' && navigator.vibrate) { try { navigator.vibrate([300, 200, 300]); } catch (e) { /* not supported */ } }
  }
  function stopRing() {
    if (ringTimer) { clearInterval(ringTimer); ringTimer = null; }
    if (navigator.vibrate) { try { navigator.vibrate(0); } catch (e) { /* not supported */ } }
  }

  // ------------------------------------------------------------------ connection
  async function microphone() {
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (err) {
      const blocked = err && (err.name === 'NotAllowedError' || err.name === 'SecurityError');
      throw new Error(blocked
        ? "The microphone is blocked. Allow it in your browser's site settings to make calls."
        : (err && err.name === 'NotFoundError' ? 'No microphone was found on this device.' : "Couldn't start the microphone."));
    }
  }

  async function newPeer(stream, onFailed) {
    const config = await API('/api/call-config');
    const pc = new RTCPeerConnection({ iceServers: (config && config.iceServers) || [] });
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    const audio = document.createElement('audio');
    audio.autoplay = true;
    audio.setAttribute('playsinline', '');
    document.body.appendChild(audio);
    pc.ontrack = (event) => { audio.srcObject = event.streams[0]; const p = audio.play && audio.play(); if (p && p.catch) p.catch(() => {}); };
    let graceTimer = null;
    pc.onconnectionstatechange = () => {
      if (!session || session.pc !== pc) return;
      const state = pc.connectionState;
      if (state === 'connected') {
        clearTimeout(graceTimer);
        if (session.phase !== 'connected') {
          session.phase = 'connected';
          session.connectedAt = Date.now();
          stopRing();
          render();
          startActivePolling();
        }
      } else if (state === 'disconnected') {
        graceTimer = setTimeout(() => { if (session && session.pc === pc && pc.connectionState !== 'connected') onFailed(); }, DISCONNECT_GRACE_MS);
      } else if (state === 'failed') {
        onFailed();
      }
    };
    return { pc, audio };
  }

  // All the network routes are gathered before the description is sent, so a single
  // message carries everything the other phone needs (no back-and-forth).
  function gathered(pc) {
    return new Promise((resolve) => {
      if (pc.iceGatheringState === 'complete') return resolve();
      const done = () => { pc.removeEventListener('icegatheringstatechange', check); clearTimeout(timer); resolve(); };
      const check = () => { if (pc.iceGatheringState === 'complete') done(); };
      const timer = setTimeout(done, ICE_GATHER_MS);
      pc.addEventListener('icegatheringstatechange', check);
    });
  }

  function peerNameFor(jobId) {
    const user = (app().user && app().user()) || {};
    const job = ((app().jobs && app().jobs()) || []).find((j) => j.id === jobId) || {};
    return (user.role === 'courier' ? job.customer_name : job.courier_name) || (user.role === 'courier' ? 'Your customer' : 'Your courier');
  }

  function failedConnect() {
    finish('Couldn\'t connect the call. This can happen on some mobile networks. Try again, or send a message.', { tellServer: true, error: true });
  }

  // ------------------------------------------------------------------ making a call
  async function start(jobId) {
    if (app().isDemo && app().isDemo()) { toast("Calls aren't available in the demo.", 'error'); return; }
    if ((session && session.phase !== 'ended') || incoming) { toast('You are already on a call.', 'error'); return; }
    if (!supported()) { toast('Calling needs a microphone and a secure connection (https). Try another browser or send a message.', 'error'); return; }
    const s = { id: null, jobId, role: 'caller', peer: peerNameFor(jobId), pc: null, stream: null, audio: null, phase: 'starting', muted: false };
    session = s;
    render();
    try {
      s.stream = await microphone();
      const peer = await newPeer(s.stream, failedConnect);
      s.pc = peer.pc; s.audio = peer.audio;
      const offer = await s.pc.createOffer();
      await s.pc.setLocalDescription(offer);
      await gathered(s.pc);
      if (session !== s) return; // cancelled while getting ready
      const created = await API('/api/call-start', { method: 'POST', json: { jobId, offer: s.pc.localDescription.sdp } });
      if (session !== s) { API('/api/call-end', { method: 'POST', json: { callId: created.id } }).catch(() => {}); return; }
      s.id = created.id;
      s.phase = 'calling';
      s.startedAt = Date.now();
      startRing('outgoing');
      render();
      startCallerPolling(s);
    } catch (err) {
      if (session === s) finish(err.message || "Couldn't start the call.", { error: true });
    }
  }

  // Waiting for the other person to answer.
  function startCallerPolling(s) {
    clearInterval(s.pollTimer);
    s.pollTimer = setInterval(async () => {
      if (session !== s) return clearInterval(s.pollTimer);
      if (s.phase === 'calling' && Date.now() - s.startedAt > RING_TIMEOUT_MS) { finish('No answer.', { tellServer: true }); return; }
      try {
        const state = await API('/api/call-poll?callId=' + s.id);
        if (session !== s) return;
        if (state.status === 'ACTIVE' && state.answer && !s.answered) {
          s.answered = true;
          s.phase = 'connecting';
          stopRing();
          render();
          await s.pc.setRemoteDescription({ type: 'answer', sdp: state.answer });
        } else if (['DECLINED', 'MISSED', 'CANCELLED', 'ENDED'].includes(state.status)) {
          finish(state.status === 'DECLINED' ? 'Declined.' : state.status === 'MISSED' ? 'No answer.' : 'Call ended.');
        }
      } catch (err) { /* one missed check is fine; the next one tries again */ }
    }, RINGING_POLL_MS);
  }

  // Once connected, the same request doubles as the "still here" signal and shows
  // when the other person has hung up.
  function startActivePolling() {
    const s = session;
    if (!s) return;
    clearInterval(s.pollTimer);
    clearInterval(s.clockTimer);
    s.clockTimer = setInterval(tickClock, 1000);
    s.pollTimer = setInterval(async () => {
      if (session !== s) return clearInterval(s.pollTimer);
      try {
        const state = await API('/api/call-poll?callId=' + s.id);
        if (session === s && state.status !== 'ACTIVE') finish('Call ended.');
      } catch (err) { /* keep going */ }
    }, ACTIVE_POLL_MS);
  }

  // ------------------------------------------------------------------ receiving a call
  async function accept() {
    const call = incoming;
    if (!call || session) return;
    if (!supported()) {
      toast('Calling needs a microphone and a secure connection (https).', 'error');
      decline();
      return;
    }
    incoming = null;
    stopRing();
    const s = { id: call.id, jobId: call.jobId, role: 'callee', peer: call.from, pc: null, stream: null, audio: null, phase: 'connecting', muted: false };
    session = s;
    render();
    try {
      s.stream = await microphone();
      const peer = await newPeer(s.stream, failedConnect);
      s.pc = peer.pc; s.audio = peer.audio;
      await s.pc.setRemoteDescription({ type: 'offer', sdp: call.offer });
      const answer = await s.pc.createAnswer();
      await s.pc.setLocalDescription(answer);
      await gathered(s.pc);
      if (session !== s) return;
      await API('/api/call-answer', { method: 'POST', json: { callId: call.id, answer: s.pc.localDescription.sdp } });
      startActivePolling(); // in case the connection event is slow, still notice a hang-up
    } catch (err) {
      if (session !== s) return;
      const gone = err && err.status === 409;
      if (!gone) API('/api/call-end', { method: 'POST', json: { callId: call.id } }).catch(() => {});
      finish(gone ? 'They hung up before you answered.' : (err.message || "Couldn't answer the call."), { error: !gone });
    }
  }

  function decline() {
    const call = incoming;
    if (!call) return;
    incoming = null;
    stopRing();
    render();
    API('/api/call-answer', { method: 'POST', json: { callId: call.id, decline: true } }).catch(() => {});
  }

  // While a call is ringing on this phone, notice if the caller gives up.
  let ringingWatch = null;
  function watchRinging(call) {
    clearInterval(ringingWatch);
    ringingWatch = setInterval(async () => {
      if (incoming !== call) return clearInterval(ringingWatch);
      try {
        const state = await API('/api/call-poll?callId=' + call.id);
        if (incoming === call && state.status !== 'RINGING') {
          incoming = null;
          stopRing();
          render();
          clearInterval(ringingWatch);
          toast(`Missed call from ${call.from}`);
        }
      } catch (err) { /* try again */ }
    }, 1500);
  }

  function showIncoming(row) {
    incoming = { id: row.id, jobId: row.job_id, from: row.from_name, offer: row.offer };
    startRing('incoming');
    render();
    watchRinging(incoming);
  }

  // Is anyone calling? Only worth asking while there is a delivery under way.
  function startWatching() {
    if (watchTimer) return;
    watchTimer = setInterval(async () => {
      const user = app().user && app().user();
      if (!user || (app().isDemo && app().isDemo())) { if (session) finish('Signed out.'); return; }
      if (session || incoming) return;
      const live = ((app().jobs && app().jobs()) || []).some((j) => j.status === 'ACCEPTED' || j.status === 'COLLECTED');
      if (!live) return;
      try {
        const res = await API('/api/call-poll');
        if (res && res.incoming && !session && !incoming) showIncoming(res.incoming);
      } catch (err) { /* offline or signed out: try again next time */ }
    }, INCOMING_CHECK_MS);
  }

  // ------------------------------------------------------------------ ending
  function toggleMute() {
    const s = session;
    if (!s || !s.stream) return;
    s.muted = !s.muted;
    s.stream.getAudioTracks().forEach((track) => { track.enabled = !s.muted; });
    render();
  }

  function hangup() {
    if (!session) return;
    finish('Call ended.', { tellServer: true });
  }

  // Tears everything down, tells the server (when we are the one ending it), and shows
  // a short "call ended" note before the screen goes away.
  function finish(text, opts) {
    const s = session;
    if (!s || s.phase === 'ended') return;
    const options = opts || {};
    session = null;
    stopRing();
    clearInterval(s.pollTimer);
    clearInterval(s.clockTimer);
    if (s.stream) s.stream.getTracks().forEach((track) => track.stop());
    if (s.pc) { try { s.pc.close(); } catch (e) { /* already closed */ } }
    if (s.audio) { s.audio.srcObject = null; s.audio.remove(); }
    if (options.tellServer && s.id) API('/api/call-end', { method: 'POST', json: { callId: s.id } }).catch(() => {});
    const duration = s.connectedAt ? ` · ${clock(Date.now() - s.connectedAt)}` : '';
    session = { phase: 'ended', peer: s.peer, endedText: (text || 'Call ended.').replace(/\.$/, '') + (s.connectedAt ? duration : '') };
    render();
    if (options.error) toast(text, 'error');
    const ended = session;
    setTimeout(() => { if (session === ended) { session = null; render(); } }, options.error ? 300 : 1800);
  }

  window.VendaruCalls = { start, supported };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startWatching);
  else startWatching();
})();
