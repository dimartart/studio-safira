import { useTranslation } from 'react-i18next';

const Massage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-30 lg:py-20 mt-0 lg:mt-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 lg:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('massage.title')}
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">
                        {t('massage.specialist')}
                    </p>
                    <p className="text-lg text-[#D41C8A] font-semibold">
                        {t('massage.phone')}
                    </p>
                </div>

                {/* Description Section */}
                <div className="mb-12  p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6">
                            {t('massage.description.title')}
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                            {t('massage.description.intro')}
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                            {t('massage.description.specialization')}
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                            {t('massage.description.additional')}
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            {t('massage.description.conclusion')}
                        </p>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Therapeutic Massages */}
                    <div className="p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('massage.therapeutic.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className=" p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-white text-sm md:text-base font-medium">{t('massage.therapeutic.sports')}</span>
                                    <span className="text-[#D41C8A] font-semibold">{t('massage.therapeutic.sportsPrice')}</span>
                                </div>
                            </div>
                            <div className=" p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white text-sm md:text-base font-medium">{t('massage.therapeutic.reflexFull')}</span>
                                    <span className="text-[#D41C8A] font-semibold">{t('massage.therapeutic.reflexFullPrice')}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{t('massage.therapeutic.reflexFullDuration')}</span>
                            </div>
                            <div className=" p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white text-sm md:text-base font-medium">{t('massage.therapeutic.reflexFoot')}</span>
                                    <span className="text-[#D41C8A] font-semibold">{t('massage.therapeutic.reflexFootPrice')}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{t('massage.therapeutic.reflexFootDuration')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Alternative Therapies */}
                    <div className=" p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                            {t('massage.alternative.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div className=" p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white text-sm md:text-base font-medium">{t('massage.alternative.assyrian')}</span>
                                    <span className="text-[#D41C8A] font-semibold">{t('massage.alternative.assyrianPrice')}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{t('massage.alternative.assyrianDuration')}</span>
                            </div>
                            <div className=" p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white text-sm md:text-base font-medium">{t('massage.alternative.crystalMassage')}</span>
                                    <span className="text-[#D41C8A] font-semibold">{t('massage.alternative.crystalMassagePrice')}</span>
                                </div>
                                <span className="text-gray-400 text-xs">{t('massage.alternative.crystalMassageDuration')}</span>
                            </div>
                            <div className=" p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-white text-sm md:text-base font-medium">{t('massage.alternative.crystalTherapy')}</span>
                                    <span className="text-[#D41C8A] font-semibold">{t('massage.alternative.crystalTherapyPrice')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services List */}
                <div className="mb-12  p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-6 text-center">
                        {t('massage.services.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                            <ul className="space-y-2 text-gray-300">
                                <li>• {t('massage.services.footReflex')}</li>
                                <li>• {t('massage.services.reflexotherapy')}</li>
                                <li>• {t('massage.services.footMassage')}</li>
                                <li>• {t('massage.services.sportsReconditioning')}</li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <ul className="space-y-2 text-gray-300">
                                <li>• {t('massage.services.assyrianNonContact')}</li>
                                <li>• {t('massage.services.crystalTherapy')}</li>
                                <li>• {t('massage.services.crystalMassages')}</li>
                                <li>• {t('massage.services.andMore')}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-[#D41C8A]/10  p-6 rounded-2xl border border-[#D41C8A]/30">
                    <p className="text-center text-gray-300 text-lg font-medium">
                        {t('massage.footer')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Massage; 