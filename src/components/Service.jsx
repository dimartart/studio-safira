import { useTranslation } from 'react-i18next';
import ServiceCard from "./ServiceCard";

const Service = () => {
    const { t } = useTranslation();
    
    return (
        <section className="bg-[#1B191A] px-4 sm:px-6 lg:px-[10%] py-8" id="services" aria-labelledby="services-heading">
            <header className="text-center mb-8">
                <h2 id="services-heading" className="text-[#D41C8A] text-2xl sm:text-3xl font-bold uppercase">
                    {t('navbar.services')}
                </h2>
                <p className="text-[#a1a1a1] text-base sm:text-lg mt-4 max-w-2xl mx-auto">
                    {t('service.description', 'Objevte širokou nabídku našich profesionálních služeb pro krásu a wellness v Studio Safira Praha 7')}
                </p>
            </header>
            <div className="flex flex-col gap-4 m-4 sm:m-8 lg:m-12">
                <ServiceCard/>
            </div>
        </section>
    )
}

export default Service;