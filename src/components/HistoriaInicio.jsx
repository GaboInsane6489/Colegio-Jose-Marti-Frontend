import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaSchool } from "react-icons/fa";

const HistoriaInicio = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#fdfdfd] py-20 px-6 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        className="max-w-5xl text-center text-[#1a1a1a]"
      >
        <FaSchool className="text-4xl text-[#1a1a1a] mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          El origen de un sueño
        </h2>
        <img
          src="https://elucabista.com/wp-content/uploads/2022/09/Primer-Dia-de-Clases-UCAB-sep-2022-54-1-1280x640.jpg"
          alt="Fundación del colegio"
          className="rounded-xl shadow-md mb-6 w-full max-h-[400px] object-cover"
        />
        <p className="text-lg md:text-xl text-[#333]">
          En 1985, un grupo de educadores visionarios fundó el Colegio José
          Martí con la convicción de que la educación debía formar seres humanos
          íntegros, libres y comprometidos con su comunidad. En una pequeña casa
          adaptada como aula, nació el legado que hoy inspira generaciones.
        </p>
      </motion.div>
    </section>
  );
};

export default HistoriaInicio;
