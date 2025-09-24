import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center bg-white text-black px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Texto institucional */}
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-[0_0_6px_rgba(0,0,0,0.4)]">
            Nuestra identidad educativa
          </h2>

          <p className="text-lg text-black/90 leading-relaxed mb-4 drop-shadow-sm">
            En el Colegio José Martí, creemos que la educación es el motor de
            transformación social. Nuestra misión es formar estudiantes
            íntegros, críticos y comprometidos con su entorno.
          </p>

          <p className="text-lg text-black/80 leading-relaxed mb-4">
            Promovemos una formación académica rigurosa, acompañada de valores
            universales como el respeto, la empatía y la responsabilidad. Cada
            estudiante es guiado para descubrir su potencial y ejercerlo con
            propósito.
          </p>

          <p className="text-lg text-black/80 leading-relaxed mb-4">
            Nuestra visión pedagógica se basa en el pensamiento científico, el
            aprendizaje activo y la integración tecnológica. Creamos espacios
            donde la curiosidad se convierte en conocimiento, y el conocimiento
            en acción transformadora.
          </p>

          <p className="text-lg text-black/80 leading-relaxed">
            En José Martí, educar es inspirar. Y cada día, lo hacemos con
            excelencia, humanidad y visión de futuro.
          </p>
        </div>

        {/* Imagen institucional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full h-full flex justify-center"
        >
          <img
            src="https://media.quepasa.com.ve/site/wp-content/uploads/2024/02/estudiantes-universitarios-profesores-universidades-Francisco-Diaz.jpg"
            alt="Psicólogo y niño sonriendo"
            className="rounded-xl shadow-lg object-cover max-h-[500px] w-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
