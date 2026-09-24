# Fathom recon — public product research

Captured: 2026-09-24  
Sources: fathom.video / fathom.ai marketing, help.fathom.video, release notes, what's-new.  
**Authenticated UI not available to the agent** — see `SCREENSHOT-CHECKLIST.md` for what you must capture.

---

## Product in one line

AI meeting notetaker for Zoom / Google Meet / Microsoft Teams (and Slack Huddles via bot-free capture). Records (or joins bot-free), produces transcript + AI summary + action items + highlights/clips, searchable across meetings, shareable via link.

## Current product shape (2026)

### Capture
- **Bot joins** with full video + audio (classic).
- **Bot-free** modes (Mac first; Windows coming): video (Zoom beta), audio+transcript, transcript-only.
- Calendar-connected auto-join; manual start when waiting; toolbar recording indicator.
- Consent emails for external attendees (settings-dependent).

### During meeting
- Live summaries (desktop app redesign).
- Scratchpad for personal notes.
- In-meeting highlight UX reduced/removed in new bot-free experience — **post-meeting highlights are primary**.

### After meeting (core workspace)
Unified post-meeting page with roughly:
- Recording / playback
- Transcript (speaker-attributed, timestamps)
- AI summary (template-selectable)
- Action items (detected + assignable)
- Highlights / clips (from transcript; shareable clip links)
- Ask Fathom (single-meeting + account-wide)
- Share / copy summary / send to attendees
- Integrations (CRM, Slack, Notion, Asana, ChatGPT/Claude MCP, etc.)

### Library / IA
- **My Calls** — personal library (short summaries in desktop list)
- **Team Calls** — shared team visibility (Teams plan)
- **Folders** — organize/share full calls
- **Playlists** — curated highlight clips across calls
- **Deals / Companies** — CRM-linked views (Teams)
- **Ask Fathom** — conversational search across accessible meetings

### Summaries & templates
- Default: **General / Enhanced** (Chronological deprecated for Free+).
- Many vertical templates on Teams (Sales, SPICED, MEDDPICC, BANT, standups, etc.).
- Customize via gear → instructions → regenerate → optionally apply to future.
- Free users: limited advanced AI (e.g. first 5 calls/month historically for Ask / advanced summaries / AI action items).

### Action items (API reveals product model)
- `description`
- `assignee` (name, email, team)
- `completed`
- `recording_timestamp` (HH:MM:SS)
- `recording_playback_url` (jump to moment)
- `user_generated` vs AI-detected

### Highlights / clips
- Add from transcript (+ icon), pick type/category, drag to resize span.
- Share individual clip link; embed; add to playlists.
- Highlight types + timestamp + short summary (API).

### Sharing
- Share full recording: anyone with link / same domain / only people added.
- Access levels: Limited / Standard / Admin.
- Share highlight clip independently.
- Copy summary (with/without hyperlinks).
- Public-ish link viewing for non-attendees is a first-class flow.

### Search
- **Ask Fathom**: natural language over titles, summaries, transcripts, attendees.
- Account-wide Ask across My / Team / Org (plan-dependent).
- Team **AI Search / Trackers** for themes (objections, keywords) — Teams.
- Not a simple keyword-only box — conversational + evidence-oriented positioning.

### Long meetings
- Same post-call workspace; density of transcript/summary/action items grows.
- Account-wide Ask and folders/deals exist partly because hour-long multiparty calls bury decisions.
- Short summaries on list views help scanning.

---

## Flows to validate with screenshots (authenticated)

See `SCREENSHOT-CHECKLIST.md`. Until those land in `recon/screenshots/`, do **not** write application code beyond this recon folder.

## Implications for our rebuild

Direction: **"Fathom redesigned around decisions and follow-through."**

From public product alone, Fathom is strong on capture flexibility and “notes + share clips,” but follow-through (assignee, due date, status, evidence jump, cross-meeting decision search) is secondary to recording/summarization. That matches our planned visible improvements:

1. Unified meeting workspace (playback + transcript + summary + decisions + actions + highlights together)
2. Stronger action items (assignee, status, due, source timestamp, jump-to-source)
3. Evidence-backed cross-meeting search (transcript quotes + timestamps)

Stub: bot, calendar OAuth, real AI, billing — spend time on post-meeting UX.
