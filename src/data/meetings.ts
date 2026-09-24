import type {
  Highlight,
  Meeting,
  SummaryTemplate,
} from "@/lib/types";
import {
  alexRivera,
  dylanFoster,
  elenaVasquez,
  getPersonById,
  jordanBlake,
  liamOBrien,
  marcusWebb,
  mayaChen,
  ninaOkonkwo,
  priyaKapoor,
  sofiaNakamura,
} from "./people";

export interface SearchResult {
  meetingId: string;
  meetingTitle: string;
  kind: "transcript" | "decision" | "action" | "highlight";
  id: string;
  snippet: string;
  startSec: number;
  speakerName?: string;
}

const shortSummaries: SummaryTemplate[] = [
  {
    id: "general",
    label: "General recap",
    description: "High-level summary of the 1:1",
    sections: [
      {
        heading: "Overview",
        bullets: [
          "Alex reported strong progress on the auth refactor; integration tests are green locally.",
          "Rate-limit telemetry showed a spike tied to a Northstar batch import job — not a regression.",
          "Maya and Alex aligned on shipping behind a feature flag and deferring dashboard polish.",
        ],
      },
      {
        heading: "Blockers & support",
        bullets: [
          "Alex needs a 30-minute architecture review slot before merging the token refresh change.",
          "Caching layer work is blocked until Liam shares the Redis cluster migration timeline.",
        ],
      },
    ],
  },
  {
    id: "decisions",
    label: "Decisions",
    description: "What was decided and who owns follow-through",
    sections: [
      {
        heading: "Decisions made",
        bullets: [
          "Ship the auth refactor behind `auth_v2_refresh` feature flag this sprint — owner: Alex.",
          "Defer dashboard redesign mock review to next sprint to protect refactor bandwidth.",
        ],
      },
      {
        heading: "Open questions",
        bullets: [
          "Whether to add client-side retry backoff before or after the flag rollout.",
        ],
      },
    ],
  },
  {
    id: "customer",
    label: "Customer impact",
    description: "How this work affects customers",
    sections: [
      {
        heading: "Customer signals",
        bullets: [
          "Northstar Health batch imports triggered rate-limit alerts — expected behavior, not an outage.",
          "No customer-facing auth changes until the feature flag is enabled per tenant.",
        ],
      },
      {
        heading: "Communication",
        bullets: [
          "Priya will proactively notify Northstar CSM if import windows overlap with rate-limit thresholds.",
        ],
      },
    ],
  },
  {
    id: "standup",
    label: "Standup digest",
    description: "Quick async update format",
    sections: [
      {
        heading: "Yesterday / today",
        bullets: [
          "Alex: finished token refresh tests; today — feature flag wiring + rate-limit write-up.",
        ],
      },
      {
        heading: "Blockers",
        bullets: ["Needs arch review slot; waiting on Liam for cache migration date."],
      },
    ],
  },
];

const meetingShort: Meeting = {
  id: "m-short",
  slug: "maya-alex-weekly",
  title: "Maya <> Alex — weekly 1:1",
  when: "2025-09-22T15:00:00.000Z",
  durationSec: 612,
  platform: "Zoom",
  participants: [mayaChen, alexRivera],
  hostId: mayaChen.id,
  blurb:
    "Weekly check-in on sprint commitments, auth refactor progress, and rate-limit telemetry from Northstar imports.",
  tags: ["1:1", "engineering", "auth", "weekly"],
  shareToken: "share-short-mtg",
  media: {
    kind: "audio-demo",
    label: "Demo timeline (capture stubbed)",
    waveSeed: 1042,
  },
  transcript: [
    { id: "t-short-01", speakerId: "maya-chen", startSec: 0, endSec: 18, text: "Hey Alex — let's keep this tight. How's the auth refactor looking for Thursday?" },
    { id: "t-short-02", speakerId: "alex-rivera", startSec: 19, endSec: 42, text: "Pretty good. Token refresh path is merged locally, integration tests are green. I'm wiring the feature flag today." },
    { id: "t-short-03", speakerId: "maya-chen", startSec: 43, endSec: 58, text: "Nice. Anything still risky before we flip it for internal dogfood?" },
    { id: "t-short-04", speakerId: "alex-rivera", startSec: 59, endSec: 88, text: "The refresh retry loop — I want another pair of eyes. Also Redis cache invalidation is still a question mark until Liam confirms the migration window." },
    { id: "t-short-05", speakerId: "maya-chen", startSec: 89, endSec: 108, text: "I'll grab you an arch review slot tomorrow. Did you see the rate-limit spike alert Friday night?" },
    { id: "t-short-06", speakerId: "alex-rivera", startSec: 109, endSec: 138, text: "Yeah — traced it to Northstar's batch import job. Not a regression, just volume. I owe a short write-up for Priya's team." },
    { id: "t-short-07", speakerId: "maya-chen", startSec: 139, endSec: 158, text: "Perfect. Let's make sure CS has language before their QBR prep call." },
    { id: "t-short-08", speakerId: "alex-rivera", startSec: 159, endSec: 182, text: "Will do. I can have a one-pager by EOD Wednesday." },
    { id: "t-short-09", speakerId: "maya-chen", startSec: 183, endSec: 210, text: "On staffing — are you still blocked on the caching layer ticket?" },
    { id: "t-short-10", speakerId: "alex-rivera", startSec: 211, endSec: 238, text: "Soft-blocked. I can scaffold it, but Liam wants to pair once the cluster migration date is locked." },
    { id: "t-short-11", speakerId: "maya-chen", startSec: 239, endSec: 262, text: "I'll ping Liam after this. Anything you want to push out of the sprint?" },
    { id: "t-short-12", speakerId: "alex-rivera", startSec: 263, endSec: 288, text: "Dashboard redesign review — happy to defer. Auth is the customer commit this sprint." },
    { id: "t-short-13", speakerId: "maya-chen", startSec: 289, endSec: 318, text: "Agreed. Let's ship auth behind `auth_v2_refresh` and revisit dashboard next sprint." },
    { id: "t-short-14", speakerId: "alex-rivera", startSec: 319, endSec: 348, text: "Works for me. I'll add the flag to staging and post in #eng-releases once checks pass." },
    { id: "t-short-15", speakerId: "maya-chen", startSec: 349, endSec: 378, text: "Career topic — you mentioned wanting more design exposure. Dylan's free Thursday if you want to sit in on the nav prototype review." },
    { id: "t-short-16", speakerId: "alex-rivera", startSec: 379, endSec: 402, text: "I'd love that. Helps me think about API ergonomics for the settings surface too." },
    { id: "t-short-17", speakerId: "maya-chen", startSec: 403, endSec: 428, text: "Great. Quick pulse — energy level, anything I can remove from your plate?" },
    { id: "t-short-18", speakerId: "alex-rivera", startSec: 429, endSec: 458, text: "Energy's fine. Main stress is just the migration unknowns. Clear dates from infra would help me sequence work." },
    { id: "t-short-19", speakerId: "maya-chen", startSec: 459, endSec: 482, text: "Heard. I'll escalate in the platform sync if Liam can't confirm today." },
    { id: "t-short-20", speakerId: "alex-rivera", startSec: 483, endSec: 512, text: "Thanks. Recapping actions: feature flag today, rate-limit doc Wednesday, arch review tomorrow." },
    { id: "t-short-21", speakerId: "maya-chen", startSec: 513, endSec: 538, text: "And I'll schedule the review and nudge Liam on Redis. Anything else?" },
    { id: "t-short-22", speakerId: "alex-rivera", startSec: 539, endSec: 558, text: "That's it from me. See you at standup." },
  ],
  decisions: [
    {
      id: "d-short-01",
      text: "Ship the auth refactor behind the `auth_v2_refresh` feature flag this sprint.",
      ownerIds: ["alex-rivera"],
      startSec: 289,
      evidenceCueId: "t-short-13",
    },
    {
      id: "d-short-02",
      text: "Defer dashboard redesign mock review to next sprint.",
      ownerIds: ["maya-chen", "alex-rivera"],
      startSec: 263,
      evidenceCueId: "t-short-12",
    },
  ],
  actionItems: [
    {
      id: "a-short-01",
      text: "Write one-pager on Northstar rate-limit spike for Customer Success.",
      assigneeId: "alex-rivera",
      status: "open",
      dueDate: "2025-09-24T17:00:00.000Z",
      startSec: 159,
      evidenceCueId: "t-short-08",
    },
    {
      id: "a-short-02",
      text: "Schedule 30-minute architecture review for token refresh change.",
      assigneeId: "maya-chen",
      status: "doing",
      dueDate: "2025-09-23T12:00:00.000Z",
      startSec: 89,
      evidenceCueId: "t-short-05",
    },
    {
      id: "a-short-03",
      text: "Pair with Liam on caching layer once Redis migration date is confirmed.",
      assigneeId: "alex-rivera",
      status: "open",
      dueDate: null,
      startSec: 211,
      evidenceCueId: "t-short-10",
    },
  ],
  highlights: [
    {
      id: "h-short-01",
      type: "decision",
      title: "Auth ships behind feature flag this sprint",
      startSec: 289,
      endSec: 318,
      cueIds: ["t-short-13", "t-short-14"],
      shareToken: "clip-short-01",
    },
    {
      id: "h-short-02",
      type: "insight",
      title: "Northstar batch imports drove rate-limit alerts — expected volume",
      startSec: 109,
      endSec: 138,
      cueIds: ["t-short-06"],
      shareToken: "clip-short-02",
    },
  ],
  summaries: shortSummaries,
  defaultTemplateId: "general",
};

