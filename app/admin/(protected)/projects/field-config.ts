import type { ComponentType } from "react";

import { STATUS_OPTIONS as STATUS_OPTIONS_SHARED, ADMIN_STATUS_STYLES, statusLabel as sharedStatusLabel } from "@/lib/status";

export type FieldType = "text" | "number" | "select" | "textarea" | "date" | "checkbox";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  span?: "full" | "half";
  help?: string;
}

export interface SectionConfig {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  fields: FieldConfig[];
}

export const STATUS_OPTIONS: FieldOption[] = STATUS_OPTIONS_SHARED.map((s) => ({ value: s.value, label: s.label }));

export const ATTR_TYPE_OPTIONS: FieldOption[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Yes/No" },
  { value: "date", label: "Date" },
];

export const STATUS_COLORS: Record<string, string> = ADMIN_STATUS_STYLES;

export function statusLabel(value: string): string {
  return sharedStatusLabel(value);
}

export const BASIC_INFO_FIELDS: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true, span: "half" },
  { key: "slug", label: "Slug", type: "text", required: true, span: "half", help: "Auto-generated from title" },
  { key: "description", label: "Description", type: "textarea", span: "full" },
  { key: "shortDescription", label: "Short Description", type: "text", span: "full", maxLength: 200, help: "Brief summary shown on project cards" },
  { key: "categoryId", label: "Category", type: "select", required: false, span: "half" },
  { key: "status", label: "Status", type: "select", span: "half", options: STATUS_OPTIONS },
  // { key: "completion", label: "Completion %", type: "number", span: "half", min: 0, max: 100 }, // Auto-calculated from phases
  { key: "published", label: "Published", type: "checkbox", help: "Visible on the public site" },
  { key: "location", label: "Location", type: "text", required: true, span: "half" },
  { key: "budget", label: "Budget", type: "number", span: "half", step: 0.01, placeholder: "0.00" },
  { key: "order", label: "Order", type: "number", span: "half" },
  { key: "startDate", label: "Start Date", type: "date", span: "half" },
  { key: "endDate", label: "End Date", type: "date", span: "half" },
  { key: "ownerName", label: "Owner Name", type: "text", span: "half" },
  { key: "ownerProfession", label: "Owner Profession", type: "text", span: "half" },
  { key: "ownerEarning", label: "Owner Earning", type: "text", span: "half", help: "E.g. ₹25L/year, High, etc." },
];

export function getFieldConfig(key: string): FieldConfig | undefined {
  return BASIC_INFO_FIELDS.find((f) => f.key === key);
}
