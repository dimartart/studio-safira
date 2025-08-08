import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ReservationBanner = () => {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden bg-gradient-to-r from-[#b9478c] via-[#E91E63] to-[#600222] py-16 px-4 sm:px-6 lg:px-[10%]">
            
            {/* Content */}
            <div className="text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        {t('reservationBanner.title')}
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed">
                        {t('reservationBanner.subtitle')}
                    </p>
                    
                    <Link
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#1B191A] bg-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 ease-out hover:bg-gray-100"
                        to="/reservation"
                    >
                        <span className="relative z-10">
                            {t('reservationBanner.button')}
                        </span>
                        
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <svg 
                            className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    
                    <p className="mt-6 text-gray-200 text-sm sm:text-base">
                    {t('reservationBanner.additionalInfo')}
                    </p>
                </div>
            </div>
            
        </div>
    );
};

export default ReservationBanner; 