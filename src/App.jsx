import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Kadernictvi from './pages/Kadernictvi'
import Cosmetics from './pages/Cosmetics'
import Massage from './pages/Massage'
import Nails from './pages/Nails'
import Lymphatic from './pages/Lymphatic'
import ScrollToTop from './components/ScrollToTop'
import Supabase from './components/supabase'

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kadernictvi" element={<Kadernictvi />} />
            <Route path="/cosmetics" element={<Cosmetics />} />
            <Route path="/massage" element={<Massage />} />
            <Route path="/nails" element={<Nails />} />
            <Route path="/lymphatic" element={<Lymphatic />} />
            <Route path="/supabase" element={<Supabase />} />
          </Routes>
        </main>
        <Footer/>
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App