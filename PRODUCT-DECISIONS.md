# PRODUCT-DECISIONS.md

Product: **Throughline** — meetings redesigned around decisions and follow-through.  
Inspired by Fathom; **not** a pixel-for-pixel clone.

---

## Recon honesty

We could not finish Fathom’s Windows Classic desktop capture flow (startup crash `-1073741515`; web onboarding redirects to that app; bot-free unavailable on Windows). Capture is **stubbed by necessity and by assignment permission**. Post-meeting UX is designed from public research + docs, not from a completed personal recording.

---

## What we changed from Fathom

1. **Decisions as first-class objects** — not only buried in summary bullets.
2. **Action items as a workflow** — assignee, status, due date, source timestamp, jump-to-source; visible in the workspace rail and searchable.
3. **Evidence-backed search** — every hit shows transcript (or decision) evidence + timestamp + deep link.
4. **Workspace composition** — one meeting surface: player, transcript, and an outcomes rail (summary templates / decisions / actions / highlights) working together instead of feeling like disconnected tabs.
5. **Brand/UX** — Throughline visual system (editorial, decisive, calm); no Fathom logo, purple-glow AI clichés, or copycat layout.

---

## What we cut

- Teams/folders/playlists/deals/scorecards/CRM
- In-meeting live UI and scratchpad
- Real calendar and conferencing connect flows (shown as stubbed settings if at all)
- Billing, SSO, admin, mobile apps
- Conversational “chat” without sources

---

## What we stubbed (and why)

| Stub | Why |
| --- | --- |
| Recording bot / Zoom·Meet·Teams join | Assignment-allowed; Windows Fathom client blocked real capture |
| Calendar OAuth | Not evaluator-visible vs post-meeting depth |
| Real AI inference | Deterministic seeded summaries/templates = reliable demo |
| Billing / auth gate for demo | Live link must work logged out; share pages public |
| Real uploaded A/V files | Use believable demo media + working timeline interactions |

---

## Why this scope

Evaluators see a **live, seeded, logged-out** product. Depth in the meeting workspace, action/decision follow-through, search-with-evidence, and public share beats a brittle half-working bot.

---

## 2–3 improvements evaluators should notice

1. **Outcomes rail** — decisions and action items sit beside playback/transcript with one-click jump-to-source; commitments don’t hide under summary prose.
2. **Action items with teeth** — assignee, status, due date, and timestamped evidence on every item.
3. **Search that proves it** — cross-meeting results quote the transcript (or decision) and seek into the meeting.

---

## Stack

Next.js (App Router) + TypeScript + Tailwind + local seeded JSON/TS data. Deploy to Vercel (or equivalent). No secrets required for the demo.
