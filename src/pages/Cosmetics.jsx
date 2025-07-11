import { useTranslation } from 'react-i18next';

const Cosmetics = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-30 lg:py-20 mt-0 lg:mt-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 lg:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('cosmetics.title')}
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">
                        {t('cosmetics.specialist')}
                    </p>
                    <p className="text-lg text-[#D41C8A] font-semibold">
                        {t('cosmetics.phone')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Basic Services */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('cosmetics.basic.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.basic.eyelashTinting')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.basic.eyelashTintingPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.basic.eyebrowTinting')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.basic.eyebrowTintingPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.basic.eyebrowShaping')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.basic.eyebrowShapingPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.basic.eyeMicromassage')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.basic.eyeMicromassagePrice')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Depilation Services */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('cosmetics.depilation.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.depilation.upperLip')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.depilation.upperLipPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.depilation.chin')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.depilation.chinPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.depilation.fullFace')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.depilation.fullFacePrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.depilation.fullLegs')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.depilation.fullLegsPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.depilation.bikini')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.depilation.bikiniPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.depilation.calves')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.depilation.calvesPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('cosmetics.depilation.underarms')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('cosmetics.depilation.underarmsPrice')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Facial Treatments */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('cosmetics.facials.title')}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className=" p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-[#D41C8A] mb-2">{t('cosmetics.facials.complete.title')}</h3>
                                    <p className="text-gray-300 text-sm mb-3">{t('cosmetics.facials.complete.description')}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">{t('cosmetics.facials.complete.duration')}</span>
                                        <span className="text-[#D41C8A] font-semibold text-lg">{t('cosmetics.facials.complete.price')}</span>
                                    </div>
                                </div>
                                
                                <div className=" p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-[#D41C8A] mb-2">{t('cosmetics.facials.problematic.title')}</h3>
                                    <p className="text-gray-300 text-sm mb-3">{t('cosmetics.facials.problematic.description')}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">{t('cosmetics.facials.problematic.duration')}</span>
                                        <span className="text-[#D41C8A] font-semibold text-lg">{t('cosmetics.facials.problematic.price')}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className=" p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-[#D41C8A] mb-2">{t('cosmetics.facials.chocolate.title')}</h3>
                                    <p className="text-gray-300 text-sm mb-3">{t('cosmetics.facials.chocolate.description')}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">{t('cosmetics.facials.chocolate.duration')}</span>
                                        <span className="text-[#D41C8A] font-semibold text-lg">{t('cosmetics.facials.chocolate.price')}</span>
                                    </div>
                                </div>
                                
                                <div className=" p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-[#D41C8A] mb-2">{t('cosmetics.facials.eyeArea.title')}</h3>
                                    <p className="text-gray-300 text-sm mb-3">{t('cosmetics.facials.eyeArea.description')}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">{t('cosmetics.facials.eyeArea.duration')}</span>
                                        <span className="text-[#D41C8A] font-semibold text-lg">{t('cosmetics.facials.eyeArea.price')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cosmetics; 