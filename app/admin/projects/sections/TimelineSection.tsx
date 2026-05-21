import { TimelineBuilder } from "@/components/admin/TimelineBuilder";
import type { PhaseItem, ModelItem, MediaItem, VideoItem } from "../types";

export function TimelineSection({
  items,
  onChange,
  models3d,
  media,
  videos,
}: {
  items: PhaseItem[];
  onChange: (items: PhaseItem[]) => void;
  models3d?: ModelItem[];
  media?: MediaItem[];
  videos?: VideoItem[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-secondary mb-1">
        Construction Timeline
      </label>
      <p className="text-xs text-mid-gray mb-4">
        Add project phases to show construction progress. Phases display as an animated
        vertical timeline on the project page.
      </p>
      <TimelineBuilder
        phases={items}
        onChange={onChange}
        models3d={models3d}
        media={media}
        videos={videos}
      />
    </div>
  );
}
