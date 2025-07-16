import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    const services = [
        {
            nameKey: "navbar.hairdressing",
            url: "/kadernictvi"
        },
        {
            nameKey: "navbar.cosmetics",
            url: "/cosmetics"
        },
        {
            nameKey: "navbar.massage",
            url: "/massage"
        },
        {
            nameKey: "navbar.nails",
            url: "/nails"
        },
        {
            nameKey: "navbar.lymphatic",
            url: "/lymphatic"
        }
    ]

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white">
            
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <img 
                                src="/logo.png" 
                                alt="Studio Safira Logo" 
                                className="h-16 w-16 mr-4 rounded-full shadow-lg ring-2 ring-fuchsia-400/30"
                            />
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#D41C8A]">
                                    Studio Safira
                                </h2>
                                <p className="text-gray-300 text-sm lg:text-base mt-1">
                                    Premium Beauty & Wellness Services
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main footer grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Contact Information */}
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold mb-6 text-[#D41C8A] flex items-center justify-center md:justify-start">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                </svg>
                                {t('footer.contact')}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-center md:justify-start">
                                    <svg className="w-4 h-4 mr-3 text-[#D41C8A]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                    </svg>
                                    <span className="text-gray-300">+420 607 191 088</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start">
                                    <svg className="w-4 h-4 mr-3 text-[#D41C8A]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                    </svg>
                                    <span className="text-gray-300">studiosafira@seznam.cz</span>
                                </div>
                                <div className="flex items-start justify-center md:justify-start">
                                    <svg className="w-4 h-4 mr-3 text-[#D41C8A] mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                    </svg>
                                    <div className="text-gray-300">
                                        <p>Praha 7 Holešovice</p>
                                        <p>Tusarova 13</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center md:justify-start">
                                    <svg className="w-4 h-4 mr-3 text-[#D41C8A]" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                    </svg>
                                    <span className="text-gray-300">info@studiosafira.com</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold mb-6 text-[#D41C8A] flex items-center justify-center md:justify-start">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                                </svg>
                                {t('footer.quickLinks')}
                            </h3>
                            <div className="space-y-3">
                                <Link 
                                    to="/" 
                                    className="block text-gray-300 hover:text-[#D41C8A] transition-all duration-300 hover:translate-x-1 transform"
                                >
                                    {t('navbar.home')}
                                </Link>
                                {services.map((service, index) => (
                                    <Link 
                                        to={service.url} 
                                        key={index} 
                                        className="block text-gray-300 hover:text-[#D41C8A] transition-all duration-300 hover:translate-x-1 transform"
                                    >
                                        {t(service.nameKey)}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold mb-6 text-[#D41C8A] flex items-center justify-center md:justify-start">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
                                </svg>
                                {t('footer.followUs')}
                            </h3>
                            <div className="space-y-4">
                                <a 
                                    href="https://www.facebook.com/StudioSafiraLucieBeranova#" 
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                                    </svg>
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-800/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-400 text-sm">
                                &copy; {new Date().getFullYear()} Studio Safira. All rights reserved.
                            </p>
                            <div className="flex space-x-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-[#D41C8A] transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-[#D41C8A] transition-colors">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-[#D41C8A] transition-colors">Cookie Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;