import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHandsHelping, FaUniversity } from 'react-icons/fa';

const comunidad = [
  {
    titulo: 'Campañas ecológicas',
    texto: 'Reforestación, reciclaje y educación ambiental lideradas por estudiantes.',
    icono: <FaLeaf className='text-green-500 text-3xl' />,
  },
  {
    titulo: 'Voluntariado social',
    texto: 'Visitas a comunidades vulnerables, donaciones y acompañamiento emocional.',
    icono: <FaHandsHelping className='text-yellow-500 text-3xl' />,
  },
  {
    titulo: 'Alianzas locales',
    texto: 'Colaboraciones con instituciones culturales, deportivas y científicas.',
    icono: <FaUniversity className='text-blue-500 text-3xl' />,
  },
];

const CompromisoComunidad = () => {
  return (
    <section className='py-20 px-6 bg-[#ececec] text-[#1a1a1a] flex justify-center'>
      <div className='max-w-6xl w-full bg-[#fdfdfd] p-8 rounded-2xl shadow-2xl space-y-10 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
          className='text-3xl md:text-4xl font-bold'
        >
          Compromiso con la Comunidad
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
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
              className='bg-white border border-[#eaeaea] rounded-xl p-6 shadow-xl flex flex-col items-center text-center space-y-4'
            >
              <div>{item.icono}</div>
              <h3 className='text-xl font-semibold'>{item.titulo}</h3>
              <p className='text-[#555] leading-relaxed'>{item.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompromisoComunidad;
