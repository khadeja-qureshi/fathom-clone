"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { searchMeetings, type SearchResult } from "@/data/meetings";
import { formatClock } from "@/lib/format";
import { Avatar } from "@/components/Avatar";
import { getPersonById } from "@/data/people";

const SAMPLE_QUERIES = [
  "audit logs",
  "Oct 15",
  "on-call",
  "pricing",
  "feature flag",
  "Northstar",
  "churn",
  "decision",
];

export function SearchClient() {
  const [query, setQuery] = useState("audit logs");
  const [filterKind, setFilterKind] = useState<"all" | "transcript" | "decision" | "action" | "highlight">("all");

  const results = useMemo(() => {
    const raw = searchMeetings(query);
    if (filterKind === "all") return raw;
    return raw.filter((r) => r.kind === filterKind);
  }, [query, filterKind]);

  // Highlight matching text in snippet
  const renderHighlightedSnippet = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark
              key={i}
              className="rounded-xs bg-[var(--accent-soft)] font-semibold text-[var(--accent)] px-1 py-0.5"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 space-y-6">
      {/* Search Header */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel-2)] p-8 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Evidence-Backed Cross-Meeting Search
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)]">
            Search Across All Meetings & Decisions
          </h1>
          <p className="text-xs md:text-sm text-[var(--ink-muted)]">
            Every hit includes transcript quote, speaker context, timestamp proof, and 1-click jump into the workspace.
          </p>
        </div>

        {/* Input Box */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a topic, commitment, person, or date..."
            className="w-full rounded-2xl border-2 border-[var(--line)] bg-[var(--bg)] px-5 py-3.5 pl-12 text-sm text-[var(--ink)] shadow-2xs focus:border-[var(--accent)] focus:outline-none"
          />
          <svg
            className="absolute left-4 top-4 h-5 w-5 text-[var(--ink-muted)]"
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
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-3.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sample Chip Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-semibold text-[var(--ink-muted)]">Try searching:</span>
          {SAMPLE_QUERIES.map((sample) => (
            <button
              key={sample}
              onClick={() => setQuery(sample)}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition ${
                query.toLowerCase() === sample.toLowerCase()
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--line)] bg-[var(--panel)] text-[var(--ink-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              }`}
            >
              &ldquo;{sample}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-1 text-xs">
          {(["all", "transcript", "decision", "action", "highlight"] as const).map(
            (kind) => (
              <button
                key={kind}
                onClick={() => setFilterKind(kind)}
                className={`rounded-md px-3 py-1.5 font-semibold capitalize transition ${
                  filterKind === kind
                    ? "bg-[var(--accent)] text-white shadow-2xs"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {kind === "all" ? "All Evidence" : `${kind}s`}
              </button>
            )
          )}
        </div>

        <span className="text-xs font-medium text-[var(--ink-muted)]">
          Found {results.length} evidence match{results.length === 1 ? "" : "es"}
        </span>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-12 text-center text-xs text-[var(--ink-muted)]">
            No matches found for &ldquo;{query}&rdquo;. Try another term like &ldquo;audit logs&rdquo;, &ldquo;pricing&rdquo;, or &ldquo;Oct 15&rdquo;.
          </div>
        ) : (
          results.map((res) => {
            const speaker = res.speakerName
              ? getPersonById(res.speakerName.toLowerCase())
              : undefined;

            return (
              <div
                key={`${res.meetingId}-${res.id}`}
                className="group flex flex-col justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-5 shadow-2xs transition hover:border-[var(--accent)] hover:shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--accent)]">
                      {res.meetingTitle}
                    </span>
                    <span className="text-[var(--ink-muted)]">•</span>
                    <span className="rounded-md bg-[var(--bg)] px-2 py-0.5 font-bold uppercase text-[10px] text-[var(--ink-muted)] border border-[var(--line)]">
                      {res.kind}
                    </span>
                  </div>

                  <Link
                    href={`/m/${res.meetingId}?t=${res.startSec}&cue=${res.id}`}
                    className="flex items-center gap-1 font-[family-name:var(--font-mono)] text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {formatClock(res.startSec)} jump to source
                  </Link>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  {res.speakerName && (
                    <Avatar person={speaker} size="sm" className="mt-0.5 shrink-0" />
                  )}
                  <div className="space-y-1">
                    {res.speakerName && (
                      <span className="text-xs font-semibold text-[var(--ink)] block">
                        {res.speakerName}:
                      </span>
                    )}
                    <p className="text-xs text-[var(--ink)] leading-relaxed">
                      {renderHighlightedSnippet(res.snippet, query)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
