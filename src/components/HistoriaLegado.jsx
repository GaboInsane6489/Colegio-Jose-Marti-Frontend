import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSeedling } from 'react-icons/fa';

const HistoriaLegado = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='w-full bg-[#ffffff] py-16 sm:py-20 px-4 sm:px-6 md:px-8 flex justify-center'
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
          <FaSeedling className='text-3xl sm:text-4xl text-[#1a1a1a] mx-auto mb-3' />
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-snug'>
            Un legado que florece
          </h2>
        </motion.header>

        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mb-6'
        >
          <img
            src='https://media.licdn.com/dms/image/v2/D4D12AQEugYJiIzo-oQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1712673479316?e=2147483647&v=beta&t=oSTVqzn4ywo3pavdAOd6sGji61a4Fi7j7fnYIIiydck'
            alt='Legado institucional'
            className='rounded-xl shadow-lg object-cover w-full max-h-[420px]'
          />
        </motion.figure>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-base sm:text-[17px] text-[#333] leading-relaxed px-2 sm:px-4'
        >
          Hoy, el Colegio José Martí no solo mira hacia atrás con orgullo, sino hacia adelante con
          esperanza. Cada egresado lleva consigo una misión: transformar su entorno con sabiduría,
          empatía y coraje. El legado continúa, y el futuro se escribe con cada paso que damos
          juntos.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HistoriaLegado;
