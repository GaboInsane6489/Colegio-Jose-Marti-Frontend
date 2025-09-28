import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/images/LogoColegio.png";

const LandingVideo = ({ inView }) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", bounce: 0.3, duration: 1 }}
      className="relative w-full h-[100vh] flex items-center justify-center text-[#1a1a1a] overflow-hidden"
    >
      {/* 🎥 Video de fondo institucional */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source
            src="https://cdn.pixabay.com/video/2015/09/27/846-140823862_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* 🧱 Capa de oscurecimiento ligera */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* 🧠 Contenido institucional */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        className="relative z-10 text-center w-full max-w-4xl px-4"
      >
        <motion.img
          src={logo}
          alt="Escudo Colegio José Martí"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1.1 } : {}}
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          className="mx-auto mb-6 h-40 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,0,0,0.3)]"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.2,
            type: "spring",
            bounce: 0.3,
            duration: 0.6,
          }}
          className="text-4xl md:text-5xl font-bold mb-2 tracking-tight leading-tight text-white drop-shadow-lg"
        >
          Colegio José Martí
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl italic text-white mb-4 drop-shadow"
        >
          “Aquí no solo se aprende, se transforma.”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl mx-auto text-white drop-shadow"
        >
          Formamos de forma integral, excelencia académica y valores que
          transforman.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="mt-6 h-[2px] w-24 mx-auto bg-[#FFD700] origin-left"
        />

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
    </motion.section>
  );
};

export default LandingVideo;