const mediumSummaries: SummaryTemplate[] = [
  {
    id: "general",
    label: "General recap",
    description: "Full meeting summary for internal distribution",
    sections: [
      {
        heading: "Context",
        bullets: [
          "Harborline prep session ahead of Northstar Health's Q4 business review.",
          "Account is up for renewal in November; expansion hinges on analytics adoption.",
        ],
      },
      {
        heading: "Key themes",
        bullets: [
          "Northstar wants executive-ready ROI narrative tied to reduced manual reporting hours.",
          "Product gaps: scheduled exports and SSO audit logs are blockers for their security review.",
          "Sales proposed a phased rollout with a 90-day success plan if we commit to export GA by Oct 15.",
        ],
      },
    ],
  },
  {
    id: "decisions",
    label: "Decisions",
    description: "Commitments made during QBR prep",
    sections: [
      {
        heading: "Decisions",
        bullets: [
          "Lead QBR deck with ROI story using Sofia's reporting-hours model — not feature slides.",
          "Offer phased rollout with export GA date of Oct 15 as contractual milestone.",
          "Escalate SSO audit log gap to platform council as a Q4 bet dependency.",
        ],
      },
    ],
  },
  {
    id: "customer",
    label: "Customer lens",
    description: "Northstar-specific talking points",
    sections: [
      {
        heading: "What Northstar cares about",
        bullets: [
          "CFO sponsor wants proof that Harborline replaced 12 FTE-hours/week of manual CSV work.",
          "CISO blocked wider rollout until SSO audit logs ship — non-negotiable for 800-seat expansion.",
          "Clinical ops lead praised in-app alerts but asked for scheduled PDF exports to EMR workflows.",
        ],
      },
      {
        heading: "Risk signals",
        bullets: [
          "Competitor demo scheduled same week as QBR — Jordan flagged aggressive discounting.",
          "Champion on parental leave mid-October; need secondary contact warmed up before QBR.",
        ],
      },
    ],
  },
  {
    id: "standup",
    label: "Standup digest",
    description: "Quick team sync version",
    sections: [
      {
        heading: "Today",
        bullets: [
          "Priya: draft success plan outline. Jordan: ROI appendix for CFO. Elena: export timeline confirmation.",
        ],
      },
      {
        heading: "Blockers",
        bullets: ["SSO audit logs need platform council slot — Marcus to advocate."],
      },
    ],
  },
];

