import { useEffect, useState } from "react";
import { DynamicField } from "../components/DynamicField";
import { Field } from "../components/Fields";
import { BASIC_INFO_FIELDS } from "../field-config";
import type { FormFields } from "../types";

interface FlatCat {
  id: string; name: string; depth: number;
}

function buildTree(flat: { id: string; name: string; parentId: string | null }[]): FlatCat[] {
  const result: FlatCat[] = [];
  const byParent = new Map<string | null, { id: string; name: string; parentId: string | null }[]>();
  for (const c of flat) {
    const p = c.parentId ?? "__root__";
    if (!byParent.has(p)) byParent.set(p, []);
    byParent.get(p)!.push(c);
  }
  const walk = (parentId: string | null, depth: number) => {
    const children = byParent.get(parentId ?? "__root__") ?? byParent.get(parentId);
    if (!children) return;
    for (const c of children) {
      result.push({ id: c.id, name: c.name, depth });
      walk(c.id, depth + 1);
    }
  };
  // Walk root categories first, then orphaned ones
  walk(null, 0);
  return result;
}

export function BasicInfoSection({
  form,
  onChange,
  isNew,
}: {
  form: FormFields;
  onChange: (key: keyof FormFields, value: unknown) => void;
  isNew: boolean;
}) {
  const [cats, setCats] = useState<FlatCat[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: { id: string; name: string; parentId: string | null }[]) => setCats(buildTree(data)));
  }, []);

  const handleFieldChange = (key: string, value: unknown) => {
    onChange(key as keyof FormFields, value);
    if (key === "title" && isNew && typeof value === "string") {
      onChange("slug", value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""));
    }
  };

  const halfFields = BASIC_INFO_FIELDS.filter((f) => f.span !== "full" && f.type !== "checkbox");
  const fullFields = BASIC_INFO_FIELDS.filter((f) => f.span === "full" || f.type === "checkbox");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        {halfFields.map((field) => {
          if (field.key === "categoryId") {
            return (
              <Field key="categoryId" label="Category">
                <select
                  value={form.categoryId}
                  onChange={(e) => onChange("categoryId", e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                >
                  <option value="">No category</option>
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {"\u00A0".repeat(c.depth * 2)}{c.depth > 0 ? "\u2514 " : ""}{c.name}
                    </option>
                  ))}
                </select>
              </Field>
            );
          }
          return (
            <DynamicField
              key={field.key}
              config={field}
              value={form[field.key as keyof FormFields]}
              onChange={(v) => handleFieldChange(field.key, v)}
            />
          );
        })}
      </div>

      {fullFields.map((field) => (
        <DynamicField
          key={field.key}
          config={field}
          value={form[field.key as keyof FormFields]}
          onChange={(v) => handleFieldChange(field.key, v)}
        />
      ))}

      <Field label="Featured">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => onChange("featured", e.target.checked)}
            className="rounded border-light-gray text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-brand-secondary">Show this project on the homepage</span>
        </label>
      </Field>
    </div>
  );
}
