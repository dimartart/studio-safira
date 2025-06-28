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
        <footer className="bg-black text-white flex justify-center">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-[10%] py-8 lg:py-[2rem]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg lg:text-xl font-semibold mb-4">{t('footer.contact')}</h3>
                        <p className="mb-2 text-sm lg:text-base">+420 607 191 088</p>
                        <p className="mb-2 text-sm lg:text-base">studiosafira@seznam.cz</p>
                        <p className="mb-2 text-sm lg:text-base">Praha 7 Holešovice</p>
                        <p className="mb-2 text-sm lg:text-base">Tusarova 13</p>
                        <p className="text-sm lg:text-base">Email: info@studiosafira.com</p>
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="text-lg lg:text-xl font-semibold mb-4">{t('footer.quickLinks')}</h3>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <Link to="/" className="hover:text-fuchsia-400 transition-colors text-sm lg:text-base">{t('navbar.home')}</Link>
                                {services.map((service, index) => (
                                    <Link to={service.url} key={index} className="hover:text-fuchsia-400"
                                    >
                                        {t(service.nameKey)}
                                    </Link>
                                ))}                                        
                            </div>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="text-lg lg:text-xl font-semibold mb-4">{t('footer.followUs')}</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="https://www.facebook.com/StudioSafiraLucieBeranova#" className="hover:text-fuchsia-400 transition-colors flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                                </svg>
                                <span className="text-sm lg:text-base">Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm lg:text-base">&copy; {new Date().getFullYear()} Studio Safira. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;