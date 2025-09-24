import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center bg-white text-black px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
      >
        {/* Información institucional */}
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]">
            Contáctanos
          </h2>

          <p className="text-lg text-black/90 leading-relaxed mb-4 drop-shadow-sm">
            ¿Tienes preguntas sobre inscripciones, programas académicos o
            colaboraciones? Estamos aquí para ayudarte.
          </p>

          <div className="space-y-4 text-black/80 text-sm">
            <p>
              <strong>📍 Dirección:</strong> Av. Principal, Edif. Colegio José
              Martí, Caracas
            </p>
            <p>
              <strong>📞 Teléfono:</strong> +58 212-555-1234
            </p>
            <p>
              <strong>📧 Email:</strong> contacto@colegiomarti.edu.ve
            </p>
            <p>
              <strong>🕒 Horario:</strong> Lunes a Viernes, 8:00am – 4:00pm
            </p>
          </div>
        </div>

        {/* Formulario de contacto */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mensaje</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escribe tu consulta aquí..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a1a1a] text-white py-2 rounded-full font-medium hover:shadow-[0_0_12px_#000] transition-all duration-300"
          >
            Enviar mensaje
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
