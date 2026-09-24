# Manual observations

**Date:** 2026-09-24 / 2026-09-25  
**Platform:** Windows 10/11  
**Status:** Authenticated desktop recording flow **not completed** — blocked by client crash.

## What we attempted

1. Installed Fathom Classic desktop client (required path for Windows; bot-free capture is Mac-first / not available on Windows).
2. Reinstalled; repaired Microsoft Visual C++ runtime; restarted machine.
3. Launched with `--disable-gpu` and `--use-angle=swiftshader --disable-gpu-sandbox`.
4. Fresh Fathom account + browser onboarding.

## Result

- Classic desktop client **crashes on startup** before becoming usable.
- Logs show repeated Electron renderer/GPU crashes with exit code **-1073741515** (`STATUS_DLL_NOT_FOUND` / GPU-process failure pattern common on broken Electron GPU stacks).
- Web onboarding on Windows **redirects back to the Classic desktop app**, so there is no usable alternate path to finish calendar → real meeting → recording → post-call workspace on this machine.

## What we could observe

- Public marketing site (fathom.video / fathom.ai): positioning around capture, summaries, Ask Fathom, team visibility.
- Help center / release notes / what’s-new: post-meeting workspace, templates, highlights, sharing, Ask Fathom, action-item model (including timestamps + playback URLs in API docs).
- Onboarding funnel: Windows users are steered to Classic desktop; bot-free is not a Windows escape hatch today.

## What we could NOT observe firsthand

- Connected calendar success state inside a working desktop session
- Notetaker joining a live Zoom/Meet/Teams call
- Live summary / scratchpad during a call
- Playback scrubbed against a real Fathom-generated transcript
- Template switching on a live recording
- Mid-call or post-call highlight creation in the official UI
- Official public share page chrome for a real recording
- Account-wide Ask Fathom answers with citation UI on real data
- An authentic 8-person / ~60-minute Fathom recording page

## Answers to the recon prompts (honest)

1. **Primary focus on call page:** Not verified live. Public docs + product copy describe a unified post-meeting workspace with recording, transcript, summary, and action items together; marketing emphasizes summary immediacy after the call.
2. **Layout:** Not verified live. Help articles describe transcript with highlight (+) control, summary templates with gear/customize, highlights panel, Share on the call page, Ask Fathom beside summary on recording pages.
3. **Action items fields:** Not verified live in UI. Public API/integration docs expose description, assignee (name/email/team), completed, `recording_timestamp`, `recording_playback_url`, `user_generated`.
4. **Seek behavior:** Not verified live. Product intent (API playback URLs + highlight clip links + transcript timestamps) strongly implies jump-to-moment; we will implement that as a core interaction.
5. **Friction on long multi-person calls:** Inferred — dense transcripts bury decisions; list views added short summaries; Ask Fathom went account-wide partly to recover buried context. Follow-through (status, due dates, decision objects) is thinner than capture/summarization.
6. **First change for “decisions and follow-through”:** Elevate decisions + action items to first-class peers of summary/transcript; make every commitment evidence-linked (timestamp + jump) and searchable across meetings with transcript quotes.

## Implication for the rebuild

Recording/capture layer is **intentionally stubbed** (allowed by the assignment). Recon for post-meeting UX is completed from public research + documented Windows blockage, not from a finished personal recording.
