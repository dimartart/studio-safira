import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import { format } from "date-fns";
import emailjs from 'emailjs-com';
import DateTimeSelector from './DateTimeSelector'
import { createReservationWithClient } from '../lib/db';


const Reservation = () => {
  
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    service: '',
    date: null,
    time_end: '',
    time_start: '',
    modification_token: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [message, setMessage] = useState({ type: '', text: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReservationChange = (partial) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.service || !formData.date || !formData.time_start) {
      alert('Please be sure you have selectes a service, date and time.');
      return;
    }

    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      const reservation = await createReservationWithClient(formData)
      setMessage({ type: 'success', text: t('reservation.messages.success') })
      // sendEmail(formData, reservation.client_id)
    } catch (error) {
      console.error('Error creating reservation:', error)
      setMessage({ type: 'error', text: t('reservation.messages.error') })
    }
    finally {
      setFormData({
        name: '',
        surname: '',
        phone: '',
        email: '',
        service: '',
        date: null,
        time_end: '',
        time_start: '',
        modification_token: ''
      })
      
      setIsSubmitting(false)
    }
  }
  
  const sendEmail = (formData, reservationId) => {
    const templateParams = {
      to_email: formData.email,
      to_name: `${formData.name} ${formData.surname}`,
      service: formData.service,
      date: formData.date.toLocaleDateString(),
      time: formData.time,
      link_cancel: `https://studio-safira.vercel.app/cancel/${formData.modification_token}`,
      link_edit: `https://studio-safira.vercel.app/edit/${formData.modification_token}`
    };

    const serviceId = String(import.meta.env.VITE_SERVICE_ID)
    const templateId = String(import.meta.env.VITE_TEMPLATE_ID)
    const publicKey = String(import.meta.env.VITE_PUBLIC_KEY)

    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then(() => {
      console.log('Email sent successfully');
    })
    .catch((error) => {
      console.error('Email send error:', error);
    });
  };

  return (
    <>
      <div className="p-6 pt-12 max-w-4xl mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          {t('reservation.title')}
        </h1>

      {/* Warning Banner */}
      <div className=" border border-[#D41C8A] p-6 mb-8 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          {t('reservation.warningBanner.title')}
        </h3>
        <div className="space-y-2 text-[#d4d4d4]">
          <p className="flex items-start">
            <span className="inline-block w-2 h-2 bg-[#D41C8A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('reservation.warningBanner.cancelationPolicy')}
          </p>
          <p className="flex items-start">
            <span className="inline-block w-2 h-2 bg-[#D41C8A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('reservation.warningBanner.confirmationTime')}
          </p>
          <p className="flex items-start">
            <span className="inline-block w-2 h-2 bg-[#D41C8A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('reservation.warningBanner.arrivalTime')}
          </p>
          <p className="flex items-start">
            <span className="inline-block w-2 h-2 bg-[#D41C8A] rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t('reservation.warningBanner.contactInfo')}
          </p>
        </div>
      </div>

      {/* Schedule Information */}
      <div className="p-6 rounded-lg border border-[#D41C8A] shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-white">
          {t('contact.hours.title')}
        </h3>
        <div className="flex gap-4 lg:gap-6 text-sm text-[#a1a1a1]">
          <div>{t('reservation.schedule.workingHours')}</div>
          <div>{t('reservation.schedule.saturday')}</div>
          <div className="text-[#D41C8A] font-medium">{t('reservation.schedule.sunday')}</div>
        </div>
      </div>

      {/* Reservation Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className=" p-6 rounded-lg border border-[#D41C8A] shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {t('reservation.form.personalInfo')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                {t('reservation.form.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('reservation.form.namePlaceholder')}
                className="w-full px-4 py-3  border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-white mb-2">
                {t('reservation.form.surname')} *
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder={t('reservation.form.surnamePlaceholder')}
                className="w-full px-4 py-3  border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                {t('reservation.form.phone')} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t('reservation.form.phonePlaceholder')}
                className="w-full px-4 py-3  border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                {t('reservation.form.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('reservation.form.emailPlaceholder')}
                className="w-full px-4 py-3  border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
          </div>
        </div>

        <DateTimeSelector value={formData} onChange={handleReservationChange} />

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer bg-gradient-to-r from-[#b9478c] via-[#D41C8A] to-[#E91E63] text-white px-8 py-4 rounded-lg font-semibold text-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg border border-[#D41C8A]"
          >
            {isSubmitting ? t('reservation.form.submitting') : t('reservation.form.submitButton')}
          </button>
        </div>
        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border-2 ${
            message.type === 'success' 
              ? 'bg-gradient-to-r from-[#4d953b] to-[#026024] text-white border-[#D41C8A]' 
              : 'bg-gradient-to-r from-[#600222] to-[#4D2039] text-white border-[#B8156E]'
          }`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
    </>
  )
}

export default Reservation 