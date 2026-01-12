import VideoBox from './VideoBox'
const Trending = () => {
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
