"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Eye, MapPin, Clock, CheckSquare, Square, Briefcase, Copy } from "lucide-react";
import { STATUS_OPTIONS, STATUS_COLORS } from "../field-config";

const STATUS_MAP = Object.fromEntries(
  STATUS_OPTIONS.map((s) => [s.value, { label: s.label, color: STATUS_COLORS[s.value] ?? "bg-gray-50 text-gray-600 border-gray-200" }]),
);

interface Props {
  project: {
    id: string;
    title: string;
    slug: string;
    img: string;
    alt: string;
    status: string;
    completion: number;
    location: string;
    featured: boolean;
    published: boolean;
    updatedAt: string;
  };
  selected: boolean;
  onToggle: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export function ProjectCard({ project, selected, onToggle, onDuplicate }: Props) {
  const s = STATUS_MAP[project.status];
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-light-gray shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative aspect-video bg-off-white rounded-t-2xl overflow-hidden">
        {project.img && !imgError ? (
          <>
            <img
              src={project.img}
              alt={project.alt || project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-mid-gray text-xs">
            <div className="text-center">
              <div className="size-10 mx-auto mb-1.5 rounded-xl border border-light-gray bg-white flex items-center justify-center text-mid-gray/40">
                <Briefcase className="size-4" />
              </div>
              <span className="text-[11px]">No image</span>
            </div>
          </div>
        )}
        <button
          onClick={() => onToggle(project.id)}
          className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {selected ? (
            <CheckSquare className="size-4 text-brand-primary drop-shadow-sm" />
          ) : (
            <Square className="size-4 text-white/80 drop-shadow-sm" />
          )}
        </button>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {!project.published && (
            <span className="bg-gray-800/80 text-white text-[10px] font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
              DRAFT
            </span>
          )}
          {project.featured && (
            <span className="bg-brand-primary/90 text-white text-[10px] font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
              FEATURED
            </span>
          )}
        </div>
        {s && (
          <div className="absolute bottom-3 left-3">
            <span className={`text-[10px] font-semibold px-2 py-1 rounded-md border bg-white/90 backdrop-blur-sm ${s.color.replace('border-', '')}`}>
              {s.label}
            </span>
          </div>
        )}
        <div className="absolute inset-x-3 bottom-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 justify-end">
          <Link
            href={`/admin/projects/${project.id}`}
            className="inline-flex items-center justify-center gap-1 h-8 px-3 rounded-lg border border-white/60 bg-white/90 text-dark-text text-xs font-medium hover:bg-white shadow-sm backdrop-blur-sm"
          >
            <Pencil className="size-3" /> Edit
          </Link>
          <a
            href={`/projects/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 h-8 px-3 rounded-lg border border-white/60 bg-white/90 text-dark-text text-xs font-medium hover:bg-white shadow-sm backdrop-blur-sm"
          >
            <Eye className="size-3" /> Preview
          </a>
          {onDuplicate && (
            <button
              onClick={() => onDuplicate(project.id)}
              className="inline-flex items-center justify-center gap-1 h-8 px-3 rounded-lg border border-white/60 bg-white/90 text-dark-text text-xs font-medium hover:bg-white shadow-sm backdrop-blur-sm"
            >
              <Copy className="size-3" /> Copy
            </button>
          )}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-brand-secondary leading-snug line-clamp-2">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-mid-gray">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3" /> {project.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
        {project.completion > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-mid-gray">Progress</span>
              <span className="font-semibold text-brand-secondary">{project.completion}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-light-gray overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-primary to-orange-400 transition-all duration-500"
                style={{ width: `${project.completion}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
