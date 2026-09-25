"use client";

import { useState } from "react";
import type { Meeting, Highlight } from "@/lib/types";

interface ShareModalProps {
  meeting: Meeting;
  initialClip?: Highlight;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({
  meeting,
  initialClip,
  isOpen,
  onClose,
}: ShareModalProps) {
  const [copiedKind, setCopiedKind] = useState<string | null>(null);

  if (!isOpen) return null;

  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  const meetingShareUrl = `${origin}/share/${meeting.shareToken}`;

  const handleCopy = (text: string, kind: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKind(kind);
    setTimeout(() => setCopiedKind(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-6 shadow-2xl transition"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
              Share Meeting & Clips
            </h3>
            <p className="text-xs text-[var(--ink-muted)]">
              Public access link • Works without account or authentication
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {/* Full Meeting Link */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-1.5">
              Full Meeting Share Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={meetingShareUrl}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-xs font-[family-name:var(--font-mono)] text-[var(--ink)] focus:outline-none"
              />
              <button
                onClick={() => handleCopy(meetingShareUrl, "full-mtg")}
                className="shrink-0 rounded-lg bg-[var(--accent)] px-3.5 py-2 text-xs font-medium text-white shadow-xs hover:opacity-90 active:scale-95"
              >
                {copiedKind === "full-mtg" ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Highlights / Clips Links */}
          {meeting.highlights.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] mb-2">
                Shareable Highlight Clips ({meeting.highlights.length})
              </label>
              <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                {meeting.highlights.map((h) => {
                  const clipUrl = `${origin}/share/${h.shareToken}`;
                  const isInitial = initialClip?.id === h.id;
                  return (
                    <div
                      key={h.id}
                      className={`flex flex-col gap-1.5 rounded-xl border p-3 text-xs transition ${
                        isInitial
                          ? "border-[var(--accent)] bg-[var(--accent-soft)]/40"
                          : "border-[var(--line)]/70 bg-[var(--bg)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[var(--ink)] truncate">
                          {h.title}
                        </span>
                        <span className="shrink-0 rounded-md bg-[var(--panel)] px-2 py-0.5 text-[10px] font-medium text-[var(--ink-muted)] uppercase border border-[var(--line)]">
                          {h.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--ink-muted)]">
                          {clipUrl}
                        </span>
                        <button
                          onClick={() => handleCopy(clipUrl, h.id)}
                          className="shrink-0 text-xs font-semibold text-[var(--accent)] hover:underline"
                        >
                          {copiedKind === h.id ? "Copied!" : "Copy clip link"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end pt-4 border-t border-[var(--line)]">
          <button
            onClick={onClose}
            className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-xs font-medium text-[var(--ink)] hover:bg-[var(--bg)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
