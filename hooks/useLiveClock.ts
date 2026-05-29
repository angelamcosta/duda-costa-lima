"use client";

import { useEffect, useState } from "react";

export interface LiveClock {
  madison: string;
  you: string;
  city: string;
  sameTime: boolean;
  mounted: boolean;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function useLiveClock(): LiveClock {
  const [state, setState] = useState<LiveClock>({
    madison: "",
    you: "",
    city: "",
    sameTime: false,
    mounted: false,
  });

  useEffect(() => {
    const compute = (): LiveClock => {
      const now = new Date();
      let madison = "";
      try {
        const m = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Chicago",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
        madison = `${m} CT`;
      } catch {
        madison = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())} UTC`;
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
      const city = tz.split("/").pop()?.replace(/_/g, " ") ?? "";
      const local = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
      const madisonHM = madison.replace(/\s*(CT|UTC)$/, "");
      return {
        madison,
        you: `${local} · ${city}`,
        city,
        sameTime: local === madisonHM,
        mounted: true,
      };
    };

    const tick = () => setState(compute());
    queueMicrotask(tick);
    const id = setInterval(tick, 30 * 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}
