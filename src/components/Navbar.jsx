import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const services = [
        {
            nameKey: "navbar.hairdressing",
            url: "/hairdressing"
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
            url: "/lympha"
        }
    ]
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleServices = () => {
        setIsServicesOpen(!isServicesOpen);
    };

    const [language, setLanguage] = useState(i18n.language === 'en' ? 'EN' : 'CZ');

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng === 'en' ? 'EN' : 'CZ');
    };

    return (
        <nav className="bg-gradient-to-br from-gray-900 via-black border-b-2 border-[#D41C8A] fixed top-0 z-10 w-full">
            <div className="max-w-0xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div>
                        <Link to="/" className="flex items-center gap-2 text-lg md:text-xl font-semibold tracking-wider text-[#D41C8A]">
                            <img src="/logo.png" alt="Logo Studio Safira" className="w-10 h-10" />
                            Studio Safira
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex md:flex-row items-center gap-5 text-white">
                            <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
                                {t('navbar.home')}
                            </Link>
                            <div className="relative transition-colors duration-200 flex flex-row items-center">
                                <p className="text-white cursor-pointer"
                                onClick={toggleServices}
                                >{t('navbar.services')}</p>
                                <svg
                                    className={`inline-block ml-1 w-4 h-4 text-[#D41C8A] cursor-pointer
                                        transition-transform duration-300 ease-in-out
                                        ${isServicesOpen ? 'rotate-180' : ''}
                                    `}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    viewBox="0 0 24 24"
                                    style={{ verticalAlign: 'middle' }}
                                    onClick={toggleServices}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                                {isServicesOpen && (
                                    <div className="z-100 flex flex-col gap-2 absolute top-8 left-0 w-full bg-black border-2 border-[#D41C8A] rounded-md p-2">
                                        {services.map((service, index) => (
                                            <Link to={service.url} key={index} className="p-1 rounded-md hover:bg-[#D41C8A] transition-colors duration-200
                                            opacity-0 animate-[fadeIn_0.6s_ease-in_forwards]"
                                            style={{ animationDelay: `${index * 10}ms`, animationFillMode: 'forwards' }}
                                            onClick={() => setIsServicesOpen(false)}
                                            >
                                                {t(service.nameKey)}
                                            </Link>
                                        ))}                                        
                                    </div>
                                )}
                            </div>
                            {location.pathname == '/' ? (
                                <a href="#contact" className="hover:text-gray-300 transition-colors duration-200">
                                    {t('navbar.contact')}
                                </a>
                            ) : (
                                <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
                                    {t('navbar.contact')}
                                </Link>
                            )}
                        </div>
                    </div>
                    

                    {/* Language Selector and Mobile Menu Button */}
                    <div className="flex items-center gap-4">

                      {/* Language Selector */}
                      <div className="md:block">
                          <div className="flex flex-row text-white text-lg md:text-2xl border-2 border-[#D41C8A] rounded-md">
                            <p
                              className={`px-2 py-1 hover:text-gray-300 transition-colors duration-100 cursor-pointer ${language === 'CZ' ? 'bg-[#D41C8A] text-white rounded' : ''}`}
                              onClick={() => changeLanguage('cz')}
                            >
                              CZ
                            </p>
                            <p
                              className={`px-2 py-1 hover:text-gray-300 transition-colors duration-100 cursor-pointer ${language === 'EN' ? 'bg-[#D41C8A] text-white rounded' : ''}`}
                              onClick={() => changeLanguage('en')}
                            >
                              EN
                            </p>
                          </div>
                      </div>

                      {/* Mobile Menu Button */}
                      <div className="md:hidden flex items-center">
                          <button
                              onClick={toggleMenu}
                              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                          >
                              <svg
                                  className={`h-6 w-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                              >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d={
                                          isMenuOpen
                                              ? "M6 18L18 6M6 6l12 12"
                                              : "M4 6h16M4 12h16M4 18h16"
                                      }
                                  />
                              </svg>
                          </button>
                      </div>

                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed bg-black md:hidden left-0 right-0 top-16.5 bottom-0 z-40 transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <div className="flex flex-col h-full">
                        <div className="text-2xl text-white flex-1 flex flex-col justify-center items-center space-y-8 px-8">
                            <Link to="/" className="hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                                    {t('navbar.home')}
                            </Link>
                            <Link to="/Hairdressing" className="hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                                {t('navbar.hairdressing')}
                            </Link>
                            <Link to="/cosmetics" className="hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                                {t('navbar.cosmetics')}
                            </Link>
                            <Link to="/massage" className="hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                                {t('navbar.massage')}
                            </Link>
                            <Link to="/nails" className="hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                                {t('navbar.nails')}
                            </Link>
                            <Link to="/lympha" className="hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                                {t('navbar.lymphatic')}
                            </Link>
                            <a href="#contact" className="hover:text-gray-300 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}>
                                {t('navbar.contact')}
                            </a>
                        </div>

                        <div className={`p-8 border-t border-[#D41C8A] text-center transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                             style={{
                                 transitionDelay: isMenuOpen ? '0.5s' : '0s'
                             }}>
                            <p className="text-white text-base hover:text-[#D41C8A] transition-colors duration-200">
                                +420 607 191 088
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;