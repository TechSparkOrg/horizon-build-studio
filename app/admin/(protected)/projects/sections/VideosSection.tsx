import { MultiPlatformVideoEmbed } from "@/components/admin/MultiPlatformVideoEmbed";
import type { VideoItem } from "../types";

export function VideosSection({
  items,
  onChange,
}: {
  items: VideoItem[];
  onChange: (items: VideoItem[]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-secondary mb-1">
        Project Videos
      </label>
      <p className="text-xs text-mid-gray mb-4">
        Add videos from YouTube, Facebook, Instagram Reels, TikTok, or upload video files.
      </p>
      <MultiPlatformVideoEmbed items={items} onChange={onChange} />
    </div>
  );
}
