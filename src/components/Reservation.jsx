import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { createClient } from "@supabase/supabase-js";

{/* Prepare supabase client for sending data to database */}
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const Reservation = () => {
  
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    service: '',
    date: null,
    time: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const isSunday = (date) => {
    return date.getDay() !== 0
  }

  // Generate time slots based on schedule
  const generateTimeSlots = (selectedDate) => {
    if (!selectedDate) return []
    
    const day = selectedDate.getDay() // 0 = Sunday, 1 = Monday, etc.
    const slots = []
  
    
    // Monday to Friday: 9:00 - 18:00
    // Saturday: 9:00 - 16:00
    const endHour = day === 6 ? 16 : 18
    
    for (let hour = 9; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    
    return slots
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date,
      time: '' // Reset time when date changes
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    // Validation
    if (!formData.name || !formData.surname || !formData.phone || !formData.email || !formData.service || !formData.date || !formData.time) {
      setMessage({ type: 'error', text: t('reservation.form.required') })
      setIsSubmitting(false)
      return
    }

    try {
      const { data : clientData, error: clientError } = await supabase
        .from('clients')
        .insert([
          {
            name: formData.name,
            created_at: new Date().toISOString(),
            surname: formData.surname,
            phone: formData.phone,
            email: formData.email
          }
        ])
        .select()

      if (clientError) {
        throw clientError
      }

      const clientId = clientData[0].id

      const { error: reservationError } = await supabase
      .from('reservation')
      .insert([
        {
          client_id: clientId,
          service: formData.service,
          date: formData.date.toISOString().split('T')[0],
          time: formData.time,
        }
      ]);

      if (reservationError) {
        throw reservationError
      }

      setMessage({ type: 'success', text: t('reservation.messages.success') })
      setFormData({
        name: '',
        surname: '',
        phone: '',
        email: '',
        service: '',
        date: null,
        time: ''
      })
    } catch (error) {
      console.error('Error submitting reservation:', error)
      setMessage({ type: 'error', text: t('reservation.messages.error') })
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = generateTimeSlots(formData.date)

  return (
    <>
      <div className="p-6 pt-12 max-w-4xl mx-auto bg-[#1B191A]">
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
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
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
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
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
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
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
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="p-6 rounded-lg border border-[#D41C8A] shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {t('reservation.form.appointmentDetails')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
                {t('reservation.form.service')} *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="appearance-none w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              >
                <option value="" className="p-4 text-[#a1a1a1]">{t('reservation.form.servicePlaceholder')}</option>
                {t('reservation.services', { returnObjects: true }).map((service) => (
                  <option key={service.value} value={service.value} className="p-4 text-[#a1a1a1]">
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
                {t('reservation.form.date')} *
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                filterDate={isSunday}
                minDate={new Date()}
                placeholderText={t('reservation.form.datePlaceholder')}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-white placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-white mb-2">
                {t('reservation.form.time')} *
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="appearance-none w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-white rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors disabled:opacity-50"
                required
                disabled={!formData.date}
              >
                <option value="" className="bg-[#1B191A] text-[#a1a1a1]">{t('reservation.form.timePlaceholder')}</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot} className=" bg-[#1B191A] text-white">
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
              ? 'bg-gradient-to-r from-[#4D2039] to-[#600222] text-white border-[#D41C8A]' 
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