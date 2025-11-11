import { PencilIcon, TrashIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { FaInfoCircle } from 'react-icons/fa';

/**
 * 🧑‍🏫 Tabla institucional refinada para listar docentes con diseño profesional
 */
const DocentesTable = ({ docentes = [], onEdit, onDelete, loading }) => {
  if (loading)
    return <p className='text-center text-white animate-pulse'>🔄 Cargando docentes...</p>;

  if (!Array.isArray(docentes) || docentes.length === 0)
    return <p className='text-center text-white'>No hay docentes registrados actualmente.</p>;

  return (
    <div className='px-4 py-10 scroll-mt-24'>
      <div className='w-full max-w-6xl mx-auto bg-[#0d0d0d] p-6 rounded-2xl shadow-2xl space-y-8'>
        {/* 🧠 Introducción institucional */}
        <div className='text-center space-y-4'>
          <FaInfoCircle className='mx-auto h-8 w-8 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <h2 className='text-4xl sm:text-5xl font-bold tracking-wide text-white font-[Orbitron]'>
            Docentes registrados
          </h2>
          <p className='text-sm sm:text-base text-white/70 max-w-xl mx-auto pb-4'>
            Esta tabla muestra los docentes registrados en el sistema institucional. Puedes editar
            su información o eliminar su cuenta si es necesario.
          </p>
        </div>

        {/* 📋 Tabla de docentes */}
        <div className='bg-black p-4 rounded-xl shadow-lg border border-white/20 overflow-x-auto'>
          <table className='min-w-full text-sm sm:text-base text-white'>
            <thead className='bg-[#00FFF7]/10 text-[#00FFF7] uppercase tracking-wide'>
              <tr className='border-b border-white/20 text-left'>
                <th scope='col' className='px-4 py-3 font-semibold whitespace-nowrap'>
                  Nombre
                </th>
                <th scope='col' className='px-4 py-3 font-semibold whitespace-nowrap'>
                  Correo
                </th>
                <th scope='col' className='px-4 py-3 font-semibold whitespace-nowrap'>
                  Estado
                </th>
                <th scope='col' className='px-4 py-3 text-center font-semibold whitespace-nowrap'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/10'>
              {docentes.map((docente) => (
                <tr key={docente._id} className='hover:bg-black/30 transition'>
                  <td className='px-4 py-3'>{docente.nombre}</td>
                  <td className='px-4 py-3 break-words max-w-xs'>
                    {docente.email || docente.correo || '—'}
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex flex-col items-center gap-1'>
                      {docente.isValidated ? (
                        <>
                          <CheckCircleIcon className='h-5 w-5 text-green-400 drop-shadow-[0_0_4px_#00FF33]' />
                          <span className='text-xs text-green-300'>Validado</span>
                        </>
                      ) : (
                        <>
                          <ClockIcon className='h-5 w-5 text-yellow-400 drop-shadow-[0_0_4px_#FFD700]' />
                          <span className='text-xs text-yellow-300'>Pendiente</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex justify-center gap-3 flex-wrap'>
                      <button
                        onClick={() => onEdit(docente._id)}
                        className='text-[#00FFF7] hover:text-[#00FFCC] transition'
                        aria-label={`Editar ${docente.nombre}`}
                        title='Editar docente'
                      >
                        <PencilIcon className='h-5 w-5' />
                      </button>
                      <button
                        onClick={() => onDelete(docente._id)}
                        className='text-red-400 hover:text-red-300 transition'
                        aria-label={`Eliminar ${docente.nombre}`}
                        title='Eliminar docente'
                      >
                        <TrashIcon className='h-5 w-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocentesTable;
