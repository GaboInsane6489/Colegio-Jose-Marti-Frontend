import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LandingVideo from "../components/LandingVideo";
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
      setShowArrow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sección principal institucional con carga diferida */}
      <div ref={ref}>{inView && <LandingVideo inView={inView} />}</div>

      {/* Contenedor principal para mantener el contenido por encima del video */}
      <div className="relative z-10">
        <HeroSection />
        <InfoSection />
        <ValoresSection />
        <TestimoniosSection />
        <ProyectosSection />
        <GraduationSection />
      </div>
    </>
  );
};

export default Home;
