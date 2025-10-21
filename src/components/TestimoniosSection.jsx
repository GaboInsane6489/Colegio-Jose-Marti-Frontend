import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonios = [
  {
    nombre: "María González",
    rol: "Egresada 2022",
    mensaje:
      "El colegio me dio las herramientas para soñar en grande y lograrlo. Me enseñaron a confiar en mí misma, a trabajar en equipo y a enfrentar los desafíos con determinación. Hoy, miro atrás y agradezco cada momento vivido en sus aulas. Fue más que una educación, fue una transformación.",
  },
  {
    nombre: "Carlos Pérez",
    rol: "Padre de familia",
    mensaje:
      "Aquí no solo aprenden, también se sienten acompañados. Mi hijo encontró un espacio donde fue escuchado, valorado y motivado a crecer. Como padre, ver su evolución emocional y académica ha sido profundamente gratificante. El colegio es una extensión de nuestra familia.",
  },
  {
    nombre: "Ana Torres",
    rol: "Docente",
    mensaje:
      "Cada estudiante es una historia que merece ser escuchada. En José Martí, no solo enseñamos contenidos, cultivamos sueños. Acompañamos procesos, celebramos logros y aprendemos juntos. Ser parte de esta comunidad es un privilegio que transforma también a quienes enseñamos.",
  },
];

const TestimoniosSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="pt-10 pb-16 px-4 bg-[#f5f5f5] text-[#1a1a1a] rounded-xl"
      // Si quieres que se integre con el video de fondo, reemplaza la línea anterior por:
      // className="pt-10 pb-16 px-4 bg-white/5 backdrop-blur-md text-white rounded-xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        Historias que nos llenan de orgullo
      </motion.h2>

      <div className="flex flex-wrap md:flex-nowrap gap-6 overflow-x-auto pb-4 max-w-6xl mx-auto">
        {testimonios.map((testimonio, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: index * 0.2,
              type: "spring",
              bounce: 0.3,
              duration: 0.6,
            }}
            className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] p-6 border border-[#eaeaea] flex flex-col justify-between"
          >
            <p className="italic text-[#333] mb-4 leading-relaxed">
              “{testimonio.mensaje}”
            </p>
            <div>
              <h4 className="font-semibold text-[#1a1a1a]">
                {testimonio.nombre}
              </h4>
              <span className="text-sm text-[#777]">{testimonio.rol}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimoniosSection;
