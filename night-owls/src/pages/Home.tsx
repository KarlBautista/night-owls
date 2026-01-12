import SearchBanner from '../components/SearchBanner'
import Trending from '../components/Trending'

const Home = () => {
  return (
    <div className='px-5 pb-10 md:px-10'>
      <SearchBanner />
      <Trending />
    </div>
  )
}

export default Home
