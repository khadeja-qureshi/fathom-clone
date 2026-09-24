import type { Meeting } from "@/lib/types";
import { people, personList } from "./people";

export const meetingShort: Meeting = {
  id: "m-short",
  slug: "maya-alex-weekly",
  title: "Maya <> Alex — weekly 1:1",
  when: "2026-09-22T15:00:00.000Z",
  durationSec: 620,
  platform: "Zoom",
  participants: personList(["maya", "alex"]),
  hostId: "maya",
  blurb:
    "Career growth, on-call load, and whether the search rewrite lands before the customer council.",
  tags: ["1:1", "eng", "people"],
  shareToken: "share-short-mtg",
  media: {
    kind: "audio-demo",
    label: "Demo timeline (capture stubbed)",
    waveSeed: 11,
  },
  defaultTemplateId: "general",
  transcript: [
    { id: "s1", speakerId: "maya", startSec: 8, endSec: 22, text: "Quick check-in — how are you landing after the incident week?" },
    { id: "s2", speakerId: "alex", startSec: 23, endSec: 48, text: "Better. The on-call rotation is still too noisy, but Sam's runbook cut our MTTR in half." },
    { id: "s3", speakerId: "maya", startSec: 49, endSec: 70, text: "Good. I want that runbook treated as the source of truth, not a side doc." },
    { id: "s4", speakerId: "alex", startSec: 71, endSec: 105, text: "Agreed. I'll move it into the eng handbook and assign owners per service." },
    { id: "s5", speakerId: "maya", startSec: 106, endSec: 140, text: "On growth — you said you want more product exposure. The Q4 roadmap council is a good seat." },
    { id: "s6", speakerId: "alex", startSec: 141, endSec: 175, text: "I'd like that. Especially if we're choosing between infra debt and the search rewrite." },
    { id: "s7", speakerId: "maya", startSec: 176, endSec: 210, text: "My bias: ship evidence-backed search for the demo customers, then pay infra in a sequestered sprint." },
    { id: "s8", speakerId: "alex", startSec: 211, endSec: 250, text: "That matches what Priya is hearing — Northstar keeps asking where decisions went after calls." },
    { id: "s9", speakerId: "maya", startSec: 251, endSec: 285, text: "Then let's decide today: search rewrite is the P0 for your squad through October 10." },
    { id: "s10", speakerId: "alex", startSec: 286, endSec: 320, text: "Locked. I'll pull two engineers off the notification polish and protect focus time." },
    { id: "s11", speakerId: "maya", startSec: 321, endSec: 355, text: "Also — please give Rina a design partner for the jump-to-source UX; it's the whole point." },
    { id: "s12", speakerId: "alex", startSec: 356, endSec: 390, text: "I'll set a working session Thursday. Do you want a written decision log in Throughline after council?" },
    { id: "s13", speakerId: "maya", startSec: 391, endSec: 430, text: "Yes. Every bet needs an owner, a due date, and a transcript timestamp. No orphan commitments." },
    { id: "s14", speakerId: "alex", startSec: 431, endSec: 470, text: "I'll prototype the action-item rail with status and due fields this week." },
    { id: "s15", speakerId: "maya", startSec: 471, endSec: 505, text: "Perfect. Last thing — your skip-level with Jordan is Friday; bring the on-call metrics." },
    { id: "s16", speakerId: "alex", startSec: 506, endSec: 540, text: "Already charted. Night pages are down 30% but still spike on deploys." },
    { id: "s17", speakerId: "maya", startSec: 541, endSec: 575, text: "Call that out as a decision for freeze windows. I don't want heroics as a process." },
    { id: "s18", speakerId: "alex", startSec: 576, endSec: 605, text: "I'll draft a proposal for a Friday deploy freeze and circulate before council." },
    { id: "s19", speakerId: "maya", startSec: 606, endSec: 618, text: "Thanks — go protect the search work. Talk Thursday." },
  ],
  decisions: [
    {
      id: "sd1",
      text: "Search rewrite is P0 for Alex's squad through October 10.",
      ownerIds: ["alex", "maya"],
      startSec: 251,
      evidenceCueId: "s9",
    },
    {
      id: "sd2",
      text: "Every roadmap bet must have owner, due date, and transcript timestamp.",
      ownerIds: ["maya"],
      startSec: 391,
      evidenceCueId: "s13",
    },
  ],
  actionItems: [
    {
      id: "sa1",
      text: "Move incident runbook into eng handbook with per-service owners.",
      assigneeId: "alex",
      status: "doing",
      dueDate: "2026-09-26",
      startSec: 71,
      evidenceCueId: "s4",
    },
    {
      id: "sa2",
      text: "Schedule design working session with Rina on jump-to-source UX.",
      assigneeId: "alex",
      status: "open",
      dueDate: "2026-09-25",
      startSec: 321,
      evidenceCueId: "s11",
    },
    {
      id: "sa3",
      text: "Draft Friday deploy-freeze proposal for council.",
      assigneeId: "alex",
      status: "open",
      dueDate: "2026-09-27",
      startSec: 576,
      evidenceCueId: "s18",
    },
  ],
  highlights: [
    {
      id: "sh1",
      type: "decision",
      title: "Search rewrite becomes P0",
      startSec: 251,
      endSec: 320,
      cueIds: ["s9", "s10"],
      shareToken: "clip-short-01",
    },
    {
      id: "sh2",
      type: "insight",
      title: "No orphan commitments",
      startSec: 391,
      endSec: 430,
      cueIds: ["s13"],
      shareToken: "clip-short-02",
    },
  ],
  summaries: [
    {
      id: "general",
      label: "General",
      description: "Balanced recap of the 1:1",
      sections: [
        {
          heading: "Overview",
          bullets: [
            "Alex recovering from incident week; runbook already improving MTTR.",
            "Career growth path: more product exposure via roadmap council.",
            "Aligned that customer-facing search evidence matters more than polish work.",
          ],
        },
        {
          heading: "Commitments",
          bullets: [
            "Search rewrite protected as P0 through Oct 10.",
            "Action-item rail prototype with status + due dates this week.",
            "Deploy-freeze proposal before council.",
          ],
        },
      ],
    },
    {
      id: "decisions",
      label: "Decisions-first",
      description: "Only locked calls and owners",
      sections: [
        {
          heading: "Decisions",
          bullets: [
            "P0: search rewrite (Alex + Maya) through Oct 10.",
            "Standard: bets need owner, due date, transcript timestamp.",
          ],
        },
        {
          heading: "Pending",
          bullets: ["Friday deploy freeze — proposal forthcoming, not yet decided."],
        },
      ],
    },
    {
      id: "customer",
      label: "Customer lens",
      description: "External impact",
      sections: [
        {
          heading: "Customer signal",
          bullets: [
            "Northstar asking where decisions went after meetings.",
            "Evidence-backed search is the answer customers feel.",
          ],
        },
        {
          heading: "Internal response",
          bullets: ["Prioritize search rewrite over notification polish."],
        },
      ],
    },
    {
      id: "standup",
      label: "Standup",
      description: "Yesterday / today / blockers",
      sections: [
        {
          heading: "Today",
          bullets: [
            "Alex: handbook runbook, Rina session, freeze proposal.",
            "Maya: protect focus, prep council framing.",
          ],
        },
        {
          heading: "Blockers",
          bullets: ["On-call noise still spikes on deploys."],
        },
      ],
    },
  ],
};

void people;
