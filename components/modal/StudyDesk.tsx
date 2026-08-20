"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { shelfCurios } from "@/data/content";
import { VintageGramophone } from "@/components/modal/VintageGramophone";

export function StudyDesk() {
  const current = shelfCurios.reading.current;
  const listening = shelfCurios.listening;

  return (
    <section aria-labelledby="study-desk-title">
      <p className="font-mono text-[9px] uppercase tracking-[.18em] text-black/55">
        The study desk
      </p>
      <h3 id="study-desk-title" className="mt-3 font-serif text-4xl">
        What is open beside me.
      </h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <article className="scrapbook-tile relative overflow-hidden border border-black/15 bg-[#f3ead8] p-5">
          <p className="font-mono text-[8px] uppercase tracking-widest text-black/50">
            Currently reading
          </p>
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
                {current?.title ?? "Next entry not filed yet"}
              </h4>
              <p className="mt-1 text-xs text-black/50">
                {current?.author ?? "Update in content.ts"}
              </p>
              {typeof current?.progressPercent === "number" && (
                <>
                  <div
                    className="mt-4 h-1 overflow-hidden rounded bg-black/10"
                    aria-label={`${current.progressPercent}% read`}
                  >
                    <div
                      className="h-full bg-[#6e3727]"
                      style={{ width: `${current.progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-widest">
                    {current.progressPercent}% complete
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
        </article>

        <article className="scrapbook-tile group relative overflow-hidden border border-black/15 bg-[#e6dcc8] p-5">
          <p className="font-mono text-[8px] uppercase tracking-widest text-black/50">
            Now playing
          </p>
          <div className="mt-2">
            <VintageGramophone
              trackName={listening.track}
              artistName={listening.artist}
            />
          </div>
          {listening.spotifyUrl && (
            <a
              href={listening.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-fit items-center gap-1 border-b border-black/40 pb-1 font-mono text-[8px] uppercase tracking-widest"
            >
              Open in Spotify <ExternalLink size={11} />
            </a>
          )}
          <p className="mt-4 font-mono text-[7px] uppercase tracking-widest text-black/40">
            No autoplay. Playback starts only on Spotify.
          </p>
        </article>
      </div>
    </section>
  );
}
