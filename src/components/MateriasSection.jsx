import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const materias = [
  { nombre: "Matemáticas", rango: "1er a 2do Año" },
  { nombre: "Lengua y Literatura", rango: "1er a 3er Año" },
  { nombre: "Biología", rango: "2do a 3er Año" },
  { nombre: "Historia Universal", rango: "2do a 4to Año" },
  { nombre: "Física", rango: "3er a 4to Año" },
  { nombre: "Educación para la Ciudadanía", rango: "3er a 5to Año" },
  { nombre: "Química", rango: "4to Año" },
  { nombre: "Filosofía", rango: "4to a 5to Año" },
  { nombre: "Orientación Vocacional", rango: "5to Año" },
  { nombre: "Proyecto de Investigación", rango: "5to Año" },
  { nombre: "Inglés", rango: "1er a 5to Año" },
  { nombre: "Educación Física", rango: "1er a 3er Año" },
];

const MateriasSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="w-full bg-white py-20 px-6 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
        className="max-w-6xl w-full text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#1a1a1a]">
          Materias por Año
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {materias.map((materia, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: index * 0.1,
                type: "spring",
                bounce: 0.3,
                duration: 0.6,
              }}
              className="bg-[#2a2a2a] text-white rounded-lg p-6 shadow-md hover:shadow-[0_0_12px_#dcdcdc] hover:text-[#dcdcdc] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{materia.nombre}</h3>
              <p className="text-sm text-white/80">{materia.rango}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MateriasSection;
