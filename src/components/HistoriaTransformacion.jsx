import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChartLine } from 'react-icons/fa';

const HistoriaTransformacion = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='w-full bg-[#f0f0f0] py-16 sm:py-20 px-4 sm:px-6 md:px-8 flex justify-center'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
        className='max-w-5xl w-full text-center text-[#1a1a1a]'
      >
        <motion.header
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className='mb-6'
        >
          <FaChartLine className='text-3xl sm:text-4xl text-[#1a1a1a] mx-auto mb-3' />
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug'>
            Transformación con propósito
          </h2>
        </motion.header>

        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mb-6'
        >
          <img
            src='https://uplanner.com/wp-content/uploads/2019/04/exito-estudiantil-scaled.jpg'
            alt='Crecimiento institucional'
            className='rounded-xl shadow-lg object-cover w-full max-h-[420px]'
          />
        </motion.figure>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-base sm:text-[17px] text-[#333] leading-relaxed px-2 sm:px-4'
        >
          A lo largo de las décadas, el colegio creció en infraestructura, programas y visión. Se
          incorporaron nuevas tecnologías, se fortaleció el acompañamiento emocional y se consolidó
          una comunidad educativa que respira valores. Cada promoción dejó huella, y cada aula se
          convirtió en semillero de líderes.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HistoriaTransformacion;
