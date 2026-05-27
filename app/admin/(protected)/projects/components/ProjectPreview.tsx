import { MapPin, Calendar, DollarSign, Clock, User, Wallet } from "lucide-react";
import type { FormFields, MediaItem, PhaseItem } from "../types";
import { STATUS_COLORS, statusLabel } from "../field-config";

function formatBudget(val: string): string {
  const n = Number(val);
  return isNaN(n) ? "" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function TimelineSection({ phases }: { phases: PhaseItem[] }) {
  if (!phases.length) return null;
  return (
    <div className="border-t border-light-gray pt-4">
      <h4 className="text-xs font-semibold text-mid-gray uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Clock className="size-3.5" /> Timeline ({phases.length} phases)
      </h4>
      <div className="relative pl-6">
        <div className="absolute left-[9px] top-1 bottom-1 w-px bg-gradient-to-b from-brand-primary/40 to-transparent" />
        {phases.map((phase, i) => (
          <div key={phase.id} className="relative pb-4 last:pb-0">
            <div className="absolute -left-[19px] top-0.5 size-[18px] rounded-full border-2 border-white bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center">
              <div className={`size-[7px] rounded-full ${phase.completion >= 100 ? "bg-emerald-500" : "bg-brand-primary"}`} />
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-brand-secondary truncate">
                  {phase.title || `Phase ${i + 1}`}
                </p>
                <span className="text-xs font-medium text-mid-gray shrink-0">
                  {phase.completion}%
                </span>
              </div>
              {phase.description && (
                <p className="text-xs text-mid-gray mt-0.5 line-clamp-2 leading-relaxed">{phase.description}</p>
              )}
              {phase.date && (
                <p className="text-[11px] text-mid-gray/60 mt-0.5">{new Date(phase.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              )}
              {phase.completion > 0 && (
                <div className="h-1.5 rounded-full bg-light-gray mt-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-primary to-orange-400 transition-all duration-500"
                    style={{ width: `${phase.completion}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectPreview({
  form,
  media,
  phases,
  categoryName,
}: {
  form: FormFields;
  media: MediaItem[];
  phases: PhaseItem[];
  categoryName?: string;
}) {
  const heroImage = media.find((m) => m.isHero)?.url || form.img;

  return (
    <div className="bg-white rounded-2xl border border-light-gray shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="aspect-video bg-off-white relative overflow-hidden">
        {heroImage ? (
          <>
            <img src={heroImage} alt={form.alt || form.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-mid-gray text-sm">
            <div className="text-center">
              <MapPin className="size-8 mx-auto mb-1 opacity-40" />
              <span className="text-xs">No hero image</span>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {form.featured && (
            <span className="bg-brand-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
              Featured
            </span>
          )}
          <span className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm border shadow-sm ${STATUS_COLORS[form.status] || "text-mid-gray border-light-gray"}`}>
            {statusLabel(form.status)}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-display font-bold text-brand-secondary leading-tight">
          {form.title || "Untitled Project"}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-mid-gray">
          {form.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {form.location}
            </span>
          )}
          {categoryName && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-off-white border border-light-gray text-mid-gray text-[11px]">
              {categoryName}
            </span>
          )}
          {form.startDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" /> {new Date(form.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          )}
          {form.budget && Number(form.budget) > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <DollarSign className="size-3.5" /> {formatBudget(form.budget)}
            </span>
          )}
        </div>

        {(form.ownerName || form.ownerProfession || form.ownerEarning) && (
          <div className="bg-gradient-to-br from-brand-secondary/5 to-transparent rounded-xl border border-brand-secondary/10 p-3 space-y-2">
            {form.ownerName && (
              <div className="flex items-center gap-2 text-xs text-brand-secondary">
                <div className="size-7 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <User className="size-3.5 text-brand-primary" />
                </div>
                <div>
                  <span className="font-semibold">{form.ownerName}</span>
                  {form.ownerProfession && <span className="text-mid-gray ml-1">— {form.ownerProfession}</span>}
                </div>
              </div>
            )}
            {form.ownerEarning && (
              <div className="flex items-center gap-2 text-xs text-mid-gray">
                <Wallet className="size-3.5 text-brand-primary/60" />
                <span>{form.ownerEarning}</span>
              </div>
            )}
          </div>
        )}

        {form.completion > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-mid-gray">Progress</span>
              <span className="font-semibold text-brand-secondary">{form.completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-light-gray overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-primary to-orange-400 transition-all duration-500"
                style={{ width: `${form.completion}%` }}
              />
            </div>
          </div>
        )}

        {form.shortDescription && (
          <p className="text-sm text-mid-gray leading-relaxed">{form.shortDescription}</p>
        )}

        <TimelineSection phases={phases} />
      </div>

      {form.description && (
        <div className="px-5 pb-5 border-t border-light-gray pt-4">
          <h4 className="text-[11px] font-semibold text-mid-gray uppercase tracking-wider mb-1.5">Description</h4>
          <p className="text-sm text-mid-gray leading-relaxed whitespace-pre-line line-clamp-6">
            {form.description}
          </p>
        </div>
      )}
    </div>
  );
}
