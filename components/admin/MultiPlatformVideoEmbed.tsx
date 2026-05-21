"use client";

import { useState } from "react";
import { uid } from "@/lib/id";
import {
  Youtube,
  X,
  Star,
  ExternalLink,
  Globe,
  Film,
  Music2,
} from "lucide-react";

interface VideoItem {
  id: string;
  platform: string;
  sourceUrl: string;
  videoId: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  fileUrl: string;
  fileType: string;
  duration: string;
  isFeatured: boolean;
  order: number;
}

interface Props {
  items: VideoItem[];
  onChange: (items: VideoItem[]) => void;
}

const PLATFORMS = [
  { id: "youtube", label: "YouTube", icon: Youtube, color: "bg-red-600" },
  { id: "facebook", label: "Facebook", icon: Globe, color: "bg-blue-600" },
  {
    id: "instagram",
    label: "Instagram",
    icon: Music2,
    color: "bg-pink-600",
  },
  { id: "tiktok", label: "TikTok", icon: Film, color: "bg-gray-900" },

];

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

function extractFacebookVideoId(url: string): string | null {
  if (url.includes("facebook.com") || url.includes("fb.watch")) return url;
  return null;
}

function extractInstagramReelId(url: string): string | null {
  const match = url.match(
    /(?:instagram\.com\/(?:reel|p)\/)([a-zA-Z0-9_-]+)/,
  );
  return match ? match[1] : null;
}

function extractTikTokVideoId(url: string): string | null {
  const match = url.match(
    /(?:tiktok\.com\/@[\w.-]+\/video\/)(\d+)/,
  );
  return match ? match[1] : null;
}

function detectPlatform(url: string): string {
  if (extractYoutubeId(url)) return "youtube";
  if (url.includes("facebook.com") || url.includes("fb.watch"))
    return "facebook";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("tiktok.com") || url.includes("vm.tiktok.com"))
    return "tiktok";
  return "youtube";
}

function getPlatformBadge(platform: string) {
  return (
    PLATFORMS.find((p) => p.id === platform) ?? PLATFORMS[0]
  );
}

