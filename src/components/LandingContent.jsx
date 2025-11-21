import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const LandingContent = ({ inView }) => {
  const animationProps = useMemo(() => {
    return inView
      ? {
          section: { opacity: 1 },
          content: { opacity: 1, y: 0 },
          logo: { opacity: 1, scale: 1.05 },
          h1: { opacity: 1, y: 0 },
          p1: { opacity: 1, y: 0 },
          p2: { opacity: 1, y: 0 },
          line: { scaleX: 1 },
          button: { opacity: 1, y: 0 },
        }
      : {};
  }, [inView]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={animationProps.section}
      transition={{ type: 'spring', bounce: 0.3, duration: 1 }}
      className='relative w-full h-screen flex items-center justify-center text-white overflow-hidden'
    >
      {/* Overlay para legibilidad sobre el video de fondo */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-0' />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={animationProps.content}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
        className='relative z-10 w-full max-w-4xl px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center'
      >
        <motion.img
          src='/LogoColegio.png'
          alt='Escudo Colegio José Martí'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={animationProps.logo}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
          className='mb-6 h-32 sm:h-36 md:h-40 w-auto object-contain drop-shadow-[0_0_12px_#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition-transform duration-300 ease-in-out'
        />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={animationProps.h1}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className='text-2xl sm:text-3xl md:text-5xl font-bold mb-2 tracking-tight leading-tight drop-shadow-[0_0_6px_#00FFF7]'
        >
          Colegio José Martí
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={animationProps.p1}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-base sm:text-lg md:text-xl italic mb-4 text-white/90 drop-shadow-[0_0_4px_#00FFF7] text-center w-full'
        >
          “Aquí no solo se aprende, se transforma.”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={animationProps.p2}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className='text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-white/80 leading-relaxed drop-shadow-[0_0_4px_#00FFF7] text-center'
        >
          Formamos de forma integral, excelencia académica y valores que transforman.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={animationProps.line}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
          className='mt-6 h-[2px] w-24 bg-[#00FFF7]/60 origin-left drop-shadow-[0_0_6px_#00FFF7] animate-pulse'
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={animationProps.button}
          transition={{ delay: 0.8, duration: 0.6 }}
          className='mt-8'
        >
          <a
            href='/admisiones'
            className='inline-block bg-[#00FFF7] text-black px-6 py-2 rounded-full font-semibold backdrop-blur-md transition-transform duration-300 ease-in-out hover:drop-shadow-[0_0_12px_#00FFF7] hover:scale-110 hover:-translate-y-[2px]'
          >
            Conoce nuestra propuesta
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LandingContent;