const meetingMedium: Meeting = {
  id: "m-medium",
  slug: "northstar-qbr-prep",
  title: "Northstar Health — QBR prep",
  when: "2025-09-23T16:30:00.000Z",
  durationSec: 1842,
  platform: "Google Meet",
  participants: [priyaKapoor, jordanBlake, elenaVasquez, sofiaNakamura],
  hostId: priyaKapoor.id,
  blurb:
    "Cross-functional prep for Northstar Health Q4 business review — ROI narrative, export timeline, and renewal strategy.",
  tags: ["customer", "qbr", "northstar", "renewal", "enterprise"],
  shareToken: "share-medium-mtg",
  media: {
    kind: "audio-demo",
    label: "Demo timeline (capture stubbed)",
    waveSeed: 2871,
  },
  transcript: [
    { id: "t-med-01", speakerId: "priya-kapoor", startSec: 0, endSec: 28, text: "Thanks for joining on short notice. Northstar's QBR is the 30th — we need a crisp story and a realistic commit list." },
    { id: "t-med-02", speakerId: "jordan-blake", startSec: 29, endSec: 58, text: "Renewal is November 15. They're leaning yes on core seats but the 800-seat expansion is tied to security and exports." },
    { id: "t-med-03", speakerId: "elena-vasquez", startSec: 59, endSec: 88, text: "Scheduled exports are code-complete in staging. GA depends on load testing — earliest Oct 15 if infra gives us a window next week." },
    { id: "t-med-04", speakerId: "sofia-nakamura", startSec: 89, endSec: 118, text: "I pulled their usage data. Manual CSV downloads dropped 60% after alerts shipped, but finance still exports weekly — about twelve hours of staff time." },
    { id: "t-med-05", speakerId: "priya-kapoor", startSec: 119, endSec: 148, text: "That's the ROI hook. Jordan, can we lead the deck with hours saved instead of feature screenshots?" },
    { id: "t-med-06", speakerId: "jordan-blake", startSec: 149, endSec: 178, text: "Absolutely. CFO Rita responds to FTE math, not UI polish. Sofia, can you package that as an executive appendix?" },
    { id: "t-med-07", speakerId: "sofia-nakamura", startSec: 179, endSec: 208, text: "Yes — I'll model conservative and optimistic scenarios. Need their loaded labor rate; I'll assume published healthcare benchmarks if they won't share." },
    { id: "t-med-08", speakerId: "elena-vasquez", startSec: 209, endSec: 238, text: "On SSO audit logs — engineering estimate is three sprints. Marcus said it competes with on-call automation on the roadmap council agenda." },
    { id: "t-med-09", speakerId: "priya-kapoor", startSec: 239, endSec: 268, text: "That's a renewal risk. I'll ask Nina to prioritize it if we position it as revenue protection, not a nice-to-have." },
    { id: "t-med-10", speakerId: "jordan-blake", startSec: 269, endSec: 298, text: "Competitor Apex is demoing the same week. Rumor is thirty percent first-year discount with free migration services." },
    { id: "t-med-11", speakerId: "priya-kapoor", startSec: 299, endSec: 328, text: "We shouldn't match on price alone. Phased rollout with a success plan shows commitment without giving away the farm." },
    { id: "t-med-12", speakerId: "elena-vasquez", startSec: 329, endSec: 358, text: "Product can support a 90-day plan: exports GA week two, audit log beta read-only by day sixty, full GA before renewal." },
    { id: "t-med-13", speakerId: "jordan-blake", startSec: 359, endSec: 388, text: "If we put Oct 15 export GA in the order form as a milestone, legal will want engineering sign-off today." },
    { id: "t-med-14", speakerId: "elena-vasquez", startSec: 389, endSec: 418, text: "I'll confirm with Liam on load tests. Barring a Sev-1, Oct 15 is defensible." },
    { id: "t-med-15", speakerId: "sofia-nakamura", startSec: 419, endSec: 448, text: "Clinical ops lead Maria said PDF exports to EMR workflows are the last daily friction point. That's our proof point post-GA." },
    { id: "t-med-16", speakerId: "priya-kapoor", startSec: 449, endSec: 478, text: "Champion David goes on parental leave mid-October. Who's our backup exec sponsor?" },
    { id: "t-med-17", speakerId: "jordan-blake", startSec: 479, endSec: 508, text: "Rita the CFO — she's skeptical but fair. We should pre-brief her with the ROI appendix before the full QBR." },
    { id: "t-med-18", speakerId: "priya-kapoor", startSec: 509, endSec: 538, text: "Agenda proposal: ROI first, security roadmap second, expansion pricing third. Elena, can you join for the technical deep dive?" },
    { id: "t-med-19", speakerId: "elena-vasquez", startSec: 539, endSec: 568, text: "Yes — I'll prep a one-slide timeline for exports and audit logs with explicit beta vs GA language." },
    { id: "t-med-20", speakerId: "sofia-nakamura", startSec: 569, endSec: 598, text: "I'll add a usage chart showing alert adoption by department — radiology is at ninety-two percent, finance lagging at forty-one." },
    { id: "t-med-21", speakerId: "jordan-blake", startSec: 599, endSec: 628, text: "Finance lagging is actually helpful — it justifies the export investment in Rita's language." },
    { id: "t-med-22", speakerId: "priya-kapoor", startSec: 629, endSec: 658, text: "Decision time: are we comfortable leading with ROI and offering phased rollout with Oct 15 export GA?" },
    { id: "t-med-23", speakerId: "elena-vasquez", startSec: 659, endSec: 688, text: "Product is in. I'll own the timeline slide and daily check-ins with Liam until load tests pass." },
    { id: "t-med-24", speakerId: "jordan-blake", startSec: 689, endSec: 718, text: "Sales is in. I'll draft order-form language for the milestone and run it by legal tonight." },
    { id: "t-med-25", speakerId: "sofia-nakamura", startSec: 719, endSec: 748, text: "I'll have the ROI model draft by Thursday morning for review." },
    { id: "t-med-26", speakerId: "priya-kapoor", startSec: 749, endSec: 778, text: "SSO audit logs — I'll escalate to platform council via Marcus. We need a Q4 slot or we lose the expansion." },
    { id: "t-med-27", speakerId: "jordan-blake", startSec: 779, endSec: 808, text: "For pricing, I suggest holding list on core renewal and discount expansion seats ten percent if they sign by November 1." },
    { id: "t-med-28", speakerId: "priya-kapoor", startSec: 809, endSec: 838, text: "Works. Let's not mention Apex unless they bring it up — focus on outcomes we've already delivered." },
    { id: "t-med-29", speakerId: "elena-vasquez", startSec: 839, endSec: 868, text: "Demo segment: I'll show scheduled export setup live — it's stable in staging with Northstar's timezone defaults." },
    { id: "t-med-30", speakerId: "sofia-nakamura", startSec: 869, endSec: 898, text: "Can we get a quote from Maria on hours saved? Even directional language strengthens the appendix." },
    { id: "t-med-31", speakerId: "priya-kapoor", startSec: 899, endSec: 928, text: "I'll email Maria today. Jordan, can you request thirty minutes with Rita next Tuesday?" },
    { id: "t-med-32", speakerId: "jordan-blake", startSec: 929, endSec: 958, text: "Already on it — her EA offered 8 a.m. Pacific before their board prep." },
    { id: "t-med-33", speakerId: "elena-vasquez", startSec: 959, endSec: 988, text: "Risk flag: if load tests slip, we need a contingency narrative — manual export concierge for two weeks, not a date slip on the order form." },
    { id: "t-med-34", speakerId: "priya-kapoor", startSec: 989, endSec: 1018, text: "Good catch. Let's define that contingency now so we're not improvising in front of Rita." },
    { id: "t-med-35", speakerId: "jordan-blake", startSec: 1019, endSec: 1048, text: "Concierge is fine commercially if capped at fifty exports — prevents open-ended services liability." },
    { id: "t-med-36", speakerId: "sofia-nakamura", startSec: 1049, endSec: 1078, text: "I'll track weekly export volume so we know if they'd exceed the cap — current run rate is well under." },
    { id: "t-med-37", speakerId: "priya-kapoor", startSec: 1079, endSec: 1108, text: "Recap owners: Sofia ROI model, Elena timeline, Jordan pricing and legal, me on Maria quote and council escalation." },
    { id: "t-med-38", speakerId: "elena-vasquez", startSec: 1109, endSec: 1138, text: "I'll sync with Liam after this and post export GA confidence in #customer-northstar." },
    { id: "t-med-39", speakerId: "jordan-blake", startSec: 1139, endSec: 1168, text: "I'll share draft success plan template — we used a similar structure with Beacon Dental last quarter." },
    { id: "t-med-40", speakerId: "sofia-nakamura", startSec: 1169, endSec: 1198, text: "One more data point: their churn risk score ticked up slightly after the Apex outbound campaign. Not critical yet." },
    { id: "t-med-41", speakerId: "priya-kapoor", startSec: 1199, endSec: 1228, text: "Let's monitor weekly. Strong QBR execution is our best retention lever right now." },
    { id: "t-med-42", speakerId: "jordan-blake", startSec: 1229, endSec: 1258, text: "Agreed. I'll loop in Nina for a five-minute exec intro if Rita asks about roadmap commitment." },
    { id: "t-med-43", speakerId: "elena-vasquez", startSec: 1259, endSec: 1288, text: "Product marketing owes us updated security one-pager — I'll chase Dylan for refreshed SSO diagrams." },
    { id: "t-med-44", speakerId: "priya-kapoor", startSec: 1289, endSec: 1318, text: "Anything else before we break? I want deck outline locked by Friday." },
    { id: "t-med-45", speakerId: "sofia-nakamura", startSec: 1319, endSec: 1348, text: "I'll add a slide on alert adoption by department — visual proof before we ask for expansion dollars." },
    { id: "t-med-46", speakerId: "jordan-blake", startSec: 1349, endSec: 1378, text: "Legal turnaround on milestone language is twenty-four hours if I submit tonight." },
    { id: "t-med-47", speakerId: "priya-kapoor", startSec: 1379, endSec: 1408, text: "Perfect. Same time check-in Thursday unless export tests fail — then we meet daily." },
    { id: "t-med-48", speakerId: "elena-vasquez", startSec: 1409, endSec: 1438, text: "I'll flag any load-test issues immediately. Thanks everyone." },
  ],
  decisions: [
    {
      id: "d-med-01",
      text: "Lead the QBR deck with ROI narrative using Sofia's reporting-hours model.",
      ownerIds: ["jordan-blake", "sofia-nakamura"],
      startSec: 119,
      evidenceCueId: "t-med-05",
    },
    {
      id: "d-med-02",
      text: "Offer phased rollout with scheduled exports GA milestone of Oct 15 on the order form.",
      ownerIds: ["elena-vasquez", "jordan-blake"],
      startSec: 629,
      evidenceCueId: "t-med-22",
    },
    {
      id: "d-med-03",
      text: "Escalate SSO audit log work to platform council as a Q4 revenue-protection priority.",
      ownerIds: ["priya-kapoor"],
      startSec: 749,
      evidenceCueId: "t-med-26",
    },
  ],
  actionItems: [
    {
      id: "a-med-01",
      text: "Deliver ROI model draft with conservative and optimistic FTE-hour scenarios.",
      assigneeId: "sofia-nakamura",
      status: "doing",
      dueDate: "2025-09-25T14:00:00.000Z",
      startSec: 179,
      evidenceCueId: "t-med-07",
    },
    {
      id: "a-med-02",
      text: "Confirm Oct 15 export GA with Liam after load-test scheduling.",
      assigneeId: "elena-vasquez",
      status: "open",
      dueDate: "2025-09-24T18:00:00.000Z",
      startSec: 389,
      evidenceCueId: "t-med-14",
    },
    {
      id: "a-med-03",
      text: "Draft order-form milestone language and submit to legal.",
      assigneeId: "jordan-blake",
      status: "open",
      dueDate: "2025-09-23T23:00:00.000Z",
      startSec: 689,
      evidenceCueId: "t-med-24",
    },
    {
      id: "a-med-04",
      text: "Request Maria quote on manual reporting hours saved.",
      assigneeId: "priya-kapoor",
      status: "open",
      dueDate: "2025-09-24T17:00:00.000Z",
      startSec: 899,
      evidenceCueId: "t-med-31",
    },
    {
      id: "a-med-05",
      text: "Escalate SSO audit logs to Marcus for platform council agenda.",
      assigneeId: "priya-kapoor",
      status: "doing",
      dueDate: "2025-09-24T12:00:00.000Z",
      startSec: 749,
      evidenceCueId: "t-med-26",
    },
  ],
  highlights: [
    {
      id: "h-med-01",
      type: "insight",
      title: "Twelve FTE-hours per week still spent on manual CSV exports",
      startSec: 89,
      endSec: 118,
      cueIds: ["t-med-04"],
      shareToken: "clip-medium-01",
    },
    {
      id: "h-med-02",
      type: "decision",
      title: "Phased rollout with Oct 15 export GA milestone",
      startSec: 629,
      endSec: 688,
      cueIds: ["t-med-22", "t-med-23"],
      shareToken: "clip-medium-02",
    },
    {
      id: "h-med-03",
      type: "risk",
      title: "Apex competitor demo same week — aggressive discount rumored",
      startSec: 269,
      endSec: 298,
      cueIds: ["t-med-10"],
      shareToken: "clip-medium-03",
    },
  ],
  summaries: mediumSummaries,
  defaultTemplateId: "customer",
};

