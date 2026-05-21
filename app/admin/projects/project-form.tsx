"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Save, Image, Youtube, Box, Clock, Info, ListChecks, HelpCircle } from "lucide-react";
import { ProjectPreview } from "./components/ProjectPreview";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { MediaSection } from "./sections/MediaSection";
import { VideosSection } from "./sections/VideosSection";
import { ModelsSection } from "./sections/ModelsSection";
import { TimelineSection } from "./sections/TimelineSection";
import { AttributesSection } from "./sections/AttributesSection";
import { FaqSection } from "./sections/FaqSection";
import type { FormFields, MediaItem, VideoItem, ModelItem, PhaseItem, AttrItem, ProjectData, ProjectFaqItem } from "./types";

const TABS = [
  { id: "basic" as const, label: "Basic Info", icon: Info },
  { id: "media" as const, label: "Media", icon: Image },
  { id: "videos" as const, label: "Videos", icon: Youtube },
  { id: "models" as const, label: "3D Models", icon: Box },
  { id: "timeline" as const, label: "Timeline", icon: Clock },
  { id: "faq" as const, label: "FAQ", icon: HelpCircle },
  { id: "attributes" as const, label: "Attributes", icon: ListChecks },
];

type TabId = (typeof TABS)[number]["id"];

function emptyForm(data?: ProjectData): FormFields {
  return {
    title: data?.title ?? "",
    slug: data?.slug ?? "",
    description: data?.description ?? "",
    shortDescription: data?.shortDescription ?? "",
    categoryId: data?.categoryId ?? "",
    status: data?.status ?? "planning",
    completion: data?.completion ?? 0,
    location: data?.location ?? "",
    budget: data?.budget?.toString() ?? "",
    startDate: data?.startDate ? new Date(data.startDate).toISOString().split("T")[0] : "",
    endDate: data?.endDate ? new Date(data.endDate).toISOString().split("T")[0] : "",
    img: data?.img ?? "",
    alt: data?.alt ?? "",
    featured: data?.featured ?? false,
    published: data?.published ?? true,
    order: data?.order ?? 0,
    ownerName: data?.ownerName ?? "",
    ownerProfession: data?.ownerProfession ?? "",
    ownerEarning: data?.ownerEarning ?? "",
  };
}

function preparePayload(
  form: FormFields,
  media: MediaItem[],
  videos: VideoItem[],
  models3d: ModelItem[],
  phases: PhaseItem[],
  projectFaqs: ProjectFaqItem[],
  attributes: AttrItem[],
) {
  const overallCompletion = phases.length
    ? Math.round(phases.reduce((sum, p) => sum + (p.completion || 0), 0) / phases.length)
    : 0;
  const heroMedia = media.find((m) => m.isHero);
  return {
    ...form,
    img: heroMedia?.url || form.img || "",
    categoryId: form.categoryId || null,
    budget: form.budget ? Number(form.budget) : null,
    completion: overallCompletion,
    order: Number(form.order),
    startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
    endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
    media: media.map(({ id, ...rest }) => rest),
    videos: videos.map(({ id, ...rest }) => ({
      ...rest,
      platform: rest.platform ?? "youtube",
      sourceUrl: rest.sourceUrl ?? "",
      videoId: rest.videoId ?? "",
      fileUrl: rest.fileUrl ?? "",
      fileType: rest.fileType ?? "",
    })),
    models3d: models3d.map(({ id, ...rest }) => rest),
    phases: phases.map(({ id, ...p }) => ({
      ...p,
      date: p.date ? new Date(p.date).toISOString() : null,
      images: [] as string[],
      faqId: p.faqId || null,
      medias: (p.medias || []).map(({ id: mid, ...m }) => m),
    })),
    projectFaqs: projectFaqs.map(({ id, ...rest }) => rest),
    attributes: attributes.map(({ id, ...rest }) => rest),
  };
}

