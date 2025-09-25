import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaChartLine } from "react-icons/fa";

const HistoriaTransformacion = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#f0f0f0] py-20 px-6 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        className="max-w-5xl text-center text-[#1a1a1a]"
      >
        <FaChartLine className="text-4xl text-[#1a1a1a] mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Transformación con propósito
        </h2>
        <img
          src="https://uplanner.com/wp-content/uploads/2019/04/exito-estudiantil-scaled.jpg"
          alt="Crecimiento institucional"
          className="rounded-xl shadow-md mb-6 w-full max-h-[400px] object-cover"
        />
        <p className="text-lg md:text-xl text-[#333]">
          A lo largo de las décadas, el colegio creció en infraestructura,
          programas y visión. Se incorporaron nuevas tecnologías, se fortaleció
          el acompañamiento emocional y se consolidó una comunidad educativa que
          respira valores. Cada promoción dejó huella, y cada aula se convirtió
          en semillero de líderes.
        </p>
      </motion.div>
    </section>
  );
};

export default HistoriaTransformacion;
