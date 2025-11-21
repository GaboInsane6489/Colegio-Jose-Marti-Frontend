import { motion } from 'framer-motion';

/**
 * 🌱 Tarjeta institucional para destacar el bienestar estudiantil
 */
const CardBienestarEstudiante = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Bienestar estudiantil'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#107C10]/40 p-6 shadow-lg 
                 hover:scale-105 hover:shadow-[0_0_12px_#107C10] transition-all duration-300 ease-out 
                 max-w-sm text-center mx-auto font-[Orbitron]'
    >
      {/* Imagen emocional */}
      <img
        src='https://cdn.pixabay.com/photo/2019/03/10/03/36/reading-4045414_1280.jpg'
        alt='Estudiante leyendo en un espacio de bienestar'
        className='rounded-lg mb-4 drop-shadow-[0_0_6px_#107C10] mx-auto'
      />

      {/* Título fosforescente */}
      <h2 className='text-lg font-semibold text-[#107C10] mb-2 drop-shadow-[0_0_4px_#107C10]'>
        Bienestar Estudiantil
      </h2>

      {/* Texto emocional */}
      <p className='text-sm text-white/70'>
        Tu bienestar también cuenta. Dedica tiempo a leer, reflexionar y cuidar tu equilibrio
        emocional cada día. El progreso académico se fortalece cuando tu mente y tu cuerpo están en
        armonía.
      </p>
    </motion.div>
  );
};

export default CardBienestarEstudiante;
