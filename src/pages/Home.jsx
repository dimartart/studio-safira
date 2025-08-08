import Hero from '../components/Hero'
import Service from '../components/Service'
import About from '../components/About'
import ReservationBanner from '../components/ReservationBanner'
import ClientReviews from '../components/ClientReviews'
import Contact from '../components/Contact'
import ScrollFadeIn from '../components/FadeInAnim'

const Home = () => {
  

  return (
    <>
      
      <ScrollFadeIn>
       <Hero/>
      </ScrollFadeIn>
      
      <ScrollFadeIn>
        <Service/>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <About/>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <ReservationBanner/>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <ClientReviews/>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <Contact/>
      </ScrollFadeIn>
    </>
  )
}

export default Home 