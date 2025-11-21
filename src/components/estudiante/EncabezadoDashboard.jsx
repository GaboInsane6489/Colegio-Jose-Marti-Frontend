import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';

/**
 * 🎓 Encabezado institucional para el panel del estudiante
 */
const EncabezadoDashboard = () => (
  <motion.header
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 140, damping: 12 }}
    aria-label='Encabezado del panel del estudiante'
    className='bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-2xl px-6 py-10 text-center shadow-lg 
               border border-[#00FFF7]/30 backdrop-blur-md font-[Orbitron]'
  >
    {/* Ícono emocional */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      className='mb-4'
    >
      <FaBookOpen className='text-[#00FFF7] text-6xl sm:text-7xl mx-auto drop-shadow-[0_0_8px_#00FFF7] animate-pulse' />
    </motion.div>

    {/* Título */}
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className='text-white text-3xl sm:text-5xl font-bold tracking-tight drop-shadow-[0_0_6px_#00FFF7]'
    >
      Panel del Estudiante
    </motion.h1>

    {/* Subtítulo emocional */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className='mt-3 text-white/70 text-sm sm:text-lg italic font-light drop-shadow-sm'
    >
      Tu espacio académico, emocional y estratégico. Aquí cada entrega cuenta y fortalece tu camino
      institucional.
    </motion.p>
  </motion.header>
);

export default EncabezadoDashboard;
