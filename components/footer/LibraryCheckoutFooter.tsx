"use client";

import { useId } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import {
  checkoutSlip,
  resume,
  type LedgerEntry,
  type ModalView,
} from "@/data/content";
import { useEditorialHover } from "@/components/hover/EditorialHoverProvider";

function LedgerLink({ entry }: { readonly entry: LedgerEntry }) {
  const { setHoverState } = useEditorialHover();
  const external = entry.kind === "external" && entry.href.startsWith("http");
  return (
    <a
      href={entry.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseEnter={() => setHoverState(entry.label, entry.stamp)}
      onMouseLeave={() => setHoverState(null)}
      className="grid grid-cols-[1fr_auto] gap-5 border-b border-dashed border-[#6f5f4b]/40 py-2.5 transition-colors hover:text-[#8c2d19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="flex items-center gap-1">
        {entry.label}
        <ArrowUpRight size={10} />
      </span>
      <span>{entry.stamp}</span>
    </a>
  );
}

function AvailabilityStamp({ stamp }: { readonly stamp: string }) {
  const id = useId().replace(/:/g, "");
  const noiseId = `stamp-noise-${id}`;
  const maskId = `stamp-mask-${id}`;
  const [date, status = "AVAILABLE FOR WORK"] = stamp.split(" — ");
  return (
    <svg
      viewBox="0 0 240 76"
      className="h-auto w-full max-w-60 -rotate-[1.35deg] text-[#8c2d19]"
      role="img"
      aria-label={stamp}
    >
      <defs>
        <filter id={noiseId} x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="3"
            seed="17"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="240"
          height="76"
        >
          <rect width="240" height="76" fill="white" />
          <rect
            width="240"
            height="76"
            fill="black"
            opacity="0.2"
            filter={`url(#${noiseId})`}
          />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`} fill="currentColor" stroke="currentColor">
        <rect
          x="4"
          y="4"
          width="232"
          height="68"
          rx="2"
          fill="none"
          strokeWidth="4"
        />
        <rect
          x="10"
          y="10"
          width="220"
          height="56"
          rx="1"
          fill="none"
          strokeWidth="1.2"
        />
        <text
          x="120"
          y="31"
          textAnchor="middle"
          stroke="none"
          fontFamily="monospace"
          fontSize="11"
          fontWeight="700"
          letterSpacing="1.8"
        >
          {date}
        </text>
        <text
          x="120"
          y="50"
          textAnchor="middle"
          stroke="none"
          fontFamily="monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.2"
        >
          {status}
        </text>
      </g>
    </svg>
  );
}

export function LibraryCheckoutFooter({
  onOpen,
}: {
  readonly onOpen: (view: ModalView) => void;
}) {
  const { setHoverState } = useEditorialHover();
  return (
    <footer className="theme-checkout border-t border-black/15 bg-[#c8bda8] px-6 py-16 transition-[filter] duration-500 md:px-12">
      <div className="mx-auto max-w-4xl rounded-t-[2rem] border border-[#786a55] bg-[#9c8a6c] px-4 pt-5 shadow-[0_18px_35px_rgba(50,40,25,.25)] md:px-10 md:pt-8">
        <section
          className="relative translate-y-3 rotate-[-.3deg] border border-[#8f8069] bg-[#eee5d4] p-6 text-[#493f32] shadow-[5px_8px_0_rgba(73,63,50,.14)] md:p-10"
          aria-label="Borrower’s due date slip"
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.16em]">
            <span>{checkoutSlip.cardNumber}</span>
            <span>{checkoutSlip.classification}</span>
          </div>
          <h2 className="mt-5 border-y-2 border-[#6f5f4b]/55 py-3 font-mono text-sm uppercase tracking-[.08em] md:text-base">
            Borrower’s Due Date Slip
          </h2>
          <p className="mt-3 font-serif text-xl">{checkoutSlip.title}</p>
          <div className="mt-7 grid gap-8 md:grid-cols-[1fr_240px]">
            <div className="font-mono text-[10px] uppercase tracking-[.12em]">
              <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-[#6f5f4b]/60 pb-2 font-bold">
                <span>{checkoutSlip.columns[0]}</span>
                <span>{checkoutSlip.columns[1]}</span>
              </div>
              {checkoutSlip.ledger.map((entry) => (
                <LedgerLink key={entry.id} entry={entry} />
              ))}
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <AvailabilityStamp stamp={checkoutSlip.availability.stamp} />
              <p className="mt-4 text-xs leading-5">
                {checkoutSlip.availability.label}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-widest">
            <button
              type="button"
              onClick={() => onOpen("resume")}
              onMouseEnter={() =>
                setHoverState("View résumé on site", "Vol. 03")
              }
              onMouseLeave={() => setHoverState(null)}
              className="border-b border-[#493f32] pb-1"
            >
              View résumé on site →
            </button>
            <a
              href="/resume.pdf"
              download="Khadijat-Bakare-Resume.pdf"
              onMouseEnter={() => setHoverState("Download résumé", "PDF")}
              onMouseLeave={() => setHoverState(null)}
              className="flex items-center gap-2 border-b border-[#493f32] pb-1"
            >
              <Download size={14} />
              {resume.downloadLabel}
            </a>
          </div>
          <p className="mt-7 max-w-xl border-t border-[#6f5f4b]/50 pt-4 font-serif text-lg leading-7">
            {checkoutSlip.notice}
          </p>
          <p className="mt-5 font-mono text-[8px] uppercase tracking-[.14em] text-[#6f5f4b]">
            {checkoutSlip.footnote}
          </p>
        </section>
      </div>
    </footer>
  );
}
