import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const Reservation = () => {
  const datePickerStyle = `
    .react-datepicker-wrapper {
      width: 100%;
    }
  `
  
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

  // Generate time slots based on schedule
  const generateTimeSlots = (selectedDate) => {
    if (!selectedDate) return []
    
    const day = selectedDate.getDay() // 0 = Sunday, 1 = Monday, etc.
    const slots = []
    
    // Check if it's Sunday (closed)
    if (day === 0) {
      return []
    }
    
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

    // Check if selected date is Sunday
    if (formData.date.getDay() === 0) {
      setMessage({ type: 'error', text: t('reservation.messages.closedDay') })
      setIsSubmitting(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            date: formData.date.toISOString().split('T')[0],
            time: formData.time,
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        throw error
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
      <style dangerouslySetInnerHTML={{ __html: datePickerStyle }} />
      <div className="max-w-4xl mx-auto p-6 bg-[#1B191A] rounded-lg shadow-xl border border-[#D41C8A]">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#e8e8e8]">
          {t('reservation.title')}
        </h1>

      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-[#4D2039] to-[#600222] border-l-4 border-[#D41C8A] p-6 mb-8 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-[#e8e8e8] mb-4">
          {t('reservation.warningBanner.title')}
        </h3>
        <div className="space-y-2 text-[#a1a1a1]">
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

      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg border-2 ${
          message.type === 'success' 
            ? 'bg-gradient-to-r from-[#4D2039] to-[#600222] text-[#e8e8e8] border-[#D41C8A]' 
            : 'bg-gradient-to-r from-[#600222] to-[#4D2039] text-[#e8e8e8] border-[#B8156E]'
        }`}>
          {message.text}
        </div>
      )}

      {/* Reservation Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-gradient-to-r from-[#4D2039] to-[#600222] p-6 rounded-lg border border-[#D41C8A] shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-[#e8e8e8]">
            {t('reservation.form.personalInfo')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#a1a1a1] mb-2">
                {t('reservation.form.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('reservation.form.namePlaceholder')}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#e8e8e8] placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-[#a1a1a1] mb-2">
                {t('reservation.form.surname')} *
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder={t('reservation.form.surnamePlaceholder')}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#e8e8e8] placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#a1a1a1] mb-2">
                {t('reservation.form.phone')} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t('reservation.form.phonePlaceholder')}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#e8e8e8] placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#a1a1a1] mb-2">
                {t('reservation.form.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('reservation.form.emailPlaceholder')}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#e8e8e8] placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-gradient-to-r from-[#4D2039] to-[#600222] p-6 rounded-lg border border-[#D41C8A] shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-[#e8e8e8]">
            {t('reservation.form.appointmentDetails')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-[#a1a1a1] mb-2">
                {t('reservation.form.service')} *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#e8e8e8] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                required
              >
                <option value="" className="bg-[#1B191A] text-[#a1a1a1]">{t('reservation.form.servicePlaceholder')}</option>
                {t('reservation.services', { returnObjects: true }).map((service) => (
                  <option key={service.value} value={service.value} className="bg-[#1B191A] text-[#e8e8e8]">
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-[#a1a1a1] mb-2">
                {t('reservation.form.date')} *
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                minDate={new Date()}
                placeholderText={t('reservation.form.datePlaceholder')}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#e8e8e8] placeholder-[#a1a1a1] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-[#a1a1a1] mb-2">
                {t('reservation.form.time')} *
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1B191A] border border-[#4D2039] text-[#e8e8e8] rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] transition-colors disabled:opacity-50"
                required
                disabled={!formData.date}
              >
                <option value="" className="bg-[#1B191A] text-[#a1a1a1]">{t('reservation.form.timePlaceholder')}</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot} className="bg-[#1B191A] text-[#e8e8e8]">
                    {slot}
                  </option>
                ))}
              </select>
              {formData.date && formData.date.getDay() === 0 && (
                <p className="text-[#D41C8A] text-sm mt-1">
                  {t('reservation.messages.closedDay')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Schedule Information */}
        <div className="bg-gradient-to-r from-[#4D2039] to-[#600222] p-6 rounded-lg border border-[#D41C8A] shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#e8e8e8]">
            {t('contact.hours.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-[#a1a1a1]">
            <div>{t('reservation.schedule.monday')}</div>
            <div>{t('reservation.schedule.tuesday')}</div>
            <div>{t('reservation.schedule.wednesday')}</div>
            <div>{t('reservation.schedule.thursday')}</div>
            <div>{t('reservation.schedule.friday')}</div>
            <div>{t('reservation.schedule.saturday')}</div>
            <div className="col-span-2 text-[#D41C8A] font-medium">{t('reservation.schedule.sunday')}</div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#b9478c] via-[#D41C8A] to-[#E91E63] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#B8156E] hover:to-[#600222] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg border border-[#D41C8A]"
          >
            {isSubmitting ? t('reservation.form.submitting') : t('reservation.form.submitButton')}
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Reservation 