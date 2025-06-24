import { useState } from "react";

const portfolioImages = [
    {image : '/portfolio/port1.jpg' },
    {image: '/portfolio/port2.jpg'},
    {image: '/portfolio/port3.jpg'},
    {image: '/portfolio/port4.jpg'},
    {image: '/portfolio/port5.jpg'},
    {image: '/portfolio/port6.jpg'},
    {image: '/portfolio/port7.jpg'},
    {image: '/portfolio/port7.jpg'},
]

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightBox = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    }

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % portfolioImages.length);
    };
    
    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-[30px] py-3 px-4 sm:px-6 lg:px-[10%]">
                {portfolioImages.map((card, index) => (
                    <div key={index} className="flex justify-center">
                        <img className="w-full max-w-xs lg:w-[300px] rounded-2xl hover:cursor-pointer" src={card.image}
                        onClick={() => openLightBox(index)}/>
                    </div>
                ))}
            </div>

            {/*LightBox overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-white text-2xl sm:text-3xl font-bold hover:cursor-pointer"
                >
                    &times;
                </button>
        
                <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 text-white text-2xl sm:text-4xl hover:cursor-pointer"
                >
                    &#10094;
                </button>
        
                <img
                    src={portfolioImages[currentIndex].image}
                    alt=""
                    className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
                />
        
                <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 text-white text-2xl sm:text-4xl hover:cursor-pointer"
                >
                    &#10095;
                </button>
                </div>
            )}
        </>
    )
}

export default Gallery;