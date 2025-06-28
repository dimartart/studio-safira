import { useTranslation } from 'react-i18next'
import Hero from '../components/Hero'
import Service from '../components/Service'
import About from '../components/About'
import ReservationBanner from '../components/ReservationBanner'
import ClientReviews from '../components/ClientReviews'
import Contact from '../components/Contact'
import ScrollFadeIn from '../components/FadeInAnim'
import SEOHelmet from '../components/SEOHelmet'

const Home = () => {
  const { t, i18n } = useTranslation();
  
  // SEO data based on current language
  const seoData = {
    cz: {
      title: "Studio Safira - Kosmetický salon Praha 7 | Kadeřnictví, Kosmetika, Masáže",
      description: "Studio Safira - profesionální kosmetický salon v Praze 7. Nabízíme kadeřnictví, kosmetiku, masáže, pedikúru a lymfatické drenáže. Rezervace online, sleva 20% pro nové klienty.",
      keywords: "kosmetický salon praha, kadeřnictví praha 7, kosmetika praha, masáže praha, pedikúra praha, lymfatické drenáže, studio safira, beauty salon prague"
    },
    en: {
      title: "Studio Safira - Beauty Salon Prague 7 | Hairdressing, Cosmetics, Massage",
      description: "Studio Safira - professional beauty salon in Prague 7. We offer hairdressing, cosmetics, massage, pedicure and lymphatic drainage. Online booking, 20% discount for new clients.",
      keywords: "beauty salon prague, hairdressing prague 7, cosmetics prague, massage prague, pedicure prague, lymphatic drainage, studio safira, kosmetický salon"
    }
  };

  const currentSEO = seoData[i18n.language] || seoData.cz;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": currentSEO.title,
    "description": currentSEO.description,
    "url": "https://studiosafira.cz",
    "mainEntity": {
      "@type": "BeautySalon",
      "name": "Studio Safira",
      "description": currentSEO.description,
      "url": "https://studiosafira.cz",
      "telephone": "+420607191088",
      "email": "studiosafira@seznam.cz",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Turasova 13",
        "addressLocality": "Praha 7",
        "addressRegion": "Praha",
        "postalCode": "170 00",
        "addressCountry": "CZ"
      },
      "openingHours": [
        "Mo-Fr 09:00-18:00",
        "Sa 09:00-16:00"
      ],
      "priceRange": "$$",
      "image": "https://studiosafira.cz/hero/bg1.webp"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": t('navbar.home'),
          "item": "https://studiosafira.cz"
        }
      ]
    }
  };

  return (
    <>
      <SEOHelmet
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        canonicalUrl="https://studiosafira.cz"
        structuredData={structuredData}
      />
      
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