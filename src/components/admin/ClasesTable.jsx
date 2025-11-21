import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';

/**
 * 📋 Cards institucionales para mostrar clases creadas
 * Recibe array de clases como prop
 * Props adicionales:
 * - navigate: función para navegar a detalle
 * - onActualizar: función para actualizar clase
 * - onEliminar: función para eliminar clase
 */
const ClasesTable = ({ clases = [], navigate, onActualizar, onEliminar }) => {
  if (!Array.isArray(clases)) {
    console.warn("⚠️ Prop 'clases' no es un array:", clases);
    return (
      <div className='bg-red-900 text-white p-4 rounded-md border border-white text-center'>
        <p className='text-xs sm:text-sm font-medium'>
          Error: los datos de clases no tienen formato válido.
        </p>
      </div>
    );
  }

  if (clases.length === 0) {
    console.log('📭 No hay clases registradas aún.');
    return (
      <div className='bg-gray-900 text-white p-4 rounded-md border border-white text-center'>
        <p className='text-xs sm:text-sm font-medium'>No hay clases registradas aún.</p>
      </div>
    );
  }

  console.log(`📦 Renderizando cards de clases: ${clases.length} clases`);
  console.log('📦 Datos de clases:', clases);

  return (
    <div className='w-full max-w-6xl mx-auto px-2 sm:px-4 space-y-6'>
      {clases.map((clase, index) => (
        <div
          key={clase.id || clase._id || index}
          className='bg-gray-950 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-[#00FFF7]/30 transition duration-200'
        >
          {/* Encabezado */}
          <div className='text-center text-white space-y-2'>
            <h3 className='text-lg sm:text-xl font-bold text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] flex items-center justify-center gap-2'>
              <ClipboardDocumentListIcon className='h-6 w-6 text-[#00FFF7]' />
              {clase.nombre || 'Clase sin nombre'}
            </h3>
            <p className='text-sm text-white/80'>
              {clase.descripcion || 'Sin descripción registrada.'}
            </p>
          </div>

          {/* Datos */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 text-[13px] sm:text-sm text-white'>
            {/* Docente */}
            <div className='text-center flex flex-col items-center'>
              <UserGroupIcon className='h-5 w-5 text-white drop-shadow-[0_0_4px_#00FFF7]' />
              <p className='font-semibold text-white/90'>Docente</p>
              <p>{clase.docenteId?.nombre || 'Sin nombre'}</p>
              <p className='text-xs text-white/50'>{clase.docenteId?.email || 'Sin correo'}</p>
            </div>

            {/* Horario */}
            <div className='text-center flex flex-col items-center'>
              <CalendarIcon className='h-5 w-5 text-white drop-shadow-[0_0_4px_#00FFF7]' />
              <p className='font-semibold text-white/90'>Horario</p>
              {clase.horario ? (
                <p>
                  {clase.horario.dia} <br />
                  {clase.horario.horaInicio} – {clase.horario.horaFin}
                </p>
              ) : (
                <p className='text-white/40'>No definido</p>
              )}
            </div>

            {/* Estado */}
            <div className='text-center flex flex-col items-center col-span-2 sm:col-span-1'>
              {clase.activo ? (
                <>
                  <CheckCircleIcon className='h-6 w-6 text-[#00FF33] drop-shadow-[0_0_6px_#00FF33]' />
                  <p className='font-bold text-[#00FF33] drop-shadow-[0_0_4px_#00FF33]'>Activa</p>
                </>
              ) : (
                <>
                  <XCircleIcon className='h-6 w-6 text-red-500 drop-shadow-[0_0_6px_#FF0000]' />
                  <p className='font-bold text-red-500 drop-shadow-[0_0_4px_#FF0000]'>Inactiva</p>
                </>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className='mt-6 flex justify-center gap-3 flex-wrap'>
            <button
              onClick={() => navigate(`/admin/clases/${clase.id || clase._id}`)}
              className='inline-flex items-center gap-2 bg-gradient-to-r from-[#00FFF7] to-[#00FF33] text-black text-sm px-4 py-2 rounded-full font-semibold transition hover:opacity-90 hover:scale-105 shadow-md'
              aria-label={`Ver detalles de la clase ${clase.nombre}`}
            >
              <EyeIcon className='h-5 w-5 text-black' />
              Ver detalles
            </button>

            {onActualizar && (
              <button
                onClick={() => onActualizar(clase.id || clase._id, { activo: !clase.activo })}
                className='inline-flex items-center gap-2 bg-blue-500 text-white text-sm px-4 py-2 rounded-full font-semibold transition hover:bg-blue-600 hover:scale-105 shadow-md'
                aria-label={`Editar clase ${clase.nombre}`}
              >
                <PencilIcon className='h-5 w-5 text-white' />
                Editar
              </button>
            )}

            {onEliminar && (
              <button
                onClick={() => onEliminar(clase.id || clase._id)}
                className='inline-flex items-center gap-2 bg-red-600 text-white text-sm px-4 py-2 rounded-full font-semibold transition hover:bg-red-700 hover:scale-105 shadow-md'
                aria-label={`Eliminar clase ${clase.nombre}`}
              >
                <TrashIcon className='h-5 w-5 text-white' />
                Eliminar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClasesTable;
