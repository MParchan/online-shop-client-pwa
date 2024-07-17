"use client";

import { cn } from "@/libs/twMerge.lib";

interface ScrollToSectionProps {
  children: React.ReactNode;
  elementId: string;
  className?: string;
}

export default function ScrollToSection({ children, elementId, className }: ScrollToSectionProps) {
  const scrollToSection = () => {
    const section = document.getElementById(elementId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={() => {
        scrollToSection();
      }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </div>
  );
}
