import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBullseye, FaEye, FaGem } from 'react-icons/fa';

const identidad = [
  {
    icon: <FaBullseye />,
    titulo: 'Misión',
    texto:
      'Formar estudiantes íntegros, críticos y comprometidos con su entorno, a través de una educación académica de excelencia y valores humanos. Nuestra misión es cultivar mentes curiosas, corazones empáticos y ciudadanos capaces de transformar su realidad con responsabilidad y propósito.',
    imagen: 'https://cdn.pixabay.com/photo/2016/11/30/13/28/university-student-1872810_1280.jpg',
  },
  {
    icon: <FaEye />,
    titulo: 'Visión',
    texto:
      'Ser una institución referente en formación integral, reconocida por su impacto educativo, emocional y social. Aspiramos a construir una comunidad educativa que inspire, acompañe y trascienda, donde cada estudiante descubra su potencial y lo convierta en legado.',
    imagen: 'https://cdn.pixabay.com/photo/2016/07/28/20/34/book-1549589_1280.jpg',
  },
  {
    icon: <FaGem />,
    titulo: 'Valores',
    texto:
      'Excelencia, solidaridad, respeto, compromiso, innovación y transformación. Estos valores no son solo principios: son prácticas vivas que guían cada decisión, cada vínculo y cada aprendizaje dentro del Colegio José Martí.',
    imagen: 'https://cdn.pixabay.com/photo/2016/09/26/23/14/library-1697314_1280.jpg',
  },
];

const Card = ({ icon, titulo, texto, imagen, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className='relative w-full h-[520px] sm:h-[600px] md:h-[680px] overflow-hidden'
    >
      {/* Imagen de fondo */}
      <img src={imagen} alt={titulo} className='absolute inset-0 w-full h-full object-cover' />

      {/* Degradado y contenido abajo */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end'>
        <div className='w-full text-center text-white backdrop-blur-sm pb-10 pt-6 px-4 sm:px-6'>
          <div className='flex justify-center mb-3 text-4xl drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'>
            {icon}
          </div>
          <h3 className='text-2xl font-semibold mb-4 drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]'>
            {titulo}
          </h3>
          <p className='text-base sm:text-[17px] leading-relaxed text-white/90 max-w-4xl mx-auto'>
            {texto}
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const MisionVisionValores = () => {
  return (
    <section className='w-full bg-[#fdfdfd] text-white'>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
        className='text-3xl md:text-4xl font-bold text-center py-12 text-[#1a1a1a] drop-shadow-[0_0_6px_#ccc]'
      >
        Misión, Visión y Valores
      </motion.h2>

      <div className='space-y-12'>
        {identidad.map((item, index) => (
          <Card
            key={index}
            icon={item.icon}
            titulo={item.titulo}
            texto={item.texto}
            imagen={item.imagen}
            delay={index * 0.15}
          />
        ))}
      </div>
    </section>
  );
};

export default MisionVisionValores;
