
interface Video {
  id: string;
  thumbnail: string;
  title: string;
  views: string;
  channel: string;
  url: string;
}

interface VideoBoxProps {
  video: Video;
  onSelect?: (id: string) => void;
}
const VideoBox: React.FC<VideoBoxProps> = ({ video, onSelect }) => {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[#1e2a38] bg-[#0f2138] flex flex-col"
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
      <div className="w-full aspect-video bg-[#0b1a2c]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-[#f5f5f5] text-lg sm:text-xl font-semibold leading-snug">
          {video.title}
        </h2>

        <div className="flex items-center justify-between gap-3 text-sm text-[#b0b0b0]">
          <span className="truncate">{video.channel}</span>
          <span className="shrink-0">{video.views}</span>
        </div>
      </div>
       
    </div>
  )
}

export default VideoBox
