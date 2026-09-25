"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { TranscriptCue } from "./types";

interface UsePlaybackOptions {
  durationSec: number;
  transcript?: TranscriptCue[];
  initialTimeSec?: number;
}

export function usePlayback({
  durationSec,
  transcript = [],
  initialTimeSec = 0,
}: UsePlaybackOptions) {
  const [currentTimeSec, setCurrentTimeSec] = useState(initialTimeSec);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Sync initial time if changed externally
  useEffect(() => {
    if (initialTimeSec > 0) {
      setCurrentTimeSec(initialTimeSec);
    }
  }, [initialTimeSec]);

  // Audio timeline animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    const animate = (now: number) => {
      if (lastTimeRef.current !== null) {
        const deltaMs = now - lastTimeRef.current;
        const deltaSec = (deltaMs / 1000) * playbackRate;
        setCurrentTimeSec((prev) => {
          const next = prev + deltaSec;
          if (next >= durationSec) {
            setIsPlaying(false);
            return durationSec;
          }
          return next;
        });
      }
      lastTimeRef.current = now;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, playbackRate, durationSec]);

  const seekTo = useCallback(
    (timeSec: number) => {
      const clamped = Math.max(0, Math.min(durationSec, timeSec));
      setCurrentTimeSec(clamped);
    },
    [durationSec]
  );

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev && currentTimeSec >= durationSec) {
        setCurrentTimeSec(0);
      }
      return !prev;
    });
  }, [currentTimeSec, durationSec]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (currentTimeSec >= durationSec) {
      setCurrentTimeSec(0);
    }
    setIsPlaying(true);
  }, [currentTimeSec, durationSec]);

  // Active transcript cue calculation
  const activeCue = transcript.find(
    (cue) => currentTimeSec >= cue.startSec && currentTimeSec <= cue.endSec
  ) || transcript.reduce<TranscriptCue | undefined>((closest, cue) => {
    if (cue.startSec <= currentTimeSec) {
      if (!closest || cue.startSec > closest.startSec) {
        return cue;
      }
    }
    return closest;
  }, undefined);

  return {
    currentTimeSec,
    isPlaying,
    playbackRate,
    activeCue,
    seekTo,
    togglePlay,
    play,
    pause,
    setPlaybackRate,
  };
}
