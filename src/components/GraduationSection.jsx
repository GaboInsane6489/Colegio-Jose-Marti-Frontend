import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const GraduationSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[90vh] flex items-center justify-center bg-white overflow-hidden"
    >
      {/* Imagen de fondo con gradiente oscuro */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wallpapers.com/images/hd/college-graduation-pictures-ibla1ho56tqxy737.jpg"
          alt="Graduación Colegio José Martí"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-transparent to-white z-10" />
      </div>

      {/* Contenido institucional */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        className="relative z-20 text-center px-6 max-w-3xl text-white"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.2,
            type: "spring",
            bounce: 0.3,
            duration: 0.6,
          }}
          className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg"
        >
          “Hoy no solo celebramos un logro, celebramos el inicio de un legado.”
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-sm"
        >
          Cada graduado del Colegio José Martí lleva consigo valores, sueños y
          la fuerza para transformar el mundo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.6,
            type: "spring",
            bounce: 0.4,
            duration: 0.5,
          }}
        >
          <a
            href="/graduaciones"
            className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_12px_#ffffff] hover:text-[#ffffff] text-[#ffffff] drop-shadow-[0_0_6px_#ffffff]"
          >
            Ve nuestras Graduaciones
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GraduationSection;
