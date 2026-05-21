"use client";

import { useState, useEffect, useRef } from "react";
import { uid } from "@/lib/id";
import { Plus, X, BookOpen, Image, Video, Box, Copy } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface PhaseMediaItem {
  id: string;
  type: "image" | "video" | "model3d";
  url: string;
  message: string;
  referenceNo: string;
  order: number;
}

interface Phase {
  id: string;
  title: string;
  description: string;
  completion: number;
  date: string;
  youtubeUrl: string;
  faqId: string | null;
  medias: PhaseMediaItem[];
  order: number;
}

interface Model3DItem {
  id: string;
  filename: string;
  url: string;
}

interface MediaItem {
  id: string;
  url: string;
  alt: string;
}

interface VideoItem {
  id: string;
  title: string;
  fileUrl: string;
  sourceUrl: string;
}

interface Props {
  phases: Phase[];
  onChange: (phases: Phase[]) => void;
  models3d?: Model3DItem[];
  media?: MediaItem[];
  videos?: VideoItem[];
}

const input = "w-full h-9 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary";

function mediaLabel(type: string) {
  switch (type) {
    case "image": return "Image";
    case "video": return "Video";
    case "model3d": return "3D Model";
    default: return type;
  }
}

function MediaIcon({ type }: { type: string }) {
  switch (type) {
    case "image": return <Image className="size-3.5 text-emerald-500" />;
    case "video": return <Video className="size-3.5 text-blue-500" />;
    case "model3d": return <Box className="size-3.5 text-purple-500" />;
    default: return null;
  }
}

