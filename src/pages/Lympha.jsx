import { useTranslation } from 'react-i18next';

const Lympha = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-30 lg:py-20 mt-0 lg:mt-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 lg:mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('lymphatic.title')}
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">
                        {t('lymphatic.specialist')}
                    </p>
                    <p className="text-lg text-[#D41C8A] font-semibold">
                        {t('lymphatic.phone')}
                    </p>
                </div>

                {/* Main Service */}
                <div className="mb-12  p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-8 text-center">
                        {t('lymphatic.service.title')}
                    </h2>
                    
                    <div className="max-w-2xl mx-auto">
                        <div className=" p-6 rounded-lg text-center mb-6">
                            <h3 className="text-xl font-semibold text-white mb-3">{t('lymphatic.service.single.title')}</h3>
                            <div className="text-3xl font-bold text-[#D41C8A] mb-2">{t('lymphatic.service.single.price')}</div>
                            <p className="text-gray-300 text-sm">{t('lymphatic.service.single.description')}</p>
                        </div>
                    </div>
                </div>

                {/* Package Deals */}
                <div className="mb-12  p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-8 text-center">
                        {t('lymphatic.packages.title')}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className=" p-6 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-white mb-3">{t('lymphatic.packages.package5.title')}</h3>
                            <div className="text-2xl font-bold text-[#D41C8A] mb-2">{t('lymphatic.packages.package5.price')}</div>
                            <p className="text-gray-300 text-sm">{t('lymphatic.packages.package5.description')}</p>
                        </div>
                        
                        <div className=" p-6 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-white mb-3">{t('lymphatic.packages.package10.title')}</h3>
                            <div className="text-2xl font-bold text-[#D41C8A] mb-2">{t('lymphatic.packages.package10.price')}</div>
                            <p className="text-gray-300 text-sm">{t('lymphatic.packages.package10.description')}</p>
                        </div>
                    </div>
                </div>

                {/* Additional Service */}
                <div className="mb-12  p-8 rounded-2xl shadow-2xl border border-[#D41C8A]/20">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#D41C8A] mb-8 text-center">
                        {t('lymphatic.lipolysis.title')}
                    </h2>
                    
                    <div className="max-w-2xl mx-auto">
                        <div className=" p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold text-white mb-3">{t('lymphatic.lipolysis.service')}</h3>
                            <div className="text-3xl font-bold text-[#D41C8A] mb-2">{t('lymphatic.lipolysis.price')}</div>
                            <p className="text-gray-300 text-sm">{t('lymphatic.lipolysis.description')}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="mt-12 bg-[#D41C8A]/10 p-6 rounded-2xl border border-[#D41C8A]/30">
                    <p className="text-center text-gray-300 text-lg font-medium">
                        {t('lymphatic.footer')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Lympha; 