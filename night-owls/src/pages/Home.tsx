import SearchBanner from '../components/SearchBanner'
import AllVideos from '../components/AllVideos'

const Home = () => {
  return (
    <div className='px-5 pb-10 md:px-10'>
      <SearchBanner />
      <AllVideos />
    </div>
  )
}

export default Home
