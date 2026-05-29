import { Plus, Trash2, GripVertical } from "lucide-react";
import { ATTR_TYPE_OPTIONS } from "../field-config";
import type { AttrItem } from "../types";
import { uid } from "@/lib/shared/id";

export function AttributesSection({
  items,
  onChange,
}: {
  items: AttrItem[];
  onChange: (items: AttrItem[]) => void;
}) {
  const add = () => {
    const next = [...items, { id: uid(), label: "", value: "", type: "text", order: items.length }];
    onChange(next);
  };

  const update = (i: number, key: keyof AttrItem, val: unknown) => {
    const next = items.map((item, idx) => (idx === i ? { ...item, [key]: val } : item));
    onChange(next);
  };

  const remove = (i: number) => {
    onChange(items.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-mid-gray text-center py-8">
          No custom attributes yet. Add fields like Architect, Total Area, Floors, Parking, etc.
        </p>
      )}

      {items.map((item, i) => (
        <div key={item.id} className="flex items-start gap-2 bg-off-white rounded-lg p-3">
          <div className="pt-2 text-mid-gray cursor-move">
            <GripVertical className="size-4" />
          </div>
          <select
            value={item.type}
            onChange={(e) => update(i, "type", e.target.value)}
            className="h-10 w-24 px-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            {ATTR_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <input
            value={item.label}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="Label"
            className="h-10 flex-1 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          {item.type === "boolean" ? (
            <label className="flex items-center gap-2 h-10 px-3 cursor-pointer">
              <input
                type="checkbox"
                checked={item.value === "true"}
                onChange={(e) => update(i, "value", e.target.checked ? "true" : "false")}
                className="rounded border-light-gray text-brand-primary focus:ring-brand-primary"
              />
              <span className="text-sm text-mid-gray">Yes</span>
            </label>
          ) : (
            <input
              value={item.value}
              onChange={(e) => update(i, "value", e.target.value)}
              placeholder="Value"
              type={item.type === "number" ? "number" : item.type === "date" ? "date" : "text"}
              className="h-10 flex-1 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          )}
          <button
            type="button"
            onClick={() => remove(i)}
            className="pt-2 text-mid-gray hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 h-8 px-3 text-xs border border-dashed border-light-gray text-mid-gray hover:border-brand-primary hover:text-brand-primary transition"
      >
        <Plus className="size-4" /> Add Attribute
      </button>
    </div>
  );
}
