import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUserGraduate, FaHeart, FaBookOpen } from "react-icons/fa";

const InfoSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#f8f8f8] py-20 px-6 text-[#1a1a1a] flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        className="max-w-6xl text-center"
      >
        {/* Título institucional */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.2,
            type: "spring",
            bounce: 0.3,
            duration: 0.6,
          }}
          className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-sm"
        >
          Evaluación y acompañamiento integral
        </motion.h2>

        {/* Texto institucional */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#333] mb-10 max-w-3xl mx-auto"
        >
          En el Colegio José Martí, acompañamos a cada estudiante en su proceso
          académico y emocional. Nuestra evaluación formativa tiene propósito,
          sensibilidad y visión de futuro. Creemos en el desarrollo integral
          como base de la excelencia.
        </motion.p>

        {/* Íconos institucionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.5,
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
            }}
            className="flex flex-col items-center"
          >
            <FaUserGraduate className="text-4xl text-[#1a1a1a] mb-2" />
            <h3 className="font-semibold text-lg">Excelencia Académica</h3>
            <p className="text-sm text-[#555] text-center">
              Programas formativos que impulsan el pensamiento crítico y la
              creatividad.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.6,
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
            }}
            className="flex flex-col items-center"
          >
            <FaHeart className="text-4xl text-[#1a1a1a] mb-2" />
            <h3 className="font-semibold text-lg">Acompañamiento Emocional</h3>
            <p className="text-sm text-[#555] text-center">
              Seguimiento constante para fortalecer el bienestar y la
              autoestima.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.7,
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
            }}
            className="flex flex-col items-center"
          >
            <FaBookOpen className="text-4xl text-[#1a1a1a] mb-2" />
            <h3 className="font-semibold text-lg">Evaluación con Propósito</h3>
            <p className="text-sm text-[#555] text-center">
              Instrumentos formativos que valoran el proceso y no solo el
              resultado.
            </p>
          </motion.div>
        </div>

        {/* Botón institucional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.9,
            type: "spring",
            bounce: 0.4,
            duration: 0.5,
          }}
        >
          <a
            href="/nosotros"
            className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_12px_#ffffff] hover:text-[#ffffff] text-[#ffffff] drop-shadow-[0_0_6px_#ffffff]"
          >
            Conoce más sobre nuestra filosofía
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfoSection;
