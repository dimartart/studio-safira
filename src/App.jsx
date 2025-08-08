import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Hairdressing from './pages/Hairdressing'
import Cosmetics from './pages/Cosmetics'
import Massage from './pages/Massage'
import Nails from './pages/Nails'
import Lympha from './pages/Lympha'
import Reservation from './pages/ReservationPage'
import ScrollToTop from './components/ScrollToTop'
import AdminRoute from './pages/AdminRouter' 
import EditReservation from './pages/EditReservation' 
import DateTimeSelector from './components/DateTimeSelector'

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hairdressing" element={<Hairdressing />} />
            <Route path="/cosmetics" element={<Cosmetics />} />
            <Route path="/massage" element={<Massage />} />
            <Route path="/nails" element={<Nails />} />
            <Route path="/lympha" element={<Lympha />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/edit/:modification_token" element={<EditReservation />} />
            <Route path="/date-time-selector" element={<DateTimeSelector />} />
          </Routes>
        </main>
        <Footer/>
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App