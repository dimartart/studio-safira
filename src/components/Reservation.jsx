import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reservation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: null,
        time: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const services = [
        { id: 'kadernictvi', name: 'Kadeřnictví', duration: 60 },
        { id: 'kosmetika', name: 'Kosmetika', duration: 45 },
        { id: 'masaze', name: 'Masáže', duration: 60 },
        { id: 'pedikura', name: 'Pedikúra', duration: 45 },
        { id: 'lymfa', name: 'Lymfa', duration: 90 }
    ];

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
        '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({ ...prev, date }));
    };

    return (
        <div className="bg-[#1B191A] px-4 sm:px-6 lg:px-[10%] py-8 lg:py-12" id="reservation">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-[#D41C8A] text-3xl lg:text-4xl font-bold text-center mb-8">
                    Rezervace termínu
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 rounded-2xl p-6 lg:p-8">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Jméno a příjmení *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#D41C8A] transition-colors"
                                    placeholder="Zadejte vaše jméno"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#D41C8A] transition-colors"
                                    placeholder="vas@email.cz"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Telefon *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#D41C8A] transition-colors"
                                    placeholder="+420 123 456 789"
                                />
                            </div>

                            {/* Service */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Služba *
                                </label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#D41C8A] transition-colors"
                                >
                                    <option value="">Vyberte službu</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>
                                            {service.name} ({service.duration} min)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Datum *
                                </label>
                                <DatePicker
                                    selected={formData.date}
                                    onChange={handleDateChange}
                                    dateFormat="dd.MM.yyyy"
                                    minDate={new Date()}
                                    placeholderText="Vyberte datum"
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#D41C8A] transition-colors"
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Čas *
                                </label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#D41C8A] transition-colors"
                                >
                                    <option value="">Vyberte čas</option>
                                    {timeSlots.map(time => (
                                        <option className='text-black' key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Poznámky
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#D41C8A] transition-colors resize-none"
                                    placeholder="Zde můžete přidat speciální požadavky..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#D41C8A] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#B31A7A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Odesílání...' : 'Rezervovat termín'}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-xl">
                                    Rezervace byla úspěšně vytvořena! Budeme vás kontaktovat pro potvrzení.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl">
                                    Došlo k chybě. Zkuste to prosím znovu.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Info Panel */}
                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-2xl p-6 lg:p-8">
                            <h3 className="text-[#D41C8A] text-xl font-semibold mb-4">
                                Informace o rezervaci
                            </h3>
                            <div className="space-y-4 text-white/80">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#D41C8A] rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Rezervace je platná po potvrzení telefonicky nebo emailem</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#D41C8A] rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Přijďte prosím 10 minut před začátkem vašeho termínu</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#D41C8A] rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Zrušení rezervace je možné nejpozději 24 hodin předem</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#D41C8A] rounded-full mt-2 flex-shrink-0"></div>
                                    <p>V případě dotazů nás kontaktujte na +420 607 191 088</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 lg:p-8">
                            <h3 className="text-[#D41C8A] text-xl font-semibold mb-4">
                                Otevírací doba
                            </h3>
                            <div className="space-y-2 text-white/80">
                                <div className="flex justify-between">
                                    <span>Pondělí - Pátek:</span>
                                    <span>9:00 - 19:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sobota:</span>
                                    <span>9:00 - 17:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Neděle:</span>
                                    <span>Zavřeno</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;