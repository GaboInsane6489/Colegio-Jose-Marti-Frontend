import { PencilIcon, TrashIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DocentesTable = ({ docentes = [], onEdit, onDelete, loading }) => {
  if (loading)
    return (
      <p
        className='text-center text-white animate-pulse text-xs sm:text-sm font-medium'
        aria-live='polite'
      >
        Cargando docentes...
      </p>
    );

  if (!Array.isArray(docentes) || docentes.length === 0)
    return (
      <p
        className='text-center text-white text-xs sm:text-sm font-medium'
        role='status'
        aria-live='polite'
      >
        No hay docentes registrados actualmente.
      </p>
    );

  return (
    <motion.section
      className='px-4 sm:px-6 py-8 scroll-mt-24'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
    >
      <div className='w-full max-w-screen-xl mx-auto bg-black/90 p-6 rounded-2xl shadow-xl space-y-6 border border-white/20'>
        {/* Encabezado */}
        <header className='text-center space-y-3'>
          <FaInfoCircle className='mx-auto h-8 w-8 text-white drop-shadow-[0_0_6px_#00FFF7]' />
          <h2 className='text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-[0_0_6px_#00FFF7]'>
            Docentes registrados
          </h2>
          <p className='text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto font-medium'>
            Edita información o elimina cuentas cuando sea necesario.
          </p>
        </header>

        {/* Tabla */}
        <div className='bg-gray-950 p-4 rounded-xl shadow-lg border border-white/20 overflow-x-auto'>
          <table className='w-full min-w-[360px] sm:min-w-[520px] md:min-w-[640px] text-xs sm:text-sm md:text-base text-white'>
            <thead className='bg-[#00FFF7]/10 text-[#00FFF7] uppercase tracking-wide'>
              <tr className='border-b border-white/20'>
                <th className='px-4 py-3 font-semibold whitespace-nowrap text-left'>Nombre</th>
                <th className='px-4 py-3 font-semibold whitespace-nowrap text-left'>Email</th>
                <th className='px-4 py-3 font-semibold whitespace-nowrap text-center'>Estado</th>
                <th className='px-4 py-3 font-semibold whitespace-nowrap text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/10'>
              {docentes.map((docente, index) => {
                const safeId = docente.id || docente._id;
                return (
                  <motion.tr
                    key={safeId || index}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
                    className='hover:bg-white/5 transition-colors duration-200'
                  >
                    {/* Nombre */}
                    <td className='px-4 py-3 break-words font-medium'>{docente.nombre}</td>

                    {/* Email */}
                    <td className='px-4 py-3 break-words text-white/80'>{docente.email || '—'}</td>

                    {/* Estado */}
                    <td className='px-4 py-3 text-center'>
                      <div className='flex flex-col items-center gap-1'>
                        {docente.isValidated ? (
                          <>
                            <CheckCircleIcon className='h-5 w-5 text-[#00FF33] drop-shadow-[0_0_6px_#00FF33]' />
                            <span className='text-xs text-[#00FF33] font-semibold'>Validado</span>
                          </>
                        ) : (
                          <>
                            <ClockIcon className='h-5 w-5 text-yellow-400 drop-shadow-[0_0_6px_#FFD700]' />
                            <span className='text-xs text-yellow-300 font-semibold'>Pendiente</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className='px-4 py-3'>
                      <div className='flex justify-center gap-4'>
                        <button
                          onClick={() => onEdit(safeId)}
                          className='text-[#00FFF7] hover:text-[#00FFCC] hover:scale-110 hover:drop-shadow-[0_0_6px_#00FFF7] transition-transform duration-200 ease-out'
                          aria-label={`Editar docente ${docente.nombre}`}
                          title='Editar docente'
                        >
                          <PencilIcon className='h-5 w-5' />
                        </button>
                        <button
                          onClick={() => onDelete(safeId)}
                          className='text-red-400 hover:text-red-300 hover:scale-110 hover:drop-shadow-[0_0_6px_#FF0033] transition-transform duration-200 ease-out'
                          aria-label={`Eliminar docente ${docente.nombre}`}
                          title='Eliminar docente'
                        >
                          <TrashIcon className='h-5 w-5' />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
};

export default DocentesTable;
