"use client";

import { ArrowUpRight, Download } from "lucide-react";
import {
  checkoutSlip,
  resume,
  type LedgerEntry,
  type ModalView,
} from "@/data/content";

function LedgerLink({ entry }: { readonly entry: LedgerEntry }) {
  const external = entry.kind === "external" && entry.href.startsWith("http");
  return (
    <a
      href={entry.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
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

export function LibraryCheckoutFooter({
  onOpen,
}: {
  readonly onOpen: (view: ModalView) => void;
}) {
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
              <div className="stamp-ink border-[3px] border-[#8c2d19] px-4 py-3 font-mono text-[11px] font-bold uppercase leading-5 tracking-[.12em] text-[#8c2d19]">
                {checkoutSlip.availability.stamp}
              </div>
              <p className="mt-4 text-xs leading-5">
                {checkoutSlip.availability.label}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-widest">
            <button
              type="button"
              onClick={() => onOpen("resume")}
              className="border-b border-[#493f32] pb-1"
            >
              View résumé on site →
            </button>
            <a
              href="/resume.pdf"
              download="Khadijat-Bakare-Resume.pdf"
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
