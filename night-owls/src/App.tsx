import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import VideoWithEditor from './pages/VideoWithEditor'
import { Route, Routes } from 'react-router-dom'
function App() {
  

  return (
  <div className='min-h-screen w-full bg-[#0B1D3A] pb-10'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/video/:id" element={<VideoWithEditor />}/>
      </Routes>
 

   </div>
  )
}

export default App
