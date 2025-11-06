import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';

const ModeloPedagogico = () => {
  return (
    <section className='py-20 px-6 bg-[#ececec] text-[#1a1a1a] flex justify-center'>
      <div className='max-w-5xl w-full bg-[#fdfdfd] p-8 rounded-2xl shadow-2xl space-y-10'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold text-center drop-shadow-[0_0_6px_#bbb]'
        >
          Nuestro Modelo Pedagógico
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
          className='bg-white rounded-xl shadow-xl p-8 text-center space-y-6'
        >
          <div className='text-[#1a1a1a] text-4xl flex justify-center'>
            <FaBookOpen className='text-blue-500' />
          </div>
          <p className='text-[#333] leading-relaxed text-lg max-w-3xl mx-auto'>
            En José Martí, el aprendizaje se vive. Nuestro modelo pedagógico combina proyectos
            reales, reflexión emocional y trabajo colaborativo. Cada estudiante es protagonista de
            su proceso, guiado por docentes que acompañan desde el diseño y el conocimiento.
            Promovemos el pensamiento crítico, la creatividad aplicada y el vínculo humano como
            pilares del aprendizaje. Aquí, enseñar es acompañar, y aprender es transformar.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ModeloPedagogico;
