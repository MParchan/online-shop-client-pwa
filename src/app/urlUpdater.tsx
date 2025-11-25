"use client";

import { useEffect } from "react";

interface UrlUpdaterProps {
  startTime: string | string[] | undefined;
}

export default function UrlUpdater({ startTime }: UrlUpdaterProps) {
  useEffect(() => {
    if (startTime) {
      const endTime = Date.now();
      const start = Number(startTime);
      const duration = endTime - start;

      console.log(`Czas od kliknięcia: ${duration}ms`);
    }
  }, [startTime]);

  return null;
}
