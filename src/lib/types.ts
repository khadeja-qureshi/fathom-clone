export type ActionStatus = "open" | "doing" | "done";

export type HighlightType =
  | "decision"
  | "risk"
  | "insight"
  | "quote"
  | "demo";

export type SummaryTemplateId =
  | "general"
  | "decisions"
  | "customer"
  | "standup";

export interface Person {
  id: string;
  name: string;
  email: string;
  role?: string;
  initials: string;
  color: string;
}

export interface TranscriptCue {
  id: string;
  speakerId: string;
  startSec: number;
  endSec: number;
  text: string;
}

export interface Decision {
  id: string;
  text: string;
  ownerIds: string[];
  startSec: number;
  evidenceCueId: string;
}

export interface ActionItem {
  id: string;
  text: string;
  assigneeId: string;
  status: ActionStatus;
  dueDate: string | null;
  startSec: number;
  evidenceCueId: string;
}

export interface Highlight {
  id: string;
  type: HighlightType;
  title: string;
  startSec: number;
  endSec: number;
  cueIds: string[];
  shareToken: string;
}

export interface SummarySection {
  heading: string;
  bullets: string[];
}

export interface SummaryTemplate {
  id: SummaryTemplateId;
  label: string;
  description: string;
  sections: SummarySection[];
}

export interface Meeting {
  id: string;
  slug: string;
  title: string;
  when: string;
  durationSec: number;
  platform: "Zoom" | "Google Meet" | "Microsoft Teams";
  participants: Person[];
  hostId: string;
  blurb: string;
  tags: string[];
  shareToken: string;
  media: {
    kind: "audio-demo";
    label: string;
    /** Synthetic waveform seed for demo player */
    waveSeed: number;
  };
  transcript: TranscriptCue[];
  decisions: Decision[];
  actionItems: ActionItem[];
  highlights: Highlight[];
  summaries: SummaryTemplate[];
  defaultTemplateId: SummaryTemplateId;
}
