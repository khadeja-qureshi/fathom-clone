# PRODUCT-DECISIONS.md

Product: **Throughline** — meetings redesigned around decisions and follow-through.  
Inspired by Fathom; **not** a pixel-for-pixel clone.

---

## Recon honesty & Capture Stubbing

We could not finish Fathom’s Windows Classic desktop capture flow (startup crash `-1073741515`; web onboarding redirects to that app; bot-free unavailable on Windows). Capture is **stubbed by necessity and by assignment permission**. Post-meeting UX is designed from public research + docs + recon notes.

---

## Core Product Thesis & Key Improvements

Throughline shifts focus from raw AI transcription to **decisions and follow-through**:

1. **Unified Workspace Surface** — Playback timeline, speaker-attributed transcript, summary templates, decisions, and action items operate as a coordinated system rather than isolated tabs.
2. **First-Class Action Items** — Complete with assignee avatar, interactive status toggles (`open`, `doing`, `done`), due dates, source timestamps, and 1-click jump-to-source behavior that seeks playback and highlights transcript context.
3. **Evidence-Backed Cross-Meeting Search** — Returns meeting badges, speaker context, query-highlighted quotes, timestamp buttons, and direct deep links into the workspace at that exact second.

---

## Implemented Architecture & Routes

| Route | Purpose | Key Working Interactions |
| --- | --- | --- |
| `/` | Meetings Library | Global metrics counter bar (Decisions locked, Open actions, Hours recorded), live filters by Tag & Participant, keyword search, meeting cards for 3 seeded meetings. |
| `/m/[id]` | Meeting Workspace | Waveform playback engine, active cue tracking, summary template switcher (General, Decisions, Customer, Standup), searchable transcript, outcomes rail with decisions, interactive action items, and clips modal. |
| `/search` | Evidence Search | Global search across all meetings/decisions/actions/transcripts, sample query chips (`audit logs`, `Oct 15`, `on-call`, `pricing`), query highlighting, 1-click jump to source. |
| `/share/[token]` | Public Share | 100% unauthenticated public share route supporting both full meeting share tokens (`share-short-mtg`, `share-medium-mtg`, `share-long-mtg`) and highlight clip tokens (`clip-short-01`, `clip-medium-02`, `clip-long-04`, etc.). |
| `/about` | Capture Rationale | Architecture overview, capture stubbing explanation, link to `CAPTURE-TEST.md` verification. |

---

## Seeded Meetings Corpus

| ID | Title | Shape | Key Highlights |
| --- | --- | --- | --- |
| `m-short` | Maya <> Alex — weekly 1:1 | ~10 min 1:1 sync | Auth feature flag decision, rate-limit writeup action item. |
| `m-medium` | Northstar Health — QBR prep | ~30 min customer prep | Phased rollout, Oct 15 export GA milestone, SSO audit log escalation. |
| `m-long` | Platform roadmap council — Q4 bets | ~60 min 8-person meeting | 8 speakers, 98 transcript lines, 6 decisions, 10 action items, 6 clips, 4 summary templates. |

---

## Stack & Build

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + local seeded TS data. Static Site Generation (SSG) prerenders 23 static pages for zero-latency demo evaluation.
