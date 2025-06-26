import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ClientReviews = () => {
  const { t } = useTranslation();
  const [visibleItems, setVisibleItems] = useState([]);
  const ref = useRef(null);

  const reviews = [
    { nameKey: 'reviews.client1.name', textKey: 'reviews.client1.text' },
    { nameKey: 'reviews.client2.name', textKey: 'reviews.client2.text' },
    { nameKey: 'reviews.client3.name', textKey: 'reviews.client3.text' },
    { nameKey: 'reviews.client4.name', textKey: 'reviews.client4.text' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reviews.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const StarRating = () => (
    <div className="flex text-[#D41C8A] mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="lg:py-16 py-6 bg-[#1B191A]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#D41C8A] mb-4">
            {t('reviews.title')}
          </h2>
          <p className="text-lg text-[#a1a1a1] max-w-2xl mx-auto">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-[#2A2729] rounded-2xl p-6 border border-[#4D2039] transform transition-all duration-700 ease-out ${
                visibleItems.includes(index)
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: visibleItems.includes(index) ? '0ms' : `${index * 200}ms`,
                boxShadow: "0 8px 32px 0 rgba(212, 28, 138, 0.2)"
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#e8e8e8]">{t(review.nameKey)}</h3>
                  <p className="text-sm text-[#D41C8A] font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('reviews.verifiedGuest')}
                  </p>
                </div>
                <StarRating />
              </div>
              
              <div className="text-[#a1a1a1] leading-relaxed">
                {t(review.textKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews; 