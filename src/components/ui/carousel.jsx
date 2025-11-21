import React, { useState } from 'react';

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);

  const nextSlide = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className='overflow-hidden relative w-full'>
      <CarouselContent currentIndex={currentIndex}>
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={`carousel-item-${index}`}>{child}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={prevSlide} disabled={currentIndex === 0} />
      <CarouselNext onClick={nextSlide} disabled={currentIndex === totalItems - 1} />
    </div>
  );
};

export const CarouselContent = ({ children, currentIndex }) => {
  return (
    <div
      className='flex transition-transform duration-500 ease-in-out'
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {children}
    </div>
  );
};

export const CarouselItem = ({ children }) => {
  return <div className='min-w-full flex-shrink-0 px-4'>{children}</div>;
};

export const CarouselNext = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute right-4 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full z-10 ${
      disabled
        ? 'bg-gray-500 cursor-not-allowed'
        : 'bg-black text-white hover:bg-white hover:text-black'
    }`}
    aria-label='Siguiente slide'
  >
    →
  </button>
);

export const CarouselPrevious = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full z-10 ${
      disabled
        ? 'bg-gray-500 cursor-not-allowed'
        : 'bg-black text-white hover:bg-white hover:text-black'
    }`}
    aria-label='Slide anterior'
  >
    ←
  </button>
);
