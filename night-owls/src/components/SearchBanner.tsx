import React from 'react'

const SearchBanner = () => {
  return (
    <section className='w-full h-[40%] flex flex-col items-center gap-2'>
        <div className='w-full h-[20%] flex justify-center items-center mt-5 mb-5'>
            <h1 className='text-white font-bold text-5xl text-center '>Master coding in the <span className='text-teal-300'>dark</span></h1>
        </div>
        <div className='mb-5'>
             <p className='text-[20px] text-[#B0B0B0] text-center'>Curated programming tutorials for night owls. Learn React, Python, and more </p>
             <p className='text-[20px] text-[#B0B0B0] text-center'>without straining your eyes.</p>
        </div>
        <div className='w-full md:w-[40%] lg:w-[35%]'>
          
          <div className='relative w-full'>
               <span
              className='pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[#B0B0B0]'
              aria-hidden='true'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.3-4.3' />
              </svg>
            </span>
            <input
              type='text'
              placeholder='Search Tutorials...'
              aria-label='Search tutorials'
              className='bg-[#1e2a38] text-[#B0B0B0] text-[20px] w-full pl-10 pr-14 py-5 rounded-full'
            />

            
          </div>
        </div>
    </section>
  )
}

export default SearchBanner
