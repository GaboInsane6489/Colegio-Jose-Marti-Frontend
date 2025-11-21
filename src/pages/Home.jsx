import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import LandingContent from '../components/LandingContent';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import GraduationSection from '../components/GraduationSection';
import ValoresSection from '../components/ValoresSection';
import TestimoniosSection from '../components/TestimoniosSection';
import ProyectosSection from '../components/ProyectosSection';

const AnimatedSection = ({ Component: _Component, delay, fullWidth = false }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={`${fullWidth ? 'px-0 w-full' : 'p-2 sm:p-4'}`}
    >
      <_Component />
    </motion.div>
  );
};

const Home = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className='relative z-0 min-h-screen max-w-[100vw] overflow-x-hidden text-white'>
      {/* 🎥 Video institucional como fondo global */}
      <div className='fixed inset-0 z-0 pointer-events-none overflow-hidden'>
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden='true'
          role='presentation'
          className='absolute top-0 left-0 w-full h-full object-cover opacity-50'
        >
          <source
            src='https://cdn.pixabay.com/video/2025/02/05/256696_large.mp4'
            type='video/mp4'
          />
        </video>
        <div className='absolute inset-0 bg-black/60' />
      </div>

      {/* 🧠 Contenido institucional principal */}
      <div className='relative z-10'>
        <div ref={ref}>{inView && <LandingContent inView={inView} />}</div>

        {/* ⬇️ Flecha de scroll animada */}
        {showArrow && (
          <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30'>
            <div className='animate-bounce text-white/70 text-xl sm:text-2xl'>↓</div>
          </div>
        )}

        {/* 🧾 Secciones institucionales con animación única */}
        <div className='pt-6 pb-16 w-full space-y-12 sm:space-y-16 px-3 sm:px-5 md:px-8'>
          <AnimatedSection Component={HeroSection} delay={0.1} />
          <AnimatedSection Component={InfoSection} delay={0.2} />
        </div>

        {/* 🧱 Sección de valores sin padding lateral */}
        <AnimatedSection Component={ValoresSection} delay={0.3} fullWidth />

        {/* 🧾 Secciones restantes */}
        <div className='pt-6 pb-16 w-full space-y-12 sm:space-y-16 px-3 sm:px-5 md:px-8'>
          <AnimatedSection Component={TestimoniosSection} delay={0.4} />
          <AnimatedSection Component={ProyectosSection} delay={0.5} />
          <AnimatedSection Component={GraduationSection} delay={0.6} />
        </div>
      </div>
    </main>
  );
};

export default Home;
