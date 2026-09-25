"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { formatClock, formatDuration, formatWhen, formatDue } from "@/lib/format";
import type {
  Meeting,
  ActionStatus,
  ActionItem,
  SummaryTemplateId,
  Highlight,
} from "@/lib/types";
import { getPersonById } from "@/data/people";
import { Avatar } from "@/components/Avatar";
import { PlaybackBar } from "@/components/PlaybackBar";
import { ShareModal } from "@/components/ShareModal";
import { usePlayback } from "@/lib/usePlayback";

interface MeetingWorkspaceProps {
  meeting: Meeting;
  initialTimeSec?: number;
  initialCueId?: string;
}

export function MeetingWorkspace({
  meeting,
  initialTimeSec = 0,
  initialCueId,
}: MeetingWorkspaceProps) {
  // Playback engine
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

  // State management
  const [selectedTemplateId, setSelectedTemplateId] = useState<SummaryTemplateId>(
    meeting.defaultTemplateId || "general"
  );
  const [mainTab, setMainTab] = useState<"summary" | "transcript">("summary");
  const [outcomesTab, setOutcomesTab] = useState<"decisions" | "actions" | "highlights">("decisions");
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [actionItems, setActionItems] = useState<ActionItem[]>(meeting.actionItems);
  const [actionFilter, setActionFilter] = useState<"all" | "open" | "done">("all");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareClip, setShareClip] = useState<Highlight | undefined>(undefined);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [highlightedCueId, setHighlightedCueId] = useState<string | null>(
    initialCueId || null
  );

  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial cue or time seek on mount
  useEffect(() => {
    if (initialTimeSec > 0) {
      seekTo(initialTimeSec);
    }
    if (initialCueId) {
      setHighlightedCueId(initialCueId);
      setMainTab("transcript");
    }
  }, [initialTimeSec, initialCueId, seekTo]);

  // Auto-scroll active cue into view during live playback when in transcript view
  useEffect(() => {
    if (isPlaying && activeCue && mainTab === "transcript") {
      const el = document.getElementById(activeCue.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeCue, isPlaying, mainTab]);

  // Jump to cue helper
  const jumpToCue = (startSec: number, cueId?: string) => {
    seekTo(startSec);
    if (cueId) {
      setHighlightedCueId(cueId);
    }
    setMainTab("transcript");

    // Scroll cue into view
    setTimeout(() => {
      const el = document.getElementById(cueId || `cue-${startSec}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Toggle action item completion status interactively
  const handleToggleActionStatus = (actionId: string) => {
    setActionItems((prev) =>
      prev.map((item) => {
        if (item.id === actionId) {
          const nextStatus: ActionStatus =
            item.status === "done" ? "open" : "done";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Active summary template
  const currentSummary = useMemo(() => {
    return (
      meeting.summaries.find((s) => s.id === selectedTemplateId) ||
      meeting.summaries[0]
    );
  }, [meeting.summaries, selectedTemplateId]);

  // Copy summary to clipboard
  const handleCopySummary = () => {
    if (!currentSummary) return;
    const text = currentSummary.sections
      .map((sec) => `${sec.heading}\n${sec.bullets.map((b) => `• ${b}`).join("\n")}`)
      .join("\n\n");
    navigator.clipboard.writeText(`${meeting.title} — Summary\n\n${text}`);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Filtered transcript cues
  const filteredTranscript = useMemo(() => {
    if (!transcriptSearch.trim()) return meeting.transcript;
    const q = transcriptSearch.toLowerCase();
    return meeting.transcript.filter((cue) => {
      const speaker = getPersonById(cue.speakerId);
      return (
        cue.text.toLowerCase().includes(q) ||
        (speaker && speaker.name.toLowerCase().includes(q))
      );
    });
  }, [meeting.transcript, transcriptSearch]);

  // Filtered action items
  const filteredActionItems = useMemo(() => {
    if (actionFilter === "open") {
      return actionItems.filter((a) => a.status !== "done");
    }
    if (actionFilter === "done") {
      return actionItems.filter((a) => a.status === "done");
    }
    return actionItems;
  }, [actionItems, actionFilter]);

  const openActionCount = actionItems.filter((a) => a.status !== "done").length;
  const doneActionCount = actionItems.filter((a) => a.status === "done").length;

  return (
    <div className="mx-auto max-w-[1536px] px-4 py-6 md:px-8">
      {/* Workspace Header */}
      <div className="mb-6 rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1 font-semibold text-[var(--accent)]">
                {meeting.platform}
              </span>
              <span className="text-[var(--ink-muted)]">•</span>
              <span className="text-[var(--ink-muted)]">{formatWhen(meeting.when)}</span>
              <span className="text-[var(--ink-muted)]">•</span>
              <span className="font-[family-name:var(--font-mono)] text-[var(--ink-muted)]">
                {formatDuration(meeting.durationSec)}
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
              {meeting.title}
            </h1>

            <p className="text-sm text-[var(--ink-muted)] max-w-3xl">
              {meeting.blurb}
            </p>

            {/* Participants & Tags */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider mr-1">
                  Attendees:
                </span>
                <div className="flex -space-x-1.5 overflow-hidden">
                  {meeting.participants.map((person) => (
                    <Avatar key={person.id} person={person} size="sm" />
                  ))}
                </div>
                <span className="text-xs text-[var(--ink-muted)] ml-1">
                  ({meeting.participants.length})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {meeting.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--bg)] px-2.5 py-0.5 text-[11px] text-[var(--ink-muted)] border border-[var(--line)]/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3.5 py-2 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--bg)] active:scale-95"
            >
              <svg className="h-4 w-4 text-[var(--ink-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              {copiedSummary ? "Copied Summary!" : "Copy Summary"}
            </button>

            <button
              onClick={() => {
                setShareClip(undefined);
                setShareModalOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-medium text-white shadow-xs transition hover:opacity-90 active:scale-95"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share Call & Clips
            </button>
          </div>
        </div>
      </div>

      {/* Playback Control Bar */}
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
        className="mb-6"
      />

      {/* Main Workspace Grid (Left: Main Pane, Right: Outcomes Rail) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Section: Summary & Transcript (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-5 shadow-sm min-h-[600px]">
          {/* Tabs for Main Section */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMainTab("summary")}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  mainTab === "summary"
                    ? "bg-[var(--accent)] text-white shadow-xs"
                    : "text-[var(--ink-muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]"
                }`}
              >
                AI Summary
              </button>
              <button
                onClick={() => setMainTab("transcript")}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  mainTab === "transcript"
                    ? "bg-[var(--accent)] text-white shadow-xs"
                    : "text-[var(--ink-muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]"
                }`}
              >
                Transcript ({meeting.transcript.length})
              </button>
            </div>

            {/* Template Switcher dropdown when in Summary view */}
            {mainTab === "summary" && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--ink-muted)] hidden sm:inline">
                  Template:
                </span>
                <select
                  value={selectedTemplateId}
                  onChange={(e) =>
                    setSelectedTemplateId(e.target.value as SummaryTemplateId)
                  }
                  className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1 text-xs font-medium text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  {meeting.summaries.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Summary Tab Content */}
          {mainTab === "summary" && currentSummary && (
            <div className="space-y-6 flex-1 tl-rise">
              <div className="rounded-xl bg-[var(--accent-soft)]/50 border border-[var(--accent)]/30 p-3.5">
                <p className="text-xs font-medium text-[var(--accent)]">
                  <span className="font-bold">{currentSummary.label}:</span>{" "}
                  {currentSummary.description}
                </p>
              </div>

              {currentSummary.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2.5">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {sec.heading}
                  </h3>
                  <ul className="space-y-2 pl-4 text-xs text-[var(--ink)] leading-relaxed list-disc marker:text-[var(--accent)]">
                    {sec.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Transcript Tab Content */}
          {mainTab === "transcript" && (
            <div className="flex flex-col flex-1 space-y-4">
              {/* Transcript Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inside transcript..."
                  value={transcriptSearch}
                  onChange={(e) => setTranscriptSearch(e.target.value)}
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2 pl-9 text-xs text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-[var(--ink-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Cue List */}
              <div
                ref={transcriptContainerRef}
                className="flex-1 space-y-3 overflow-y-auto max-h-[550px] pr-2"
              >
                {filteredTranscript.map((cue) => {
                  const speaker = getPersonById(cue.speakerId);
                  const isActive = activeCue?.id === cue.id;
                  const isHighlighted = highlightedCueId === cue.id;

                  return (
                    <div
                      key={cue.id}
                      id={cue.id}
                      onClick={() => jumpToCue(cue.startSec, cue.id)}
                      className={`group flex items-start gap-3 rounded-xl border p-3 text-xs transition cursor-pointer ${
                        isActive
                          ? "border-[var(--accent)] bg-[var(--accent-soft)]/60 shadow-xs ring-1 ring-[var(--accent)]"
                          : isHighlighted
                          ? "border-[var(--accent-2)] bg-[var(--accent-soft)]/30"
                          : "border-[var(--line)]/50 bg-[var(--bg)]/50 hover:border-[var(--line)] hover:bg-[var(--bg)]"
                      }`}
                    >
                      <Avatar person={speaker} size="sm" className="mt-0.5 shrink-0" />

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[var(--ink)]">
                            {speaker?.name || cue.speakerId}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              jumpToCue(cue.startSec, cue.id);
                            }}
                            className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:underline"
                          >
                            {formatClock(cue.startSec)}
                          </button>
                        </div>
                        <p className="text-[var(--ink)] leading-relaxed">{cue.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Outcomes Rail (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Outcomes Rail Box */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-5 shadow-sm min-h-[600px] flex flex-col">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] flex items-center gap-2">
                Outcomes & Commitments
              </h2>

              <div className="flex items-center gap-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-0.5">
                <button
                  onClick={() => setOutcomesTab("decisions")}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                    outcomesTab === "decisions"
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  Decisions ({meeting.decisions.length})
                </button>
                <button
                  onClick={() => setOutcomesTab("actions")}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                    outcomesTab === "actions"
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  Actions ({actionItems.length})
                </button>
                <button
                  onClick={() => setOutcomesTab("highlights")}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                    outcomesTab === "highlights"
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  Clips ({meeting.highlights.length})
                </button>
              </div>
            </div>

            {/* Decisions List View */}
            {outcomesTab === "decisions" && (
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1 tl-rise">
                <p className="text-xs text-[var(--ink-muted)] mb-3">
                  Explicit calls made during the meeting with owners and timestamp proof.
                </p>

                {meeting.decisions.map((dec) => {
                  const owners = dec.ownerIds
                    .map((id) => getPersonById(id))
                    .filter(Boolean);

                  return (
                    <div
                      key={dec.id}
                      className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-soft)]/20 p-3.5 text-xs transition hover:border-[var(--accent)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-[var(--ink)] leading-relaxed">
                          {dec.text}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-3 mt-2 border-t border-[var(--line)]/50">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-semibold text-[var(--ink-muted)]">
                            Owners:
                          </span>
                          <div className="flex -space-x-1">
                            {owners.map((p) => (
                              <Avatar key={p?.id} person={p} size="sm" />
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => jumpToCue(dec.startSec, dec.evidenceCueId)}
                          className="flex items-center gap-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[var(--accent)] hover:underline"
                        >
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          {formatClock(dec.startSec)} jump to source
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action Items List View */}
            {outcomesTab === "actions" && (
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1 tl-rise">
                {/* Status Filter */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActionFilter("all")}
                      className={`text-xs font-medium ${
                        actionFilter === "all"
                          ? "font-bold text-[var(--accent)] underline"
                          : "text-[var(--ink-muted)]"
                      }`}
                    >
                      All ({actionItems.length})
                    </button>
                    <button
                      onClick={() => setActionFilter("open")}
                      className={`text-xs font-medium ${
                        actionFilter === "open"
                          ? "font-bold text-[var(--accent)] underline"
                          : "text-[var(--ink-muted)]"
                      }`}
                    >
                      Open ({openActionCount})
                    </button>
                    <button
                      onClick={() => setActionFilter("done")}
                      className={`text-xs font-medium ${
                        actionFilter === "done"
                          ? "font-bold text-[var(--accent)] underline"
                          : "text-[var(--ink-muted)]"
                      }`}
                    >
                      Done ({doneActionCount})
                    </button>
                  </div>
                  <span className="text-[11px] text-[var(--ink-muted)]">
                    Interactive checkboxes
                  </span>
                </div>

                {filteredActionItems.map((action) => {
                  const assignee = getPersonById(action.assigneeId);
                  const isDone = action.status === "done";

                  return (
                    <div
                      key={action.id}
                      className={`flex flex-col gap-2 rounded-xl border p-3.5 text-xs transition ${
                        isDone
                          ? "border-[var(--line)]/50 bg-[var(--bg)]/40 opacity-70"
                          : "border-[var(--line)] bg-[var(--panel)] hover:border-[var(--accent)]"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => handleToggleActionStatus(action.id)}
                          className="mt-0.5 h-4 w-4 rounded-xs border-[var(--line)] text-[var(--accent)] focus:ring-[var(--accent)] cursor-pointer"
                        />
                        <span
                          className={`flex-1 leading-relaxed ${
                            isDone
                              ? "line-through text-[var(--ink-muted)]"
                              : "text-[var(--ink)] font-medium"
                          }`}
                        >
                          {action.text}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line)]/40 mt-1">
                        <div className="flex items-center gap-2">
                          <Avatar person={assignee} size="sm" />
                          <span className="text-[11px] text-[var(--ink-muted)] font-medium">
                            {assignee?.name}
                          </span>
                          {action.dueDate && (
                            <span className="rounded-md bg-[var(--bg)] px-2 py-0.5 text-[10px] text-[var(--ink-muted)] border border-[var(--line)]">
                              Due {formatDue(action.dueDate)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => jumpToCue(action.startSec, action.evidenceCueId)}
                          className="flex items-center gap-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[var(--accent)] hover:underline"
                        >
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          {formatClock(action.startSec)} jump
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Highlights / Clips View */}
            {outcomesTab === "highlights" && (
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1 tl-rise">
                <p className="text-xs text-[var(--ink-muted)] mb-3">
                  Shareable audio clips and key moments extracted from the transcript.
                </p>

                {meeting.highlights.map((h) => (
                  <div
                    key={h.id}
                    className="flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3.5 text-xs transition hover:border-[var(--accent)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[var(--ink)]">{h.title}</span>
                      <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--accent)] uppercase">
                        {h.type}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--line)]/40">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-muted)]">
                        {formatClock(h.startSec)} – {formatClock(h.endSec)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => jumpToCue(h.startSec, h.cueIds[0])}
                          className="rounded-lg bg-[var(--accent)] px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90"
                        >
                          Play Clip
                        </button>
                        <button
                          onClick={() => {
                            setShareClip(h);
                            setShareModalOpen(true);
                          }}
                          className="rounded-lg border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--ink)] hover:bg-[var(--panel)]"
                        >
                          Share Clip
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        meeting={meeting}
        initialClip={shareClip}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}
