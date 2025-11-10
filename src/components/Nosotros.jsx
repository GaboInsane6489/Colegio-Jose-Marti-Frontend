import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className='w-full min-h-screen flex items-center justify-center bg-white text-black px-4 sm:px-6 md:px-8 py-16 sm:py-20'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
        className='max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center'
      >
        {/* 🧠 Texto institucional */}
        <div className='text-left'>
          <h2 className='text-3xl sm:text-4xl font-semibold mb-5 tracking-tight leading-snug drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]'>
            Nuestra identidad educativa
          </h2>

          <div className='space-y-4 text-base sm:text-[17px] text-black/85 leading-relaxed'>
            <p>
              En el Colegio José Martí, creemos que la educación es el motor de transformación
              social. Nuestra misión es formar estudiantes íntegros, críticos y comprometidos con su
              entorno.
            </p>
            <p>
              Promovemos una formación académica rigurosa, acompañada de valores universales como el
              respeto, la empatía y la responsabilidad. Cada estudiante es guiado para descubrir su
              potencial y ejercerlo con propósito.
            </p>
            <p>
              Nuestra visión pedagógica se basa en el pensamiento científico, el aprendizaje activo
              y la integración tecnológica. Creamos espacios donde la curiosidad se convierte en
              conocimiento, y el conocimiento en acción transformadora.
            </p>
            <p>
              En José Martí, educar es inspirar. Y cada día, lo hacemos con excelencia, humanidad y
              visión de futuro.
            </p>
          </div>
        </div>

        {/* 🖼️ Imagen institucional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className='w-full h-full flex justify-center'
        >
          <div className='w-full max-w-md sm:max-w-lg'>
            <img
              src='https://media.quepasa.com.ve/site/wp-content/uploads/2024/02/estudiantes-universitarios-profesores-universidades-Francisco-Diaz.jpg'
              alt='Estudiantes en aula institucional'
              className='rounded-xl shadow-xl object-cover w-full h-auto max-h-[480px]'
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