const longSummaries: SummaryTemplate[] = [
  {
    id: "general",
    label: "General recap",
    description: "Full council session summary",
    sections: [
      {
        heading: "Executive summary",
        bullets: [
          "Council locked Q4 to three bets: SSO audit logs, scheduled exports hardening, and on-call automation phase one.",
          "Infra allocation capped at forty percent of eng capacity — remaining capacity funds customer-facing roadmap.",
          "Nov 12 public launch date confirmed with feature freeze Nov 1 and staged rollout to enterprise tenants first.",
        ],
      },
      {
        heading: "Major debates",
        bullets: [
          "Marcus and Liam argued for pausing net-new features until on-call burden drops — countered by churn data from Sofia.",
          "Pricing experiment approved for mid-market tier: seat bundling with usage caps, starting with ten design partners.",
          "Hiring plan adds two platform SREs and one senior PM for enterprise workflows — reqs open next week.",
        ],
      },
      {
        heading: "Follow-ups",
        bullets: [
          "Elena owns consolidated roadmap doc by Monday. Marcus owns on-call runbook updates. Jordan owns pricing experiment cohort selection.",
        ],
      },
    ],
  },
  {
    id: "decisions",
    label: "Decisions",
    description: "Six formal decisions from the council",
    sections: [
      {
        heading: "Roadmap & capacity",
        bullets: [
          "Cap infra work at 40% of engineering capacity for Q4.",
          "Prioritize SSO audit logs and export hardening as P0; defer mobile offline mode to Q1.",
          "Commit platform SRE hiring — two headcount approved.",
        ],
      },
      {
        heading: "Go-to-market",
        bullets: [
          "Target Nov 12 launch with Nov 1 feature freeze.",
          "Run mid-market pricing experiment with ten design partners starting Oct 7.",
          "Stage rollout: enterprise tenants first, mid-market cohort second, self-serve last.",
        ],
      },
    ],
  },
  {
    id: "customer",
    label: "Customer impact",
    description: "How council outcomes affect customers",
    sections: [
      {
        heading: "Churn & retention",
        bullets: [
          "Sofia presented a 2.3-point uptick in churn risk among mid-market accounts citing missing audit logs and export gaps.",
          "Northstar and two other enterprise logos require SSO audit logs before expansion — revenue at risk estimated at $1.2M ARR.",
          "Customer-facing messaging will emphasize security and compliance investments ahead of Nov launch.",
        ],
      },
      {
        heading: "Pricing experiment",
        bullets: [
          "Bundled mid-market tier tests whether simplified packaging reduces sales cycle length without eroding ACV.",
          "Jordan to select ten design partners with diverse seat counts and usage profiles.",
        ],
      },
    ],
  },
  {
    id: "standup",
    label: "Standup digest",
    description: "Async update for teams not in the room",
    sections: [
      {
        heading: "Shipped / shipping",
        bullets: [
          "Export hardening on track for Oct 15 GA. On-call automation phase one scoped for November.",
        ],
      },
      {
        heading: "Blockers",
        bullets: [
          "On-call load still averaging 2.3 pages per engineer per week — Marcus driving runbook and paging policy changes.",
        ],
      },
      {
        heading: "Dates",
        bullets: ["Feature freeze Nov 1 · Launch Nov 12 · Pricing experiment kickoff Oct 7."],
      },
    ],
  },
];

