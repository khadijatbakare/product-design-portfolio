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
    const update = async () => {
      try {
        const response = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
        });
        if (!active) return;
        setNowPlaying(response.ok ? await response.json() : { isPlaying: false });
      } catch {
        if (active) setNowPlaying({ isPlaying: false });
      } finally {
        if (active) setLoading(false);
      }
    };
    void update();
    const timer = window.setInterval(update, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [enabled]);

  return { nowPlaying, loading } as const;
}
