import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const EncabezadoDashboard = () => (
  <motion.header
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 140, damping: 12 }}
    className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl px-6 py-10 text-center shadow-xl border border-gray-700/30 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      className="mb-4"
    >
      <FaBookOpen className="text-white text-6xl sm:text-7xl mx-auto drop-shadow-lg animate-pulse" />
    </motion.div>

    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-white text-3xl sm:text-5xl font-bold tracking-tight drop-shadow"
    >
      Panel del Estudiante
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-3 text-gray-300 text-sm sm:text-lg italic font-light drop-shadow-sm"
    >
      Tu espacio académico, emocional y estratégico. Aquí cada entrega cuenta.
    </motion.p>
  </motion.header>
);

export default EncabezadoDashboard;
