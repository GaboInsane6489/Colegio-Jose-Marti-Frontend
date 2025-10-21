import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LandingContent from "../components/LandingContent";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import GraduationSection from "../components/GraduationSection";
import ValoresSection from "../components/ValoresSection";
import TestimoniosSection from "../components/TestimoniosSection";
import ProyectosSection from "../components/ProyectosSection";

const Home = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative z-0 min-h-screen overflow-x-hidden text-white">
      {/* 🎥 Video institucional como fondo global */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          role="presentation"
          className="w-full h-full object-cover opacity-50"
        >
          <source
            src="https://cdn.pixabay.com/video/2015/09/27/846-140823862_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* 🧠 Contenido institucional principal */}
      <div className="relative z-10">
        <div ref={ref}>{inView && <LandingContent inView={inView} />}</div>

        {/* ⬇️ Flecha de scroll animada */}
        {showArrow && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
            <div className="animate-bounce text-white/70 text-2xl">↓</div>
          </div>
        )}

        {/* 🧾 Secciones institucionales con esquinas redondeadas */}
        <div className="pt-4 pb-16 w-full space-y-24 px-4">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
            <HeroSection />
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
            <InfoSection />
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
            <ValoresSection />
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
            <TestimoniosSection />
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
            <ProyectosSection />
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6">
            <GraduationSection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
