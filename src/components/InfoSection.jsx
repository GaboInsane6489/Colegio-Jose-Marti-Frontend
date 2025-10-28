import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUserGraduate, FaHeart, FaBookOpen } from "react-icons/fa";

const InfoSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#f8f8f8] pt-10 pb-16 px-4 sm:px-6 text-[#1a1a1a] flex justify-center rounded-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl text-center"
      >
        {/* Título institucional */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 drop-shadow-sm text-black"
        >
          Evaluación y acompañamiento integral
        </motion.h2>

        {/* Texto institucional */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg text-[#333] mb-10 max-w-3xl mx-auto px-2"
        >
          En el Colegio José Martí, acompañamos a cada estudiante en su proceso
          académico y emocional. Nuestra evaluación formativa tiene propósito,
          sensibilidad y visión de futuro. Creemos en el desarrollo integral
          como base de la excelencia.
        </motion.p>

        {/* Íconos institucionales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-10 px-2">
          {[
            {
              icon: (
                <FaUserGraduate className="text-3xl sm:text-4xl text-[#1a1a1a] mb-2" />
              ),
              title: "Excelencia Académica",
              text: "Programas formativos que impulsan el pensamiento crítico y la creatividad.",
              delay: 0.4,
            },
            {
              icon: (
                <FaHeart className="text-3xl sm:text-4xl text-[#1a1a1a] mb-2" />
              ),
              title: "Acompañamiento Emocional",
              text: "Seguimiento constante para fortalecer el bienestar y la autoestima.",
              delay: 0.5,
            },
            {
              icon: (
                <FaBookOpen className="text-3xl sm:text-4xl text-[#1a1a1a] mb-2" />
              ),
              title: "Evaluación con Propósito",
              text: "Instrumentos formativos que valoran el proceso y no solo el resultado.",
              delay: 0.6,
            },
          ].map(({ icon, title, text, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              {icon}
              <h3 className="font-semibold text-sm sm:text-base mb-1">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-[#555]">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Botón institucional */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
        >
          <a
            href="/nosotros"
            className="inline-block bg-[#1a1a1a] text-white px-5 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_12px_#ffffff] hover:text-[#ffffff] drop-shadow-[0_0_6px_#ffffff]"
          >
            Conoce más sobre nuestra filosofía
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InfoSection;
