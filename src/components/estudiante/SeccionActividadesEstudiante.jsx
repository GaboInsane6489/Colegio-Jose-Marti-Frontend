import { FaClipboardCheck } from 'react-icons/fa';
import ActividadCardEstudiante from './ActividadCardEstudiante';

/**
 * 📋 Sección institucional para mostrar actividades asignadas al estudiante
 */
const SeccionActividadesEstudiante = ({
  actividadesFiltradas = [],
  loadingActividades = false,
}) => (
  <section className='space-y-6 pt-8'>
    {/* Título emocional */}
    <h2 className='text-xl font-bold text-white text-center flex items-center justify-center gap-2'>
      <FaClipboardCheck className='text-lime-400' />
      Actividades asignadas por tus docentes
    </h2>

    {/* Contenido dinámico */}
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {loadingActividades ? (
        <p className='text-white/70 col-span-full'>Cargando actividades...</p>
      ) : actividadesFiltradas.length === 0 ? (
        <div className='bg-yellow-100 text-yellow-800 p-4 rounded-lg col-span-full text-center border border-yellow-300'>
          <p className='font-semibold'>
            Sin actividades que coincidan con los filtros seleccionados.
          </p>
          <p className='text-sm mt-1'>
            Prueba cambiar la materia o el lapso para ver otras asignaciones.
          </p>
        </div>
      ) : (
        actividadesFiltradas.map((a) => <ActividadCardEstudiante key={a._id} actividad={a} />)
      )}
    </div>

    {/* Mensaje adicional si no hay actividades en absoluto */}
    {!loadingActividades && actividadesFiltradas.length === 0 && (
      <p className='text-center text-white/60 text-sm italic'>
        No hay actividades disponibles en este momento.
      </p>
    )}
  </section>
);

export default SeccionActividadesEstudiante;
