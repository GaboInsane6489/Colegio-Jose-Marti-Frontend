import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Secciones institucionales
import About from '../components/Nosotros';
import HistoriaInicio from '../components/HistoriaInicio';
import HistoriaTransformacion from '../components/HistoriaTransformacion';
import HistoriaLegado from '../components/HistoriaLegado';
import MisionVisionValores from '../components/MisionVisionValores';
import LineaTiempoInstitucional from '../components/LineaTiempoInstitucional';
import ModeloPedagogico from '../components/ModeloPedagogico';
import CompromisoComunidad from '../components/CompromisoComunidad';
import PerfilEgresado from '../components/PerfilEgresado';

// Académico
import MateriasSection from '../components/MateriasSection';

// 🧩 Animación modular por bloque
const AnimatedBlock = ({ Component, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className='py-6 px-4 sm:px-6 md:px-8'
    >
      <Component />
    </motion.section>
  );
};

const Nosotros = () => {
  return (
    <main className='relative z-10 w-full overflow-x-hidden text-white'>
      {/* 🎓 Presentación institucional */}
      <AnimatedBlock Component={About} />

      {/* 📖 Historia institucional en tres etapas */}
      <AnimatedBlock Component={HistoriaInicio} delay={0.1} />
      <AnimatedBlock Component={HistoriaTransformacion} delay={0.2} />
      <AnimatedBlock Component={HistoriaLegado} delay={0.3} />

      {/* 🧭 Identidad institucional */}
      <AnimatedBlock Component={MisionVisionValores} delay={0.4} />
      <AnimatedBlock Component={LineaTiempoInstitucional} delay={0.5} />
      <AnimatedBlock Component={ModeloPedagogico} delay={0.6} />
      <AnimatedBlock Component={CompromisoComunidad} delay={0.7} />
      <AnimatedBlock Component={PerfilEgresado} delay={0.8} />

      {/* 📚 Estructura académica */}
      <AnimatedBlock Component={MateriasSection} delay={0.9} />
    </main>
  );
};

export default Nosotros;
