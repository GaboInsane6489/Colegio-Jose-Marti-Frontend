import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../assets/images/LogoColegio.png";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <>
      <section
        ref={ref}
        className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#fdfdfd] text-[#1a1a1a]"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          className="text-center w-full max-w-4xl px-4"
        >
          {/* Imagen institucional animada */}
          <motion.img
            src={logo}
            alt="Escudo Colegio José Martí"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1.1 } : {}}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="mx-auto mb-6 h-40 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,0,0,0.3)]"
          />

          {/* Título institucional */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.2,
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
            }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight drop-shadow-sm"
          >
            Colegio José Martí
          </motion.h1>

          {/* Subtítulo con animación suave */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-[#333] drop-shadow-sm"
          >
            Formamos de forma integral, excelencia académica y valores que
            transforman.
          </motion.p>

          {/* Línea decorativa animada */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="mt-6 h-[2px] w-24 mx-auto bg-[#FFD700] origin-left"
          />

          {/* Botón de acción */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <a
              href="/admisiones"
              className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_12px_#ffffff] hover:text-[#ffffff] text-[#ffffff] drop-shadow-[0_0_6px_#ffffff]"
            >
              Conoce nuestra propuesta
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Sección institucional con carrusel */}
      <HeroSection />
    </>
  );
};

export default Home;
