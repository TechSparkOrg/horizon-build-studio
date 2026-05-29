export const STATUS_OPTIONS = [
  { value: "planning", label: "Planning" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
] as const;

export type ProjectStatus = (typeof STATUS_OPTIONS)[number]["value"];

export const STATUS_STYLES: Record<string, string> = {
  planning: "bg-amber-400/20 text-amber-300 border-amber-400/40",
  in_progress: "bg-blue-400/20 text-blue-300 border-blue-400/40",
  completed: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
  on_hold: "bg-gray-400/20 text-gray-300 border-gray-400/40",
};

export const STATUS_LABELS: Record<string, string> = {
  planning: "Planning",
  in_progress: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
};

export const ADMIN_STATUS_STYLES: Record<string, string> = {
  planning: "bg-amber-50 text-amber-700 border-amber-200",
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  on_hold: "bg-gray-50 text-gray-700 border-gray-200",
};

export const DETAIL_STATUS_STYLES: Record<string, string> = {
  planning: "bg-blue-100 text-blue-800 border border-blue-200",
  in_progress: "bg-blue-100 text-blue-800 border border-blue-200",
  completed: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  on_hold: "bg-amber-100 text-amber-800 border border-amber-200",
};

export function statusLabel(value: string): string {
  return STATUS_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
