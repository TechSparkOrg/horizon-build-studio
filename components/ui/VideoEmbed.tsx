"use client";

import { Youtube, Globe, Music2, Film, Video } from "lucide-react";

const PLATFORM_STYLES: Record<string, { label: string; color: string; icon: typeof Youtube }> = {
  youtube: { label: "YouTube", color: "bg-red-600", icon: Youtube },
  facebook: { label: "Facebook", color: "bg-blue-600", icon: Globe },
  instagram: { label: "Instagram", color: "bg-pink-600", icon: Music2 },
  tiktok: { label: "TikTok", color: "bg-gray-900", icon: Film },
  upload: { label: "Uploaded", color: "bg-emerald-600", icon: Video },
};

interface VideoEmbedProps {
  platform: string;
  embedUrl: string;
  fileUrl: string;
  fileType: string;
  title: string;
  thumbnail: string;
  sourceUrl: string;
  className?: string;
}

export function VideoEmbed({
  platform,
  embedUrl,
  fileUrl,
  title,
  className,
}: VideoEmbedProps) {
  const style = PLATFORM_STYLES[platform] ?? PLATFORM_STYLES.youtube;
  const Icon = style.icon;

  if (platform === "upload" && fileUrl) {
    return (
      <div className={`relative aspect-video bg-black rounded-2xl overflow-hidden ${className ?? ""}`}>
        <video
          src={fileUrl}
          controls
          playsInline
          className="w-full h-full object-contain"
        >
          <track kind="captions" label="No captions" />
        </video>
        <span
          className={`absolute top-3 left-3 ${style.color} text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 z-10`}
        >
          <Icon className="size-3" /> {style.label}
        </span>
      </div>
    );
  }

  if (embedUrl) {
    return (
      <div className={`relative aspect-video bg-black rounded-2xl overflow-hidden ${className ?? ""}`}>
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
        <span
          className={`absolute top-3 left-3 ${style.color} text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 z-10`}
        >
          <Icon className="size-3" /> {style.label}
        </span>
      </div>
    );
  }

  return null;
}
