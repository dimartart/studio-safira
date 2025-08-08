import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Contact = () => {
    const { t } = useTranslation();

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: t('contact.address.title'),
            info: t('contact.address.info')
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: t('contact.phone.title'),
            info: t('contact.phone.info')
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: t('contact.email.title'),
            info: t('contact.email.info')
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t('contact.hours.title'),
            info: t('contact.hours.info')
        }
    ];

    return (
        <div id="contact" className=" py-16 px-4 sm:px-6 lg:px-[10%]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#D41C8A] mb-4">
                        {t('contact.title')}
                    </h2>
                    <p className="text-lg text-[#a1a1a1]">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start space-x-4 border-b border-[#D41C8A] pb-4">
                                    <div className="w-12 h-12 bg-[#D41C8A] text-white rounded-lg flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-[#D41C8A]">
                                            {item.title}
                                        </h4>
                                        <p className="text-white whitespace-pre-line">
                                            {item.info}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/reservation"
                            className="inline-block mt-6 text-center w-full bg-[#D41C8A] text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-[#B91570] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {t('contact.reservationButton')}
                        </Link>
                    </div>

                    {/* Map */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-8">
                            {t('contact.findUs')}
                        </h3>
                        
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="aspect-w-16 aspect-h-12">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.1667411962085!2d14.443377875746666!3d50.101885912400945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470bea7a4fa9fbbd%3A0xcf1795e6d8de929b!2sSTUDIO%20SAFIRA%20Beranov%C3%A1%20Lucie!5e0!3m2!1sru!2scz!4v1751121152751!5m2!1sru!2scz"
                                    width="100%" 
                                    height="400" 
                                    style={{ border: 0 }}
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-96"
                                ></iframe>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-[#D41C8A] rounded-full"></div>
                                    <span className="text-gray-700 font-medium">
                                        {t('contact.mapInfo')}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    {t('contact.mapDescription')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 