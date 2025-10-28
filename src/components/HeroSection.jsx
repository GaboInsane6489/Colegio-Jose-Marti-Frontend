import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaMicroscope,
  FaFlask,
  FaChalkboardTeacher,
  FaLightbulb,
  FaLaptopCode,
} from "react-icons/fa";

const beneficios = [
  {
    titulo: "Excelencia científica",
    descripcion: [
      "Dominamos las ciencias naturales y el pensamiento lógico",
      "Formamos con propósito para el futuro académico",
    ],
    icono: (
      <FaMicroscope className="text-white text-4xl drop-shadow mb-4 mx-auto" />
    ),
    imagen: "https://c.files.bbci.co.uk/6799/production/_96112562_39970406.jpg",
  },
  {
    titulo: "Laboratorios que inspiran",
    descripcion: [
      "Espacios modernos para explorar con seguridad",
      "Biología, química y física desde primaria",
    ],
    icono: <FaFlask className="text-white text-4xl drop-shadow mb-4 mx-auto" />,
    imagen:
      "https://observatorio.tec.mx/wp-content/uploads/2022/05/iStock-1141509628.jpeg",
  },
  {
    titulo: "Vocación docente",
    descripcion: [
      "Educadores con pasión, empatía y excelencia",
      "Inspiración constante en cada clase",
    ],
    icono: (
      <FaChalkboardTeacher className="text-white text-4xl drop-shadow mb-4 mx-auto" />
    ),
    imagen:
      "https://ca-times.brightspotcdn.com/dims4/default/ecd9ff7/2147483647/strip/true/crop/5760x3840+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F42%2Fb8%2Fd543d74138f54f7555d530349606%2F9ce9532c3de146148822b1f1c11f5477",
  },
  {
    titulo: "Investigación desde pequeños",
    descripcion: [
      "Curiosidad científica activa desde primaria",
      "Ferias, proyectos y pensamiento crítico",
    ],
    icono: (
      <FaLightbulb className="text-white text-4xl drop-shadow mb-4 mx-auto" />
    ),
    imagen:
      "https://resizer.glanacion.com/resizer/v2/mas-de-la-mitad-de-los-estudiantes-argentinos-no-W7FI6NGLNVFLZERPYNK6B4ZE2Y.jpg?auth=da3673a7c5c1537c2c7bd333e5c0918b44b1b078b22e2d519587b27486ad1a9f&width=768&quality=70&smart=false",
  },
  {
    titulo: "Tecnología que transforma",
    descripcion: [
      "Herramientas digitales y plataformas premium",
      "Aprendizaje interactivo para el mundo real",
    ],
    icono: (
      <FaLaptopCode className="text-white text-4xl drop-shadow mb-4 mx-auto" />
    ),
    imagen:
      "https://www.portafolio.co/files/article_new_multimedia/uploads/2024/01/29/65b848ab6fdf7.jpeg",
  },
  {
    titulo: "Evaluación y acompañamiento",
    descripcion: [
      "Seguimiento emocional y académico constante",
      "Evaluación formativa con propósito",
    ],
    icono: (
      <FaLightbulb className="text-white text-4xl drop-shadow mb-4 mx-auto" />
    ),
    imagen:
      "https://proctorizer.com/wp-content/uploads/2021/10/Sin-t%C3%ADtulo-800-x-800-px-1400-x-800-px-2.png",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const total = beneficios.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev - 1 + total) % total);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [total]);

  const beneficioActual = beneficios[index];

  return (
    <section
      ref={ref}
      className="relative w-full bg-[var(--color-primary)] text-[var(--color-text)] pt-10 pb-20 px-4 sm:px-6 overflow-hidden rounded-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center relative"
      >
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 sm:mb-10 text-black drop-shadow-sm">
          Nuestra esencia académica
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={beneficioActual.titulo}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl shadow-lg overflow-hidden mx-auto max-w-[95%] sm:max-w-3xl bg-[#1f1f1f] border border-[#444] text-center"
          >
            <img
              src={beneficioActual.imagen}
              alt={beneficioActual.titulo}
              className="w-full h-40 sm:h-64 md:h-[280px] object-cover"
            />
            <div className="p-4 sm:p-6">
              {beneficioActual.icono}
              <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                {beneficioActual.titulo}
              </h3>
              <div className="space-y-2 text-sm text-white">
                {beneficioActual.descripcion.map((linea, i) => (
                  <p key={i}>{linea}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botones laterales */}
        <motion.button
          onClick={prev}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:block absolute top-1/2 left-0 transform -translate-y-1/2 px-3 py-2 bg-[#1a1a1a] text-white rounded-full shadow-md hover:shadow-[0_0_16px_#ffffff] transition-all duration-300"
        >
          ←
        </motion.button>
        <motion.button
          onClick={next}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:block absolute top-1/2 right-0 transform -translate-y-1/2 px-3 py-2 bg-[#1a1a1a] text-white rounded-full shadow-md hover:shadow-[0_0_16px_#ffffff] transition-all duration-300"
        >
          →
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
