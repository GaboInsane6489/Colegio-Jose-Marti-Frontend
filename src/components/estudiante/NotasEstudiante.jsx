import { motion } from 'framer-motion';
import { FaBookOpen, FaClock, FaStar } from 'react-icons/fa';

/**
 * 📑 Componente institucional para mostrar notas del estudiante
 */
const NotasEstudiante = ({ notas = [] }) => {
  const listaNotas = Array.isArray(notas) ? notas : [];

  // Calcular promedio simple
  const calificaciones = listaNotas
    .map((n) => (typeof n.calificacion === 'number' ? n.calificacion : null))
    .filter((c) => c !== null);

  const promedio =
    calificaciones.length > 0
      ? (calificaciones.reduce((acc, val) => acc + val, 0) / calificaciones.length).toFixed(2)
      : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label='Notas del estudiante'
      className='bg-black/80 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg 
                 hover:shadow-[0_0_12px_#00FFF7] transition-all duration-300 ease-out font-[Orbitron]'
    >
      {/* Título institucional */}
      <h2 className='text-lg font-semibold text-[#00FFF7] mb-4 text-center drop-shadow-[0_0_4px_#00FFF7]'>
        Notas Académicas
      </h2>

      {/* Tabla de notas */}
      <div className='overflow-x-auto rounded-lg border border-white/10'>
        <table className='w-full text-sm text-white/80 border-separate border-spacing-y-1 text-center'>
          <thead>
            <tr className='bg-black/60 text-[#FFD700]'>
              <th className='px-3 py-2'>
                <FaBookOpen className='inline mr-1 drop-shadow-[0_0_6px_#FFD700]' /> Materia
              </th>
              <th className='px-3 py-2'>
                <FaClock className='inline mr-1 drop-shadow-[0_0_6px_#00FF33]' /> Lapso
              </th>
              <th className='px-3 py-2'>
                <FaStar className='inline mr-1 drop-shadow-[0_0_6px_#00FFF7]' /> Calificación
              </th>
            </tr>
          </thead>
          <tbody>
            {listaNotas.length === 0 ? (
              <tr>
                <td colSpan={3} className='px-3 py-3 text-white/50 italic'>
                  No hay notas registradas actualmente.
                </td>
              </tr>
            ) : (
              listaNotas.map((n, index) => (
                <motion.tr
                  key={n.id || n._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className='bg-black/50 hover:bg-black/30 transition rounded-lg'
                >
                  <td className='px-3 py-2 border-t border-white/10'>
                    {n.materia || 'Sin materia'}
                  </td>
                  <td className='px-3 py-2 border-t border-white/10'>{n.lapso || 'Sin lapso'}</td>
                  <td className='px-3 py-2 border-t border-white/10'>
                    {typeof n.calificacion === 'number'
                      ? `${n.calificacion}/20`
                      : 'Sin calificación'}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Promedio institucional */}
      <div className='mt-4 text-center text-sm text-white/70'>
        {promedio ? (
          <p>
            Promedio actual:{' '}
            <span className='text-[#00FF33] font-semibold drop-shadow-[0_0_4px_#00FF33]'>
              {promedio}/20
            </span>
          </p>
        ) : (
          <p className='italic'>Sin notas suficientes para calcular promedio.</p>
        )}
      </div>
    </motion.section>
  );
};

export default NotasEstudiante;
