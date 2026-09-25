"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { formatClock, formatDuration, formatWhen } from "@/lib/format";
import type { Meeting } from "@/lib/types";
import { Avatar } from "@/components/Avatar";
import { getPersonById } from "@/data/people";

interface MeetingsLibraryProps {
  meetings: Meeting[];
}

export function MeetingsLibrary({ meetings }: MeetingsLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedParticipant, setSelectedParticipant] = useState<string>("all");

  // Collect all unique tags and participants across meetings
  const { allTags, allParticipants } = useMemo(() => {
    const tagSet = new Set<string>();
    const personMap = new Map<string, string>();

    meetings.forEach((m) => {
      m.tags.forEach((t) => tagSet.add(t));
      m.participants.forEach((p) => personMap.set(p.id, p.name));
    });

    return {
      allTags: Array.from(tagSet),
      allParticipants: Array.from(personMap.entries()),
    };
  }, [meetings]);

  // Overall metrics
  const metrics = useMemo(() => {
    let decisionsCount = 0;
    let totalActions = 0;
    let openActions = 0;
    let totalDuration = 0;

    meetings.forEach((m) => {
      decisionsCount += m.decisions.length;
      totalActions += m.actionItems.length;
      openActions += m.actionItems.filter((a) => a.status !== "done").length;
      totalDuration += m.durationSec;
    });

    return {
      totalMeetings: meetings.length,
      decisionsCount,
      totalActions,
      openActions,
      totalDuration,
    };
  }, [meetings]);

  // Filtered meetings list
  const filteredMeetings = useMemo(() => {
    return meetings.filter((m) => {
      // Tag filter
      if (selectedTag !== "all" && !m.tags.includes(selectedTag)) {
        return false;
      }
      // Participant filter
      if (
        selectedParticipant !== "all" &&
        !m.participants.some((p) => p.id === selectedParticipant)
      ) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = m.title.toLowerCase().includes(q);
        const inBlurb = m.blurb.toLowerCase().includes(q);
        const inTags = m.tags.some((t) => t.toLowerCase().includes(q));
        const inTranscript = m.transcript.some((cue) =>
          cue.text.toLowerCase().includes(q)
        );
        const inDecisions = m.decisions.some((d) =>
          d.text.toLowerCase().includes(q)
        );
        if (!inTitle && !inBlurb && !inTags && !inTranscript && !inDecisions) {
          return false;
        }
      }
      return true;
    });
  }, [meetings, selectedTag, selectedParticipant, searchQuery]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel-2)] p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Post-Call Decisions & Follow-Through Workspace
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            Where meeting conversations convert into commitments.
          </h1>

          <p className="text-sm md:text-base text-[var(--ink-muted)] leading-relaxed">
            Throughline connects playback, speaker-attributed transcripts, summary templates, explicit decisions, and interactive action items with jump-to-source evidence.
          </p>
        </div>

        {/* Global Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--line)]/60 pt-6 sm:grid-cols-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Meetings
            </span>
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
              {metrics.totalMeetings}
            </div>
            <p className="text-[11px] text-[var(--ink-muted)]">Short, medium, long</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Decisions Locked
            </span>
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent)]">
              {metrics.decisionsCount}
            </div>
            <p className="text-[11px] text-[var(--ink-muted)]">With timestamp proof</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Action Items
            </span>
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
              {metrics.openActions}{" "}
              <span className="text-xs font-normal text-[var(--ink-muted)]">
                open / {metrics.totalActions} total
              </span>
            </div>
            <p className="text-[11px] text-[var(--ink-muted)]">Assigned & trackable</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Recorded
            </span>
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
              {formatDuration(metrics.totalDuration)}
            </div>
            <p className="text-[11px] text-[var(--ink-muted)]">Synthesized transcript</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-4 shadow-2xs md:flex-row md:items-center md:justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search meetings, decisions, or transcripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--ink-muted)] font-medium">Tag:</span>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1.5 font-medium text-[var(--ink)] focus:outline-none"
            >
              <option value="all">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[var(--ink-muted)] font-medium">Participant:</span>
            <select
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
              className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1.5 font-medium text-[var(--ink)] focus:outline-none"
            >
              <option value="all">All Attendees</option>
              {allParticipants.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {(selectedTag !== "all" ||
            selectedParticipant !== "all" ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedTag("all");
                setSelectedParticipant("all");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Meetings List Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
            Seeded Meetings Library
          </h2>
          <span className="text-xs text-[var(--ink-muted)] font-medium">
            Showing {filteredMeetings.length} of {meetings.length} calls
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {filteredMeetings.map((meeting) => {
            const openActions = meeting.actionItems.filter(
              (a) => a.status !== "done"
            ).length;

            return (
              <div
                key={meeting.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-6 shadow-xs transition hover:border-[var(--accent)] hover:shadow-md"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-2.5 py-0.5 font-semibold text-[var(--accent)]">
                        {meeting.platform}
                      </span>
                      <span className="text-[var(--ink-muted)]">•</span>
                      <span className="text-[var(--ink-muted)]">
                        {formatWhen(meeting.when)}
                      </span>
                      <span className="text-[var(--ink-muted)]">•</span>
                      <span className="font-[family-name:var(--font-mono)] text-[var(--ink-muted)] font-medium">
                        {formatDuration(meeting.durationSec)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[var(--accent-soft)] px-3 py-0.5 text-xs font-bold text-[var(--accent)] border border-[var(--accent)]/30">
                        {meeting.decisions.length} Decisions
                      </span>
                      <span className="rounded-full bg-[var(--bg)] px-3 py-0.5 text-xs font-medium text-[var(--ink-muted)] border border-[var(--line)]">
                        {openActions} Open Actions
                      </span>
                    </div>
                  </div>

                  {/* Title & Blurb */}
                  <div>
                    <Link
                      href={`/m/${meeting.id}`}
                      className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] hover:text-[var(--accent)] transition"
                    >
                      {meeting.title}
                    </Link>
                    <p className="mt-1.5 text-xs text-[var(--ink-muted)] leading-relaxed max-w-4xl">
                      {meeting.blurb}
                    </p>
                  </div>

                  {/* Participants & Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--line)]/50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {meeting.participants.map((person) => (
                          <Avatar key={person.id} person={person} size="sm" />
                        ))}
                      </div>
                      <span className="text-xs text-[var(--ink-muted)] font-medium">
                        {meeting.participants.map((p) => p.name).join(", ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap items-center gap-1">
                        {meeting.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[var(--bg)] px-2 py-0.5 text-[10px] text-[var(--ink-muted)] border border-[var(--line)]/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/m/${meeting.id}`}
                        className="flex items-center gap-1 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 active:scale-95"
                      >
                        Workspace
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
