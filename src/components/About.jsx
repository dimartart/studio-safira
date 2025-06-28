import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
    
    return(
        <>
            <div id="about" className="px-4 sm:px-6 lg:px-[10%] py-0 pb-3 lg:py-[3rem] bg-[#1B191A] grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
                <div className="text-white flex gap-4 lg:gap-4 flex-col" style={{ lineHeight: "1.4" }}>
                    <p className="text-sm sm:text-base lg:text-lg text-[#a1a1a1] font-boldtext-xl">{t('about.subtitle')}</p>
                    <h2 className="text-3xl lg:text-4xl text-[#D41C8A] uppercase">{t('about.title')}</h2>
                    <p className="text-sm sm:text-base lg:text-lg">{t('about.description1')}</p>
                    <p className="text-sm sm:text-base lg:text-lg">{t('about.description2')}</p>
                </div>
                <div className="w-full flex justify-center">
                    <img className="w-full rounded-2xl" src="/about.webp"
                    alt="Interiér salonu Studio Safira v Praze 7 - moderní a útulné prostředí"/>
                </div>
            </div>
        </>
    )
}

export default About;