import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHandsHelping, FaStar, FaHeart } from 'react-icons/fa';

const valores = [
  {
    icon: <FaStar />,
    title: 'Excelencia',
    desc: 'Buscamos lo mejor en cada acción. La excelencia no es una meta, es una actitud que guía nuestro trabajo diario. Promovemos el esfuerzo, la curiosidad y la mejora continua en cada estudiante, docente y colaborador.',
    imagen: 'https://cdn.pixabay.com/photo/2023/01/26/02/15/books-7744938_1280.jpg',
  },
  {
    icon: <FaHeart />,
    title: 'Solidaridad',
    desc: 'Crecemos juntos, siempre. La solidaridad es el vínculo que nos une como comunidad. Fomentamos el respeto mutuo, la empatía y el acompañamiento en cada etapa del proceso educativo.',
    imagen: 'https://cdn.pixabay.com/photo/2016/02/16/21/07/christmas-background-1204029_1280.jpg',
  },
  {
    icon: <FaHandsHelping />,
    title: 'Respeto',
    desc: 'Valoramos cada voz. El respeto es la base de toda convivencia. Escuchamos, reconocemos y celebramos la diversidad de pensamientos, emociones y culturas. En José Martí, cada persona importa, cada historia cuenta, cada voz transforma.',
    imagen: 'https://cdn.pixabay.com/photo/2019/12/21/20/44/math-work-4711302_1280.jpg',
  },
];

const ValoresSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='w-full max-w-[100vw] overflow-hidden bg-[#fdfdfd] px-2 sm:px-4 py-10 sm:py-14'
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-[#1a1a1a] drop-shadow-[0_0_6px_#ccc]'
      >
        Nuestros valores nos definen
      </motion.h2>

      <div className='flex flex-col gap-8'>
        {valores.map((valor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
            className='relative w-full max-w-full h-[360px] sm:h-[420px] md:h-[480px] overflow-hidden'
          >
            <img
              src={valor.imagen}
              alt={valor.title}
              className='absolute inset-0 w-full h-full object-cover'
              onError={(e) => {
                console.warn(`⚠️ Imagen no cargó: ${valor.imagen}`);
                e.target.src = 'https://via.placeholder.com/1200x480?text=Imagen+no+disponible';
              }}
            />
            <div
              className='absolute bottom-0 w-full px-4 sm:px-6 py-6 text-center text-white flex flex-col items-center justify-center'
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.75))',
              }}
            >
              <div className='text-4xl sm:text-5xl mb-3 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'>
                {valor.icon}
              </div>
              <h3 className='text-lg sm:text-xl font-semibold mb-2 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]'>
                {valor.title}
              </h3>
              <p className='text-sm sm:text-base max-w-3xl text-white/90 leading-relaxed drop-shadow-[0_0_3px_rgba(0,0,0,0.6)]'>
                {valor.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValoresSection;
