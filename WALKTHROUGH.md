# WALKTHROUGH.md — Throughline Demo Script

> **Format:** Camera-on Loom/video recording (~4 minutes 30 seconds).
> **Presenter:** Product Lead / Engineer.
> **Goal:** Demonstrate the core demo path of Throughline, highlighting decisions, follow-through, playback sync, summary template switching, evidence search, and public sharing.

---

## Script & Interaction Flow

### 1. Introduction & Product Thesis [0:00 – 0:40]

- **On Screen:** Home page (`/` Meetings Library).
- **Speaker Script:**
  > "Hi everyone! Welcome to Throughline. Throughline is an AI meeting workspace redesigned around **decisions and follow-through** — not a pixel-for-pixel Fathom clone.
  >
  > While traditional AI note-takers bury commitments inside long prose summaries, Throughline elevates decisions and action items into first-class objects connected directly to transcript evidence."

---

### 2. Meetings Library & 60-Minute Council Meeting [0:40 – 1:20]

- **On Screen:** Point to global metrics bar at top of Home page (3 meetings, 11 decisions locked, 18 action items, 1.7 hours recorded). Show filter by tag and participant.
- **Action:** Click **"Workspace"** on `Platform roadmap council — Q4 bets` (`/m/m-long`).
- **Speaker Script:**
  > "Here in the Meetings Library, we see our seeded corpus, including a short 1:1, a customer QBR prep, and a realistic **8-person, 60-minute Platform Roadmap Council call**.
  >
  > Let's open the 60-minute meeting workspace."

---

### 3. Workspace, Playback & Summary Template Switching [1:20 – 2:20]

- **On Screen:** Meeting workspace (`/m/m-long`).
- **Action:**
  1. Click **Play** on the PlaybackBar. Show audio playhead advancing smoothly across waveform bars with active snippet preview.
  2. Switch speed to **1.5x**.
  3. Click a transcript line (e.g. `t-long-016` by Nina at 09:09). Watch playback jump instantly to 09:09 and highlight the cue.
  4. In the AI Summary pane, change template dropdown from **General recap** to **Decisions-first** then **Customer impact**.
  5. Click **"Copy Summary"** button (toast confirms 'Copied Summary!').
- **Speaker Script:**
  > "Notice how the workspace brings playback, transcript, and outcomes together.
  >
  > As audio plays, the active transcript cue highlights dynamically. Clicking any line instantly seeks the timeline to that exact second.
  >
  > We can also switch summary templates on the fly — from General recap to Decisions-first or Customer impact — depending on who needs the recap."

---

### 4. Outcomes Rail: Decisions, Action Items & Clips [2:20 – 3:30]

- **On Screen:** Right-hand Outcomes Rail.
- **Action:**
  1. Under **Decisions** tab, point to Decision 1 (*"Q4 product bets: SSO audit logs..."*). Click **"09:09 jump to source"** button.
  2. Switch to **Actions** tab. Toggle checkbox on an action item (e.g. *"Publish unified Q4 roadmap doc"*) from open to **Done**. Show assignee avatar (Elena) and due date.
  3. Filter action items by **Open** and **Done**.
  4. Switch to **Clips** tab. Click **"Share Clip"** on *"Nov 12 launch with Nov 1 freeze"*. Show the share modal with public URL.
- **Speaker Script:**
  > "In the Outcomes Rail, **Decisions** are explicit objects with owner avatars and timestamp proof. Clicking a timestamp jumps playback straight to the moment the call was made.
  >
  > **Action items** are interactive: assignees, due dates, and live completion checkboxes that toggle status on the fly.
  >
  > Every highlight clip also generates a standalone shareable URL."

---

### 5. Evidence-Backed Cross-Meeting Search [3:30 – 4:20]

- **On Screen:** Navigate to `/search` (Search page).
- **Action:**
  1. Click sample query chip **"audit logs"**.
  2. Show evidence cards with meeting badges, speaker avatars (Elena, Sofia), highlighted quote matches, and timestamp buttons.
  3. Click **"12:29 jump to source"** on the Northstar meeting result. Watch it load the workspace at `/m/m-medium?t=749&cue=t-med-26` with cue pre-highlighted.
- **Speaker Script:**
  > "Cross-meeting search in Throughline is **evidence-backed**. Searching for 'audit logs' doesn't just show a generic answer — it returns exact transcript quotes, speaker context, and timestamp badges across all meetings.
  >
  > One click takes you directly into the workspace at that precise second."

---

### 6. Public Unauthenticated Sharing & Conclusion [4:20 – 4:45]

- **On Screen:** Navigate to `/share/share-long-mtg` (Public shared meeting view).
- **Action:** Show public share banner (*"Public Shared Meeting View • No login required"*).
- **Speaker Script:**
  > "Finally, public share links work **100% without authentication**, making it trivial to share clips or full meeting workspaces with external partners.
  >
  > Per our specification, calendar OAuth and capture bots were stubbed to invest fully in post-call decision clarity.
  >
  > Thank you for watching Throughline!"

---

## Demo Checklist Before Recording

- [x] Node dev server or build running smoothly at `http://localhost:3000`.
- [x] Seeded meetings loaded (`m-short`, `m-medium`, `m-long`).
- [x] Browser window set to 1920x1080 or clean full screen.
- [x] Microphone & camera audio/video tested.
