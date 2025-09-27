import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const materias = [
  {
    nombre: "Matemáticas",
    rango: "1er a 2do Año",
    docente: "Prof. Luis Ramírez",
  },
  {
    nombre: "Lengua y Literatura",
    rango: "1er a 3er Año",
    docente: "Prof. Ana Torres",
  },
  {
    nombre: "Biología",
    rango: "2do a 3er Año",
    docente: "Prof. Carla Mendoza",
  },
  {
    nombre: "Historia Universal",
    rango: "2do a 4to Año",
    docente: "Prof. Jorge Salas",
  },
  { nombre: "Física", rango: "3er a 4to Año", docente: "Prof. Daniel Ríos" },
  {
    nombre: "Educación para la Ciudadanía",
    rango: "3er a 5to Año",
    docente: "Prof. Mariana López",
  },
  { nombre: "Química", rango: "4to Año", docente: "Prof. Andrés Peña" },
  { nombre: "Filosofía", rango: "4to a 5to Año", docente: "Prof. Laura Gómez" },
  {
    nombre: "Orientación Vocacional",
    rango: "5to Año",
    docente: "Prof. Silvia Herrera",
  },
  {
    nombre: "Proyecto de Investigación",
    rango: "5to Año",
    docente: "Prof. Ricardo Díaz",
  },
  { nombre: "Inglés", rango: "1er a 5to Año", docente: "Prof. Emily Johnson" },
  {
    nombre: "Educación Física",
    rango: "1er a 3er Año",
    docente: "Prof. Miguel Torres",
  },
];

const MateriasSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="w-full bg-white py-20 px-6 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        className="max-w-6xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#1a1a1a]">
          Materias por Año
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-[#eaeaea] rounded-lg overflow-hidden">
            <thead className="bg-[#f5f5f5] text-[#1a1a1a]">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Materia</th>
                <th className="text-left px-4 py-3 font-semibold">
                  Rango Académico
                </th>
                <th className="text-left px-4 py-3 font-semibold">Docente</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.4,
                  }}
                  className="border-t border-[#eaeaea] hover:bg-[#f9f9f9] transition-colors"
                >
                  <td className="px-4 py-3 text-[#333] font-medium">
                    {materia.nombre}
                  </td>
                  <td className="px-4 py-3 text-[#555]">{materia.rango}</td>
                  <td className="px-4 py-3 text-[#444]">{materia.docente}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default MateriasSection;
