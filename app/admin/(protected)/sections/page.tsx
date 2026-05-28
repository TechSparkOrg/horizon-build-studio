"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Plus, Save, Upload, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { SECTIONS } from "@/lib/section-field-defs";
import type { FieldDef } from "@/lib/section-field-defs";
import type { SectionDef } from "@/lib/section-def";
import { toast } from "sonner";
import {
  getAllSectionDefs,
  createSectionDef,
  deleteSectionDef,
  getAllSectionContents,
  upsertSectionContents,
  uploadSectionFile,
} from "@/lib/services/actions/section.actions";

type Lang = "en" | "np";

const input = "w-full h-10 px-3 rounded border border-gray-300 text-sm";
const textarea = "w-full px-3 py-2 rounded border border-gray-300 text-sm resize-y";

function AddSectionModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [slug, setSlug] = useState("");
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slug.trim() || !label.trim()) { setError("Both fields required"); return; }
    setCreating(true);
    setError("");
    try {
      await createSectionDef(slug.trim(), label.trim());
      onCreated();
      onClose();
    } catch (e: any) { setError(e.message); }
    setCreating(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 border border-gray-200 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Add Section</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className={input} placeholder="e.g. gallery" />
          </div>
          <div>
            <label className="block text-sm mb-1">Label</label>
            <input value={label} onChange={(e) => setLabel(e.target.value)} className={input} placeholder="e.g. Gallery" />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={creating} className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 disabled:opacity-50 flex items-center gap-2">
              {creating ? <Loader2 className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
              {creating ? "Adding..." : "Add"}
            </button>
            <button type="button" onClick={onClose} className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextField({ field, enVal, npVal, onEnChange, onNpChange }: {
  field: FieldDef;
  enVal: string;
  npVal: string;
  onEnChange: (v: string) => void;
  onNpChange: (v: string) => void;
}) {
  const InputComponent = field.type === "textarea" ? "textarea" : "input";
  const cls = field.type === "textarea" ? textarea : input;
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{field.label}</label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1 block">English</span>
          <InputComponent
            className={cls}
            placeholder={`${field.label} (English)`}
            value={enVal}
            onChange={(e: any) => onEnChange(e.target.value)}
            rows={field.type === "textarea" ? 3 : undefined}
          />
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1 block">Nepali</span>
          <InputComponent
            className={cls}
            placeholder={`${field.label} (Nepali)`}
            value={npVal}
            onChange={(e: any) => onNpChange(e.target.value)}
            rows={field.type === "textarea" ? 3 : undefined}
          />
        </div>
      </div>
    </div>
  );
}

function MediaField({ field, media, onUpload, onRemove }: {
  field: FieldDef;
  media: { url?: string; type?: string };
  onUpload: () => void;
  onRemove: () => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{field.label}</label>
      {media.url ? (
        <div className="flex items-center gap-3 p-3 border border-gray-200">
          <span className="text-xs text-gray-500 truncate flex-1">{media.url}</span>
          {media.type === "model3d" ? (
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-purple-100 text-purple-700">3D</span>
          ) : (
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-blue-100 text-blue-700">Image</span>
          )}
          <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600"><ExternalLink className="size-3.5" /></a>
          <button type="button" onClick={onRemove} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 className="size-3.5" /></button>
        </div>
      ) : (
        <button type="button" onClick={onUpload} className="flex items-center gap-2 h-10 px-4 border border-dashed border-gray-300 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 cursor-pointer">
          <Upload className="size-4" />
          Upload {field.label}
        </button>
      )}
    </div>
  );
}

function RepeaterEditor({ field, items, onChange }: {
  field: FieldDef;
  items: any[];
  onChange: (items: any[]) => void;
}) {
  function updateItem(idx: number, subKey: string, value: string) {
    const next = [...items];
    next[idx] = { ...next[idx], [subKey]: value };
    onChange(next);
  }
  function addItem() {
    const blank: Record<string, string> = {};
    for (const sf of field.repeaterFields ?? []) blank[sf.key] = "";
    onChange([...items, blank]);
  }
  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{field.label}</label>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 border border-gray-200 relative">
            <button type="button" onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 cursor-pointer"><Trash2 className="size-3.5" /></button>
            <div className="grid grid-cols-2 gap-3 pr-8">
              {field.repeaterFields?.map((sf) => (
                <div key={sf.key}>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1 block">{sf.label}</span>
                  {sf.type === "textarea" ? (
                    <textarea className={textarea} rows={2} value={item[sf.key] ?? ""} onChange={(e) => updateItem(idx, sf.key, e.target.value)} />
                  ) : (
                    <input className={input} value={item[sf.key] ?? ""} onChange={(e) => updateItem(idx, sf.key, e.target.value)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={addItem} className="flex items-center gap-2 h-9 px-4 text-xs font-semibold border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 cursor-pointer">
          <Plus className="size-3.5" />
          Add {field.label} Item
        </button>
      </div>
    </div>
  );
}

export default function SectionsPage() {
  const [sectionDefs, setSectionDefs] = useState<SectionDef[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, Record<string, { en: string; np: string; mediaUrl?: string; mediaType?: string }>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  async function loadAll() {
    try {
      const [sections, items] = await Promise.all([
        getAllSectionDefs(),
        getAllSectionContents(),
      ]);
      setSectionDefs(sections);
      const grouped: Record<string, any> = {};
      for (const item of items) {
        if (!grouped[item.section]) grouped[item.section] = {};
        grouped[item.section][item.key] = {
          en: item.valueEn,
          np: item.valueNp,
          mediaUrl: item.mediaUrl ?? undefined,
          mediaType: item.mediaType ?? undefined,
        };
      }
      setData(grouped);
    } catch {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  function getVal(section: string, key: string, lang: Lang): string {
    return data[section]?.[key]?.[lang] ?? "";
  }

  function setVal(section: string, key: string, lang: Lang, value: string) {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] ?? {}),
        [key]: { ...(prev[section]?.[key] ?? { en: "", np: "" }), [lang]: value },
      },
    }));
  }

  function getMedia(section: string, key: string): { url?: string; type?: string } {
    const v = data[section]?.[key];
    return { url: v?.mediaUrl, type: v?.mediaType };
  }

  function setMedia(section: string, key: string, url: string, mediaType: string) {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] ?? {}),
        [key]: { ...(prev[section]?.[key] ?? { en: "", np: "" }), mediaUrl: url, mediaType },
      },
    }));
  }

  function getRepeater(section: string, key: string): any[] {
    const v = data[section]?.[key]?.en;
    if (!v) return [];
    try { return JSON.parse(v); } catch { return []; }
  }

  function setRepeater(section: string, key: string, items: any[]) {
    const json = JSON.stringify(items);
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] ?? {}),
        [key]: { ...(prev[section]?.[key] ?? { en: "", np: "" }), en: json, np: json },
      },
    }));
  }

  async function handleUpload(section: string, key: string) {
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*,.glb,.gltf";
    el.onchange = async () => {
      const file = el.files?.[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      try {
        const { url } = await uploadSectionFile(fd);
        const mediaType = file.name.endsWith(".glb") || file.name.endsWith(".gltf") ? "model3d" : "image";
        setMedia(section, key, url, mediaType);
        toast.success("File uploaded");
      } catch {
        toast.error("Upload failed");
      }
    };
    el.click();
  }

  async function saveSection(section: string) {
    const codeDef = SECTIONS[section as keyof typeof SECTIONS];
    if (!codeDef) { toast.error("No field definition for this section"); return; }
    setSaving(section);
    const items: Array<{ key: string; valueEn: string; valueNp: string; mediaUrl: string | null; mediaType: string | null; order: number }> = [];
    for (const f of codeDef.fields) {
      if (f.type === "media") {
        const m = getMedia(section, f.key);
        if (m.url) items.push({ key: f.key, valueEn: "", valueNp: "", mediaUrl: m.url, mediaType: m.type ?? "image", order: 0 });
      } else {
        items.push({ key: f.key, valueEn: getVal(section, f.key, "en"), valueNp: getVal(section, f.key, "np"), mediaUrl: null, mediaType: null, order: 0 });
      }
    }
    try {
      await upsertSectionContents(section, items);
      toast.success(`${codeDef.label} saved`);
    } catch {
      toast.error("Failed to save");
    }
    setSaving(null);
  }

  async function deleteSection(id: string, slug: string) {
    if (!confirm(`Delete section "${slug}"? This does NOT delete content data.`)) return;
    setDeleting(id);
    try {
      await deleteSectionDef(id);
      setSectionDefs((prev) => prev.filter((s) => s.id !== id));
      toast.success("Section removed");
    } catch { toast.error("Failed to delete"); }
    setDeleting(null);
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-xl font-bold mb-6">Section Content</h1>
        <div className="bg-white border border-gray-200 p-8 text-center text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {showAdd && <AddSectionModal onClose={() => setShowAdd(false)} onCreated={loadAll} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Section Content</h1>
          <p className="text-sm text-gray-500 mt-1">Edit homepage section text in English and Nepali.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 flex items-center gap-2">
          <Plus className="size-3.5" /> Add Section
        </button>
      </div>

      {sectionDefs.length === 0 ? (
        <div className="bg-white border border-gray-200 p-8 text-center text-sm text-gray-500">
          No sections defined yet. Click &quot;Add Section&quot; to create one.
        </div>
      ) : (
        <div className="space-y-2">
          {sectionDefs.map((sec) => {
            const isOpen = expanded === sec.slug;
            const codeDef = SECTIONS[sec.slug as keyof typeof SECTIONS];
            return (
              <div key={sec.id} className="bg-white border border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : sec.slug)}
                    className="flex items-center gap-2 text-left flex-1 cursor-pointer"
                  >
                    {isOpen ? <ChevronDown className="size-4 text-gray-600 shrink-0" /> : <ChevronRight className="size-4 text-gray-400 shrink-0" />}
                    <span className="font-medium text-sm">{codeDef?.label ?? sec.label}</span>
                    <span className="text-xs text-gray-400 font-mono">{sec.slug}</span>
                    {!codeDef && <span className="text-xs text-red-500 ml-2">(no field def — add in code)</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteSection(sec.id, sec.slug)}
                    disabled={deleting === sec.id}
                    className="cursor-pointer text-red-400 hover:text-red-600 p-1 disabled:opacity-50"
                  >
                    {deleting === sec.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                  </button>
                </div>
                {isOpen && codeDef && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
                    {codeDef.fields.map((field) => {
                      if (field.type === "repeater") {
                        return (
                          <RepeaterEditor
                            key={field.key}
                            field={field}
                            items={getRepeater(sec.slug, field.key)}
                            onChange={(items) => setRepeater(sec.slug, field.key, items)}
                          />
                        );
                      }
                      if (field.type === "media") {
                        return (
                          <MediaField
                            key={field.key}
                            field={field}
                            media={getMedia(sec.slug, field.key)}
                            onUpload={() => handleUpload(sec.slug, field.key)}
                            onRemove={() => setMedia(sec.slug, field.key, "", "")}
                          />
                        );
                      }
                      return (
                        <TextField
                          key={field.key}
                          field={field}
                          enVal={getVal(sec.slug, field.key, "en")}
                          npVal={getVal(sec.slug, field.key, "np")}
                          onEnChange={(v) => setVal(sec.slug, field.key, "en", v)}
                          onNpChange={(v) => setVal(sec.slug, field.key, "np", v)}
                        />
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => saveSection(sec.slug)}
                      disabled={saving === sec.slug}
                      className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded hover:opacity-85 disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving === sec.slug ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                      {saving === sec.slug ? "Saving..." : `Save ${codeDef.label}`}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
