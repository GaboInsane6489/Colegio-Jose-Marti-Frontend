import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const proyectos = [
  {
    titulo: 'Feria de Ciencias 2023',
    desc: 'Más de 40 proyectos que integraron tecnología, creatividad y trabajo en equipo. Los estudiantes exploraron temas como robótica, energía renovable y biotecnología, presentando soluciones innovadoras con impacto social.',
    img: 'https://sanantoniodepadua.edu.pe/wp-content/uploads/2023/11/DSC_2403-scaled.jpg',
  },
  {
    titulo: 'Semana de la Lectura',
    desc: 'Actividades que fomentan el amor por los libros y la expresión oral. Se realizaron tertulias literarias, dramatizaciones, concursos de lectura y encuentros con autores.',
    img: 'https://www.comunidadbaratz.com/wp-content/uploads/Leer-es-un-modo-de-entretenimiento-y-conocimiento-que-desde-hace-tiempo-convive-y-compite-contra-otras-formas-de-ocio-e-informacion.jpg',
  },
  {
    titulo: 'Proyecto Verde',
    desc: 'Iniciativas ecológicas lideradas por estudiantes para cuidar el entorno. Se organizaron campañas de reciclaje, reforestación y charlas sobre sostenibilidad.',
    img: 'https://cdn.pixabay.com/photo/2014/10/14/20/14/library-488690_1280.jpg',
  },
];

const ProyectosSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='w-full bg-black text-white px-4 sm:px-6 py-12 sm:py-16 scroll-mt-24 border border-white drop-shadow-[0_0_4px_#00FFF7]'
    >
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 drop-shadow-[0_0_4px_#00FFF7]'
      >
        Proyectos que dejan huella
      </motion.h2>

      <div className='flex flex-col gap-10 max-w-screen-xl mx-auto'>
        {proyectos.map((proyecto, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
            className='relative w-full h-[360px] sm:h-[420px] md:h-[480px] overflow-hidden rounded-xl border border-white/20'
          >
            <img
              src={proyecto.img}
              alt={proyecto.titulo}
              className='absolute inset-0 w-full h-full object-cover'
              onError={(e) => {
                console.warn(`⚠️ Imagen no cargó: ${proyecto.img}`);
                e.target.src = 'https://via.placeholder.com/1200x480?text=Imagen+no+disponible';
              }}
            />
            <div
              className='absolute bottom-0 w-full px-4 sm:px-6 py-6 text-center flex flex-col items-center justify-center'
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.75))',
              }}
            >
              <h3 className='text-lg sm:text-xl font-semibold mb-2 drop-shadow-[0_0_4px_#00FFF7]'>
                {proyecto.titulo}
              </h3>
              <p className='text-sm sm:text-base max-w-3xl text-white/90 leading-relaxed mb-4 drop-shadow-[0_0_3px_rgba(0,0,0,0.6)]'>
                {proyecto.desc}
              </p>
              <a
                href='/proyectos'
                className='inline-block bg-black text-white px-4 py-2 rounded-full font-medium text-sm sm:text-base border border-white drop-shadow-[0_0_4px_#00FFF7] hover:bg-white hover:text-black transition-all duration-300'
              >
                Ver más
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProyectosSection;
