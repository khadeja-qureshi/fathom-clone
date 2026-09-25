"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { formatClock } from "@/lib/format";
import type { TranscriptCue } from "@/lib/types";

interface PlaybackBarProps {
  durationSec: number;
  currentTimeSec: number;
  isPlaying: boolean;
  playbackRate: number;
  activeCue?: TranscriptCue;
  waveSeed?: number;
  onSeek: (timeSec: number) => void;
  onTogglePlay: () => void;
  onChangeRate: (rate: number) => void;
  className?: string;
}

export function PlaybackBar({
  durationSec,
  currentTimeSec,
  isPlaying,
  playbackRate,
  activeCue,
  waveSeed = 42,
  onSeek,
  onTogglePlay,
  onChangeRate,
  className = "",
}: PlaybackBarProps) {
  // Generate stable waveform height percentages (80 bars for rich desktop presentation)
  const waveBars = useMemo(() => {
    const bars: number[] = [];
    let seed = waveSeed;
    for (let i = 0; i < 80; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      const rnd = seed / 233280;
      bars.push(Math.max(18, Math.floor(rnd * 92)));
    }
    return bars;
  }, [waveSeed]);

  const progressPercent = durationSec > 0 ? (currentTimeSec / durationSec) * 100 : 0;

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(Math.floor(ratio * durationSec));
  };

  return (
    <div
      className={`rounded-xl border border-[var(--line)] bg-[var(--panel-2)] p-4 shadow-sm transition ${className}`}
    >
      <div className="flex flex-col gap-3">
        {/* Waveform & Timeline Scrubber */}
        <div
          className="group relative cursor-pointer py-1.5"
          onClick={handleBarClick}
          title="Click anywhere on waveform to seek"
        >
          <div className="flex h-12 items-end gap-0.5 md:gap-1 overflow-hidden px-1">
            {waveBars.map((height, i) => {
              const barTimePercent = (i / waveBars.length) * 100;
              const isPast = barTimePercent <= progressPercent;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-xs transition-all duration-150 group-hover:opacity-90"
                  style={{
                    height: `${height}%`,
                    backgroundColor: isPast
                      ? "var(--accent)"
                      : "color-mix(in oklab, var(--line) 75%, transparent)",
                  }}
                />
              );
            })}
          </div>

          {/* Progress Bar with Thumb Indicator */}
          <div className="relative mt-2 h-2 w-full rounded-full bg-[var(--line)]/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Playback Controls & Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-xs transition hover:opacity-90 active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  className="ml-0.5 h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Jump -10s / +10s */}
            <button
              onClick={() => onSeek(Math.max(0, currentTimeSec - 10))}
              className="rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-xs text-[var(--ink-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              title="Skip back 10s"
            >
              -10s
            </button>
            <button
              onClick={() => onSeek(Math.min(durationSec, currentTimeSec + 10))}
              className="rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-xs text-[var(--ink-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              title="Skip forward 10s"
            >
              +10s
            </button>

            {/* Time Display */}
            <span className="ml-2 font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--ink)]">
              {formatClock(currentTimeSec)}{" "}
              <span className="text-[var(--ink-muted)]">/ {formatClock(durationSec)}</span>
            </span>
          </div>

          {/* Active Cue Context & Speed control */}
          <div className="flex items-center gap-3">
            {activeCue && (
              <div className="hidden max-w-xs truncate rounded-md bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--ink-muted)] md:block">
                <span className="font-semibold text-[var(--accent)]">
                  Active snippet:
                </span>{" "}
                &ldquo;{activeCue.text}&rdquo;
              </div>
            )}

            {/* Speed Selector */}
            <div className="flex items-center gap-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-0.5">
              {[1, 1.25, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => onChangeRate(rate)}
                  className={`rounded-md px-2 py-0.5 text-xs font-medium transition ${
                    playbackRate === rate
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
