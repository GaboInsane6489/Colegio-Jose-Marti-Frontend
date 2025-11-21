import { FaClipboardCheck } from 'react-icons/fa';
import EntregaCard from './EntregaCard';

/**
 * 📋 Sección institucional para mostrar entregas realizadas por el estudiante
 */
const SeccionEntregasEstudiante = ({ entregasFiltradas = [], loadingEntregas = false }) => {
  const listaEntregas = Array.isArray(entregasFiltradas) ? entregasFiltradas : [];

  return (
    <section className='space-y-6 pt-8 font-[Orbitron]'>
      {/* Título emocional */}
      <h2 className='text-xl font-bold text-white text-center flex items-center justify-center gap-2 drop-shadow-[0_0_6px_#FFD700]'>
        <FaClipboardCheck className='text-[#FFD700]' />
        Detalle de tus entregas
      </h2>

      {/* Contenido dinámico */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {loadingEntregas ? (
          <p className='text-white/70 col-span-full'>Cargando entregas...</p>
        ) : listaEntregas.length === 0 ? (
          <div className='bg-[#FFD700]/10 text-[#FFD700] p-4 rounded-lg col-span-full text-center border border-[#FFD700]/30'>
            <p className='font-semibold'>
              Sin entregas que coincidan con los filtros seleccionados.
            </p>
            <p className='text-sm mt-1 text-white/70'>
              Prueba cambiar la materia o el lapso para ver otras entregas.
            </p>
          </div>
        ) : (
          listaEntregas.map((e) => <EntregaCard key={e.id || e._id} entrega={e} />)
        )}
      </div>

      {/* Mensaje adicional si no hay entregas en absoluto */}
      {!loadingEntregas && listaEntregas.length === 0 && (
        <p className='text-center text-white/60 text-sm italic'>
          No hay entregas registradas en este momento.
        </p>
      )}
    </section>
  );
};

export default SeccionEntregasEstudiante;
