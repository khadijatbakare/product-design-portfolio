"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import {
  checkoutSlip,
  resume,
  siteIdentity,
  type LedgerEntry,
  type ModalView,
} from "@/data/content";
import { useEditorialHover } from "@/components/hover/EditorialHoverProvider";

const marginalia: Record<string, { title: string; folioTag: string }> = {
  email: { title: "Draft Letter to Author", folioTag: "POSTAL" },
  linkedin: { title: "Professional Folio & Network", folioTag: "EXT / LI" },
  medium: { title: "Essays & Design Writing", folioTag: "VOL. 03" },
  github: { title: "Code & Experiments", folioTag: "EXT / GH" },
};

function PostcardLink({ entry }: { readonly entry: LedgerEntry }) {
  const { setHoverState } = useEditorialHover();
  const hover = marginalia[entry.id] ?? {
    title: entry.label,
    folioTag: entry.stamp,
  };
  const external = entry.kind === "external";
  return (
    <a
      href={entry.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseEnter={() => setHoverState(hover.title, hover.folioTag)}
      onMouseLeave={() => setHoverState(null)}
      onFocus={() => setHoverState(hover.title, hover.folioTag)}
      onBlur={() => setHoverState(null)}
      className="flex min-h-11 items-center justify-between gap-3 border-b border-dashed border-[#8c8477]/35 py-2 transition-colors hover:text-[#8c2d19]"
    >
      <span className="uppercase tracking-wider text-[#8c8477]">
        {entry.label}
      </span>
      <span className="flex min-w-0 items-center gap-1 truncate normal-case tracking-normal text-[#3d3833]">
        {entry.id === "email" ? siteIdentity.email : entry.label}
        <ArrowUpRight size={11} aria-hidden="true" />
      </span>
    </a>
  );
}

export function LibraryCheckoutFooter({
  onOpen,
}: {
  readonly onOpen: (view: ModalView) => void;
}) {
  const [copied, setCopied] = useState(false);
  const { setHoverState } = useEditorialHover();
  const email = checkoutSlip.ledger.find((entry) => entry.id === "email");

  const copyEmail = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(siteIdentity.email);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="theme-checkout flex w-full justify-center bg-[#efebe4] px-4 py-16 transition-[filter] duration-500">
      <section className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-[#ddd6c8] bg-[#faf7f2] p-6 text-[#23201d] shadow-[0_10px_30px_-10px_rgba(0,0,0,.16)] sm:p-10">
        <div className="pointer-events-none absolute inset-2 rounded-[1px] border border-[#ebe4d8]" />
        <header className="relative mb-7 flex items-center justify-between border-b border-[#e8e1d3] pb-4 font-mono text-[9px] uppercase tracking-[.18em] text-[#8c8477]">
          <span>Universal Postal Card — Folio Edition</span>
          <span>{checkoutSlip.classification}</span>
        </header>

        <div className="relative grid gap-9 md:grid-cols-2">
          <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px bg-gradient-to-b from-transparent via-[#d6cebf] to-transparent md:block" />
          <div className="md:pr-6">
            <p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#8c8477]">
              Post card
            </p>
            <h2 className="mt-3 font-serif text-2xl">Khadijat Bakare</h2>
            <p className="mt-1 text-sm text-[#666056]">
              Product Designer &amp; Design Systems
            </p>
            <p className="mt-5 max-w-sm font-serif text-sm leading-6 text-[#666056]">
              Currently open to product design roles. Drop a note or borrow the
              résumé below.
            </p>
            <div className="mt-6 font-mono text-[10px]">
              {checkoutSlip.ledger.map((entry) => (
                <div key={entry.id} className="relative">
                  <PostcardLink entry={entry} />
                  {entry.id === "email" && email && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={
                        copied ? "Email copied" : "Copy email address"
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#faf7f2] p-2 text-[#8c8477]"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>
          </div>

          <div className="border-t border-[#e8e1d3] pt-7 md:border-0 md:pl-6 md:pt-0">
            <div className="flex items-start justify-end gap-3">
              <div className="stamp-ink mt-2 rotate-[-4deg] text-center font-mono text-[7px] uppercase text-[#7a2e20]">
                <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border border-current leading-tight">
                  <span>Posted</span>
                  <b>Aug 2026</b>
                  <span>Available</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <i className="block h-px w-16 bg-current" />
                  <i className="block h-px w-16 bg-current" />
                  <i className="block h-px w-16 bg-current" />
                </div>
              </div>
              <div className="flex h-24 w-20 rotate-1 flex-col items-center justify-between border-2 border-dashed border-[#c7beaf] bg-[#faf5ec] p-2 font-mono text-[7px] uppercase text-[#8c8477] shadow-inner">
                <span className="flex w-full justify-between">
                  <b>Air</b>
                  <b>10¢</b>
                </span>
                <div
                  className="flex h-11 w-11 items-center justify-center bg-[#23201d]"
                  aria-label="Bambi postage stamp"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 fill-none stroke-[#faf5ec]"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M12 5c.7 0 1.4.1 2 .3 1.8-2 4.5-1.7 5.5-1.3.5 1.5.2 3.3-.4 4.3A8 8 0 0 1 21 13.5c0 4.1-3.6 7.5-8 7.5s-8-3.4-8-7.5c0-1.9.7-3.7 1.9-5.2-.6-1-.9-2.8-.4-4.3 1-.4 3.7-.7 5.5 1.3Z" />
                    <circle cx="9" cy="13" r="1" fill="#faf5ec" />
                    <circle cx="15" cy="13" r="1" fill="#faf5ec" />
                  </svg>
                </div>
                <span>Bambi · 26</span>
              </div>
            </div>
            <div className="mt-8 border-b border-[#e3dcce] pb-3 font-serif text-xs italic text-[#524d44]">
              <span className="mr-2 font-mono text-[9px] not-italic text-[#a69e91]">
                TO:
              </span>
              Hiring Teams, Design Leads &amp; Collaborators
            </div>
            <button
              type="button"
              onClick={() => onOpen("resume")}
              className="mt-5 w-full border border-[#23201d]/20 px-4 py-2.5 font-mono text-[9px] uppercase tracking-wider"
            >
              View résumé on site →
            </button>
            <a
              href="/resume.pdf"
              download="Khadijat-Bakare-Resume.pdf"
              onMouseEnter={() =>
                setHoverState("Archival Resume Document (PDF)", "DOC / 2026")
              }
              onMouseLeave={() => setHoverState(null)}
              onFocus={() =>
                setHoverState("Archival Resume Document (PDF)", "DOC / 2026")
              }
              onBlur={() => setHoverState(null)}
              className="mt-2 flex min-h-11 w-full items-center justify-between rounded-[2px] bg-[#23201d] px-4 py-2.5 text-[#faf7f2]"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider">
                {resume.downloadLabel}
              </span>
              <Download
                size={14}
                className="text-[#d4af37]"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
        <div className="relative mt-8 flex flex-col justify-between gap-2 border-t border-[#e8e1d3] pt-4 font-mono text-[8px] text-[#8c8477] sm:flex-row">
          <span>Postmarked from the Study Desk © 2026 Khadijat.</span>
          <span>Set in Manrope, Newsreader and DM Mono. Built by hand.</span>
        </div>
      </section>
    </footer>
  );
}
