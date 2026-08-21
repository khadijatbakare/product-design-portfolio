"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { shelfCurios } from "@/data/content";
import { VintageGramophone } from "@/components/modal/VintageGramophone";
import { useSpotifyNowPlaying } from "@/components/hooks/useSpotifyNowPlaying";

export function StudyDesk() {
  const current = shelfCurios.reading.current;
  const listening = shelfCurios.listening;
  const { nowPlaying: spotify } = useSpotifyNowPlaying();
  const liveListening = spotify?.track
    ? {
        track: spotify.track,
        artist: spotify.artist,
        albumArt: spotify.albumArt,
        spotifyUrl: spotify.spotifyUrl,
      }
    : listening;
  const progress =
    current?.progressPercent ??
    (current?.currentPage && current.totalPages
      ? Math.round((current.currentPage / current.totalPages) * 100)
      : undefined);

  return (
    <section aria-labelledby="study-desk-title">
      <p className="font-mono text-[10px] uppercase tracking-[.18em] text-black/65">
        The study desk
      </p>
      <h3 id="study-desk-title" className="mt-3 font-serif text-4xl">
        What is open beside me.
      </h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <article className="scrapbook-tile relative overflow-hidden border border-black/15 bg-[#f3ead8] p-5">
          <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-black/65">
            <p>Currently reading</p>
            {current?.source ? (
              <a
                href={current.source.href}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 flex items-center gap-1 border-b border-black/25 pb-0.5"
              >
                {current.source.label} <ExternalLink size={9} />
              </a>
            ) : (
              <span>Reading ledger</span>
            )}
          </div>
          <div className="mt-5 grid grid-cols-[72px_1fr] gap-4">
            <div className="relative aspect-[2/3] overflow-hidden border border-black/15 bg-[#9c4f35] shadow-md">
              {current?.cover ? (
                <Image
                  src={current.cover.src}
                  alt={current.cover.alt}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              ) : (
                <span className="grid h-full place-items-center px-2 text-center font-serif text-xs text-white/80">
                  Current book
                </span>
              )}
            </div>
            <div>
              <h4 className="font-serif text-xl leading-tight">
                {current?.title ?? "Reading update coming soon"}
              </h4>
              <p className="mt-1 text-xs text-black/65">
                {current?.author ?? "The next book has not been filed yet."}
              </p>
              {typeof progress === "number" && (
                <>
                  <div
                    className="mt-4 h-1 overflow-hidden rounded bg-black/10"
                    aria-label={`${progress}% read`}
                  >
                    <div
                      className="h-full bg-[#6e3727]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest">
                    {current?.currentPage && current?.totalPages
                      ? `Page ${current.currentPage} / ${current.totalPages} · `
                      : ""}
                    {progress}% complete
                  </p>
                </>
              )}
            </div>
          </div>
          {current?.note && (
            <p className="mt-5 border-t border-black/10 pt-4 text-sm italic leading-6">
              {current.note}
            </p>
          )}
          {current?.updatedAt && (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-black/65">
              Updated {current.updatedAt}
            </p>
          )}
        </article>

        <article className="scrapbook-tile group relative overflow-hidden border border-black/15 bg-[#e6dcc8] p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/65">
            {listening.trackNumber
              ? `Track ${listening.trackNumber}`
              : "Now playing"}
          </p>
          <div className="mt-2">
            <VintageGramophone
              trackName={liveListening.track}
              artistName={liveListening.artist}
              albumArt={
                "albumArt" in liveListening ? liveListening.albumArt : undefined
              }
              trackNumber={listening.trackNumber}
              liveOnSpotify={Boolean(spotify?.isPlaying)}
            />
          </div>
          {liveListening.spotifyUrl && (
            <a
              href={liveListening.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-fit items-center gap-1 border-b border-black/40 pb-1 font-mono text-[10px] uppercase tracking-widest"
            >
              Open in Spotify <ExternalLink size={11} />
            </a>
          )}
          {spotify?.isPlaying ? (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#36795a]">
              Live from Spotify · refreshes every minute
            </p>
          ) : listening.updatedAt ? (
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-black/65">
              Spotify update · {listening.updatedAt}
            </p>
          ) : null}
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-black/65">
            No autoplay. Playback starts only on Spotify.
          </p>
        </article>
      </div>
    </section>
  );
}
