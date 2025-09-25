import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaSeedling } from "react-icons/fa";

const HistoriaLegado = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#ffffff] py-20 px-6 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        className="max-w-5xl text-center text-[#1a1a1a]"
      >
        <FaSeedling className="text-4xl text-[#1a1a1a] mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Un legado que florece
        </h2>
        <img
          src="https://media.licdn.com/dms/image/v2/D4D12AQEugYJiIzo-oQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1712673479316?e=2147483647&v=beta&t=oSTVqzn4ywo3pavdAOd6sGji61a4Fi7j7fnYIIiydck"
          alt="Legado institucional"
          className="rounded-xl shadow-md mb-6 w-full max-h-[400px] object-cover"
        />
        <p className="text-lg md:text-xl text-[#333]">
          Hoy, el Colegio José Martí no solo mira hacia atrás con orgullo, sino
          hacia adelante con esperanza. Cada egresado lleva consigo una misión:
          transformar su entorno con sabiduría, empatía y coraje. El legado
          continúa, y el futuro se escribe con cada paso que damos juntos.
        </p>
      </motion.div>
    </section>
  );
};

export default HistoriaLegado;
