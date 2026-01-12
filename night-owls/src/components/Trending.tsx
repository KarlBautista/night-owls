import { useEffect, useState } from 'react'
import VideoBox from './VideoBox'
import axios from "axios"

const Trending = () => {
  const [vidoes, setVidoes] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTrendingVideos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/trending");
        if (!res.data.success) {
          throw new Error(res.data.error);
        }
        setVidoes(res.data.data);
        alert("got the data");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error ?? "Request Failed");
        } else {
          setError("Unexpected Error");
        }
      }
    }
    getTrendingVideos();
  }, [])
  console.log(vidoes)
  return (
    <section className='mt-8 mb-10 h-auto'>
      <h1 className='text-[24px] text-white font-bold'>Trending Tutorials</h1>
      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <VideoBox />
         <VideoBox />
          <VideoBox />
           <VideoBox />
            <VideoBox />
          
      </div>
    </section>
  )
}

export default Trending
