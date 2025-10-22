import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center bg-white text-black px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
      >
        {/* Información institucional */}
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]">
            Contáctanos
          </h2>

          <p className="text-lg text-black/90 leading-relaxed mb-6 drop-shadow-sm">
            ¿Tienes preguntas sobre inscripciones, programas académicos o
            colaboraciones? Estamos aquí para ayudarte. Tu mensaje es el primer
            paso para construir juntos.
          </p>

          <div className="space-y-5 text-black/80 text-sm">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#1a1a1a]" />
              <span>
                <strong>Dirección:</strong> Av. Principal El Cafetal, Colegio
                José Martí, Caracas
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#1a1a1a]" />
              <span>
                <strong>Teléfono:</strong> +58 212-9852724
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#1a1a1a]" />
              <span>
                <strong>Email:</strong> colegiojmarti.uvec@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaClock className="text-[#1a1a1a]" />
              <span>
                <strong>Horario:</strong> Lunes a Viernes, 8:00am – 4:00pm
              </span>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
          className="bg-[#1a1a1a] text-white rounded-xl p-6 space-y-6 shadow-lg border border-white/10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Tu nombre"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="tucorreo@ejemplo.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Escribe tu consulta aquí..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              type="submit"
              aria-label="Enviar mensaje de contacto"
              className="w-full bg-[#1a1a1a] text-white py-2 rounded-full font-semibold hover:bg-[#d1d5db] hover:text-black transition-all duration-300"
            >
              Enviar mensaje
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
