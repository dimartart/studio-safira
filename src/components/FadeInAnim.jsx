import React, { useEffect, useRef, useState } from 'react';

const ScrollFadeIn = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-in-out ${
        visible
          ? 'animate-[fadeIn_0.6s_ease-in_forwards]'
          : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};


export default ScrollFadeIn;