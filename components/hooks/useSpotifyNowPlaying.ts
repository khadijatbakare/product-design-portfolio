"use client";

import { useEffect, useState } from "react";

export interface SpotifyNowPlaying {
  readonly isPlaying: boolean;
  readonly track?: string;
  readonly artist?: string;
  readonly albumArt?: string;
  readonly spotifyUrl?: string;
}

export function useSpotifyNowPlaying(enabled = true) {
  const [nowPlaying, setNowPlaying] = useState<SpotifyNowPlaying | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    let requesting = false;
    const update = async () => {
      if (requesting) return;
      requesting = true;
      try {
        const response = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
        });
        if (!active) return;
        setNowPlaying(
          response.ok ? await response.json() : { isPlaying: false },
        );
      } catch {
        if (active) setNowPlaying({ isPlaying: false });
      } finally {
        requesting = false;
        if (active) setLoading(false);
      }
    };
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void update();
    };
    void update();
    const timer = window.setInterval(update, 5_000);
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [enabled]);

  return { nowPlaying, loading } as const;
}
