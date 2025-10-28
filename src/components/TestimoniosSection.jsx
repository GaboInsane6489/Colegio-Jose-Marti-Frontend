import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonios = [
  {
    nombre: "María González",
    rol: "Egresada 2022",
    mensaje:
      "El colegio me dio las herramientas para soñar en grande y lograrlo. Me enseñaron a confiar en mí misma, a trabajar en equipo y a enfrentar los desafíos con determinación.",
  },
  {
    nombre: "Carlos Pérez",
    rol: "Padre de familia",
    mensaje:
      "Aquí no solo aprenden, también se sienten acompañados. Mi hijo encontró un espacio donde fue escuchado, valorado y motivado a crecer.",
  },
  {
    nombre: "Ana Torres",
    rol: "Docente",
    mensaje:
      "Cada estudiante es una historia que merece ser escuchada. En José Martí, no solo enseñamos contenidos, cultivamos sueños.",
  },
  {
    nombre: "Luis Ramírez",
    rol: "Egresado 2020",
    mensaje:
      "Gracias al colegio descubrí mi vocación por la ingeniería. Los proyectos y el acompañamiento marcaron mi camino.",
  },
  {
    nombre: "Isabel Mendoza",
    rol: "Madre de familia",
    mensaje:
      "La evolución de mi hija ha sido increíble. No solo académicamente, sino en su seguridad y empatía.",
  },
  {
    nombre: "Daniela Ríos",
    rol: "Docente",
    mensaje:
      "Aquí enseñamos con el corazón. Cada logro de nuestros estudiantes es también nuestro orgullo.",
  },
];

const TestimoniosSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="pt-10 pb-16 px-4 sm:px-6 bg-[#0a0a0a] text-white rounded-xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8"
      >
        Historias que nos llenan de orgullo
      </motion.h2>

      <div className="relative">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scroll-snap-x pb-4 max-w-6xl mx-auto px-1 sm:px-0 scrollbar-hide">
          {testimonios.map((testimonio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] scroll-snap-align-start bg-black rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] p-5 border border-white/10 flex flex-col justify-between"
            >
              <p className="italic text-white/80 mb-4 text-sm leading-relaxed">
                “{testimonio.mensaje}”
              </p>
              <div>
                <h4 className="font-semibold text-white">
                  {testimonio.nombre}
                </h4>
                <span className="text-xs text-white/50">{testimonio.rol}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indicador visual */}
        <div className="mt-4 text-center text-xs sm:text-sm text-white/60">
          Desliza para ver más testimonios →
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
