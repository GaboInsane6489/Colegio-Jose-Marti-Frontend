import { motion } from 'framer-motion';

/**
 * 👔 Tarjeta institucional para recordar la importancia de la vestimenta académica
 */
const CardVestimentaEstudiante = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Recordatorio de vestimenta institucional'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg 
                 hover:scale-105 hover:shadow-[0_0_12px_#00FFF7] transition-all duration-300 ease-out 
                 max-w-sm text-center mx-auto font-[Orbitron]'
    >
      {/* Imagen institucional */}
      <img
        src='https://cdn.pixabay.com/photo/2022/08/19/21/35/music-band-7397781_1280.jpg'
        alt='Estudiantes uniformados representando la vestimenta institucional'
        className='rounded-lg mb-4 drop-shadow-[0_0_6px_#00FFF7] mx-auto w-full h-48 object-cover'
      />

      {/* Título fosforescente */}
      <h2 className='text-lg font-semibold text-[#00FFF7] mb-2 drop-shadow-[0_0_4px_#00FFF7]'>
        Vestimenta Institucional
      </h2>

      {/* Texto emocional */}
      <p className='text-sm text-white/70'>
        Recuerda asistir correctamente uniformado. Tu presentación refleja tu compromiso académico,
        tu respeto por la comunidad y tu identidad institucional.
      </p>
    </motion.div>
  );
};

export default CardVestimentaEstudiante;
