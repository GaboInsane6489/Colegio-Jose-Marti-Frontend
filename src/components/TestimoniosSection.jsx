import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';

const testimonios = [
  {
    nombre: 'María González',
    rol: 'Egresada 2022',
    mensaje:
      'El colegio me dio las herramientas para soñar en grande y lograrlo. Me enseñaron a confiar en mí misma, a trabajar en equipo y a enfrentar los desafíos con determinación.',
  },
  {
    nombre: 'Carlos Pérez',
    rol: 'Padre de familia',
    mensaje:
      'Aquí no solo aprenden, también se sienten acompañados. Mi hijo encontró un espacio donde fue escuchado, valorado y motivado a crecer.',
  },
  {
    nombre: 'Ana Torres',
    rol: 'Docente',
    mensaje:
      'Cada estudiante es una historia que merece ser escuchada. En José Martí, no solo enseñamos contenidos, cultivamos sueños.',
  },
  {
    nombre: 'Luis Ramírez',
    rol: 'Egresado 2020',
    mensaje:
      'Gracias al colegio descubrí mi vocación por la ingeniería. Los proyectos y el acompañamiento marcaron mi camino.',
  },
  {
    nombre: 'Isabel Mendoza',
    rol: 'Madre de familia',
    mensaje:
      'La evolución de mi hija ha sido increíble. No solo académicamente, sino en su seguridad y empatía.',
  },
  {
    nombre: 'Daniela Ríos',
    rol: 'Docente',
    mensaje:
      'Aquí enseñamos con el corazón. Cada logro de nuestros estudiantes es también nuestro orgullo.',
  },
];

const TestimoniosSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className='w-full bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#000] text-white py-12 sm:py-16'
    >
      <div className='max-w-[1400px] mx-auto px-4 sm:px-6'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
        >
          Historias que nos llenan de orgullo
        </motion.h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonios.map((testimonio, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                ease: 'easeOut',
              }}
              className='bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] hover:translate-y-[2px] transition-transform duration-300 shadow-[0_0_24px_rgba(0,255,247,0.15)] px-6 py-6 border border-[#00FFF7]/30 rounded-none flex flex-col justify-between w-full'
            >
              <HiOutlineChatBubbleBottomCenterText className='text-[#00FFF7] w-6 h-6 mb-4 drop-shadow-[0_0_6px_#00FFF7]' />
              <p className='italic text-white/80 mb-6 text-[14px] leading-relaxed font-serif'>
                “{testimonio.mensaje}”
              </p>
              <div className='text-left'>
                <h4 className='font-semibold text-[#00FFF7] text-sm sm:text-base drop-shadow-[0_0_4px_#00FFF7]'>
                  {testimonio.nombre}
                </h4>
                <span className='text-xs text-white/50'>{testimonio.rol}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className='mt-10 text-center text-xs sm:text-sm text-white/60 italic animate-pulse'>
          Descubre más historias que nos inspiran →
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
