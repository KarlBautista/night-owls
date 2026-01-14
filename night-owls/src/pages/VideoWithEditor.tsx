import React from 'react'
import { useParams } from 'react-router-dom'

import CodeEditor from '../components/CodeEditor'

const VideoWithEditor: React.FC = () => {
  const { id } = useParams()

  return (
    <div className='h-[calc(100vh-70px)] px-5 md:px-10 py-6'>
      <div className='flex flex-col md:flex-row gap-4 h-full'>
        <div className='w-full md:flex-1 md:min-h-0'>
          <div className='w-full aspect-video md:aspect-auto md:h-full overflow-hidden rounded-xl border border-white/10 bg-black/20'>
            <iframe
              className='w-full h-full'
              src={`https://www.youtube.com/embed/${id ?? ''}?rel=0`}
              title='Selected Video'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </div>

        <div className='w-full flex-1 min-h-0 md:flex-1'>
          <div className='h-full w-full overflow-hidden rounded-xl border border-white/10'>
            <CodeEditor />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoWithEditor
