interface VideoEmbedProps {
  platform: string;
  embedUrl: string;
  fileUrl: string;
  title: string;
  className?: string;
}

export function VideoEmbed({
  platform,
  embedUrl,
  fileUrl,
  title,
  className,
}: VideoEmbedProps) {
  if (platform === "upload" && fileUrl) {
    return (
      <video
        src={fileUrl}
        controls
        playsInline
        className={`aspect-video w-full object-contain ${className ?? ""}`}
      >
        <track kind="captions" label="No captions" />
      </video>
    );
  }

  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`aspect-video w-full border-0 ${className ?? ""}`}
      />
    );
  }

  return null;
}
