import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GraduationSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='relative w-full min-h-[100vh] flex items-center justify-center bg-black overflow-hidden border border-white drop-shadow-[0_0_4px_#00FFF7] scroll-mt-24'
    >
      {/* Imagen de fondo con gradiente institucional */}
      <div className='absolute inset-0 z-0'>
        <img
          src='https://wallpapers.com/images/hd/college-graduation-pictures-ibla1ho56tqxy737.jpg'
          alt='Graduación Colegio José Martí'
          className='w-full h-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
        <div className='absolute bottom-0 w-full h-24 bg-gradient-to-b from-transparent to-black z-10' />
      </div>

      {/* Contenido institucional centrado */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-20 text-center px-4 sm:px-6 max-w-4xl text-white mt-20 sm:mt-32'
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className='text-2xl sm:text-3xl md:text-5xl font-bold mb-6 drop-shadow-[0_0_4px_#00FFF7]'
        >
          “Hoy no solo celebramos un logro, celebramos el inicio de un legado.”
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
          className='text-base sm:text-lg md:text-xl text-white/90 mb-8 drop-shadow-[0_0_3px_rgba(0,0,0,0.6)]'
        >
          Cada graduado del Colegio José Martí lleva consigo valores, sueños y la fuerza para
          transformar el mundo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
        >
          <a
            href='/graduaciones'
            className='inline-block bg-black text-white px-6 py-3 rounded-full font-semibold text-base sm:text-lg border border-white drop-shadow-[0_0_4px_#00FFF7] hover:bg-white hover:text-black transition-all duration-300'
          >
            Ve nuestras Graduaciones
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GraduationSection;
