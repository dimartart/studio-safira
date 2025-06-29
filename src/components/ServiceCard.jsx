import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ServiceCard = () => {
    const { t } = useTranslation();

    const services3 = [
        { 
            title: 'service.hairdressing', 
            image: '/service/kadernictvi.webp',
            link: '/kadernictvi',
            alt: 'Kadeřnické služby Studio Safira - střihy, barvení, styling pro dámy a pány',
            description: 'Profesionální kadeřnické služby včetně střihů, barvení a stylingu'
        },
        { 
            title: 'service.cosmetics', 
            image: '/service/kosmetika.jpg',
            link: '/cosmetics',
            alt: 'Kosmetické služby Studio Safira - ošetření pleti, depilace, péče o obličej',
            description: 'Komplexní kosmetické ošetření pleti a péče o tvář'
        },
        { 
            title: 'service.massage', 
            image: '/service/masaze.jpg',
            link: '/massage',
            alt: 'Masážní služby Studio Safira - relaxační a terapeutické masáže',
            description: 'Relaxační a terapeutické masáže pro celkový wellness'
        }
    ];

    const services2 = [
        { 
            title: 'service.nails', 
            image: '/service/pedikura.png',
            link: '/nails',
            alt: 'Pedikúra Studio Safira - profesionální péče o nohy a nehty',
            description: 'Profesionální pedikúra a péče o nohy'
        },
        { 
            title: 'service.lymphatic', 
            image: '/service/lymfa.jpg',
            link: '/lymphatic',
            alt: 'Lymfatické drenáže Studio Safira - detoxikace a regenerace těla',
            description: 'Lymfatické drenáže pro detoxikaci a regeneraci'
        }
    ];

    return (
        <div role="grid" className="flex flex-col gap-4 lg:gap-8" aria-label={t('navbar.services')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" role="row">
                {services3.map((service, index) => (
                    <article key={index} className="service-card" role="gridcell">
                        <div className="relative flex items-center justify-center pb-4 bg-center bg-cover min-h-48 sm:min-h-56 lg:min-h-72 rounded-2xl overflow-hidden"
                             style={{ backgroundImage: `url(${service.image})` }}
                             role="img"
                             aria-label={service.alt}>
                            <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                            <img 
                                src={service.image} 
                                alt={service.alt}
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                                loading="lazy"
                                decoding="async"
                            />
                            <Link
                                to={service.link}
                                className="relative z-10 text-white uppercase font-bold px-4 lg:px-6 py-2 text-sm lg:text-base bg-fuchsia-300/20 rounded-2xl border-2 border-transparent transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#D41C8A] focus:scale-110 focus:border-[#D41C8A] outline-none focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:ring-offset-2"
                                aria-label={`${t(service.title)} - ${service.description}`}
                                title={service.description}
                            >
                                {t(service.title)}
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 px-0 lg:px-[13%]" role="row">
                {services2.map((service, index) => (
                    <article key={index} className="service-card" role="gridcell">
                        <div className="relative flex items-center justify-center pb-4 bg-center bg-cover min-h-48 sm:min-h-56 lg:min-h-72 rounded-2xl overflow-hidden"
                             style={{ backgroundImage: `url(${service.image})` }}
                             role="img"
                             aria-label={service.alt}>
                            <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                            <img 
                                src={service.image} 
                                alt={service.alt}
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                                loading="lazy"
                                decoding="async"
                            />
                            <Link
                                to={service.link}
                                className="relative z-10 text-white uppercase font-bold px-4 lg:px-6 py-2 text-sm lg:text-base bg-fuchsia-300/20 rounded-2xl border-2 border-transparent transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#D41C8A] focus:scale-110 focus:border-[#D41C8A] outline-none focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:ring-offset-2"
                                aria-label={`${t(service.title)} - ${service.description}`}
                                title={service.description}
                            >
                                {t(service.title)}
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default ServiceCard;