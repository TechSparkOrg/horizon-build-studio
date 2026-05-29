"use client";

import { Check, HelpCircle } from "lucide-react";
import { uid } from "@/lib/shared/id";
import type { ProjectFaqItem } from "../types";

interface FaqOption {
  id: string;
  question: string;
  answer: string;
  faqType: { id: string; name: string; slug: string } | null;
}

export function FaqSection({
  items,
  onChange,
  allFaqs = [],
}: {
  items: ProjectFaqItem[];
  onChange: (items: ProjectFaqItem[]) => void;
  allFaqs?: FaqOption[];
}) {
  const selectedIds = new Set(items.map((i) => i.faqId));

  const toggle = (faq: FaqOption) => {
    if (selectedIds.has(faq.id)) {
      onChange(items.filter((i) => i.faqId !== faq.id));
    } else {
      onChange([
        ...items,
        { id: uid(), faqId: faq.id, order: items.length },
      ]);
    }
  };

  const grouped: Record<string, FaqOption[]> = {};
  const uncategorized: FaqOption[] = [];
  allFaqs.forEach((f) => {
    if (f.faqType) {
      if (!grouped[f.faqType.id]) grouped[f.faqType.id] = [];
      grouped[f.faqType.id].push(f);
    } else {
      uncategorized.push(f);
    }
  });

  if (allFaqs.length === 0) {
    return (
      <div className="text-sm text-mid-gray py-8 text-center">
        <HelpCircle className="size-8 mx-auto mb-2 opacity-40" />
        <p>No FAQs found.</p>
        <p className="text-xs mt-1">Create FAQs in the FAQ section first.</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-brand-secondary mb-1">
        Project FAQs
      </label>
      <p className="text-xs text-mid-gray mb-4">
        Select which FAQs appear on this project&apos;s detail page. Selected FAQs are merged with phase-linked FAQs.
      </p>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {Object.entries(grouped).map(([typeId, faqs]) => {
          const typeName = faqs[0]?.faqType?.name ?? "Other";
          const allSelected = faqs.every((f) => selectedIds.has(f.id));
          return (
            <div key={typeId} className="border border-light-gray rounded-lg">
              <div className="flex items-center gap-2 px-3 py-2 bg-off-white/50 border-b border-light-gray">
                <button
                  type="button"
                  onClick={() => {
                    if (allSelected) {
                      onChange(items.filter((i) => !faqs.some((f) => f.id === i.faqId)));
                    } else {
                      const existing = new Set(items.map((i) => i.faqId));
                      const newItems = faqs
                        .filter((f) => !existing.has(f.id))
                        .map((f) => ({
                          id: uid(),
                          faqId: f.id,
                          order: items.length,
                        }));
                      onChange([...items, ...newItems]);
                    }
                  }}
                  className="text-xs font-semibold text-brand-secondary uppercase tracking-wider flex-1 text-left"
                >
                  {typeName}
                </button>
                <span className="text-[10px] text-mid-gray">
                  {faqs.filter((f) => selectedIds.has(f.id)).length}/{faqs.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (allSelected) {
                      onChange(items.filter((i) => !faqs.some((f) => f.id === i.faqId)));
                    } else {
                      const existing = new Set(items.map((i) => i.faqId));
                      const newItems = faqs
                        .filter((f) => !existing.has(f.id))
                        .map((f) => ({
                          id: uid(),
                          faqId: f.id,
                          order: items.length,
                        }));
                      onChange([...items, ...newItems]);
                    }
                  }}
                  className="text-[10px] font-medium text-brand-primary hover:underline"
                >
                  {allSelected ? "Deselect all" : "Select all"}
                </button>
              </div>
              <div className="divide-y divide-light-gray/50">
                {faqs.map((f) => {
                  const selected = selectedIds.has(f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggle(f)}
                      className={`w-full flex items-start gap-3 px-3 py-2.5 text-left transition ${
                        selected ? "bg-brand-primary/5" : "hover:bg-off-white/50"
                      }`}
                    >
                      <span
                        className={`size-4 mt-0.5 shrink-0 rounded border flex items-center justify-center transition ${
                          selected
                            ? "bg-brand-primary border-brand-primary text-white"
                            : "border-light-gray"
                        }`}
                      >
                        {selected && <Check className="size-3" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm leading-snug ${selected ? "font-medium text-dark-text" : "text-dark-text"}`}>
                          {f.question}
                        </p>
                        {selected && (
                          <p className="text-xs text-mid-gray mt-0.5 line-clamp-1">{f.answer}</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {uncategorized.length > 0 && (
          <div className="border border-light-gray rounded-lg">
            <div className="flex items-center gap-2 px-3 py-2 bg-off-white/50 border-b border-light-gray">
              <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider flex-1 text-left">
                Uncategorized
              </span>
              <span className="text-[10px] text-mid-gray">
                {uncategorized.filter((f) => selectedIds.has(f.id)).length}/{uncategorized.length}
              </span>
            </div>
            <div className="divide-y divide-light-gray/50">
              {uncategorized.map((f) => {
                const selected = selectedIds.has(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggle(f)}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 text-left transition ${
                      selected ? "bg-brand-primary/5" : "hover:bg-off-white/50"
                    }`}
                  >
                    <span
                      className={`size-4 mt-0.5 shrink-0 rounded border flex items-center justify-center transition ${
                        selected
                          ? "bg-brand-primary border-brand-primary text-white"
                          : "border-light-gray"
                      }`}
                    >
                      {selected && <Check className="size-3" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm leading-snug ${selected ? "font-medium text-dark-text" : "text-dark-text"}`}>
                        {f.question}
                      </p>
                      {selected && (
                        <p className="text-xs text-mid-gray mt-0.5 line-clamp-1">{f.answer}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <p className="text-xs text-mid-gray mt-3">
          {items.length} FAQ{items.length > 1 ? "s" : ""} selected for this project
        </p>
      )}
    </div>
  );
}
