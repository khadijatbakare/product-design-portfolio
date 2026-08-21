"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BookPreloader } from "@/components/preloader/BookPreloader";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { CornerBookshelf } from "@/components/shelf/CornerBookshelf";
import { ShelfCurioModal } from "@/components/shelf/ShelfCurioModal";
import { BookSpreadModal } from "@/components/modal/BookSpreadModal";
import { LibraryCheckoutFooter } from "@/components/footer/LibraryCheckoutFooter";
import { UnoFlipModal } from "@/components/game/UnoFlipModal";
import {
  aboutMe,
  getProjectsByVolume,
  libraryCopy,
  projects,
  type ModalView,
  type ShelfCurioId,
} from "@/data/content";
import type { GameMode } from "@/games/uno-flip";

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalView | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("solo");
  const [activeCurio, setActiveCurio] = useState<ShelfCurioId | null>(null);
  const closeModal = useCallback(() => setActiveModal(null), []);
  const finishLoading = useCallback(() => setIsLoading(false), []);
  const openModal = useCallback((view: ModalView, volumeId?: string) => {
    setActiveModal(view);
    if (view === "work") {
      setSelectedProject(null);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        setActiveCurio(null);
      }
      if (activeModal !== "work") return;
      if (!selectedProject) return;
      const current = projects.find(
        (project) => project.slug === selectedProject,
      );
      const visibleProjects = current
        ? getProjectsByVolume(current.volumeId)
        : projects;
      const index = Math.max(
        0,
        visibleProjects.findIndex(
          (project) => project.slug === selectedProject,
        ),
      );
      if (event.key === "ArrowRight")
        setSelectedProject(
          visibleProjects[(index + 1) % visibleProjects.length].slug,
        );
      if (event.key === "ArrowLeft")
        setSelectedProject(
          visibleProjects[
            (index - 1 + visibleProjects.length) % visibleProjects.length
          ].slug,
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModal, selectedProject, closeModal]);

  return (
    <main id="main-content" className="theme-shell paper-texture min-h-screen">
      <a href="#portfolio-shelf" className="skip-link">
        Skip to portfolio shelf
      </a>
      <AnimatePresence>
        {isLoading && (
          <BookPreloader key="preloader" onComplete={finishLoading} />
        )}
      </AnimatePresence>
      <SiteHeader onOpen={openModal} />
      <header className="mx-auto max-w-7xl px-6 pt-12 md:px-12">
        <span className="font-mono text-[10px] uppercase tracking-[.18em]">
          {libraryCopy.eyebrow}
        </span>
        <h1 className="hero-title mt-8 max-w-5xl font-serif leading-[.9] tracking-tight">
          {aboutMe.intro}
        </h1>
        <p className="theme-muted mt-8 max-w-lg leading-7">
          {libraryCopy.instruction}
        </p>
      </header>
      <div
        id="portfolio-shelf"
        className="mx-auto max-w-7xl scroll-mt-6 px-6 md:px-12"
      >
        <CornerBookshelf
          onOpen={openModal}
          onOpenGame={() => {
            setGameMode("solo");
            setIsGameOpen(true);
          }}
          onOpenCurio={setActiveCurio}
        />
      </div>
      <LibraryCheckoutFooter onOpen={openModal} />
      <AnimatePresence mode="wait">
        {activeModal && (
          <BookSpreadModal
            key={activeModal}
            activeModal={activeModal}
            selectedProject={selectedProject}
            onClose={closeModal}
            onSelectProject={setSelectedProject}
            onOpenVolume={openModal}
          />
        )}
      </AnimatePresence>
      <UnoFlipModal
        key={gameMode}
        open={isGameOpen}
        mode={gameMode}
        difficulty="even"
        onClose={() => setIsGameOpen(false)}
      />
      <ShelfCurioModal
        active={activeCurio}
        onClose={() => setActiveCurio(null)}
      />
    </main>
  );
}
