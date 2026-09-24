# Authenticated recon — what you need to do manually

I cannot sign up as you, connect your calendar, or join a real Zoom/Meet/Teams call from this environment. Please run the free-plan flow end-to-end and drop screenshots into `recon/screenshots/` using the filenames below (or close equivalents + note the real name in `recon/notes/INDEX.md`).

Goal: enough visual truth to write `PRODUCT-NOTES.md` and then build. Prefer **full-window** screenshots; crop only if UI is huge.

---

## A. Account & calendar (setup)

| # | Do this | Save as |
| --- | --- | --- |
| A1 | Marketing / signup entry (fathom.video or fathom.ai) | `01-marketing-home.png` |
| A2 | Sign-up / free plan confirmation | `02-signup-free-plan.png` |
| A3 | Onboarding first screen(s) | `03-onboarding-01.png`, `03-onboarding-02.png` |
| A4 | Connect Google or Outlook calendar — consent + success | `04-calendar-connect.png`, `05-calendar-connected.png` |
| A5 | Connect Zoom **or** Meet **or** Teams (whichever you use) | `06-conferencing-connect.png` |
| A6 | Settings / preferences overview (capture mode, defaults) | `07-settings-overview.png` |

---

## B. Get into a real short meeting (~2 min with yourself)

| # | Do this | Save as |
| --- | --- | --- |
| B1 | Upcoming meeting / “Fathom will join” or capture-mode picker | `08-pre-meeting-capture-mode.png` |
| B2 | In-call: Fathom bot present **or** bot-free indicator | `09-in-meeting-recording.png` |
| B3 | If available: live summary / scratchpad / in-call UI | `10-in-meeting-live-ui.png` |
| B4 | End call; processing / “generating notes” state if shown | `11-processing.png` |

A solo 2-minute Zoom/Meet/Teams call is enough.

---

## C. Post-meeting workspace (most important)

Open the finished recording and capture:

| # | Do this | Save as |
| --- | --- | --- |
| C1 | Full call page — first viewport (title, video, key chrome) | `12-call-page-overview.png` |
| C2 | Playback controls + video/player area | `13-playback.png` |
| C3 | Transcript panel — speakers + timestamps visible | `14-transcript.png` |
| C4 | Click a transcript line / timestamp → show seek / active state | `15-transcript-seek.png` |
| C5 | AI summary — default template | `16-summary-default.png` |
| C6 | Summary template switcher / list of templates | `17-summary-templates.png` |
| C7 | After switching template (or regenerate) | `18-summary-alt-template.png` |
| C8 | Action items list (assignee if shown, complete toggle) | `19-action-items.png` |
| C9 | Click action item → jump to playback moment (if it does) | `20-action-item-jump.png` |
| C10 | Add or view a **highlight** from transcript (+ icon / type picker) | `21-highlight-create.png` |
| C11 | Highlight / clip on the side panel | `22-highlights-panel.png` |
| C12 | Share **clip** link UI | `23-share-clip.png` |
| C13 | Share **full recording** modal (permissions) | `24-share-recording.png` |
| C14 | Open share link in a **logged-out / private** window | `25-public-share-view.png` |
| C15 | Ask Fathom / search on this call (query + answer with citations if any) | `26-ask-fathom-single.png` |
| C16 | Copy summary / email-ish export if present | `27-copy-summary.png` |

---

## D. Library, search, long-meeting reality

| # | Do this | Save as |
| --- | --- | --- |
| D1 | My Calls / meetings list (populated) | `28-my-calls-list.png` |
| D2 | Filters / tabs (Team, Folders, Playlists if visible on free) | `29-library-nav.png` |
| D3 | Account-wide Ask Fathom or global search — query that needs evidence | `30-search-cross-meeting.png` |
| D4 | Search/Ask result showing meeting + quote/timestamp if available | `31-search-result-evidence.png` |

### Long meeting (required by brief)

Either:
- Join an ~8-person / ~60-min call and record it, **or**
- If you cannot, open any long multi-speaker recording you can access (sample, team shared, or a second longer solo+screen share) and note limitations.

| # | Do this | Save as |
| --- | --- | --- |
| D5 | Long-call page overview (dense transcript / many speakers) | `32-long-meeting-overview.png` |
| D6 | Scrolled summary / many action items on long call | `33-long-meeting-density.png` |
| D7 | How navigation works across a long transcript (chapters? search?) | `34-long-meeting-nav.png` |

---

## E. Optional but useful

| # | Do this | Save as |
| --- | --- | --- |
| E1 | Empty state (new account before first call) if you still have it | `35-empty-state.png` |
| E2 | Mobile / responsive if you try phone | `36-mobile.png` |
| E3 | Pricing / upgrade paywall if free limits hit | `37-paywall.png` |
| E4 | Playlist or folder UI if available | `38-playlist-or-folder.png` |

---

## Notes to write (short text, not screenshots)

In `recon/notes/manual-observations.md` answer in bullets:

1. What is primary on the call page — video, summary, or transcript?
2. How do summary / transcript / actions / highlights relate spatially (tabs vs columns)?
3. Do action items show assignee, due date, status, timestamp?
4. Does clicking transcript / action / highlight seek the player?
5. What frustrates you in a 60-minute multi-person call?
6. What would you change first for “decisions and follow-through”?

---

## When you’re done

1. Drop files into `recon/screenshots/`.
2. Fill `recon/notes/manual-observations.md`.
3. Reply here: **“Recon screenshots ready.”**

I will then inspect the images and write `PRODUCT-NOTES.md` (and only after that start application code).
