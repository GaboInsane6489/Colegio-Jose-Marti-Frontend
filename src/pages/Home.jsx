import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import LandingContent from "../components/LandingContent";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import GraduationSection from "../components/GraduationSection";
import ValoresSection from "../components/ValoresSection";
import TestimoniosSection from "../components/TestimoniosSection";
import ProyectosSection from "../components/ProyectosSection";

const AnimatedSection = ({ Component: _Component, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6"
    >
      <_Component />
    </motion.div>
  );
};

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
            <div className="animate-bounce text-white/70 text-xl sm:text-2xl">
              ↓
            </div>
          </div>
        )}

        {/* 🧾 Secciones institucionales con animación única */}
        <div className="pt-6 pb-16 w-full space-y-12 sm:space-y-16 px-3 sm:px-5 md:px-8">
          {[
            HeroSection,
            InfoSection,
            ValoresSection,
            TestimoniosSection,
            ProyectosSection,
            GraduationSection,
          ].map((Section, i) => (
            <AnimatedSection key={i} Component={Section} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