export function ProjectForm({ initialData }: { initialData?: ProjectData }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("basic");
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | undefined>(undefined);
  const projectId = initialData?.id ?? savedId;
  const isNew = !initialData && !savedId;

  const [form, setForm] = useState<FormFields>(() => emptyForm(initialData));
  const [media, setMedia] = useState<MediaItem[]>(initialData?.media ?? []);
  const [videos, setVideos] = useState<VideoItem[]>(initialData?.videos ?? []);
  const [models3d, setModels3d] = useState<ModelItem[]>(initialData?.models3d ?? []);
  const [phases, setPhases] = useState<PhaseItem[]>(initialData?.phases ?? []);
  const [projectFaqs, setProjectFaqs] = useState<ProjectFaqItem[]>(initialData?.projectFaqs ?? []);
  const [attributes, setAttributes] = useState<AttrItem[]>(initialData?.attributes ?? []);
  const [categoryName, setCategoryName] = useState(initialData?.category?.name ?? "");

  useEffect(() => {
    if (!form.categoryId) { setCategoryName(""); return; }
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: { id: string; name: string }[]) => {
        const found = data.find((c) => c.id === form.categoryId);
        setCategoryName(found?.name ?? "");
      })
      .catch(() => {});
  }, [form.categoryId]);

  const updateField = (key: keyof FormFields, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = preparePayload(form, media, videos, models3d, phases, projectFaqs, attributes);
      const isCreate = !projectId;
      const url = projectId ? `/api/projects/${projectId}` : "/api/projects";

      const res = await fetch(url, {
        method: projectId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to save`);
      }

      if (isCreate) {
        const created = await res.json();
        setSavedId(created.id);
        router.replace(`/admin/projects/${created.id}`);
      }

      toast.success(isCreate ? "Draft saved" : "Saved");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-brand-secondary mb-6 transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to Projects
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-brand-secondary tracking-tight">
          {initialData ? "Edit Project" : savedId ? "Edit Project" : "New Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex gap-1 mb-6 bg-white rounded-2xl border border-light-gray shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-1.5 overflow-x-auto">
              {TABS.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-1.5 h-9 px-3.5 text-sm font-medium whitespace-nowrap rounded-xl transition-all duration-200 ${
                      tab === t.id
                        ? "bg-brand-primary text-white shadow-sm"
                        : "text-mid-gray hover:text-brand-secondary hover:bg-off-white"
                    }`}
                  >
                    <Icon className="size-4" /> {t.label}
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl border border-light-gray shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-6 space-y-5 transition-opacity duration-200">
              {tab === "basic" && (
                <BasicInfoSection
                  form={form}
                  onChange={updateField}
                  isNew={isNew}
                />
              )}
              {tab === "media" && <MediaSection items={media} onChange={setMedia} />}
              {tab === "videos" && <VideosSection items={videos} onChange={setVideos} />}
              {tab === "models" && <ModelsSection items={models3d} onChange={setModels3d} />}
              {tab === "timeline" && <TimelineSection items={phases} onChange={setPhases} models3d={models3d} media={media} videos={videos} />}
              {tab === "faq" && <FaqSection items={projectFaqs} onChange={setProjectFaqs} />}
              {tab === "attributes" && <AttributesSection items={attributes} onChange={setAttributes} />}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-semibold rounded-xl border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition-all disabled:opacity-60 shadow-sm"
              >
                <Save className="size-4" />
                {saving ? "Saving..." : isNew ? "Save Draft" : "Save"}
              </button>
              <Link
                href="/admin/projects"
                className="inline-flex items-center h-9 px-4 text-sm border border-light-gray text-mid-gray rounded-xl hover:border-mid-gray hover:text-brand-secondary transition-all"
              >
                Cancel
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[400px] xl:w-[480px] flex-shrink-0">
            <p className="text-xs text-mid-gray mb-3 font-medium uppercase tracking-wider">
              Live Preview
            </p>
            <div className="sticky top-8">
              <ProjectPreview
                form={form}
                media={media}
                videos={videos}
                phases={phases}
                categoryName={initialData?.category?.name ?? ""}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