const longTranscript = [
  { id: "t-long-001", speakerId: "nina-okonkwo", startSec: 0, endSec: 35, text: "Good morning everyone. Platform roadmap council for Q4 — goal is three bets, explicit tradeoffs, and a launch date we can commit to customers." },
  { id: "t-long-002", speakerId: "elena-vasquez", startSec: 36, endSec: 72, text: "I'll frame product context in two minutes. Enterprise pipeline is strong but security gaps are slowing expansions. Mid-market churn ticked up last month." },
  { id: "t-long-003", speakerId: "sofia-nakamura", startSec: 73, endSec: 108, text: "Churn risk score among mid-market rose 2.3 points — top cited reasons are missing SSO audit logs and unreliable scheduled exports." },
  { id: "t-long-004", speakerId: "jordan-blake", startSec: 109, endSec: 145, text: "Sales feels that daily. Three logos worth about 1.2 million ARR won't expand until audit logs ship. Exports are table stakes in every healthcare deal." },
  { id: "t-long-005", speakerId: "marcus-webb", startSec: 146, endSec: 182, text: "From infra's side, on-call burden is unsustainable — 2.3 pages per engineer per week in September. We can't keep adding features on this foundation." },
  { id: "t-long-006", speakerId: "liam-obrien", startSec: 183, endSec: 218, text: "Agreed. Redis migration and paging policy cleanup need dedicated cycles. Otherwise every launch adds operational debt." },
  { id: "t-long-007", speakerId: "maya-chen", startSec: 219, endSec: 255, text: "Eng teams can absorb some infra work if scope is bounded. Unbounded infra means customer commits slip — auth refactor already traded against dashboard work." },
  { id: "t-long-008", speakerId: "dylan-foster", startSec: 256, endSec: 292, text: "Design is prepped for launch polish — marketing site, in-app empty states, and SSO admin flows. We need freeze dates to sequence review cycles." },
  { id: "t-long-009", speakerId: "nina-okonkwo", startSec: 293, endSec: 328, text: "Let's structure this: prioritization first, infra versus features, churn response, hiring, pricing test, launch date, then on-call closeout." },
  { id: "t-long-010", speakerId: "elena-vasquez", startSec: 329, endSec: 365, text: "Proposed P0 bets: SSO audit logs, scheduled exports hardening, and mobile is out — defer offline mode to Q1." },
  { id: "t-long-011", speakerId: "jordan-blake", startSec: 366, endSec: 402, text: "Sales supports that ordering. Mobile offline was never a enterprise blocker; audit logs are." },
  { id: "t-long-012", speakerId: "marcus-webb", startSec: 403, endSec: 438, text: "I'd add on-call automation phase one as P0 infra — not shiny, but it protects velocity for everything else." },
  { id: "t-long-013", speakerId: "nina-okonkwo", startSec: 439, endSec: 475, text: "So four contenders for three slots. We need a cut. Elena, what's the customer commit if we drop exports hardening?" },
  { id: "t-long-014", speakerId: "elena-vasquez", startSec: 476, endSec: 512, text: "Northstar order form cites Oct 15 export GA. Softening that date kills a renewal expansion — Priya flagged it critical." },
  { id: "t-long-015", speakerId: "sofia-nakamura", startSec: 513, endSec: 548, text: "Data supports keeping exports — manual CSV work correlates with churn in mid-market more than any other feature gap." },
  { id: "t-long-016", speakerId: "nina-okonkwo", startSec: 549, endSec: 585, text: "Exports stay. Mobile offline deferred. Decision one: Q4 product bets are audit logs, exports hardening, and we reserve infra slot for on-call automation." },
  { id: "t-long-017", speakerId: "liam-obrien", startSec: 586, endSec: 622, text: "For exports, load tests need a full week on production-like traffic. Earliest GA still Oct 15 if we start Monday." },
  { id: "t-long-018", speakerId: "maya-chen", startSec: 623, endSec: 658, text: "Auth refactor ships behind flag this sprint — doesn't conflict if we don't pull engineers off exports." },
  { id: "t-long-019", speakerId: "marcus-webb", startSec: 659, endSec: 695, text: "Infra versus features next. I propose capping infra at forty percent of eng capacity in Q4." },
  { id: "t-long-020", speakerId: "elena-vasquez", startSec: 696, endSec: 732, text: "Product can live with forty if on-call automation is in that bucket — otherwise feature teams starve during incidents." },
  { id: "t-long-021", speakerId: "nina-okonkwo", startSec: 733, endSec: 768, text: "Forty percent infra cap — decision two. Maya, does that match team reality?" },
  { id: "t-long-022", speakerId: "maya-chen", startSec: 769, endSec: 805, text: "Yes, if we don't surprise teams with ad-hoc migration work. Liam needs published migration windows." },
  { id: "t-long-023", speakerId: "liam-obrien", startSec: 806, endSec: 842, text: "Redis migration window is Oct 8–10. I'll post runbooks this week and run game day Oct 4." },
  { id: "t-long-024", speakerId: "dylan-foster", startSec: 843, endSec: 878, text: "Design dependency: SSO admin flows need final API shapes by Oct 1 to hit launch polish." },
  { id: "t-long-025", speakerId: "elena-vasquez", startSec: 879, endSec: 915, text: "API freeze for SSO admin Oct 1 — I'll add to the roadmap doc and notify customer-facing teams." },
  { id: "t-long-026", speakerId: "sofia-nakamura", startSec: 916, endSec: 952, text: "Churn deep dive: mid-market accounts without SSO enabled churn at 1.8x baseline. Audit logs are the blocker to SSO rollout." },
  { id: "t-long-027", speakerId: "jordan-blake", startSec: 953, endSec: 988, text: "We should message audit logs as expansion enablers in QBRs — not a roadmap footnote." },
  { id: "t-long-028", speakerId: "nina-okonkwo", startSec: 989, endSec: 1025, text: "Agreed. Decision three: treat SSO audit logs as revenue protection — escalate staffing if estimate slips." },
  { id: "t-long-029", speakerId: "marcus-webb", startSec: 1026, endSec: 1062, text: "Engineering estimate for audit logs is three sprints with two senior backend engineers. Hiring affects that." },
  { id: "t-long-030", speakerId: "maya-chen", startSec: 1063, endSec: 1098, text: "We can reallocate one engineer from internal tools if hiring slips — but that's a Q4 tradeoff everyone should acknowledge." },
  { id: "t-long-031", speakerId: "nina-okonkwo", startSec: 1099, endSec: 1135, text: "Hiring topic — open reqs on the table: two platform SREs and one senior PM for enterprise workflows." },
  { id: "t-long-032", speakerId: "marcus-webb", startSec: 1136, endSec: 1172, text: "SRE reqs are non-negotiable for on-call sustainability. I have candidates in pipeline from my network." },
  { id: "t-long-033", speakerId: "elena-vasquez", startSec: 1173, endSec: 1208, text: "Senior PM for enterprise workflows — Jordan and I co-authored the JD. Focus is export workflows and compliance packaging." },
  { id: "t-long-034", speakerId: "jordan-blake", startSec: 1209, endSec: 1245, text: "Sales needs that PM to translate roadmap into order-form language faster — we're losing cycle time on custom security addenda." },
  { id: "t-long-035", speakerId: "nina-okonkwo", startSec: 1246, endSec: 1282, text: "Decision four: approve all three reqs — two SREs, one senior PM. Recruiting opens reqs next week." },
  { id: "t-long-036", speakerId: "maya-chen", startSec: 1283, endSec: 1318, text: "For eng onboarding, budget six weeks before new hires take on-call rotations — factor that into launch staffing." },
  { id: "t-long-037", speakerId: "liam-obrien", startSec: 1319, endSec: 1355, text: "I'll pair new SREs on Redis migration shadow shifts — good first-week immersion." },
  { id: "t-long-038", speakerId: "dylan-foster", startSec: 1356, endSec: 1392, text: "Design can support PM hire with a compliance UX audit — we've been duct-taping admin flows." },
  { id: "t-long-039", speakerId: "jordan-blake", startSec: 1393, endSec: 1428, text: "Pricing experiment — mid-market tier with bundled seats and usage caps. Hypothesis: simpler packaging shortens sales cycles." },
  { id: "t-long-040", speakerId: "sofia-nakamura", startSec: 1429, endSec: 1465, text: "Modeling suggests ten design partners with diverse usage profiles — I'll identify accounts with stable growth and low support burden." },
  { id: "t-long-041", speakerId: "elena-vasquez", startSec: 1466, endSec: 1502, text: "Product needs guardrails: caps must not block power users who drive expansion. Tiered overage pricing is essential." },
  { id: "t-long-042", speakerId: "nina-okonkwo", startSec: 1503, endSec: 1538, text: "Decision five: run pricing experiment starting Oct 7 with ten design partners. Jordan owns cohort selection with Sofia." },
  { id: "t-long-043", speakerId: "jordan-blake", startSec: 1539, endSec: 1575, text: "I'll have cohort list by Friday — aim for mix of healthcare and fintech, fifty to three hundred seats." },
  { id: "t-long-044", speakerId: "maya-chen", startSec: 1576, endSec: 1612, text: "Eng impact for pricing experiment is mostly billing meter changes — Liam's team estimated five days if specs lock this week." },
  { id: "t-long-045", speakerId: "liam-obrien", startSec: 1613, endSec: 1648, text: "Metering specs need final cap definitions — Elena and Jordan, can you sign off by Wednesday?" },
  { id: "t-long-046", speakerId: "elena-vasquez", startSec: 1649, endSec: 1685, text: "Yes — I'll schedule working session tomorrow afternoon with finance and sales ops." },
  { id: "t-long-047", speakerId: "nina-okonkwo", startSec: 1686, endSec: 1722, text: "Launch date — marketing wants November visibility. What's realistic given freeze and rollout risk?" },
  { id: "t-long-048", speakerId: "dylan-foster", startSec: 1723, endSec: 1758, text: "Creative and web are aligned on Nov 12 public launch — feature freeze Nov 1 gives us review buffer." },
  { id: "t-long-049", speakerId: "marcus-webb", startSec: 1759, endSec: 1795, text: "Infra prefers staged rollout — enterprise tenants first, then mid-market experiment cohort, self-serve last." },
  { id: "t-long-050", speakerId: "liam-obrien", startSec: 1796, endSec: 1832, text: "Staged rollout reduces blast radius. I'd add a week between enterprise GA and mid-market if on-call metrics don't improve." },
  { id: "t-long-051", speakerId: "elena-vasquez", startSec: 1833, endSec: 1868, text: "Product supports staging. Enterprise tenants get white-glove migration support — Priya's team is staffed for that week." },
  { id: "t-long-052", speakerId: "nina-okonkwo", startSec: 1869, endSec: 1905, text: "Decision six: Nov 12 public launch, Nov 1 feature freeze, staged rollout enterprise first." },
  { id: "t-long-053", speakerId: "jordan-blake", startSec: 1906, endSec: 1942, text: "Sales will pre-brief top ten enterprise accounts two weeks out — no surprise breaking changes." },
  { id: "t-long-054", speakerId: "sofia-nakamura", startSec: 1943, endSec: 1978, text: "I'll produce a launch health dashboard: churn risk, export adoption, SSO enablement rate by segment." },
  { id: "t-long-055", speakerId: "maya-chen", startSec: 1979, endSec: 2015, text: "Eng release calendar needs the freeze published — I'll add to #eng-releases and pin through November." },
  { id: "t-long-056", speakerId: "marcus-webb", startSec: 2016, endSec: 2052, text: "On-call burden closeout — root causes are noisy paging policies, missing runbooks, and too many services owned by one rotation." },
  { id: "t-long-057", speakerId: "liam-obrien", startSec: 2053, endSec: 2088, text: "Phase one automation: auto-silence duplicate alerts, runbook links in pages, and weekly on-call retro template." },
  { id: "t-long-058", speakerId: "maya-chen", startSec: 2089, endSec: 2125, text: "Feature teams will participate in runbook sprints — two hours per team per sprint until coverage hits eighty percent." },
  { id: "t-long-059", speakerId: "nina-okonkwo", startSec: 2126, endSec: 2162, text: "If pages per engineer don't drop below 1.5 by Nov 15, we pause non-P0 feature work for a stabilization sprint." },
  { id: "t-long-060", speakerId: "marcus-webb", startSec: 2163, endSec: 2198, text: "Fair. I'll own on-call metrics weekly report to this group through year-end." },
  { id: "t-long-061", speakerId: "elena-vasquez", startSec: 2199, endSec: 2235, text: "Roadmap doc consolidation — I'll publish unified Q4 view by Monday with owners, dates, and explicit deferrals." },
  { id: "t-long-062", speakerId: "dylan-foster", startSec: 2236, endSec: 2272, text: "Design milestones will be a swimlane — SSO admin, export UX polish, launch marketing assets." },
  { id: "t-long-063", speakerId: "jordan-blake", startSec: 2273, endSec: 2308, text: "I'll attach commercial milestones: Northstar export GA, pricing experiment kickoff, enterprise pre-briefs." },
  { id: "t-long-064", speakerId: "sofia-nakamura", startSec: 2309, endSec: 2345, text: "Adding churn and usage metrics as success criteria per bet — not just ship dates." },
  { id: "t-long-065", speakerId: "liam-obrien", startSec: 2346, endSec: 2382, text: "Infra milestones: Redis migration Oct 8–10, game day Oct 4, metering deploy for pricing test by Oct 5." },
  { id: "t-long-066", speakerId: "maya-chen", startSec: 2383, endSec: 2418, text: "Eng capacity view will show the forty percent infra cap per team — transparency prevents silent reallocation." },
  { id: "t-long-067", speakerId: "nina-okonkwo", startSec: 2419, endSec: 2455, text: "Any objections to the three bets plus infra cap we locked earlier? Speak now." },
  { id: "t-long-068", speakerId: "dylan-foster", startSec: 2456, endSec: 2492, text: "Design only asks for forty-eight hour notice on scope cuts — we've been burned by last-minute deferrals." },
  { id: "t-long-069", speakerId: "elena-vasquez", startSec: 2493, endSec: 2528, text: "Committed — product will flag deferrals in council notes within two business days." },
  { id: "t-long-070", speakerId: "jordan-blake", startSec: 2529, endSec: 2565, text: "Sales request: can we get customer-safe language on audit log beta timelines for QBR decks this month?" },
  { id: "t-long-071", speakerId: "elena-vasquez", startSec: 2566, endSec: 2602, text: "Yes — beta read-only by day sixty of Q4, full GA before renewal season peaks. I'll wordsmith with legal." },
  { id: "t-long-072", speakerId: "marcus-webb", startSec: 2603, endSec: 2638, text: "That timeline is tight for infra — depends on SRE hires starting on-call relief by mid-November." },
  { id: "t-long-073", speakerId: "nina-okonkwo", startSec: 2639, endSec: 2675, text: "Recruiting is prioritized. If hires slip, we reallocate as Maya said — but revenue protection comes first." },
  { id: "t-long-074", speakerId: "sofia-nakamura", startSec: 2676, endSec: 2712, text: "Quick pricing experiment note: monitor support ticket volume — bundled caps can confuse admins if UX isn't crisp." },
  { id: "t-long-075", speakerId: "dylan-foster", startSec: 2713, endSec: 2748, text: "I'll add in-app usage meters to design scope for experiment cohort — proactive not reactive." },
  { id: "t-long-076", speakerId: "liam-obrien", startSec: 2749, endSec: 2785, text: "Metering API supports real-time usage display — need design specs by Oct 1 to match SSO freeze." },
  { id: "t-long-077", speakerId: "maya-chen", startSec: 2786, endSec: 2822, text: "Cross-team freeze calendar: Oct 1 API and design, Nov 1 feature, Nov 12 launch. I'll publish today." },
  { id: "t-long-078", speakerId: "jordan-blake", startSec: 2823, endSec: 2858, text: "Commercial calendar aligns — pricing experiment Oct 7, enterprise pre-briefs Oct 28 through Nov 8." },
  { id: "t-long-079", speakerId: "elena-vasquez", startSec: 2859, endSec: 2895, text: "Action recap coming — but first, confirm mobile offline is explicitly deferred to Q1 with no soft commits." },
  { id: "t-long-080", speakerId: "nina-okonkwo", startSec: 2896, endSec: 2932, text: "Confirmed — mobile offline Q1. No sales exceptions without council approval." },
  { id: "t-long-081", speakerId: "marcus-webb", startSec: 2933, endSec: 2968, text: "On-call: paging policy v2 draft goes out Friday — feedback window one week, enforce Nov 1." },
  { id: "t-long-082", speakerId: "liam-obrien", startSec: 2969, endSec: 3005, text: "Game day Oct 4 is mandatory for service owners — calendar invites go out this afternoon." },
  { id: "t-long-083", speakerId: "maya-chen", startSec: 3006, endSec: 3042, text: "Runbook sprint schedule posted in Confluence — teams pick slots by end of week." },
  { id: "t-long-084", speakerId: "sofia-nakamura", startSec: 3043, endSec: 3078, text: "Launch dashboard mock shared in Slack — feedback welcome; metrics tie to churn and adoption goals." },
  { id: "t-long-085", speakerId: "dylan-foster", startSec: 3079, endSec: 3115, text: "Marketing needs final feature list for Nov 12 by Oct 15 — aligns with export GA milestone." },
  { id: "t-long-086", speakerId: "elena-vasquez", startSec: 3116, endSec: 3152, text: "Feature list owner is me — draft Oct 10 after load test results, final Oct 15." },
  { id: "t-long-087", speakerId: "jordan-blake", startSec: 3153, endSec: 3188, text: "I'll socialize pricing experiment to CS leads Friday so support macros are ready Oct 7." },
  { id: "t-long-088", speakerId: "nina-okonkwo", startSec: 3189, endSec: 3225, text: "We're at time — final round. Anything that would block Nov 12 that we haven't surfaced?" },
  { id: "t-long-089", speakerId: "marcus-webb", startSec: 3226, endSec: 3262, text: "Only risk is compounding incidents during Redis migration week — we'll freeze non-critical deploys Oct 8–10." },
  { id: "t-long-090", speakerId: "liam-obrien", startSec: 3263, endSec: 3298, text: "Deploy freeze comms go to all teams today — exceptions require my approval." },
  { id: "t-long-091", speakerId: "nina-okonkwo", startSec: 3299, endSec: 3335, text: "Excellent. Elena publishes roadmap Monday. Marcus owns on-call weekly metrics. Jordan owns pricing cohort. Meeting adjourned." },
  { id: "t-long-092", speakerId: "elena-vasquez", startSec: 3336, endSec: 3372, text: "I'll send notes within two hours — including all six decisions and action owners. Thanks everyone." },
  { id: "t-long-093", speakerId: "maya-chen", startSec: 3373, endSec: 3408, text: "Posting freeze calendar to #eng-releases now so APAC teams see it tomorrow morning." },
  { id: "t-long-094", speakerId: "sofia-nakamura", startSec: 3409, endSec: 3445, text: "Adding churn metrics to the Monday roadmap doc — segment views for enterprise versus mid-market." },
  { id: "t-long-095", speakerId: "jordan-blake", startSec: 3446, endSec: 3482, text: "Cohort list for pricing experiment lands Friday — Sofia and I will review Monday AM." },
  { id: "t-long-096", speakerId: "dylan-foster", startSec: 3483, endSec: 3518, text: "Design review for SSO admin flows scheduled Oct 2 — depends on API freeze holding Oct 1." },
  { id: "t-long-097", speakerId: "marcus-webb", startSec: 3519, endSec: 3555, text: "On-call retro template link in chat — first retro due next Friday." },
  { id: "t-long-098", speakerId: "nina-okonkwo", startSec: 3556, endSec: 3580, text: "Thanks all — strong outcomes today. Let's execute." },
];

