import { motion } from 'framer-motion';

/**
 * 🌟 Tarjeta institucional para mostrar un mensaje motivacional al estudiante
 */
const CardMensajeMotivacional = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Mensaje motivacional para el estudiante'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg 
                hover:scale-105 hover:shadow-[0_0_12px_#00FFF7] transition-all duration-300 ease-out 
                max-w-sm text-center mx-auto font-[Orbitron]'
    >
      {/* Video institucional */}
      <video
        src='https://cdn.pixabay.com/video/2022/02/08/107178-675298882_large.mp4'
        autoPlay
        loop
        muted
        playsInline
        title='Video motivacional institucional'
        className='rounded-lg mb-4 drop-shadow-[0_0_6px_#00FFF7] mx-auto w-full h-48 object-cover'
      >
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* Título fosforescente */}
      <h2 className='text-lg font-semibold text-[#00FFF7] mb-2 drop-shadow-[0_0_4px_#00FFF7]'>
        Mensaje Motivacional
      </h2>

      {/* Texto emocional */}
      <p className='text-sm text-white/70'>
        Cree en tu potencial. Cada día es una oportunidad para crecer, aprender y dejar tu huella en
        la comunidad académica.
      </p>
    </motion.div>
  );
};

export default CardMensajeMotivacional;
