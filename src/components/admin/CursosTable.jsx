import {
  AcademicCapIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
} from '@heroicons/react/24/solid';

const CursosTable = ({ cursos = [], onActualizar, onEliminar }) => {
  if (!Array.isArray(cursos)) {
    console.warn("⚠️ Prop 'cursos' no es un array:", cursos);
    return (
      <div className='bg-red-900 text-white p-4 rounded-md border border-white text-center'>
        <p className='text-xs sm:text-sm font-medium'>
          Error: los datos de cursos no tienen formato válido.
        </p>
      </div>
    );
  }

  if (cursos.length === 0) {
    console.log('📭 No hay cursos registrados aún.');
    return (
      <div className='bg-gray-900 text-white p-4 rounded-md border border-white text-center'>
        <p className='text-xs sm:text-sm font-medium'>No hay cursos registrados aún.</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-[1000px] mx-auto px-2 sm:px-4 space-y-6'>
      {cursos.map((curso, index) => (
        <div
          key={curso._id || curso.id || index}
          className='bg-gray-950 border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-[#00FFF7]/40 transition duration-200'
        >
          {/* Encabezado */}
          <div className='text-center text-white space-y-2'>
            <h3 className='text-lg font-bold text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] flex items-center justify-center gap-2'>
              <ClipboardDocumentListIcon className='h-5 w-5 text-[#00FFF7]' />
              {curso.nombre || 'Curso sin nombre'}
            </h3>
            <p className='text-sm text-white/80'>
              {curso.descripcion || 'Sin descripción registrada.'}
            </p>
          </div>

          {/* Datos del curso */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 text-[13px] sm:text-sm text-white'>
            <div className='text-center flex flex-col items-center'>
              <CalendarIcon className='h-5 w-5 text-white drop-shadow-[0_0_4px_#00FFF7]' />
              <p className='font-semibold text-white/90'>Año académico</p>
              <p>{curso.anioAcademico || '—'}</p>
            </div>
            <div className='text-center flex flex-col items-center'>
              <AcademicCapIcon className='h-5 w-5 text-white drop-shadow-[0_0_4px_#00FFF7]' />
              <p className='font-semibold text-white/90'>Año estudiantil</p>
              <p>{curso.anioEstudiantil || '—'}</p>
            </div>
            <div className='text-center flex flex-col items-center'>
              <IdentificationIcon className='h-5 w-5 text-white drop-shadow-[0_0_4px_#00FFF7]' />
              <p className='font-semibold text-white/90'>Sección</p>
              <p>{curso.seccion || '—'}</p>
            </div>
            <div className='text-center col-span-2 sm:col-span-3 flex flex-col items-center'>
              <UserGroupIcon className='h-5 w-5 text-white drop-shadow-[0_0_4px_#00FFF7]' />
              <p className='font-semibold text-white/90'>Estudiantes</p>
              {Array.isArray(curso.estudiantes) && curso.estudiantes.length > 0 ? (
                <p className='text-white/70'>
                  {curso.estudiantes
                    .slice(0, 3)
                    .map((est) => est.nombre)
                    .join(', ')}
                  {curso.estudiantes.length > 3 && <> +{curso.estudiantes.length - 3} más</>}
                </p>
              ) : (
                <p className='text-white/40'>No asignados</p>
              )}
            </div>
            <div className='text-center col-span-2 sm:col-span-3 flex flex-col items-center'>
              {curso.activo ? (
                <>
                  <CheckCircleIcon className='h-5 w-5 text-[#00FF33] drop-shadow-[0_0_6px_#00FF33]' />
                  <p className='font-bold text-[#00FF33] drop-shadow-[0_0_4px_#00FF33]'>Activo</p>
                </>
              ) : (
                <>
                  <XCircleIcon className='h-5 w-5 text-red-500 drop-shadow-[0_0_6px_#FF0000]' />
                  <p className='font-bold text-red-500 drop-shadow-[0_0_4px_#FF0000]'>Inactivo</p>
                </>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className='mt-6 flex justify-center gap-3 flex-wrap'>
            <button
              type='button'
              onClick={() => console.log('📘 Ver curso:', curso)}
              className='px-4 py-1.5 text-sm font-semibold text-white bg-gray-800 rounded-full transition hover:border-[#00FFF7] hover:shadow-[0_0_6px_#00FFF7] hover:scale-105 inline-flex items-center gap-2'
            >
              <EyeIcon className='h-4 w-4 text-white' />
              Ver detalles
            </button>
            {onActualizar && (
              <button
                type='button'
                onClick={() => onActualizar(curso)}
                className='px-4 py-1.5 text-sm font-semibold text-white bg-[#00FFF7]/20 rounded-full transition hover:bg-[#00FFF7]/40 hover:shadow-[0_0_6px_#00FFF7] hover:scale-105 inline-flex items-center gap-2'
              >
                <PencilIcon className='h-4 w-4 text-white' />
                Editar curso
              </button>
            )}
            {onEliminar && (
              <button
                type='button'
                onClick={() => onEliminar(curso._id || curso.id)}
                className='px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-full transition hover:bg-red-700 hover:shadow-[0_0_6px_#FF0000] hover:scale-105 inline-flex items-center gap-2'
              >
                <TrashIcon className='h-4 w-4 text-white' />
                Eliminar curso
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CursosTable;
