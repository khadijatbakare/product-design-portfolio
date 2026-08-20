"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BookPreloader } from "@/components/preloader/BookPreloader";
import { CornerBookshelf } from "@/components/shelf/CornerBookshelf";
import { BookSpreadModal } from "@/components/modal/BookSpreadModal";
import { LibraryCheckoutFooter } from "@/components/footer/LibraryCheckoutFooter";
import { UnoFlipModal } from "@/components/game/UnoFlipModal";
import {
  aboutMe,
  getProjectsByVolume,
  libraryCopy,
  projects,
  type ModalView,
} from "@/data/content";
import type { GameMode } from "@/games/uno-flip";

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalView | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("solo");
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
      if (event.key === "Escape") closeModal();
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
    <main className="paper-texture min-h-screen bg-paper">
      <AnimatePresence>
        {isLoading && (
          <BookPreloader key="preloader" onFinish={finishLoading} />
        )}
      </AnimatePresence>
      <header className="mx-auto max-w-7xl px-6 pt-12 md:px-12">
        <span className="font-mono text-[10px] uppercase tracking-[.18em]">
          {libraryCopy.eyebrow}
        </span>
        <h1 className="mt-8 max-w-5xl font-serif text-6xl leading-[.9] tracking-tight md:text-8xl">
          {aboutMe.intro}
        </h1>
        <p className="mt-8 max-w-lg leading-7 text-black/60">
          {libraryCopy.instruction}
        </p>
      </header>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <CornerBookshelf
          onOpen={openModal}
          onOpenGame={() => {
            setGameMode("solo");
            setIsGameOpen(true);
          }}
        />
      </div>
      <LibraryCheckoutFooter onOpen={openModal} />
      <AnimatePresence>
        {activeModal && (
          <BookSpreadModal
            key={activeModal}
            activeModal={activeModal}
            selectedProject={selectedProject}
            onClose={closeModal}
            onSelectProject={setSelectedProject}
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
    </main>
  );
}
