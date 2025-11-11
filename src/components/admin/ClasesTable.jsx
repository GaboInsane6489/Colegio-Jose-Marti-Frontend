import { CheckCircleIcon, XCircleIcon, EyeIcon } from '@heroicons/react/24/solid';

/**
 * 📋 Tabla institucional para mostrar clases creadas
 * Recibe array de clases como prop
 */
const ClasesTable = ({ clases = [], navigate }) => {
  if (!Array.isArray(clases)) {
    console.warn("⚠️ Prop 'clases' no es un array:", clases);
    return (
      <div className='bg-red-900 text-white p-4 rounded-md border border-white text-center'>
        <p className='text-sm'>Error: los datos de clases no tienen formato válido.</p>
      </div>
    );
  }

  if (clases.length === 0) {
    console.log('📭 No hay clases registradas aún.');
    return (
      <div className='bg-gray-900 text-white p-4 rounded-md border border-white text-center'>
        <p className='text-sm'>No hay clases registradas aún.</p>
      </div>
    );
  }

  console.log(`📦 Renderizando tabla de clases: ${clases.length} clases`);

  return (
    <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='overflow-x-auto border border-white/20 rounded-xl shadow-xl'>
        <table className='min-w-full table-fixed bg-black/70 text-white text-xs sm:text-sm'>
          <thead className='bg-[#00FFF7]/10 text-[#00FFF7] uppercase tracking-wide'>
            <tr>
              <th scope='col' className='px-4 py-3 text-center whitespace-nowrap'>
                Nombre
              </th>
              <th scope='col' className='px-4 py-3 text-center whitespace-nowrap'>
                Docente
              </th>
              <th scope='col' className='px-4 py-3 text-center whitespace-nowrap'>
                Horario
              </th>
              <th scope='col' className='px-4 py-3 text-center whitespace-nowrap'>
                Descripción
              </th>
              <th scope='col' className='px-4 py-3 text-center whitespace-nowrap'>
                Estado
              </th>
              <th scope='col' className='px-4 py-3 text-center whitespace-nowrap'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase) => (
              <tr
                key={clase._id || Math.random()}
                className='border-t border-white/10 hover:bg-black/30 transition duration-200'
              >
                <td className='px-4 py-3 text-center font-semibold whitespace-nowrap'>
                  {clase.nombre || '—'}
                </td>
                <td className='px-4 py-3 text-center whitespace-nowrap'>
                  <div className='font-medium'>{clase.docente?.nombre || 'Sin nombre'}</div>
                  <div className='text-xs text-white/50'>
                    {clase.docente?.email || 'Sin correo'}
                  </div>
                </td>
                <td className='px-4 py-3 text-center whitespace-nowrap'>{clase.horario || '—'}</td>
                <td className='px-4 py-3 text-center text-white/80 whitespace-nowrap'>
                  {clase.descripcion || '—'}
                </td>
                <td className='px-4 py-3 text-center whitespace-nowrap'>
                  {clase.activo ? (
                    <span className='inline-flex items-center gap-1 text-green-400 font-semibold drop-shadow-[0_0_4px_#00FF33]'>
                      <CheckCircleIcon className='h-4 w-4' />
                      Activa
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 text-red-400 font-semibold drop-shadow-[0_0_4px_#FF0000]'>
                      <XCircleIcon className='h-4 w-4' />
                      Inactiva
                    </span>
                  )}
                </td>
                <td className='px-4 py-3 text-center whitespace-nowrap'>
                  <button
                    onClick={() => navigate(`/admin/clases/${clase._id}`)}
                    className='inline-flex items-center gap-1 bg-gradient-to-r from-[#00FFF7] to-[#00FF33] text-black text-xs px-4 py-1.5 rounded-full font-semibold transition duration-200 hover:opacity-90 shadow-md hover:shadow-xl'
                    aria-label={`Ver clase ${clase.nombre}`}
                  >
                    <EyeIcon className='h-4 w-4 text-black' />
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClasesTable;
