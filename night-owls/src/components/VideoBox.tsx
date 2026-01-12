const VideoBox = () => {
  return (
    <div className='w-full overflow-hidden rounded-2xl border border-[#1e2a38] bg-[#0f2138]'>
      <div className='aspect-video w-full bg-rose-400/25' />
      <div className='p-4'>
        <div className='h-4 w-3/4 rounded bg-white/10' />   
        <div className='mt-3 h-3 w-1/2 rounded bg-white/10' />
      </div>
    </div>
  )
}

export default VideoBox
