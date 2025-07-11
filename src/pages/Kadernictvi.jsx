import { useTranslation } from 'react-i18next';

const Kadernictvi = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-30 lg:py-20 mt-0 lg:mt-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 lg:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('kadernictvi.title')}
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">
                        {t('kadernictvi.stylist')}
                    </p>
                    <p className="text-lg text-[#D41C8A] font-semibold">
                        {t('kadernictvi.phone')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Women's Services */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('kadernictvi.women.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.women.washCutStyle')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.women.washCutStylePrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.women.cut')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.women.cutPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.women.blowDry')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.women.blowDryPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.women.highlights')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.women.highlightsPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.women.microHighlights')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.women.microHighlightsPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.women.perm')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.women.permPrice')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Men's Services */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('kadernictvi.men.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.men.washCutStyle')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.men.washCutStylePrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.men.buzzCut')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.men.buzzCutPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.men.crownCut')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.men.crownCutPrice')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Children's Services */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('kadernictvi.children.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.children.boys')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.children.boysPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.children.girls')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.children.girlsPrice')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Seniors Services */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('kadernictvi.seniors.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.seniors.women')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.seniors.womenPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('kadernictvi.seniors.men')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('kadernictvi.seniors.menPrice')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-[#D41C8A]/10 p-6 rounded-2xl border border-[#D41C8A]/30">
                    <p className="text-center text-gray-300 text-sm md:text-base">
                        {t('kadernictvi.disclaimer')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Kadernictvi; 