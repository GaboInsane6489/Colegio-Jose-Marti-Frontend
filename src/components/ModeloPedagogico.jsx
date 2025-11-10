import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';

const ModeloPedagogico = () => {
  return (
    <section className='py-16 px-4 sm:px-6 md:px-8 bg-[#ececec] text-[#1a1a1a] flex justify-center'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
        className='max-w-5xl w-full bg-[#fdfdfd] p-6 sm:p-8 rounded-2xl shadow-2xl space-y-8'
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center drop-shadow-[0_0_6px_#bbb]'
        >
          Nuestro Modelo Pedagógico
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='bg-white rounded-xl shadow-xl p-6 sm:p-8 text-center space-y-6 group'
        >
          <div className='text-4xl flex justify-center text-[#1a1a1a]'>
            <FaBookOpen className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] group-hover:translate-y-[2px] transition-transform duration-300' />
          </div>
          <p className='text-[15px] text-[#333] leading-relaxed max-w-3xl mx-auto'>
            En José Martí, el aprendizaje se vive. Nuestro modelo pedagógico combina proyectos
            reales, reflexión emocional y trabajo colaborativo. Cada estudiante es protagonista de
            su proceso, guiado por docentes que acompañan desde el diseño y el conocimiento.
            Promovemos el pensamiento crítico, la creatividad aplicada y el vínculo humano como
            pilares del aprendizaje. Aquí, enseñar es acompañar, y aprender es transformar.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ModeloPedagogico;
