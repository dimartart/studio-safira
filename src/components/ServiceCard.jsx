import { useTranslation } from 'react-i18next';

const ServiceCard = () => {
    const { t } = useTranslation();

    const services3 = [
        { title: 'service.hairdressing', image: '/service/kadernictvi.webp',
            link: '/kadernictvi'
         },
        { title: 'service.cosmetics', image: '/service/kosmetika.jpg',
            link: '/cosmetics'
        },
        { title: 'service.massage', image: '/service/masaze.jpg',
            link: '/massage'
        }
      ];

    const services2 = [
        { title: 'service.nails', image: '/service/pedikura.png',
            link: '/nails'
        },
        { title: 'service.lymphatic', image: '/service/lymfa.jpg',
            link: '/lymphatic'
        }
    ]

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {services3.map((service, index) => (
                    <div key={index}>
                        <div className="relative flex items-center justify-center pb-4 bg-center bg-cover min-h-48 sm:min-h-56 lg:min-h-72 rounded-2xl"
                        style={{ backgroundImage: `url(${service.image })`}}>
                            <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                            <a
                                href={service.link}
                                className="relative z-10 text-white uppercase font-bold px-4 lg:px-6 py-2 text-sm lg:text-base bg-fuchsia-300/20 rounded-2xl border-2 border-transparent transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#D41C8A] focus:scale-110 focus:border-[#D41C8A] outline-none"
                            >
                                {t(service.title)}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 px-0 lg:px-[13%] mt-4 lg:mt-0">
                {services2.map((service, index) => (
                    <div key={index}>
                        <div className="relative flex items-center justify-center pb-4 bg-center bg-cover min-h-48 sm:min-h-56 lg:min-h-72 rounded-2xl"
                        style={{ backgroundImage: `url(${service.image })`}}>
                            <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                            <a
                                href={service.link}
                                className="relative z-10 text-white uppercase font-bold px-4 lg:px-6 py-2 text-sm lg:text-base bg-fuchsia-300/20 rounded-2xl border-2 border-transparent transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#D41C8A] focus:scale-110 focus:border-[#D41C8A] outline-none"
                            >
                                {t(service.title)}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ServiceCard;