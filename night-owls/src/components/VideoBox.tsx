
interface Video {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  channel: string;
  url: string;
  duration: string;
}

interface VideoBoxProps {
  video: Video;
  onSelect?: (id: string) => void;
}
const VideoBox: React.FC<VideoBoxProps> = ({ video, onSelect }) => {
  return (
    <div
      className={
        "group w-full overflow-hidden rounded-2xl border border-[#1e2a38] bg-[#0f2138] flex flex-col " +
        "transition-all duration-200 ease-out " +
        "hover:-translate-y-1 hover:border-[#2b4a6b] hover:shadow-[0_18px_45px_-20px_rgba(56,189,248,0.35)] " +
        "focus-within:-translate-y-1 focus-within:border-[#2b4a6b] focus-within:shadow-[0_18px_45px_-20px_rgba(56,189,248,0.35)] " +
        (onSelect ? "cursor-pointer" : "")
      }
      onClick={() => onSelect?.(video.id)}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : -1}
      onKeyDown={(e) => {
        if (!onSelect) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(video.id);
        }
      }}
    >
      <div className="w-full aspect-video bg-[#0b1a2c] relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]"
          loading="lazy"
        />

        {/* Hover overlay + play button */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />
        <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100 scale-95">
          <div className="h-14 w-14 rounded-full bg-[#0f2138]/80 ring-1 ring-sky-300/60 shadow-[0_10px_30px_-12px_rgba(56,189,248,0.65)] grid place-items-center">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              aria-hidden="true"
              className="translate-x-px fill-sky-200"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      
          <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
            {video.duration}
          </span>
      
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-[#f5f5f5] text-lg sm:text-xl font-semibold leading-snug">
          {video.title}
        </h2>

        <div className="flex items-center justify-between gap-3 text-sm text-[#b0b0b0]">
          <span className="truncate">{video.channel}</span>
          <span className="shrink-0">{video.views}  views</span>
        </div>
      </div>
       
    </div>
  )
}

export default VideoBox
