import { MediaUploader } from "@/components/admin/MediaUploader";
import type { MediaItem } from "../types";

export function MediaSection({
  items,
  onChange,
}: {
  items: MediaItem[];
  onChange: (items: MediaItem[]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-secondary mb-1">
        Project Images
      </label>
      <p className="text-xs text-mid-gray mb-4">
        Drag and drop images. Mark one as the hero image for the project card.
      </p>
      <MediaUploader items={items} onChange={onChange} />
    </div>
  );
}
