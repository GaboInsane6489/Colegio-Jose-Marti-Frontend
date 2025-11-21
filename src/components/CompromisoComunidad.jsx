import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaUniversity } from 'react-icons/fa';

const comunidad = [
  {
    titulo: 'Campañas ecológicas',
    texto: 'Reforestación, reciclaje y educación ambiental lideradas por estudiantes.',
    icono: <FaLeaf className='text-green-500 text-3xl drop-shadow-[0_0_4px_#00FF99]' />,
  },
  {
    titulo: 'Voluntariado social',
    texto: 'Visitas a comunidades vulnerables, donaciones y acompañamiento emocional.',
    icono: <FaHandsHelping className='text-yellow-500 text-3xl drop-shadow-[0_0_4px_#FFD700]' />,
  },
  {
    titulo: 'Alianzas locales',
    texto: 'Colaboraciones con instituciones culturales, deportivas y científicas.',
    icono: <FaUniversity className='text-blue-500 text-3xl drop-shadow-[0_0_4px_#00CCFF]' />,
  },
];

const CompromisoComunidad = () => {
  return (
    <section className='py-16 px-0 bg-[#ececec] text-[#1a1a1a] w-full'>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
        className='max-w-7xl mx-auto bg-[#fdfdfd] px-4 sm:px-6 md:px-8 py-10 shadow-2xl space-y-12 text-center'
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: 'spring', bounce: 0.3, duration: 0.6 }}
          className='text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight drop-shadow-[0_0_6px_rgba(0,0,0,0.2)]'
        >
          Compromiso con la Comunidad
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
          {comunidad.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                duration: 0.5,
              }}
              className='bg-white border border-[#eaeaea] rounded-none p-6 shadow-xl flex flex-col items-center text-center space-y-4'
            >
              <div>{item.icono}</div>
              <h3 className='text-lg sm:text-xl font-semibold text-[#1a1a1a]'>{item.titulo}</h3>
              <p className='text-[15px] text-[#555] leading-relaxed'>{item.texto}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CompromisoComunidad;