export function TimelineBuilder({ phases, onChange, models3d = [], media = [], videos = [] }: Props) {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [faqOpen, setFaqOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data: FAQItem[]) => setFaqs(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFaqOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const addPhase = () => {
    onChange([
      ...phases,
      {
        id: uid(),
        title: "",
        description: "",
        completion: 0,
        date: "",
        youtubeUrl: "",
        faqId: null,
        medias: [],
        order: phases.length,
      },
    ]);
  };

  const update = (id: string, key: keyof Phase, value: unknown) => {
    onChange(phases.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  };

  const remove = (id: string) => {
    onChange(phases.filter((p) => p.id !== id));
  };

  const duplicatePhase = (id: string) => {
    const source = phases.find((p) => p.id === id);
    if (!source) return;
    const idx = phases.findIndex((p) => p.id === id);
    const copy = {
      ...source,
      id: uid(),
      title: source.title ? `${source.title} (Copy)` : "",
      medias: source.medias.map((m) => ({ ...m, id: uid() })),
      order: idx + 1,
    };
    const next = [...phases];
    next.splice(idx + 1, 0, copy);
    onChange(next.map((p, i) => ({ ...p, order: i })));
  };

  const selectFaq = (phaseId: string, faq: FAQItem) => {
    onChange(
      phases.map((p) =>
        p.id === phaseId
          ? { ...p, faqId: faq.id, description: faq.answer }
          : p,
      ),
    );
    setFaqOpen(null);
  };

  const clearFaq = (phaseId: string) => {
    onChange(
      phases.map((p) =>
        p.id === phaseId ? { ...p, faqId: null } : p,
      ),
    );
  };

  const getFaqById = (id: string) => faqs.find((f) => f.id === id);

  const addMedia = (phaseId: string, type: PhaseMediaItem["type"]) => {
    onChange(
      phases.map((p) =>
        p.id === phaseId
          ? {
              ...p,
              medias: [
                ...p.medias,
                {
                  id: uid(),
                  type,
                  url: "",
                  message: "",
                  referenceNo: "",
                  order: p.medias.length,
                },
              ],
            }
          : p,
      ),
    );
  };

  const updateMedia = (phaseId: string, mediaId: string, key: keyof PhaseMediaItem, value: string) => {
    onChange(
      phases.map((p) =>
        p.id === phaseId
          ? {
              ...p,
              medias: p.medias.map((m) =>
                m.id === mediaId ? { ...m, [key]: value } : m,
              ),
            }
          : p,
      ),
    );
  };

  const removeMedia = (phaseId: string, mediaId: string) => {
    onChange(
      phases.map((p) =>
        p.id === phaseId
          ? { ...p, medias: p.medias.filter((m) => m.id !== mediaId) }
          : p,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative pl-8 before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-0.5 before:bg-light-gray">
        {phases.map((phase, i) => {
          const selectedFaq = phase.faqId ? getFaqById(phase.faqId) : null;
          return (
            <div key={phase.id} className="relative pb-6 last:pb-0">
              <div className="absolute -left-[21px] top-1 size-[18px] rounded-full border-2 border-brand-primary bg-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-brand-primary">{i + 1}</span>
              </div>
              <div className="bg-white rounded-xl border border-light-gray p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <input
                    value={phase.title}
                    onChange={(e) => update(phase.id, "title", e.target.value)}
                    placeholder="Phase title"
                    className="flex-1 h-9 px-3 rounded-lg border border-light-gray text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <button type="button" onClick={() => duplicatePhase(phase.id)} className="p-1.5 text-mid-gray hover:text-brand-primary" title="Duplicate phase">
                    <Copy className="size-4" />
                  </button>
                  <button type="button" onClick={() => remove(phase.id)} className="p-1.5 text-mid-gray hover:text-destructive">
                    <X className="size-4" />
                  </button>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <textarea
                    value={phase.description}
                    onChange={(e) => update(phase.id, "description", e.target.value)}
                    placeholder="Phase description"
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFaqOpen(faqOpen === phase.id ? null : phase.id)
                      }
                      className="inline-flex items-center gap-1 h-6 px-2 text-[11px] font-semibold rounded border border-light-gray text-mid-gray hover:border-brand-primary hover:text-brand-primary transition"
                    >
                      <BookOpen className="size-3" />
                      Select from FAQ
                    </button>
                    {selectedFaq && (
                      <button
                        type="button"
                        onClick={() => clearFaq(phase.id)}
                        className="text-[11px] text-destructive hover:underline"
                      >
                        Clear FAQ
                      </button>
                    )}
                  </div>
                  {selectedFaq && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 bg-brand-primary/5 text-brand-primary text-[11px] font-medium px-2 py-0.5 rounded border border-brand-primary/10">
                      <BookOpen className="size-3" />
                      From FAQ: {selectedFaq.question}
                    </div>
                  )}
                  {faqOpen === phase.id && faqs.length > 0 && (
                    <div className="mt-1 absolute z-10 left-0 right-0 bg-white border border-light-gray rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {faqs.map((faq) => (
                        <button
                          key={faq.id}
                          type="button"
                          onClick={() => selectFaq(phase.id, faq)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-off-white transition ${
                            phase.faqId === faq.id
                              ? "bg-brand-primary/5 text-brand-primary font-medium"
                              : "text-dark-text"
                          }`}
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-mid-gray mb-1">Completion %</label>
                    <input
                      type="number" min={0} max={100}
                      value={phase.completion}
                      onChange={(e) => update(phase.id, "completion", Number(e.target.value))}
                      className={input}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-mid-gray mb-1">Date</label>
                    <input
                      type="date"
                      value={phase.date ?? ""}
                      onChange={(e) => update(phase.id, "date", e.target.value)}
                      className={input}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-mid-gray mb-1">YouTube Update URL (optional)</label>
                  <input
                    value={phase.youtubeUrl}
                    onChange={(e) => update(phase.id, "youtubeUrl", e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className={input}
                  />
                </div>

                {/* ── Media Section ── */}
                {phase.medias.length > 0 && (
                  <div className="border border-light-gray/60 rounded-lg p-3 space-y-2">
                    <label className="block text-[11px] font-semibold text-mid-gray uppercase tracking-wider">Media</label>
                    {phase.medias.map((m) => (
                      <div key={m.id} className="flex items-start gap-2 bg-off-white rounded p-2">
                        <div className="shrink-0 mt-1">
                          <MediaIcon type={m.type} />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-start gap-2 flex-col sm:flex-row sm:items-center">
                            <span className="text-[10px] font-semibold uppercase text-mid-gray bg-white px-1.5 py-0.5 rounded border border-light-gray shrink-0">
                              {mediaLabel(m.type)}
                            </span>
                            {(() => {
                              const dropdownItems = m.type === "model3d" ? models3d : m.type === "image" ? media : m.type === "video" ? videos : [];
                              const getItemUrl = (item: Model3DItem | MediaItem | VideoItem): string =>
                                "filename" in item ? item.url : "alt" in item ? item.url : (item as VideoItem).fileUrl || (item as VideoItem).sourceUrl || "";
                              const dropdownLabel = (item: Model3DItem | MediaItem | VideoItem): string =>
                                "filename" in item ? (item as Model3DItem).filename : "alt" in item ? (item as MediaItem).alt || getItemUrl(item) : (item as VideoItem).title || getItemUrl(item);
                              const acceptType = m.type === "image" ? "image/*" : m.type === "video" ? "video/*" : ".glb,.gltf";
                              return dropdownItems.length > 0 ? (
                                <div className="flex-1 w-full space-y-1">
                                  <div className="flex items-center gap-1">
                                    <select
                                      value={dropdownItems.find((item) => getItemUrl(item) === m.url)?.id ?? ""}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        if (!val) {
                                          updateMedia(phase.id, m.id, "url", "");
                                        } else {
                                          const item = dropdownItems.find((it) => it.id === val);
                                          if (item) {
                                            updateMedia(phase.id, m.id, "url", getItemUrl(item));
                                            if (!m.referenceNo) {
                                              updateMedia(phase.id, m.id, "referenceNo", dropdownLabel(item));
                                            }
                                          }
                                        }
                                      }}
                                      className="flex-1 h-7 px-1 rounded border border-light-gray text-[11px] focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                    >
                                      <option value="">Custom URL</option>
                                      {dropdownItems.map((item) => (
                                        <option key={item.id} value={item.id}>
                                          {dropdownLabel(item)}
                                        </option>
                                      ))}
                                    </select>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const input = document.createElement("input");
                                        input.type = "file";
                                        input.accept = acceptType;
                                        input.onchange = async (e) => {
                                          const file = (e.target as HTMLInputElement).files?.[0];
                                          if (!file) return;
                                          const formData = new FormData();
                                          formData.append("file", file);
                                          formData.append("subdir", m.type === "model3d" ? "models" : "images");
                                          const res = await fetch("/api/upload", { method: "POST", body: formData });
                                          const data = await res.json();
                                          if (data.url) updateMedia(phase.id, m.id, "url", data.url);
                                        };
                                        input.click();
                                      }}
                                      className="shrink-0 h-7 px-2 rounded border border-brand-primary/30 text-brand-primary text-[10px] font-semibold hover:bg-brand-primary/5 transition"
                                    >
                                      Upload
                                    </button>
                                  </div>
                                  {!dropdownItems.find((item) => getItemUrl(item) === m.url) && (
                                    <input
                                      value={m.url}
                                      onChange={(e) => updateMedia(phase.id, m.id, "url", e.target.value)}
                                      placeholder="Enter URL"
                                      className="w-full h-7 px-2 rounded border border-light-gray text-[11px] focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                    />
                                  )}
                                </div>
                              ) : (
                                <div className="flex-1 flex items-center gap-1">
                                  <input
                                    value={m.url}
                                    onChange={(e) => updateMedia(phase.id, m.id, "url", e.target.value)}
                                    placeholder={m.type === "video" ? "https://..." : "URL"}
                                    className="flex-1 h-7 px-2 rounded border border-light-gray text-[11px] focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const input = document.createElement("input");
                                      input.type = "file";
                                      input.accept = acceptType;
                                      input.onchange = async (e) => {
                                        const file = (e.target as HTMLInputElement).files?.[0];
                                        if (!file) return;
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        formData.append("subdir", m.type === "model3d" ? "models" : "images");
                                        const res = await fetch("/api/upload", { method: "POST", body: formData });
                                        const data = await res.json();
                                        if (data.url) updateMedia(phase.id, m.id, "url", data.url);
                                      };
                                      input.click();
                                    }}
                                    className="shrink-0 h-7 px-2 rounded border border-brand-primary/30 text-brand-primary text-[10px] font-semibold hover:bg-brand-primary/5 transition"
                                  >
                                    Upload
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              value={m.message}
                              onChange={(e) => updateMedia(phase.id, m.id, "message", e.target.value)}
                              placeholder="Caption / message"
                              className="flex-1 h-7 px-2 rounded border border-light-gray text-[11px] focus:outline-none focus:ring-1 focus:ring-brand-primary"
                            />
                            <input
                              value={m.referenceNo}
                              onChange={(e) => updateMedia(phase.id, m.id, "referenceNo", e.target.value)}
                              placeholder="Ref No."
                              className="w-20 h-7 px-2 rounded border border-light-gray text-[11px] focus:outline-none focus:ring-1 focus:ring-brand-primary"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMedia(phase.id, m.id)}
                          className="shrink-0 p-1 text-mid-gray hover:text-destructive mt-1"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Add Media Buttons ── */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => addMedia(phase.id, "image")}
                    className="inline-flex items-center gap-1 h-6 px-2 text-[11px] font-semibold rounded border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition"
                  >
                    <Image className="size-3" /> Image
                  </button>
                  <button
                    type="button"
                    onClick={() => addMedia(phase.id, "video")}
                    className="inline-flex items-center gap-1 h-6 px-2 text-[11px] font-semibold rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition"
                  >
                    <Video className="size-3" /> Video
                  </button>
                  <button
                    type="button"
                    onClick={() => addMedia(phase.id, "model3d")}
                    className="inline-flex items-center gap-1 h-6 px-2 text-[11px] font-semibold rounded border border-purple-200 text-purple-600 hover:bg-purple-50 transition"
                  >
                    <Box className="size-3" /> 3D Model
                  </button>
                </div>

                {phase.completion > 0 && (
                  <div className="h-1.5 rounded-full bg-light-gray overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-primary transition-all"
                      style={{ width: `${phase.completion}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addPhase}
        className="inline-flex items-center gap-1.5 h-8 px-3 text-xs border-2 border-dashed border-light-gray text-mid-gray hover:border-brand-primary hover:text-brand-primary transition w-full justify-center"
      >
        <Plus className="size-4" /> Add Phase
      </button>
    </div>
  );
}
