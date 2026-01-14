import { useEffect, useState } from 'react'
import VideoBox from './VideoBox'
import { useNavigate } from 'react-router-dom'
import { useVideoStore } from '../store/VideoStore'
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  channel: string;
  url: string;
  duration: string;
}
const AllVideos  = () => {

  
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loadInitialVideos, loadMoreVideos, videos, loading, hasMore, error } = useVideoStore();

  useEffect(() => {
        const getVideos = async () => {
            try {
          await loadInitialVideos();
            } catch (err: unknown) {
          console.error('Error getting videos:', err);
            }
        }
        getVideos()
    }, [])

  if (selectedVideo) {
      navigate(`/video/${selectedVideo}`);
  }

  const handleLoadMore = async () => {
    await loadMoreVideos();
  }
 
  return (
    <section className='mt-8 mb-10 h-auto'>
      <h1 className='text-[24px] text-white font-bold'>Trending Tutorials</h1>
      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
       {videos.map((video) => (
        <VideoBox key={video.id} video={video} onSelect={(id) => setSelectedVideo(id)}/>
       ))}
          
      </div>
      {error && (
        <p className='mt-6 text-center text-sm text-red-300'>
          {error}
        </p>
      )}

      <div className='mt-8 flex justify-center'>
        <button
          type='button'
          onClick={handleLoadMore}
          disabled={loading || !hasMore}
          aria-busy={loading}
          className='inline-flex items-center justify-center rounded-full bg-white/5 px-8 py-3 text-sm font-semibold text-white/90 shadow-sm ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10 hover:text-white hover:ring-teal-400/40 hover:shadow-[0_18px_45px_-22px_rgba(45,212,191,0.65)] active:translate-y-px active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1D3A] disabled:cursor-not-allowed disabled:opacity-50'
        >
          {loading ? 'Loading…' : hasMore ? 'Load More' : 'No more videos'}
        </button>
      </div>
    </section>
  )
}

export default AllVideos
