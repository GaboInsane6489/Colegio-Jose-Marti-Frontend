import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className='py-16 px-4 sm:px-6 md:px-8 text-white flex justify-center bg-[#0d0d0d] relative overflow-hidden'
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
        className='max-w-5xl w-full bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-2xl space-y-10'
      >
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className='text-center space-y-3'
        >
          <FaHistory className='text-[#00f0ff] text-3xl mx-auto drop-shadow-[0_0_6px_#00f0ff]' />
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] pt-2'>
            Línea de Tiempo Institucional
          </h2>
        </motion.header>

        <div className='relative border-l-[3px] border-white/80 pl-5 space-y-8'>
          {hitos.map((hito, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                bounce: 0.3,
                duration: 0.6,
              }}
              className='relative bg-[#111] rounded-xl p-5 shadow-md border border-white/60 hover:shadow-[0_0_16px_rgba(255,255,255,0.4)] transition-shadow duration-300'
            >
              <div className='absolute -left-[13px] top-6 w-4 h-4 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]' />
              <h3 className='text-lg font-semibold mb-2 text-white drop-shadow-sm text-center sm:text-left'>
                {hito.año}
              </h3>
              <p className='text-[15px] text-white/90 leading-relaxed text-center sm:text-left'>
                {hito.evento}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LineaTiempoInstitucional;
