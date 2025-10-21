import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaHandsHelping, FaStar, FaHeart } from "react-icons/fa";

const valores = [
  {
    icon: <FaStar />,
    title: "Excelencia",
    desc: "Buscamos lo mejor en cada acción. La excelencia no es una meta, es una actitud que guía nuestro trabajo diario. Promovemos el esfuerzo, la curiosidad y la mejora continua en cada estudiante, docente y colaborador.",
  },
  {
    icon: <FaHeart />,
    title: "Solidaridad",
    desc: "Crecemos juntos, siempre. La solidaridad es el vínculo que nos une como comunidad. Fomentamos el respeto mutuo, la empatía y el acompañamiento en cada etapa del proceso educativo.",
  },
  {
    icon: <FaHandsHelping />,
    title: "Respeto",
    desc: "Valoramos cada voz. El respeto es la base de toda convivencia. Escuchamos, reconocemos y celebramos la diversidad de pensamientos, emociones y culturas. En José Martí, cada persona importa, cada historia cuenta, cada voz transforma.",
  },
];

const ValoresSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="pt-10 pb-20 px-6 bg-[#fdfdfd] text-white rounded-xl"
      // Si quieres que se integre con el video de fondo, reemplaza la línea anterior por:
      // className="pt-10 pb-20 px-6 bg-white/5 backdrop-blur-md text-white rounded-xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1a1a1a] drop-shadow-[0_0_6px_#ccc]"
      >
        Nuestros valores nos definen
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {valores.map((valor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: index * 0.2,
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
            }}
            className="bg-[#1a1a1a] rounded-xl shadow-lg p-8 text-center border border-[#333] hover:shadow-[0_0_16px_#ffffff] transition-shadow duration-300"
          >
            <div className="text-[#ffffff] text-4xl mb-4 flex justify-center drop-shadow-[0_0_6px_#ffffff]">
              {valor.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-[0_0_4px_#ffffff]">
              {valor.title}
            </h3>
            <p className="text-white leading-relaxed">{valor.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValoresSection;
