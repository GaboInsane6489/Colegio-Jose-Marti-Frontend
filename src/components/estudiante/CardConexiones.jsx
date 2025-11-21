import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa'; // Ícono institucional

/**
 * 🤝 Tarjeta institucional para destacar las conexiones del estudiante
 */
const CardConexiones = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Conexiones académicas y personales del estudiante'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg 
                 hover:scale-105 hover:shadow-[0_0_12px_#00FFF7] transition-all duration-300 ease-out 
                 max-w-sm text-center mx-auto font-[Orbitron]'
    >
      {/* Ícono fosforescente */}
      <div className='flex justify-center mb-4'>
        <FaUsers className='text-[#00FFF7] text-4xl drop-shadow-[0_0_6px_#00FFF7]' />
      </div>

      {/* Título */}
      <h2 className='text-lg font-semibold text-[#00FFF7] mb-2 drop-shadow-[0_0_4px_#00FFF7]'>
        Conexiones
      </h2>

      {/* Texto emocional */}
      <p className='text-sm text-white/70'>
        Fortalece tus vínculos académicos y personales. Aquí encontrarás tus interacciones con
        docentes y compañeros, creando una comunidad sólida, inclusiva y emocionalmente resonante.
      </p>
    </motion.div>
  );
};

export default CardConexiones;
