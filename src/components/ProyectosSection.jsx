import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const proyectos = [
  {
    titulo: "Feria de Ciencias 2023",
    desc: "Más de 40 proyectos que integraron tecnología, creatividad y trabajo en equipo. Los estudiantes exploraron temas como robótica, energía renovable y biotecnología, presentando soluciones innovadoras con impacto social.",
    img: "https://sanantoniodepadua.edu.pe/wp-content/uploads/2023/11/DSC_2403-scaled.jpg",
  },
  {
    titulo: "Semana de la Lectura",
    desc: "Actividades que fomentan el amor por los libros y la expresión oral. Se realizaron tertulias literarias, dramatizaciones, concursos de lectura y encuentros con autores.",
    img: "https://www.comunidadbaratz.com/wp-content/uploads/Leer-es-un-modo-de-entretenimiento-y-conocimiento-que-desde-hace-tiempo-convive-y-compite-contra-otras-formas-de-ocio-e-informacion.jpg",
  },
  {
    titulo: "Proyecto Verde",
    desc: "Iniciativas ecológicas lideradas por estudiantes para cuidar el entorno. Se organizaron campañas de reciclaje, reforestación y charlas sobre sostenibilidad.",
    img: "https://media.istockphoto.com/id/1480279006/es/foto/d%C3%ADa-de-la-tierra-medio-ambiente-green-globe-in-forest-with-moss-and-sunlight.jpg?s=612x612&w=0&k=20&c=1zsKxBfjYlxFyikpaKz-8XZMKUwjLHFDzjHqVag1mFw=",
  },
];

const ProyectosSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="pt-10 pb-16 px-4 sm:px-6 bg-[#0a0a0a] text-white rounded-xl"
    >
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8"
      >
        Proyectos que dejan huella
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-2">
        {proyectos.map((proyecto, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: index * 0.2,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="bg-black rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden border border-white/10 flex flex-col"
          >
            <img
              src={proyecto.img}
              alt={proyecto.titulo}
              className="w-full h-40 sm:h-48 md:h-56 object-cover"
            />
            <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">
                {proyecto.titulo}
              </h3>
              <p className="text-white/80 mb-4 text-sm sm:text-base leading-relaxed">
                {proyecto.desc}
              </p>
              <a
                href="/proyectos"
                className="inline-block text-white font-medium hover:text-[#FFD700] hover:underline transition-colors duration-300 text-sm sm:text-base"
              >
                Ver más
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProyectosSection;
