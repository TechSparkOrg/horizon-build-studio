"use client";

import { useState, useEffect } from "react";

const input = "w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

function toSlug(v: string) {
  return v.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function TitleSlugFields({
  initialLabel = "",
  initialSlug = "",
}: {
  initialLabel?: string;
  initialSlug?: string;
}) {
  const [label, setLabel] = useState(initialLabel);
  const [slug, setSlug] = useState(initialSlug);
  const [slugTouched, setSlugTouched] = useState(false);
  const isNew = !initialLabel && !initialSlug;

  useEffect(() => {
    if (isNew && !slugTouched) {
      setSlug(toSlug(label));
    }
  }, [label, isNew, slugTouched]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label className="block text-sm font-medium text-brand-secondary mb-1">Label *</label>
        <input
          name="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className={input}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-secondary mb-1">Slug</label>
        <input
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={input}
        />
      </div>
    </div>
  );
}
