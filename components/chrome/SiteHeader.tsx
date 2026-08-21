"use client";

import { ThemeToggle } from "./ThemeToggle";
import type { ModalView } from "@/data/content";
import { useEditorialHover } from "@/components/hover/EditorialHoverProvider";

export function SiteHeader({
  onOpen,
}: {
  readonly onOpen: (view: ModalView) => void;
}) {
  const { setHoverState } = useEditorialHover();
  const links: readonly {
    label: string;
    view: ModalView;
    hover: string;
    meta: string;
  }[] = [
    {
      label: "Work",
      view: "work",
      hover: "Selected case studies",
      meta: "Vol. 01",
    },
    { label: "About", view: "about", hover: "About Khadijat", meta: "Vol. 03" },
    {
      label: "Résumé",
      view: "resume",
      hover: "Experience and résumé",
      meta: "Vol. 03",
    },
    {
      label: "Contact",
      view: "contact",
      hover: "Start a conversation",
      meta: "Checkout",
    },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-current/10 bg-[color-mix(in_srgb,var(--room)_88%,transparent)] px-4 py-3 backdrop-blur-md sm:px-6 md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left font-mono text-[9px] uppercase tracking-widest sm:text-[10px]"
        >
          Khadijat — Product Designer
        </button>
        <div className="flex items-center gap-1 sm:gap-3">
          <nav aria-label="Primary navigation" className="flex items-center">
            {links.map((link) => (
              <button
                key={link.view}
                type="button"
                onClick={() => onOpen(link.view)}
                onMouseEnter={() => setHoverState(link.hover, link.meta)}
                onMouseLeave={() => setHoverState(null)}
                className="min-h-11 px-2 font-mono text-[8px] uppercase tracking-wider sm:px-3 sm:text-[9px]"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
