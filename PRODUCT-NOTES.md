# PRODUCT-NOTES.md

Throughline rebuild — notes from Fathom recon.  
**Auth note:** We did **not** complete Fathom’s authenticated desktop recording flow on Windows (Classic client crash, exit `-1073741515`; web onboarding redirects to that client; bot-free not available on Windows). Notes below combine public product research, help docs, and that blocked onboarding. We do **not** claim firsthand walkthrough of live capture, in-call UI, or official post-call pages.

---

## Core flows (as Fathom presents them)

1. **Sign up (free)** → install / open desktop (Windows: Classic) → connect calendar + conferencing.
2. **Capture** — bot joins Zoom/Meet/Teams, or bot-free modes on Mac (video / audio+transcript / transcript-only).
3. **During call** — live summary + scratchpad (desktop redesign); recording indicator.
4. **After call** — unified recording page: playback, transcript, AI summary, action items, highlights, Ask Fathom, share.
5. **Library** — My Calls (and Team/Folders/Playlists/Deals on higher plans).
6. **Search** — Ask Fathom single-meeting and account-wide over titles, summaries, transcripts, attendees.
7. **Share** — full recording link (anyone / domain / named) and per-highlight clip links; copy summary.

**Our stub:** steps 2–3 (bot, calendar OAuth, live capture). We seed finished meetings and invest in 4–7.

---

## Information architecture

| Area | Fathom | Our take |
| --- | --- | --- |
| Home | My Calls list | Meetings library with duration, attendees, decision/action counts |
| Meeting | Single call page | **Workspace** with coordinated panes, not a pile of tabs |
| Org | Teams, folders, deals, playlists | Cut for v1; keep share + search |
| Global | Ask Fathom | Evidence-backed search results (quote + timestamp + meeting) |

Primary object: **Meeting**. First-class children: **Decisions**, **Action items**, **Highlights**, **Transcript**, **Summary**, **Recording**.

---

## Playback / transcript behavior

- Transcript is speaker-attributed with timestamps.
- Product intent: moments are linkable (highlight clips, action-item playback URLs).
- **We implement:** click transcript cue → seek demo media; active cue highlights while “playing”; action items / decisions / highlights all jump to source time.

Media approach: seeded demo audio/video placeholder with working timeline (not a real Zoom bot).

---

## Summaries / templates

- Default **General / Enhanced**; Chronological deprecated.
- Teams: many templates (Sales, SPICED, MEDDPICC, BANT, etc.); customize + regenerate.
- Free: advanced AI gated (historically first N calls/month).

**We implement:** multiple local templates (General, Decisions-first, Customer call, Standup) switching the same meeting’s structured summary sections — no live LLM required.

---

## Action items

Fathom detects items and assignees; API shows completed + `recording_timestamp` + playback URL. Due dates / rich status are not the marketing center of gravity.

**We strengthen:** assignee, status (`open` / `doing` / `done`), due date, source timestamp, jump-to-source, visible on meeting + roll-up hints in library/search.

---

## Highlights / clips

- Post-meeting highlight from transcript (+), type/category, adjustable span, share clip link, playlists (Teams).
- In-meeting highlights de-emphasized in new bot-free experience.

**We implement:** typed highlights with time range, clip share route, jump-to-source; no playlists in v1.

---

## Search

Ask Fathom is conversational over meeting corpus; Teams add trackers/AI search.

**We implement:** cross-meeting search returning **evidence cards** (meeting title, speaker, quote, timestamp, deep link into workspace at that time) — keyword + light semantic-ish matching over seeded transcript/decisions/actions. Not a fake chat bubble with no sources.

---

## Sharing

Full recording share with access modes; highlight clip links; logged-out viewers can consume shared content.

**We implement:** `/share/[token]` public pages (meeting or clip) that work **without login** — evaluator requirement.

---

## Long-meeting behavior

Hour-long multiparty calls produce dense transcripts; Fathom added short list summaries and account-wide Ask partly for this.

**We seed:** realistic **8-person ~60-minute** meeting with substantial transcript, multiple speakers, several decisions, many action items, and highlights — so the workspace and search have real weight.

Also seed a short 1:1 and a medium customer/project meeting.

---

## What Fathom does well

- Clear job-to-be-done: be present in the call; notes appear after.
- Capture flexibility narrative (bot vs bot-free).
- Shareable moments (clips) and copyable summaries.
- Growing “knowledge layer” (Ask Fathom account-wide, MCP into ChatGPT/Claude).
- Integrations surface area (CRM, Slack, Asana, etc.).

---

## Friction / opportunities

- **Follow-through is secondary** to capture + summary — decisions aren’t a first-class peer object in the public story.
- Action items lack a strong due/status workflow in the free-product narrative.
- Long meetings still feel like “find it in the transcript / ask the bot.”
- Windows users can be blocked entirely if Classic desktop fails (our case) — capture reliability is a product risk.
- Pixel-dense call pages can bury commitments below summary prose.

---

## What we will preserve

- Post-meeting as the product (library → meeting workspace).
- Playback + transcript + summary + actions + highlights in one place.
- Template-switchable summaries.
- Clip/highlight sharing.
- Cross-meeting ask/search.
- Public share links without requiring the viewer’s account.

---

## What we will change

- Brand and UX around **decisions and follow-through**, not “AI notetaker magic.”
- **Decisions** as explicit objects (statement, owners, timestamp, linked evidence).
- **Action items** with assignee, status, due date, source jump — always visible.
- **Unified workspace** composition: one coordinated surface (player + transcript + outcomes rail).
- **Evidence-backed search** as default result shape (quote + time), not answer-without-proof.
- Visual language distinct from Fathom (not a pixel clone).

---

## What we will intentionally cut

- Recording bot / desktop capture / bot-free engine
- Calendar OAuth and conferencing OAuth
- Live in-meeting summary / scratchpad
- Real LLM inference (templates are seeded transforms)
- Billing, teams admin, CRM, scorecards, folders, playlists, deals
- Mobile native apps, MCP, Slack Huddles

---

## Seed plan

| Meeting | Shape |
| --- | --- |
| `m-short` | ~8–12 min 1:1 sync |
| `m-medium` | ~25–35 min customer/project |
| `m-long` | ~60 min, 8 speakers, dense transcript, many decisions/actions/highlights |