export function MultiPlatformVideoEmbed({ items, onChange }: Props) {
  const [platform, setPlatform] = useState("youtube");
  const [url, setUrl] = useState("");
  const [fetching, setFetching] = useState(false);

  const addVideo = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    if (platform === "youtube") {
      const youtubeId = extractYoutubeId(trimmed);
      if (!youtubeId) return;

      setFetching(true);
      let title = "YouTube Video";
      try {
        const ogRes = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${youtubeId}`,
        );
        const ogData = await ogRes.json();
        title = ogData.title ?? title;
      } catch {}
      setFetching(false);

      const newItem: VideoItem = {
        id: uid(),
        platform: "youtube",
        sourceUrl: trimmed,
        videoId: youtubeId,
        title,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
        fileUrl: "",
        fileType: "",
        duration: "",
        isFeatured: items.length === 0,
        order: items.length,
      };
      onChange([...items, newItem]);
      setUrl("");
    } else if (platform === "facebook") {
      const id = extractFacebookVideoId(trimmed);
      if (!id) return;

      const newItem: VideoItem = {
        id: uid(),
        platform: "facebook",
        sourceUrl: trimmed,
        videoId: trimmed,
        title: "Facebook Video",
        thumbnail: "",
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(trimmed)}&show_text=false`,
        fileUrl: "",
        fileType: "",
        duration: "",
        isFeatured: items.length === 0,
        order: items.length,
      };
      onChange([...items, newItem]);
      setUrl("");
    } else if (platform === "instagram") {
      const reelId = extractInstagramReelId(trimmed);
      if (!reelId) return;

      const newItem: VideoItem = {
        id: uid(),
        platform: "instagram",
        sourceUrl: trimmed,
        videoId: reelId,
        title: "Instagram Reel",
        thumbnail: "",
        embedUrl: `https://www.instagram.com/p/${reelId}/embed`,
        fileUrl: "",
        fileType: "",
        duration: "",
        isFeatured: items.length === 0,
        order: items.length,
      };
      onChange([...items, newItem]);
      setUrl("");
    } else if (platform === "tiktok") {
      const videoId = extractTikTokVideoId(trimmed);
      if (!videoId) return;

      const newItem: VideoItem = {
        id: uid(),
        platform: "tiktok",
        sourceUrl: trimmed,
        videoId: videoId,
        title: "TikTok Video",
        thumbnail: "",
        embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
        fileUrl: "",
        fileType: "",
        duration: "",
        isFeatured: items.length === 0,
        order: items.length,
      };
      onChange([...items, newItem]);
      setUrl("");
    }
  };

  const remove = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    if (items.find((i) => i.id === id)?.isFeatured && next.length)
      next[0].isFeatured = true;
    onChange(next);
  };

  const setFeatured = (id: string) => {
    onChange(items.map((i) => ({ ...i, isFeatured: i.id === id })));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addVideo();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 mb-3">
        {PLATFORMS.map((p) => {
          const Icon = p.icon;
          const active = platform === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={`inline-flex items-center gap-1.5 h-7 px-2.5 text-[11px] font-semibold rounded transition ${
                active
                  ? `${p.color} text-white`
                  : "bg-gray-100 text-mid-gray hover:bg-gray-200"
              }`}
            >
              <Icon className="size-3" /> {p.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Paste ${PLATFORMS.find((p) => p.id === platform)?.label} URL...`}
          className="flex-1 h-10 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
        <button
          type="button"
          onClick={addVideo}
          disabled={!url || fetching}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded border border-brand-primary bg-brand-primary text-white hover:opacity-85 transition disabled:opacity-60"
        >
          <Youtube className="size-4" />
          {fetching ? "Fetching..." : "Add"}
        </button>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => {
            const badge = getPlatformBadge(item.platform);
            const Icon = badge.icon;
            return (
              <div
                key={item.id}
                className={`relative group rounded-xl overflow-hidden bg-gray-50 border-2 ${
                  item.isFeatured ? "border-brand-primary" : "border-transparent"
                }`}
              >
                <div className="aspect-video bg-black relative">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : item.fileUrl ? (
                    <video
                      src={item.fileUrl}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <Icon className="size-12 text-white/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Icon className="size-6 text-brand-primary ml-0.5" />
                    </div>
                  </div>
                  <span
                    className={`absolute top-2 left-2 ${badge.color} text-white text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1`}
                  >
                    <Icon className="size-3" /> {badge.label}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-dark-text truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-mid-gray">
                    {item.platform === "upload"
                      ? `Uploaded (${item.fileType.toUpperCase()})`
                      : item.platform === "youtube"
                        ? "youtube.com"
                        : item.platform === "facebook"
                          ? "facebook.com"
                          : item.platform === "instagram"
                            ? "instagram.com"
                            : "tiktok.com"}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    type="button"
                    onClick={() => setFeatured(item.id)}
                    className={`p-1.5 rounded-full ${
                      item.isFeatured
                        ? "bg-brand-primary text-white"
                        : "bg-white/90 text-mid-gray hover:bg-brand-primary hover:text-white"
                    }`}
                    title="Set as featured"
                  >
                    <Star
                      className="size-3.5"
                      fill={item.isFeatured ? "currentColor" : "none"}
                    />
                  </button>
                  {item.sourceUrl && item.sourceUrl.startsWith("http") && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-white/90 text-mid-gray hover:text-brand-primary"
                      title="Open original"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="p-1.5 rounded-full bg-white/90 text-mid-gray hover:bg-destructive hover:text-white"
                    title="Remove"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                {item.isFeatured && (
                  <span className="absolute top-2 left-14 bg-brand-primary text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    FEATURED
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
