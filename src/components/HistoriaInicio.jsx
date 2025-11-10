import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSchool } from 'react-icons/fa';

const HistoriaInicio = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='w-full bg-[#fdfdfd] py-16 sm:py-20 px-4 sm:px-6 md:px-8 flex justify-center'
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
          <FaSchool className='text-3xl sm:text-4xl text-[#1a1a1a] mx-auto mb-3' />
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug'>
            El origen de un sueño
          </h2>
        </motion.header>

        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mb-6'
        >
          <img
            src='https://elucabista.com/wp-content/uploads/2022/09/Primer-Dia-de-Clases-UCAB-sep-2022-54-1-1280x640.jpg'
            alt='Fundación del colegio'
            className='rounded-xl shadow-lg object-cover w-full max-h-[420px]'
          />
        </motion.figure>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-base sm:text-[17px] text-[#333] leading-relaxed px-2 sm:px-4'
        >
          En 1985, un grupo de educadores visionarios fundó el Colegio José Martí con la convicción
          de que la educación debía formar seres humanos íntegros, libres y comprometidos con su
          comunidad. En una pequeña casa adaptada como aula, nació el legado que hoy inspira
          generaciones.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HistoriaInicio;
