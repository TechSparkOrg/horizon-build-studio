import React from "react";
import { cn } from "@/lib/shared/utils";

export interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({
  children,
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-label text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
