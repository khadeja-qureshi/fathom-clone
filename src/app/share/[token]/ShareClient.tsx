"use client";

import { useState } from "react";
import Link from "next/link";
import { formatClock, formatDuration, formatWhen } from "@/lib/format";
import type { Meeting, Highlight } from "@/lib/types";
import { Avatar } from "@/components/Avatar";
import { PlaybackBar } from "@/components/PlaybackBar";
import { getPersonById } from "@/data/people";
import { usePlayback } from "@/lib/usePlayback";

interface ShareClientProps {
  meeting: Meeting;
  highlight?: Highlight;
}

export function ShareClient({ meeting, highlight }: ShareClientProps) {
  const initialTimeSec = highlight ? highlight.startSec : 0;

  const {
    currentTimeSec,
    isPlaying,
    playbackRate,
    activeCue,
    seekTo,
    togglePlay,
    setPlaybackRate,
  } = usePlayback({
    durationSec: meeting.durationSec,
    transcript: meeting.transcript,
    initialTimeSec,
  });

  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-8 md:px-8 space-y-6">
      {/* Public View Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/40 p-4 text-xs">
        <div className="flex items-center gap-2 text-[var(--accent)]">
          <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-semibold">Public Shared {highlight ? "Clip" : "Meeting"} View</span>
          <span className="text-[var(--ink-muted)]">•</span>
          <span className="text-[var(--ink-muted)]">No login required</span>
        </div>

        <button
          onClick={handleCopyLink}
          className="rounded-lg bg-[var(--accent)] px-3 py-1.5 font-medium text-white shadow-xs hover:opacity-90 active:scale-95"
        >
          {copiedLink ? "Link Copied!" : "Copy Public Link"}
        </button>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel-2)] p-6 md:p-8 shadow-sm space-y-6">
        {/* Title Section */}
        <div className="space-y-2 border-b border-[var(--line)] pb-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-2.5 py-0.5 font-bold text-[var(--accent)]">
              {meeting.platform}
            </span>
            <span className="text-[var(--ink-muted)]">•</span>
            <span className="text-[var(--ink-muted)]">{formatWhen(meeting.when)}</span>
            <span className="text-[var(--ink-muted)]">•</span>
            <span className="font-[family-name:var(--font-mono)] text-[var(--ink-muted)]">
              {formatDuration(meeting.durationSec)}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            {meeting.title}
          </h1>

          {highlight && (
            <div className="mt-3 rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)]/50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                  Shared Clip: {highlight.type}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--ink-muted)]">
                  {formatClock(highlight.startSec)} – {formatClock(highlight.endSec)}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-[var(--ink)]">
                &ldquo;{highlight.title}&rdquo;
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-[var(--ink-muted)] uppercase">
              Participants:
            </span>
            <div className="flex -space-x-1">
              {meeting.participants.map((p) => (
                <Avatar key={p.id} person={p} size="sm" />
              ))}
            </div>
            <span className="text-xs text-[var(--ink-muted)] ml-1">
              ({meeting.participants.map((p) => p.name).join(", ")})
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <PlaybackBar
          durationSec={meeting.durationSec}
          currentTimeSec={currentTimeSec}
          isPlaying={isPlaying}
          playbackRate={playbackRate}
          activeCue={activeCue}
          waveSeed={meeting.media.waveSeed}
          onSeek={seekTo}
          onTogglePlay={togglePlay}
          onChangeRate={setPlaybackRate}
        />

        {/* Decisions Summary section in shared view */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-2">
          {/* Decisions */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
              Key Decisions Locked ({meeting.decisions.length})
            </h2>
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {meeting.decisions.map((dec) => (
                <div
                  key={dec.id}
                  className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/20 p-3 text-xs"
                >
                  <p className="font-medium text-[var(--ink)] leading-relaxed">{dec.text}</p>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[var(--line)]/40">
                    <button
                      onClick={() => seekTo(dec.startSec)}
                      className="font-[family-name:var(--font-mono)] text-[10px] font-bold text-[var(--accent)] hover:underline"
                    >
                      {formatClock(dec.startSec)} jump
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transcript segment / preview */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
              Transcript
            </h2>
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {meeting.transcript.map((cue) => {
                const speaker = getPersonById(cue.speakerId);
                const isActive = activeCue?.id === cue.id;

                return (
                  <div
                    key={cue.id}
                    onClick={() => seekTo(cue.startSec)}
                    className={`rounded-xl border p-2.5 text-xs transition cursor-pointer ${
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent-soft)]/60 font-medium"
                        : "border-[var(--line)]/50 bg-[var(--bg)]/50 hover:border-[var(--line)]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--ink-muted)] mb-1">
                      <span>{speaker?.name || cue.speakerId}</span>
                      <span className="font-[family-name:var(--font-mono)]">{formatClock(cue.startSec)}</span>
                    </div>
                    <p className="text-[var(--ink)]">{cue.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Link to Full Workspace */}
        <div className="flex justify-end pt-4 border-t border-[var(--line)]">
          <Link
            href={`/m/${meeting.id}`}
            className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:opacity-90"
          >
            Open Full Interactive Workspace →
          </Link>
        </div>
      </div>
    </div>
  );
}
