  import React from 'react'



const SearchBanner = () => {
  return (
    <section className='w-full bg-[#0B1D3A] flex flex-col items-center justify-center py-24 px-4'>
      <div className='max-w-5xl w-full text-center flex flex-col items-center gap-8'>
        <div className='h-24 w-24 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg'>
          <span className='text-[#0B1D3A] font-bold text-4xl' aria-hidden>
            {'</>'}
          </span>
        </div>
        
        <h1 className='text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight'>
          Master <span className='text-orange-500'>JavaScript</span> in the dark.
        </h1>
        
        <p className='text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl'>
          Curated JavaScript tutorials for night owls. From fundamentals to advanced<br className='hidden sm:block' />
          concepts, learn at your own pace without straining your eyes.
        </p>

        <div className='flex flex-wrap items-center justify-center gap-3 mt-4'>
          <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-teal-500/30'>
            <div className='h-2 w-2 rounded-full bg-teal-400'></div>
            <span className='text-white text-sm font-medium'>100% JavaScript Focused</span>
          </div>
          <div className='px-4 py-2 rounded-full bg-white/5 border border-white/10'>
            <span className='text-gray-300 text-sm font-medium'>Beginner Friendly</span>
          </div>
          <div className='px-4 py-2 rounded-full bg-white/5 border border-white/10'>
            <span className='text-gray-300 text-sm font-medium'>Free Resources</span>
          </div>
        </div>
      </div>
    </section>
  )
}

  export default SearchBanner
