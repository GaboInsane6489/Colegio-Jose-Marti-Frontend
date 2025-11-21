import { motion } from 'framer-motion';
import { FaBookOpen, FaUserTie, FaClock } from 'react-icons/fa';

/**
 * 📚 Tarjeta institucional para mostrar las materias inscritas del estudiante
 */
const CardMateriasInscritas = ({ materias = [] }) => {
  const listaMaterias = Array.isArray(materias) && materias.length > 0 ? materias : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label='Materias inscritas del estudiante'
      className='w-full bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg
                 hover:scale-[1.01] hover:shadow-[0_0_12px_#00FFF7] transition-all duration-300 ease-out text-center font-[Orbitron]'
    >
      {/* Título institucional */}
      <h2 className='text-sm font-semibold text-[#00FF33] mb-2 tracking-wide drop-shadow-[0_0_4px_#00FF33]'>
        Materias Inscritas
      </h2>

      {/* Subtítulo emocional */}
      <p className='text-[10px] text-white/50 italic mb-3'>
        Tu agenda académica semanal. Cada clase cuenta.
      </p>

      {/* Tabla institucional */}
      <div className='overflow-x-auto rounded-lg border border-white/10'>
        <table className='w-full text-[11px] text-white/80 border-separate border-spacing-y-1'>
          <thead>
            <tr className='text-[#00FFF7] text-center bg-black/60'>
              <th className='px-2 py-2 rounded-tl-lg'>
                <FaBookOpen className='inline mr-1 drop-shadow-[0_0_6px_#00FFF7]' /> Materia
              </th>
              <th className='px-2 py-2'>
                <FaUserTie className='inline mr-1 drop-shadow-[0_0_6px_#00FF33]' /> Docente
              </th>
              <th className='px-2 py-2 rounded-tr-lg'>
                <FaClock className='inline mr-1 drop-shadow-[0_0_6px_#107C10]' /> Horario
              </th>
            </tr>
          </thead>
          <tbody>
            {listaMaterias.length === 0 ? (
              <tr>
                <td colSpan={3} className='px-2 py-3 text-center text-white/50 italic'>
                  No tienes materias inscritas actualmente.
                </td>
              </tr>
            ) : (
              listaMaterias.map((m, index) => (
                <motion.tr
                  key={m.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className='text-center bg-black/50 hover:bg-black/30 transition rounded-lg'
                >
                  <td className='px-2 py-1 border-t border-white/5'>{m.nombre || 'Sin nombre'}</td>
                  <td className='px-2 py-1 border-t border-white/5'>
                    {m.docente || 'Sin docente asignado'}
                  </td>
                  <td className='px-2 py-1 border-t border-white/5'>
                    {m.horario || 'Horario no definido'}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CardMateriasInscritas;
