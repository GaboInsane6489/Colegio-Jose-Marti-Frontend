import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaMicroscope,
  FaFlask,
  FaChalkboardTeacher,
  FaLightbulb,
  FaLaptopCode,
} from 'react-icons/fa';

const beneficios = [
  {
    titulo: 'Excelencia científica',
    descripcion: [
      'Dominamos las ciencias naturales y el pensamiento lógico',
      'Formamos con propósito para el futuro académico',
    ],
    icono: <FaMicroscope />,
    imagen: 'https://cdn.pixabay.com/photo/2023/06/04/20/19/college-student-8040860_1280.jpg',
  },
  {
    titulo: 'Laboratorios que inspiran',
    descripcion: [
      'Espacios modernos para explorar con seguridad',
      'Biología, química y física desde primaria',
    ],
    icono: <FaFlask />,
    imagen: 'https://observatorio.tec.mx/wp-content/uploads/2022/05/iStock-1141509628.jpeg',
  },
  {
    titulo: 'Vocación docente',
    descripcion: [
      'Educadores con pasión, empatía y excelencia',
      'Inspiración constante en cada clase',
    ],
    icono: <FaChalkboardTeacher />,
    imagen: 'https://cdn.pixabay.com/photo/2016/05/18/11/25/library-1400312_1280.jpg',
  },
  {
    titulo: 'Investigación desde pequeños',
    descripcion: [
      'Curiosidad científica activa desde primaria',
      'Ferias, proyectos y pensamiento crítico',
    ],
    icono: <FaLightbulb />,
    imagen: 'https://cdn.pixabay.com/photo/2016/11/20/09/08/books-1842306_1280.jpg',
  },
  {
    titulo: 'Tecnología que transforma',
    descripcion: [
      'Herramientas digitales y plataformas premium',
      'Aprendizaje interactivo para el mundo real',
    ],
    icono: <FaLaptopCode />,
    imagen: 'https://cdn.pixabay.com/photo/2020/09/03/05/47/students-5540227_1280.jpg',
  },
  {
    titulo: 'Evaluación y acompañamiento',
    descripcion: [
      'Seguimiento emocional y académico constante',
      'Evaluación formativa con propósito',
    ],
    icono: <FaLightbulb />,
    imagen:
      'https://proctorizer.com/wp-content/uploads/2021/10/Sin-t%C3%ADtulo-800-x-800-px-1400-x-800-px-2.png',
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const total = beneficios.length;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [total]);

  const beneficioActual = beneficios[index];

  return (
    <section
      ref={ref}
      className='relative w-full max-w-[100vw] min-h-[600px] text-white overflow-hidden'
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
        className='relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 md:px-8 pt-6 pb-6'
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, type: 'spring', bounce: 0.3, duration: 0.6 }}
          className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
        >
          Nuestra esencia académica
        </motion.h2>

        <div className='relative w-full'>
          <div className='relative overflow-hidden shadow-xl rounded-xl'>
            <img
              src={beneficioActual.imagen}
              alt={beneficioActual.titulo}
              className='w-full h-[420px] sm:h-[500px] md:h-[580px] object-cover'
              onError={(e) => {
                console.warn(`⚠️ Imagen no cargó: ${beneficioActual.imagen}`);
                e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
              }}
            />
            <div
              className='absolute bottom-0 left-0 w-full px-4 py-6 flex flex-col items-center justify-center text-center'
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
              }}
            >
              <div className='text-4xl mb-2 drop-shadow-[0_0_6px_#00FFF7]'>
                {beneficioActual.icono}
              </div>
              <h3 className='text-base sm:text-lg font-semibold mb-2 text-white/90 text-center'>
                {beneficioActual.titulo}
              </h3>
              <div className='space-y-1 text-[15px] sm:text-sm md:text-base text-white/80 leading-relaxed text-center'>
                {beneficioActual.descripcion.map((linea, i) => (
                  <p key={`desc-${i}`}>{linea}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
