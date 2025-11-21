import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserGraduate, FaHeart, FaBookOpen } from 'react-icons/fa';

const InfoSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='w-full bg-black text-white px-4 sm:px-6 py-12 sm:py-16 scroll-mt-24 border border-white drop-shadow-[0_0_4px_#00FFF7]'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='w-full max-w-screen-xl mx-auto text-center space-y-12'
      >
        {/* Título institucional */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide drop-shadow-[0_0_4px_#00FFF7]'
        >
          Evaluación y acompañamiento integral
        </motion.h2>

        {/* Texto institucional */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className='text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto px-2'
        >
          En el Colegio José Martí, acompañamos a cada estudiante en su proceso académico y
          emocional. Nuestra evaluación formativa tiene propósito, sensibilidad y visión de futuro.
          Creemos en el desarrollo integral como base de la excelencia.
        </motion.p>

        {/* Íconos institucionales */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 sm:px-6'>
          {[
            {
              icon: <FaUserGraduate className='text-white drop-shadow-[0_0_4px_#00FFF7]' />,
              title: 'Excelencia Académica',
              text: 'Programas formativos que impulsan el pensamiento crítico y la creatividad.',
              delay: 0.4,
            },
            {
              icon: <FaHeart className='text-white drop-shadow-[0_0_4px_#00FFF7]' />,
              title: 'Acompañamiento Emocional',
              text: 'Seguimiento constante para fortalecer el bienestar y la autoestima.',
              delay: 0.5,
            },
            {
              icon: <FaBookOpen className='text-white drop-shadow-[0_0_4px_#00FFF7]' />,
              title: 'Evaluación con Propósito',
              text: 'Instrumentos formativos que valoran el proceso y no solo el resultado.',
              delay: 0.6,
            },
          ].map(({ icon, title, text, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay, duration: 0.5, ease: 'easeOut' }}
              className='flex flex-col items-center text-center px-4'
            >
              <div className='text-4xl sm:text-5xl mb-4'>{icon}</div>
              <h3 className='font-semibold text-base sm:text-lg mb-2 text-white'>{title}</h3>
              <p className='text-sm sm:text-base text-white/50 leading-relaxed'>{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Botón institucional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.4, ease: 'easeOut' }}
        >
          <a
            href='/nosotros'
            className='inline-block bg-black text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base border border-white drop-shadow-[0_0_4px_#00FFF7] hover:bg-white hover:text-black transition-all duration-300'
          >
            Conoce más sobre nuestra filosofía
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfoSection;
