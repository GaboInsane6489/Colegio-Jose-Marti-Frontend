import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate } from "react-icons/fa";

const PerfilEgresado = () => {
  return (
    <section className="py-20 px-6 bg-[#fdfdfd] text-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-10 text-center drop-shadow-[0_0_6px_#ccc]"
        >
          Perfil del Egresado
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="text-[#1a1a1a] text-4xl mb-4 flex justify-center">
            <FaUserGraduate />
          </div>
          <p className="text-[#333] leading-relaxed text-lg">
            El egresado José Martí es una persona íntegra, empática y
            resiliente. Capaz de liderar con valores, pensar críticamente y
            transformar su entorno con compromiso y creatividad. Se comunica con
            claridad, actúa con ética y construye con propósito. Lleva consigo
            una formación académica sólida, una sensibilidad humana profunda y
            una visión transformadora. No solo está preparado para el mundo:
            está listo para mejorarlo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PerfilEgresado;
