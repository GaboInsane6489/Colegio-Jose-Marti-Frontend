import ResumenActividad from './ResumenActividad.jsx';
import GraficoActividad from './GraficoActividad.jsx';
import DashboardActividadComparativo from './DashboardActividadComparativo.jsx';

/**
 * 📋 Componente institucional para mostrar resumen visual y estadístico por actividad
 */
const ResumenPorActividad = ({ actividades = [], entregas = [] }) => (
  <section className='pt-12 space-y-6'>
    <h2 className='text-2xl font-bold text-center flex justify-center items-center gap-2'>
      <span className='text-yellow-400'>📋</span>
      Resumen por actividad
    </h2>

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {actividades.map((act) => {
        // ✅ Normalización: usamos siempre id en lugar de _id
        const entregasActividad = entregas.filter((e) => e.actividadId === act.id);

        return (
          <div key={act.id} className='space-y-4'>
            <ResumenActividad actividad={act} entregas={entregasActividad} />
            <GraficoActividad entregas={entregasActividad} titulo={act.titulo} />
            <DashboardActividadComparativo actividad={act} entregas={entregasActividad} />
          </div>
        );
      })}
    </div>
  </section>
);

export default ResumenPorActividad;
