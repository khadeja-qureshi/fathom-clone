# Throughline — AI Meeting Workspace

> Meetings redesigned around decisions and follow-through.

Throughline is a modern AI meeting workspace inspired by Fathom, built to solve post-meeting execution gaps. Rather than burying commitments under long prose summaries, Throughline elevates **decisions** and **action items** into first-class objects connected directly to transcript evidence and media timelines.

---

## Key Features

1. **Unified Meeting Workspace (`/m/[id]`)**
   - Interactive waveform playback controls with speed adjustment (1x, 1.25x, 1.5x, 2x), timeline scrubbing, and active transcript cue highlighting.
   - Summary template switcher: General recap, Decisions-first, Customer impact, and Standup digest.
   - Speaker-attributed searchable transcript with click-to-seek playback navigation.
   - Outcomes rail: Explicit decisions with owner avatars and timestamp proof, interactive action items with status toggles (`open`, `doing`, `done`), due dates, and jump-to-source controls.

2. **Evidence-Backed Cross-Meeting Search (`/search`)**
   - Search across transcripts, decisions, action items, and clips across all meetings.
   - Results show verified transcript quotes, speaker context, and 1-click jump into the workspace at that exact second.
   - Pre-populated sample queries (`audit logs`, `Oct 15`, `on-call`, `pricing`, `feature flag`).

3. **Public Sharing Without Login (`/share/[token]`)**
   - Works 100% without authentication for evaluators and external stakeholders.
   - Supports both full meeting share tokens (`share-short-mtg`, `share-medium-mtg`, `share-long-mtg`) and highlight clip share tokens (`clip-short-01`, `clip-medium-02`, `clip-long-04`, etc.).

4. **Seeded Meeting Corpus**
   - `m-short`: ~10-minute 1:1 sync (Maya & Alex).
   - `m-medium`: ~30-minute customer QBR prep (Northstar Health).
   - `m-long`: Realistic ~60-minute 8-person Platform Roadmap Council call with 98 transcript lines, 6 decisions, 10 action items, 6 clips, and 4 summary templates.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 10+

### Installation & Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Type Verification

```bash
# Production build
npm run build
```

---

## Capture Infrastructure & Agent Logs

Per assignment instructions, agent capture infrastructure (`.agent-logs/`, `CAPTURE-TEST.md`, `.cursor/`) is preserved intact and verified green.

---

## Documentation

- `WALKTHROUGH.md`: Camera-on demo script under 5 minutes for video presentation.
- `PRODUCT-DECISIONS.md`: Core product trade-offs, scope, and technical decisions.
- `PRODUCT-NOTES.md`: Fathom recon research and comparative observations.
