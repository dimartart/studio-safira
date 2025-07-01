import React from 'react'
import Reservation from '../components/Reservation'
import SEOHelmet from '../components/SEOHelmet'
import { useTranslation } from 'react-i18next'

const ReservationPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <SEOHelmet 
        title={t('reservation.title')}
        description={t('reservation.warningBanner.title')}
      />
      <div className="min-h-screen bg-gradient-to-br from-[#1B191A] via-[#4D2039] to-[#600222] py-12">
        <Reservation />
      </div>
    </>
  )
}

export default ReservationPage 