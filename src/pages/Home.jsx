import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#fdfdfd] text-[#1a1a1a]">
      <div className="text-center w-full max-w-4xl px-4">
        {/* Título institucional */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight drop-shadow-sm"
        >
          Colegio José Martí
        </motion.h1>

        {/* Subtítulo con animación suave */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-[#333] drop-shadow-sm"
        >
          Formamos de forma integral, excelencia académica y valores que
          transforman.
        </motion.p>

        {/* Línea decorativa animada */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="mt-6 h-[2px] w-24 mx-auto bg-[#FFD700] origin-left"
        />

        {/* Botón de acción (opcional) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <a
            href="/admisiones"
            className="inline-block bg-[#1a1a1a] text-white px-6 py-2 rounded-full font-medium hover:bg-[#333] transition-colors duration-300"
          >
            Conoce nuestra propuesta
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
