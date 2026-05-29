"use client";

import { useEffect, useRef, useState } from "react";

interface RotatorProps {
  words: string[];
  variant: "rotator" | "prompt";
}

export function Rotator({ words, variant }: RotatorProps) {
  const stageClass = variant === "prompt" ? "prompt-stage" : "rotator-stage";
  const wordClass = variant === "prompt" ? "prompt-word" : "rotator-word";
  const ghostClass = variant === "prompt" ? "prompt-ghost" : "rotator-ghost";

  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    if (words.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    activeRef.current = 0;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const id = setInterval(() => {
      const prev = activeRef.current;
      const next = (prev + 1) % words.length;
      activeRef.current = next;
      setLeaving(prev);
      setActive(next);
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => setLeaving(null), 800);
    }, 3200);
    return () => {
      clearInterval(id);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [words.length]);

  const ghost = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  return (
    <span className={stageClass} aria-live="polite">
      <span className={ghostClass} aria-hidden="true">
        {ghost}
      </span>
      {words.map((w, i) => (
        <span
          key={i}
          className={`${wordClass}${i === active ? " is-active" : ""}${
            i === leaving ? " is-leaving" : ""
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

export default Rotator;
