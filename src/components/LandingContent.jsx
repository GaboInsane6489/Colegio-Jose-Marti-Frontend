import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const LandingContent = ({ inView }) => {
  const animationProps = useMemo(() => {
    return inView
      ? {
          section: { opacity: 1, scale: 1 },
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={animationProps.section}
      transition={{ type: 'spring', bounce: 0.3, duration: 1 }}
      className='relative w-full h-screen flex items-center justify-center text-white overflow-hidden'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={animationProps.content}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
        className='relative z-10 text-center w-full max-w-4xl px-4 sm:px-6 md:px-8'
      >
        <motion.img
          src='/LogoColegio.png'
          alt='Escudo Colegio José Martí'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={animationProps.logo}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
          className='mx-auto mb-6 h-36 sm:h-40 w-auto object-contain drop-shadow-[0_0_12px_#00FFF7]'
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={animationProps.h1}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className='text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 tracking-tight leading-tight drop-shadow-lg'
        >
          Colegio José Martí
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={animationProps.p1}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-lg sm:text-xl italic mb-4 drop-shadow text-white/90'
        >
          “Aquí no solo se aprende, se transforma.”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={animationProps.p2}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className='text-[15px] sm:text-base md:text-lg max-w-2xl mx-auto drop-shadow text-white/80 leading-relaxed'
        >
          Formamos de forma integral, excelencia académica y valores que transforman.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={animationProps.line}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
          className='mt-6 h-[2px] w-24 mx-auto bg-[#00FFF7]/40 origin-left'
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={animationProps.button}
          transition={{ delay: 0.8, duration: 0.6 }}
          className='mt-8'
        >
          <a
            href='/admisiones'
            className='inline-block bg-[#00FFF7] text-black px-6 py-2 rounded-full font-medium backdrop-blur-md transition-all duration-300 hover:drop-shadow-[0_0_12px_#00FFF7] hover:translate-y-[2px]'
          >
            Conoce nuestra propuesta
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LandingContent;