const meetingLong: Meeting = {
  id: "m-long",
  slug: "platform-roadmap-council",
  title: "Platform roadmap council — Q4 bets",
  when: "2025-09-24T14:00:00.000Z",
  durationSec: 3600,
  platform: "Microsoft Teams",
  participants: [
    ninaOkonkwo,
    elenaVasquez,
    marcusWebb,
    liamOBrien,
    sofiaNakamura,
    dylanFoster,
    mayaChen,
    jordanBlake,
  ],
  hostId: ninaOkonkwo.id,
  blurb:
    "Executive roadmap council locking Q4 bets, infra capacity, churn response, hiring, pricing experiment, Nov 12 launch, and on-call remediation.",
  tags: ["roadmap", "platform", "q4", "council", "launch", "infra"],
  shareToken: "share-long-mtg",
  media: {
    kind: "audio-demo",
    label: "Demo timeline (capture stubbed)",
    waveSeed: 5093,
  },
  transcript: longTranscript,
  decisions: [
    {
      id: "d-long-01",
      text: "Q4 product bets: SSO audit logs, scheduled exports hardening, and on-call automation phase one as the infra slot.",
      ownerIds: ["elena-vasquez", "marcus-webb"],
      startSec: 549,
      evidenceCueId: "t-long-016",
    },
    {
      id: "d-long-02",
      text: "Cap infrastructure work at 40% of engineering capacity for Q4.",
      ownerIds: ["marcus-webb", "maya-chen"],
      startSec: 733,
      evidenceCueId: "t-long-021",
    },
    {
      id: "d-long-03",
      text: "Treat SSO audit logs as revenue protection — escalate staffing if the estimate slips.",
      ownerIds: ["nina-okonkwo", "elena-vasquez"],
      startSec: 989,
      evidenceCueId: "t-long-028",
    },
    {
      id: "d-long-04",
      text: "Approve hiring: two platform SREs and one senior PM for enterprise workflows.",
      ownerIds: ["nina-okonkwo"],
      startSec: 1246,
      evidenceCueId: "t-long-035",
    },
    {
      id: "d-long-05",
      text: "Run mid-market pricing experiment starting Oct 7 with ten design partners.",
      ownerIds: ["jordan-blake", "sofia-nakamura"],
      startSec: 1503,
      evidenceCueId: "t-long-042",
    },
    {
      id: "d-long-06",
      text: "Public launch Nov 12 with Nov 1 feature freeze and staged rollout — enterprise first.",
      ownerIds: ["nina-okonkwo", "elena-vasquez", "marcus-webb"],
      startSec: 1869,
      evidenceCueId: "t-long-052",
    },
  ],
  actionItems: [
    {
      id: "a-long-01",
      text: "Publish unified Q4 roadmap doc with owners, dates, and deferrals.",
      assigneeId: "elena-vasquez",
      status: "open",
      dueDate: "2025-09-29T17:00:00.000Z",
      startSec: 2199,
      evidenceCueId: "t-long-061",
    },
    {
      id: "a-long-02",
      text: "Post Redis migration runbooks and schedule Oct 4 game day.",
      assigneeId: "liam-obrien",
      status: "doing",
      dueDate: "2025-09-26T17:00:00.000Z",
      startSec: 806,
      evidenceCueId: "t-long-023",
    },
    {
      id: "a-long-03",
      text: "Deliver weekly on-call metrics report through year-end.",
      assigneeId: "marcus-webb",
      status: "doing",
      dueDate: "2025-09-26T12:00:00.000Z",
      startSec: 2163,
      evidenceCueId: "t-long-060",
    },
    {
      id: "a-long-04",
      text: "Select ten design partners for mid-market pricing experiment.",
      assigneeId: "jordan-blake",
      status: "open",
      dueDate: "2025-09-26T17:00:00.000Z",
      startSec: 1539,
      evidenceCueId: "t-long-043",
    },
    {
      id: "a-long-05",
      text: "Sign off metering specs with finance and sales ops.",
      assigneeId: "elena-vasquez",
      status: "open",
      dueDate: "2025-09-25T18:00:00.000Z",
      startSec: 1649,
      evidenceCueId: "t-long-046",
    },
    {
      id: "a-long-06",
      text: "Publish eng freeze calendar to #eng-releases.",
      assigneeId: "maya-chen",
      status: "done",
      dueDate: "2025-09-24T20:00:00.000Z",
      startSec: 2786,
      evidenceCueId: "t-long-077",
    },
    {
      id: "a-long-07",
      text: "Build launch health dashboard for churn, exports, and SSO adoption.",
      assigneeId: "sofia-nakamura",
      status: "doing",
      dueDate: "2025-10-01T17:00:00.000Z",
      startSec: 1943,
      evidenceCueId: "t-long-054",
    },
    {
      id: "a-long-08",
      text: "Draft paging policy v2 and open one-week feedback window.",
      assigneeId: "marcus-webb",
      status: "open",
      dueDate: "2025-09-26T17:00:00.000Z",
      startSec: 2933,
      evidenceCueId: "t-long-081",
    },
    {
      id: "a-long-09",
      text: "Finalize Nov 12 marketing feature list after export load tests.",
      assigneeId: "elena-vasquez",
      status: "open",
      dueDate: "2025-10-15T17:00:00.000Z",
      startSec: 3116,
      evidenceCueId: "t-long-086",
    },
    {
      id: "a-long-10",
      text: "Add in-app usage meters to design scope for pricing experiment cohort.",
      assigneeId: "dylan-foster",
      status: "open",
      dueDate: "2025-10-01T17:00:00.000Z",
      startSec: 2713,
      evidenceCueId: "t-long-075",
    },
  ],
  highlights: [
    {
      id: "h-long-01",
      type: "decision",
      title: "Three Q4 bets locked: audit logs, exports, on-call automation",
      startSec: 549,
      endSec: 585,
      cueIds: ["t-long-016"],
      shareToken: "clip-long-01",
    },
    {
      id: "h-long-02",
      type: "risk",
      title: "On-call averaging 2.3 pages per engineer per week",
      startSec: 146,
      endSec: 182,
      cueIds: ["t-long-005"],
      shareToken: "clip-long-02",
    },
    {
      id: "h-long-03",
      type: "insight",
      title: "Mid-market churn risk up 2.3 points — audit logs and exports cited",
      startSec: 73,
      endSec: 108,
      cueIds: ["t-long-003"],
      shareToken: "clip-long-03",
    },
    {
      id: "h-long-04",
      type: "decision",
      title: "Nov 12 launch with Nov 1 freeze and staged enterprise rollout",
      startSec: 1869,
      endSec: 1905,
      cueIds: ["t-long-052"],
      shareToken: "clip-long-04",
    },
    {
      id: "h-long-05",
      type: "quote",
      title: "If pages don't drop below 1.5 by Nov 15, pause non-P0 features",
      startSec: 2126,
      endSec: 2162,
      cueIds: ["t-long-059"],
      shareToken: "clip-long-05",
    },
    {
      id: "h-long-06",
      type: "demo",
      title: "Staged rollout plan — enterprise first, mid-market second",
      startSec: 1759,
      endSec: 1832,
      cueIds: ["t-long-049", "t-long-050"],
      shareToken: "clip-long-06",
    },
  ],
  summaries: longSummaries,
  defaultTemplateId: "decisions",
};

