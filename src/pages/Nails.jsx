import { useTranslation } from 'react-i18next';

const Nails = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-30 lg:py-20 mt-0 lg:mt-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 lg:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('nails.title')}
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">
                        {t('nails.specialist')}
                    </p>
                    <p className="text-lg text-[#D41C8A] font-semibold">
                        {t('nails.phone')}
                    </p>
                </div>

                {/* Description Section */}
                <div className="mb-12 bg-gradient-to-br from-[#2A2528] to-[#1B191A] p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6">
                            {t('nails.description.title')}
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                            {t('nails.description.intro')}
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                            {t('nails.description.clientInfo')}
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            {t('nails.description.homeService')}
                        </p>
                    </div>
                </div>

                {/* Services Types */}
                <div className="mb-12 bg-gradient-to-br from-[#2A2528] to-[#1B191A] p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                        {t('nails.types.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div className="text-gray-300">• {t('nails.types.relax')}</div>
                            <div className="text-gray-300">• {t('nails.types.comfort')}</div>
                            <div className="text-gray-300">• {t('nails.types.medical')}</div>
                            <div className="text-gray-300">• {t('nails.types.wellness')}</div>
                            <div className="text-gray-300">• {t('nails.types.wet')}</div>
                            <div className="text-gray-300">• {t('nails.types.semiDry')}</div>
                        </div>
                        <div className="space-y-3">
                            <div className="text-gray-300">• {t('nails.types.instrument')}</div>
                            <div className="text-gray-300">• {t('nails.types.mens')}</div>
                            <div className="text-gray-300">• {t('nails.types.podiatric')}</div>
                            <div className="text-gray-300">• {t('nails.types.seniors')}</div>
                            <div className="text-gray-300">• {t('nails.types.mobile')}</div>
                        </div>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Standard Services */}
                    <div className="bg-gradient-to-br from-[#2A2528] to-[#1B191A] p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('nails.pricing.standard.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.standard.combined')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.standard.combinedPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.standard.wet')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.standard.wetPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.standard.dry')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.standard.dryPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.standard.mens')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.standard.mensPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.standard.spa')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.standard.spaPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.standard.spaGel')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.standard.spaGelPrice')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Specialized Services */}
                    <div className="bg-gradient-to-br from-[#2A2528] to-[#1B191A] p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('nails.pricing.specialized.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.specialized.medical')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.specialized.medicalPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.specialized.health')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.specialized.healthPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.specialized.diabetic')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.specialized.diabeticPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.specialized.seniors')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.specialized.seniorsPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.pricing.specialized.vitamins')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.specialized.vitaminsPrice')}</span>
                            </div>
                            <div className="bg-[#1B191A] p-3 rounded-lg mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white text-sm md:text-base font-medium">{t('nails.pricing.specialized.mobile')}</span>
                                    <span className="text-[#D41C8A] font-semibold">{t('nails.pricing.specialized.mobilePrice')}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{t('nails.pricing.specialized.mobileTransport')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Services */}
                <div className="mb-12 bg-gradient-to-br from-[#2A2528] to-[#1B191A] p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                        {t('nails.additional.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.additional.combyped')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.additional.combypedPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.additional.bs')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.additional.bsPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.additional.naspan')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.additional.naspanPrice')}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.additional.corrector')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.additional.correctorPrice')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                                <span className="text-white text-sm md:text-base">{t('nails.additional.titanium')}</span>
                                <span className="text-[#D41C8A] font-semibold">{t('nails.additional.titaniumPrice')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="mt-12 bg-gradient-to-r from-[#D41C8A]/10 via-[#D41C8A]/5 to-[#D41C8A]/10 p-6 rounded-2xl border border-[#D41C8A]/30">
                    <p className="text-center text-gray-300 text-lg font-medium mb-2">
                        {t('nails.footer.message')}
                    </p>
                    <p className="text-center text-[#D41C8A] text-lg font-semibold">
                        {t('nails.footer.studio')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Nails; 