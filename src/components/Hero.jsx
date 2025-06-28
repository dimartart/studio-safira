import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    return(
        <main className="border-b border-[#D41C8A] relative bg-[#1B191A] mt-6 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-[10%] py-8 md:py-12 lg:py-[4rem] lg:pb-[7rem]">
            <section className="opacity-0 animate-[fadeIn_0.6s_ease-in_forwards] order-2 md:order-1 flex flex-col gap-1 lg:gap-4 items-center lg:items-start justify-center relative w-full lg:w-[50%] text-center lg:text-left">                
                <div
                    className="hidden md:block text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-bold absolute top-1 left-0 lg:left-[7%] w-full lg:w-auto"
                    style={{
                        WebkitTextStroke: '2px #4D2039',
                        textStroke: '2px #D41C8A'
                    }}
                    aria-hidden="true"
                >
                    StudioSafira
                </div>
                <header>
                    <h1 className="opacity-0 animate-[fadeIn_0.6s_ease-in_forwards] text-[#e8e8e8] text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-20 sm:pt-24 md:pt-20 lg:pt-[120px] px-4 lg:px-0">
                        {t('hero.title')}
                        <span className="text-[#D41C8A]">{t('hero.titleSpan')}</span>
                    </h1>
                    <p className="text-[#a1a1a1] text-[2rem] py-3 lg:py-2">
                        {t('hero.subtitle')}
                    </p>
                </header>
                <nav className="flex flex-col items-center sm:flex-row gap-4 lg:gap-[2rem] pt-0 lg:pt-[1rem] px-4 lg:px-0" role="navigation" aria-label="Hero actions">
                    <a 
                        href="#reservation" 
                        className="text-white text-[1.7rem] lg:text-xl py-3 lg:py-5 px-4 bg-[#D41C8A] rounded-3xl text-center hover:bg-[#B8156E] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#D41C8A] focus:ring-offset-2"
                        aria-label="Rezervovat termín v Studio Safira"
                    >
                        {t('hero.reservationButton')}
                    </a>
                    <p className="hidden sm:block text-white text-sm lg:text-base py-3 lg:py-5 px-4 rounded-full text-center border border-[#D41C8A]" style={{ boxShadow: "0 2px 4px 0 #D41C8A" }}>
                        {t('hero.promoText')}
                    </p>
                </nav>
            </section>
            <aside className="mb-0 md:mb-4 order-1 md:order-2 w-full lg:w-[50%] flex items-center justify-center gap-6 mt-8 lg:mt-0 lg:ml-10 relative [@media(min-width:1500px)]:items-start">
                <img
                    src="hero/bg1.webp"
                    alt="Studio Safira - Profesionální kadeřnické služby v luxusním prostředí"
                    className="w-32 md:w-40 lg:w-[200px] rounded-2xl opacity-0 animate-[fadeIn_0.6s_ease-in_forwards]"
                    style={{
                        boxShadow: "0 8px 32px 0 #D41C8A"
                    }}
                    loading="eager"
                    width="200"
                    height="300"
                />
                <img 
                    src="/hero/bg2.webp" 
                    alt="Studio Safira - Kosmetické ošetření a relaxační služby Praha 7"
                    className="rounded-3xl w-32 sm:w-32 md:w-40 lg:w-[200px] mt-4 lg:mt-4 opacity-0 animate-[fadeIn_0.6s_ease-in_0.6s_forwards]" 
                    style={{ boxShadow: "0 8px 32px 0 #D41C8A" }}
                    loading="eager"
                    width="200"
                    height="300"
                />
                <img 
                    src="/hero/bg3.jpg" 
                    alt="Studio Safira - Masáže a wellness služby v moderním studiu"
                    className="rounded-3xl w-32 sm:w-32 md:w-40 lg:w-[200px] absolute top-[40%] md:top-[25%] lg:top-[40%] opacity-0 animate-[fadeIn_0.6s_ease-in_0.4s_forwards]" 
                    style={{ boxShadow: "0 8px 32px 0 #D41C8A" }}
                    loading="eager"
                    width="200"
                    height="300"
                />
            </aside>
        </main>
    )
}

export default Hero;