export const meetings: Meeting[] = [meetingShort, meetingMedium, meetingLong];

export function getMeetingById(id: string): Meeting | undefined {
  return meetings.find((m) => m.id === id);
}

export function getMeetingByShareToken(token: string): Meeting | undefined {
  return meetings.find((m) => m.shareToken === token);
}

export function getHighlightByShareToken(
  token: string,
): { meeting: Meeting; highlight: Highlight } | undefined {
  for (const meeting of meetings) {
    const highlight = meeting.highlights.find((h) => h.shareToken === token);
    if (highlight) {
      return { meeting, highlight };
    }
  }
  return undefined;
}

function snippetAround(text: string, query: string, radius = 60): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) {
    return text.slice(0, radius * 2);
  }
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

export function searchMeetings(query: string): SearchResult[] {
  const q = query.trim();
  if (!q) {
    return [];
  }

  const lower = q.toLowerCase();
  const results: SearchResult[] = [];

  for (const meeting of meetings) {
    if (meeting.title.toLowerCase().includes(lower)) {
      results.push({
        meetingId: meeting.id,
        meetingTitle: meeting.title,
        kind: "highlight",
        id: `title-${meeting.id}`,
        snippet: meeting.title,
        startSec: 0,
      });
    }

    if (meeting.blurb.toLowerCase().includes(lower)) {
      results.push({
        meetingId: meeting.id,
        meetingTitle: meeting.title,
        kind: "highlight",
        id: `blurb-${meeting.id}`,
        snippet: snippetAround(meeting.blurb, q),
        startSec: 0,
      });
    }

    for (const tag of meeting.tags) {
      if (tag.toLowerCase().includes(lower)) {
        results.push({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          kind: "highlight",
          id: `tag-${meeting.id}-${tag}`,
          snippet: tag,
          startSec: 0,
        });
      }
    }

    for (const cue of meeting.transcript) {
      if (cue.text.toLowerCase().includes(lower)) {
        const speaker = getPersonById(cue.speakerId);
        results.push({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          kind: "transcript",
          id: cue.id,
          snippet: snippetAround(cue.text, q),
          startSec: cue.startSec,
          speakerName: speaker?.name,
        });
      }
    }

    for (const decision of meeting.decisions) {
      if (decision.text.toLowerCase().includes(lower)) {
        results.push({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          kind: "decision",
          id: decision.id,
          snippet: snippetAround(decision.text, q),
          startSec: decision.startSec,
        });
      }
    }

    for (const action of meeting.actionItems) {
      if (action.text.toLowerCase().includes(lower)) {
        results.push({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          kind: "action",
          id: action.id,
          snippet: snippetAround(action.text, q),
          startSec: action.startSec,
        });
      }
    }

    for (const highlight of meeting.highlights) {
      if (highlight.title.toLowerCase().includes(lower)) {
        results.push({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          kind: "highlight",
          id: highlight.id,
          snippet: highlight.title,
          startSec: highlight.startSec,
        });
      }
    }
  }

  results.sort((a, b) => {
    const aTitle = a.id.startsWith("title-");
    const bTitle = b.id.startsWith("title-");
    if (aTitle && !bTitle) return -1;
    if (!aTitle && bTitle) return 1;
    if (a.startSec !== b.startSec) return a.startSec - b.startSec;
    return a.meetingId.localeCompare(b.meetingId);
  });

  return results.slice(0, 40);
}
