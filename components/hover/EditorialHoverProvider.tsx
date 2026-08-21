"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface HoverContextValue {
  readonly setHoverState: (label: string | null, meta?: string | null) => void;
}

const HoverContext = createContext<HoverContextValue>({
  setHoverState: () => undefined,
});

export function EditorialHoverProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activeMeta, setActiveMeta] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 });
  const setHoverState = useCallback(
    (label: string | null, meta?: string | null) => {
      setActiveLabel(label);
      setActiveMeta(meta ?? null);
    },
    [],
  );

  return (
    <HoverContext.Provider value={{ setHoverState }}>
      <div
        className="relative min-h-screen w-full"
        onMouseMove={(event) => {
          mouseX.set(event.clientX + 16);
          mouseY.set(event.clientY + 16);
        }}
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ x: cursorX, y: cursorY }}
          initial={false}
          animate={
            activeLabel ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: activeLabel ? 0.15 : 0.1 }}
          className="editorial-hover-slip pointer-events-none fixed top-0 left-0 z-[45] items-center gap-2 rounded-[2px] border border-[#d5cec2] bg-[#faf7f2]/95 px-2.5 py-1 text-[#23201d] shadow-[0_4px_16px_rgba(0,0,0,.08)] backdrop-blur-sm select-none"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#8c2d19]" />
          <span className="font-serif text-xs tracking-tight">
            {activeLabel}
          </span>
          {activeMeta && (
            <span className="border-l border-[#e3dcce] pl-2 font-mono text-[10px] uppercase tracking-widest text-[#625b52]">
              {activeMeta}
            </span>
          )}
        </motion.div>
      </div>
    </HoverContext.Provider>
  );
}

export const useEditorialHover = () => useContext(HoverContext);
