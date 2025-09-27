import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaGem } from "react-icons/fa";

const identidad = [
  {
    icon: <FaBullseye />,
    titulo: "Misión",
    texto:
      "Formar estudiantes íntegros, críticos y comprometidos con su entorno, a través de una educación académica de excelencia y valores humanos. Nuestra misión es cultivar mentes curiosas, corazones empáticos y ciudadanos capaces de transformar su realidad con responsabilidad y propósito.",
  },
  {
    icon: <FaEye />,
    titulo: "Visión",
    texto:
      "Ser una institución referente en formación integral, reconocida por su impacto educativo, emocional y social. Aspiramos a construir una comunidad educativa que inspire, acompañe y trascienda, donde cada estudiante descubra su potencial y lo convierta en legado.",
  },
  {
    icon: <FaGem />,
    titulo: "Valores",
    texto:
      "Excelencia, solidaridad, respeto, compromiso, innovación y transformación. Estos valores no son solo principios: son prácticas vivas que guían cada decisión, cada vínculo y cada aprendizaje dentro del Colegio José Martí.",
  },
];

const MisionVisionValores = () => {
  return (
    <section className="py-20 px-6 bg-[#fdfdfd] text-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[#1a1a1a] drop-shadow-[0_0_6px_#ccc]"
        >
          Misión, Visión y Valores
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {identidad.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                bounce: 0.3,
                duration: 0.6,
              }}
              className="bg-[#1a1a1a] rounded-xl shadow-lg p-8 text-left border border-[#333] hover:shadow-[0_0_16px_#ffffff] transition-shadow duration-300"
            >
              <div className="text-white text-4xl mb-4 flex justify-center drop-shadow-[0_0_6px_#ffffff]">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-[0_0_4px_#ffffff] text-center">
                {item.titulo}
              </h3>
              <p className="text-white leading-relaxed">{item.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MisionVisionValores;
