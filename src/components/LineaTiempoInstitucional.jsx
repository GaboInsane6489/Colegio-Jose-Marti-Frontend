import React from 'react';
import { motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';

const hitos = [
  {
    año: '1998',
    evento:
      'Fundación del Colegio José Martí. Nace con el propósito de formar estudiantes íntegros, comprometidos con su entorno y preparados para transformar el mundo desde el conocimiento y los valores. Desde sus inicios, se ha enfocado en una educación emocionalmente significativa.',
  },
  {
    año: '2005',
    evento:
      'Primer egreso institucional. Una generación que marcó el inicio de un legado académico y humano. Los egresados demostraron que el aprendizaje va más allá del aula, llevando consigo el espíritu transformador del colegio.',
  },
  {
    año: '2012',
    evento:
      'Reconocimiento regional por excelencia académica. El colegio fue destacado por sus resultados en pruebas nacionales, su innovación pedagógica y el compromiso de su comunidad educativa. Este hito consolidó su reputación institucional.',
  },
  {
    año: '2020',
    evento:
      'Implementación del modelo pedagógico por proyectos. Se transforma la forma de enseñar y aprender, colocando al estudiante como protagonista. Se integran saberes, emociones y contextos reales para una formación integral.',
  },
  {
    año: '2023',
    evento:
      'Inicio del programa de transformación emocional. Se incorpora el acompañamiento emocional como eje transversal. Talleres, mentorías y espacios de escucha fortalecen el bienestar y la resiliencia de toda la comunidad.',
  },
];

const LineaTiempoInstitucional = () => {
  return (
    <section
      className='py-20 px-6 text-white flex justify-center bg-[#0d0d0d] relative overflow-hidden'
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 12px)',
      }}
    >
      <div className='max-w-5xl w-full bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl space-y-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
          className='text-center space-y-4'
        >
          <FaHistory className='text-yellow-400 text-4xl mx-auto' />
          <h2 className='text-3xl md:text-4xl font-bold text-white'>
            Línea de Tiempo Institucional
          </h2>
        </motion.div>

        <div className='relative border-l-4 border-white/30 pl-6 space-y-10'>
          {hitos.map((hito, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                bounce: 0.3,
                duration: 0.6,
              }}
              className='bg-black rounded-xl p-6 shadow-xl border border-white/20 hover:shadow-[0_0_12px_#ffffff] transition-shadow duration-300'
            >
              <h3 className='text-xl font-semibold mb-2 text-white drop-shadow-[0_0_4px_#ffffff]'>
                {hito.año}
              </h3>
              <p className='text-white leading-relaxed'>{hito.evento}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LineaTiempoInstitucional;
