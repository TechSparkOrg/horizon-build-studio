import Link from "next/link";
import { Pencil, MapPin, Briefcase } from "lucide-react";
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
}

export function ProjectCard({ project }: Props) {
  const s = STATUS_MAP[project.status];

  return (
    <div className="bg-white border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="relative aspect-video bg-gray-50 overflow-hidden">
        {project.img ? (
          <img src={project.img} alt={project.alt || project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Briefcase className="size-8" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          {!project.published && (
            <span className="bg-gray-800 text-white text-[10px] font-semibold px-2 py-0.5">DRAFT</span>
          )}
          {project.featured && (
            <span className="bg-black text-white text-[10px] font-semibold px-2 py-0.5">FEATURED</span>
          )}
        </div>
        {s && (
          <div className="absolute bottom-2 left-2">
            <span className={`text-[10px] font-semibold px-2 py-0.5 border bg-white ${s.color}`}>{s.label}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug">{project.title}</h3>
          <Link href={`/admin/projects/${project.id}`} className="shrink-0 p-1 text-gray-400 hover:text-black" title="Edit">
            <Pencil className="size-3.5" />
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <MapPin className="size-3" /> {project.location}
        </p>
        {project.completion > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1 bg-gray-200 rounded max-w-16">
              <div className="h-full bg-black rounded" style={{ width: `${project.completion}%` }} />
            </div>
            <span className="text-xs text-gray-500">{project.completion}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
