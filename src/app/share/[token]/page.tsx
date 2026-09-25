import { notFound } from "next/navigation";
import {
  getMeetingByShareToken,
  getHighlightByShareToken,
  meetings,
} from "@/data/meetings";
import { ShareClient } from "./ShareClient";

interface SharePageProps {
  params: Promise<{ token: string }>;
}

export async function generateStaticParams() {
  const params: { token: string }[] = [];

  meetings.forEach((m) => {
    params.push({ token: m.shareToken });
    m.highlights.forEach((h) => {
      params.push({ token: h.shareToken });
    });
  });

  return params;
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;

  // Check if token matches a full meeting
  const meeting = getMeetingByShareToken(token);
  if (meeting) {
    return <ShareClient meeting={meeting} />;
  }

  // Check if token matches a highlight clip
  const clipMatch = getHighlightByShareToken(token);
  if (clipMatch) {
    return <ShareClient meeting={clipMatch.meeting} highlight={clipMatch.highlight} />;
  }

  notFound();
}
