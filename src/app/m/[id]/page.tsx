import { notFound } from "next/navigation";
import { getMeetingById, meetings } from "@/data/meetings";
import { MeetingWorkspace } from "./MeetingWorkspace";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string; cue?: string }>;
}

export async function generateStaticParams() {
  return meetings.map((m) => ({
    id: m.id,
  }));
}

export default async function MeetingPage({
  params,
  searchParams,
}: MeetingPageProps) {
  const { id } = await params;
  const { t, cue } = await searchParams;

  // Find meeting by ID or slug
  const meeting =
    getMeetingById(id) || meetings.find((m) => m.slug === id);

  if (!meeting) {
    notFound();
  }

  const initialTimeSec = t ? parseInt(t, 10) || 0 : 0;

  return (
    <MeetingWorkspace
      meeting={meeting}
      initialTimeSec={initialTimeSec}
      initialCueId={cue}
    />
  );
}
