import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reservation = () => {
    const { t } = useTranslation();
    
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        service: '',
        date: null,
        time: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const services = [
        { id: 'hairdressing', name: t('service.hairdressing', 'Hairdressing') },
        { id: 'cosmetics', name: t('service.cosmetics', 'Cosmetics') },
        { id: 'massage', name: t('service.massage', 'Massage') },
        { id: 'nails', name: t('service.nails', 'Nails/Pedicure') },
        { id: 'lymphatic', name: t('service.lymphatic', 'Lymphatic Treatment') }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            date: date,
            time: '' // Reset time when date changes
        }));
        
        if (errors.date) {
            setErrors(prev => ({
                ...prev,
                date: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitted(true);
            // Here you would typically send the data to your backend
            console.log('Reservation submitted:', formData);
            
            // Reset form after successful submission
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    service: '',
                    date: null,
                    time: ''
                });
            }, 3000);
        }
    };

    const generateTimeSlots = (selectedDate) => {
        if (!selectedDate) return [];
        
        const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
        let slots = [];
        
        if (dayOfWeek === 0) { // Sunday - Closed
            return [];
        } else if (dayOfWeek === 6) { // Saturday: 9:00 - 16:00
            for (let hour = 9; hour < 16; hour++) {
                slots.push(`${hour.toString().padStart(2, '0')}:00`);
                slots.push(`${hour.toString().padStart(2, '0')}:30`);
            }
        } else { // Monday - Friday: 9:00 - 18:00
            for (let hour = 9; hour < 18; hour++) {
                slots.push(`${hour.toString().padStart(2, '0')}:00`);
                slots.push(`${hour.toString().padStart(2, '0')}:30`);
            }
        }
        
        return slots;
    };

    const timeSlots = generateTimeSlots(formData.date);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3); 

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.service) newErrors.service = 'Service is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="min-h-screen bg-[#1B191A] py-24 px-4 sm:px-6 lg:px-[10%]">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#D41C8A] mb-4">
                        {t('navbar.reservation', 'Reservation')}
                    </h1>
                    <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
                        Book your appointment at Studio Safira and treat yourself to professional beauty care
                    </p>
                </div>

                {/* Warning/Info Section */}
                <div className="bg-gradient-to-r from-[#D41C8A]/10 to-[#B91570]/10 border-l-4 border-[#D41C8A] rounded-lg p-6 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-[#D41C8A] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#D41C8A] mb-2">
                                Important Reservation Information
                            </h3>
                            <div className="text-white space-y-2">
                                <div className=" flex flex-col">
                                    <div className="flex items-center">
                                        <strong>Cancellation Policy:</strong>
                                    </div>
                                    <p className='text-[#a1a1a1]'> You can cancel your reservation up to 4 hours before your appointment time without any charges.</p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <strong>Confirmation:</strong>
                                    </div>
                                    <p className='text-[#a1a1a1]'> You will receive a confirmation email within 24 hours of booking.</p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <strong>Preparation:</strong>
                                    </div>
                                    <p className='text-[#a1a1a1]'> Please arrive 5 minutes early for your appointment.</p>
                                </div>
                                <div className=" flex flex-col">
                                    <div className="flex items-center">
                                        <strong>Contact:</strong>
                                    </div>
                                    <p className='text-[#a1a1a1]'> For urgent changes or questions, call us directly at +420 607 191 088.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {isSubmitted && (
                    <div className="bg-green-500/10 border border-green-500 rounded-lg p-6 mb-8 text-center">
                        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-green-400 mb-2">Reservation Submitted!</h3>
                        <p className="text-gray-300">
                            Thank you for your reservation. We will contact you within 24 hours to confirm your appointment.
                        </p>
                    </div>
                )}

                {/* Reservation Form */}
                <div className="bg-[#2A2729] rounded-2xl shadow-2xl p-8 border border-[#D41C8A]/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                    className={`w-full px-4 py-3 bg-[#1B191A] border rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] text-white placeholder-gray-400 transition-colors ${
                                        errors.name ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="Enter your name"
                                />
                                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="surname" className="block text-sm font-medium text-white mb-2">
                                    Surname *
                                </label>
                                <input
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    onChange={handleInputChange}
                                    value={formData.surname}
                                    className={`w-full px-4 py-3 bg-[#1B191A] border rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] text-white placeholder-gray-400 transition-colors ${
                                        errors.surname ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="Enter your surname"
                                />
                                {errors.surname && <p className="text-red-400 text-sm mt-1">{errors.surname}</p>}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    onChange={handleInputChange}
                                    value={formData.phone}
                                    className={`w-full px-4 py-3 bg-[#1B191A] border rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] text-white placeholder-gray-400 transition-colors ${
                                        errors.phone ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="+420 XXX XXX XXX"
                                />
                                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    className={`w-full px-4 py-3 bg-[#1B191A] border rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] text-white placeholder-gray-400 transition-colors ${
                                        errors.email ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Service Selection */}
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
                                Service *
                            </label>
                            <select
                                id="service"
                                name="service"
                                onChange={handleInputChange}
                                value={formData.service}
                                className={`w-full px-4 py-3 bg-[#1B191A] border rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] text-white transition-colors ${
                                    errors.service ? 'border-red-500' : 'border-gray-600'
                                }`}
                            >
                                <option value="">Select a service</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
                        </div>

                        {/* Date and Time Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Date *
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        selected={formData.date}
                                        onChange={handleDateChange}
                                        minDate={today}
                                        maxDate={maxDate}
                                        filterDate={(date) => date.getDay() !== 0} // Exclude Sundays
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Select a date"
                                        className={`w-full px-4 py-3 bg-[#1B191A] border rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] text-white placeholder-gray-400 transition-colors ${
                                            errors.date ? 'border-red-500' : 'border-gray-600'
                                        }`}
                                    />
                                </div>
                                {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                            </div>

                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-white mb-2">
                                    Time *
                                </label>
                                <select
                                    id="time"
                                    name="time"
                                    onChange={handleInputChange}
                                    value={formData.time}
                                    disabled={!formData.date}
                                    className={`w-full px-4 py-3 bg-[#1B191A] border rounded-lg focus:ring-2 focus:ring-[#D41C8A] focus:border-[#D41C8A] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                        errors.time ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                >
                                    <option value="">
                                        {!formData.date ? 'Select a date first' : 'Select a time'}
                                    </option>
                                    {timeSlots.map(slot => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                                {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
                                
                                {/* Opening Hours Info */}
                                <div className="mt-2 text-sm text-[#a1a1a1]">
                                    <p>Opening Hours:</p>
                                    <p>Mon - Fri: 9:00 - 18:00</p>
                                    <p>Sat: 9:00 - 16:00</p>
                                    <p>Sun: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full bg-gradient-to-r from-[#D41C8A] to-[#B91570] text-white py-4 px-8 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitted ? 'Reservation Submitted!' : 'Make Reservation'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Additional Contact Info */}
                <div className="mt-12 text-center">
                    <p className="text-[#a1a1a1] mb-4">
                        Need help with your reservation? Contact us directly:
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white">
                        <a href="tel:+420607191088" className="flex items-center space-x-2 hover:text-[#D41C8A] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+420 607 191 088</span>
                        </a>
                        <a href="mailto:studiosafira@seznam.cz" className="flex items-center space-x-2 hover:text-[#D41C8A] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>studiosafira@seznam.cz</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;