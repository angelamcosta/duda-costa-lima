"use client";

import { useMouseEffects } from "@/hooks/useMouseEffects";

export function MouseEffectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useMouseEffects();
  return <>{children}</>;
}
