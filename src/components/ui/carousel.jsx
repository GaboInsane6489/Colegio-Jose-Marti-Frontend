import React, { useState } from "react";

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="overflow-hidden relative w-full">
      <CarouselContent currentIndex={currentIndex}>{children}</CarouselContent>
      <CarouselPrevious onClick={prevSlide} />
      <CarouselNext onClick={nextSlide} />
    </div>
  );
};

export const CarouselContent = ({ children, currentIndex }) => {
  return (
    <div
      className="flex transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {children}
    </div>
  );
};

export const CarouselItem = ({ children }) => {
  return <div className="min-w-full flex-shrink-0 px-4">{children}</div>;
};

export const CarouselNext = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full z-10"
  >
    →
  </button>
);

export const CarouselPrevious = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full z-10"
  >
    ←
  </button>
);
