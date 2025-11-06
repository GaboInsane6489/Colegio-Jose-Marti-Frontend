import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate } from 'react-icons/fa';

const PerfilEgresado = () => {
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
          Perfil del Egresado
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
          className='bg-white rounded-xl shadow-xl p-8 text-center space-y-6'
        >
          <div className='text-[#1a1a1a] text-4xl flex justify-center'>
            <FaUserGraduate className='text-blue-500' />
          </div>
          <p className='text-[#333] leading-relaxed text-lg max-w-3xl mx-auto'>
            El egresado José Martí es una persona íntegra, empática y resiliente. Capaz de liderar
            con valores, pensar críticamente y transformar su entorno con compromiso y creatividad.
            Se comunica con claridad, actúa con ética y construye con propósito. Lleva consigo una
            formación académica sólida, una sensibilidad humana profunda y una visión
            transformadora. No solo está preparado para el mundo: está listo para mejorarlo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PerfilEgresado;
