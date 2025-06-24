import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Service from '../components/Service'
import Portfolio from '../components/Portfolio'
import Reservation from '../components/Reservation'
import About from '../components/About'
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
        <Reservation/>
      </ScrollFadeIn>
    </>
  )
}

export default Home 