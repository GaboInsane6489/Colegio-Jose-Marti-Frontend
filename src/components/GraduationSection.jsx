import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const GraduationSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[80vh] flex items-center justify-center bg-white overflow-hidden rounded-xl"
    >
      {/* 📸 Imagen de fondo con gradiente oscuro */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wallpapers.com/images/hd/college-graduation-pictures-ibla1ho56tqxy737.jpg"
          alt="Graduación Colegio José Martí"
          className="w-full h-full object-center object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-transparent to-white z-10" />
      </div>

      {/* 🧠 Contenido institucional centrado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 text-center px-4 sm:px-6 max-w-3xl text-white mt-16 sm:mt-24"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-lg sm:text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg"
        >
          “Hoy no solo celebramos un logro, celebramos el inicio de un legado.”
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg text-white/90 mb-6 drop-shadow-sm"
        >
          Cada graduado del Colegio José Martí lleva consigo valores, sueños y
          la fuerza para transformar el mundo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
        >
          <a
            href="/graduaciones"
            className="inline-block bg-[#1a1a1a] text-white px-5 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_12px_#ffffff] hover:text-[#ffffff] drop-shadow-[0_0_6px_#ffffff]"
          >
            Ve nuestras Graduaciones
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GraduationSection;
