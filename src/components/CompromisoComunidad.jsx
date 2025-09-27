import React from "react";
import { motion } from "framer-motion";

const comunidad = [
  {
    titulo: "Campañas ecológicas",
    texto:
      "Reforestación, reciclaje y educación ambiental lideradas por estudiantes.",
  },
  {
    titulo: "Voluntariado social",
    texto:
      "Visitas a comunidades vulnerables, donaciones y acompañamiento emocional.",
  },
  {
    titulo: "Alianzas locales",
    texto:
      "Colaboraciones con instituciones culturales, deportivas y científicas.",
  },
];

const CompromisoComunidad = () => {
  return (
    <section className="py-20 px-6 bg-[#fdfdfd] text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Compromiso con la Comunidad
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {comunidad.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", duration: 0.5 }}
              className="bg-white border border-[#eaeaea] rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">{item.titulo}</h3>
              <p className="text-[#555] leading-relaxed">{item.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompromisoComunidad;
