import { FaChalkboardTeacher } from 'react-icons/fa';
import ClasesList from './ClasesList';

/**
 * 🧑‍🏫 Sección institucional para mostrar clases activas del estudiante
 */
const SeccionClases = ({ clases = [], loading = false }) => (
  <section className='bg-black text-white border border-yellow-600 rounded-xl shadow-xl p-6 space-y-6 scroll-mt-24'>
    {/* Título emocional */}
    <div className='text-center mb-6'>
      <FaChalkboardTeacher className='text-yellow-500 text-4xl mb-2 mx-auto animate-fade-in' />
      <h2 className='text-lg sm:text-2xl font-semibold text-yellow-400'>Tus clases activas</h2>
    </div>

    {/* Contenido dinámico */}
    {loading ? (
      <p className='text-yellow-300 animate-pulse text-center'>Cargando clases...</p>
    ) : clases.length === 0 ? (
      <div className='text-center py-6'>
        <p className='text-lg text-white'>No tienes clases asignadas por ahora.</p>
        <p className='text-sm mt-2 italic text-yellow-500'>
          Cuando se asignen, aparecerán aquí para que comiences tu transformación académica
        </p>
      </div>
    ) : (
      <ClasesList clases={clases} />
    )}
  </section>
);

export default SeccionClases;
