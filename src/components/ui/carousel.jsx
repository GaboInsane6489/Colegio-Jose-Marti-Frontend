import React from "react";

export const Carousel = ({ children }) => {
  return <div className="overflow-hidden relative w-full">{children}</div>;
};

export const CarouselContent = ({ children }) => {
  return (
    <div className="flex transition-transform duration-500 ease-in-out">
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
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full"
  >
    →
  </button>
);

export const CarouselPrevious = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full"
  >
    ←
  </button>
);
