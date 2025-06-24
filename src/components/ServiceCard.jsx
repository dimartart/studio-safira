const ServiceCard = () => {
    const services3 = [
        { title: 'KADEŘNICTVÍ', image: '/service/kadernictvi.webp' },
        { title: 'KOSMETIKA', image: '/service/kosmetika.jpg' },
        { title: 'MASÁŽE', image: '/service/masaze.jpg' }
      ];

    const services2 = [
        { title: 'PEDIKÚRA', image: '/service/pedikura.png' },
        { title: 'LYMFA', image: '/service/lymfa.jpg' },
    ]

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {services3.map((service, index) => (
                    <div key={index}>
                        <div className="relative flex items-center justify-center pb-4 bg-center bg-cover min-h-48 sm:min-h-56 lg:min-h-72 rounded-2xl"
                        style={{ backgroundImage: `url(${service.image })`}}>
                            <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                            <a href="" className="relative z-1 text-white uppercase font-bold px-4 lg:px-6 py-2 text-sm lg:text-base bg-fuchsia-300/20 rounded-2xl">{service.title}</a>
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
                            <a href="" className="relative z-1 text-white uppercase font-bold px-4 lg:px-6 py-2 text-sm lg:text-base bg-fuchsia-300/20 rounded-2xl">{service.title}</a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ServiceCard;