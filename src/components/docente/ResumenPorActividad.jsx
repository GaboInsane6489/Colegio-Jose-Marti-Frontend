import ResumenActividad from "./ResumenActividad";
import GraficoActividad from "./GraficoActividad";
import DashboardActividadComparativo from "./DashboardActividadComparativo";

const ResumenPorActividad = ({ actividades, entregas }) => (
  <section className="pt-12 space-y-6">
    <h2 className="text-2xl font-bold text-center flex justify-center items-center gap-2">
      <span className="text-yellow-400">📋</span>
      Resumen por actividad
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {actividades.map((act) => {
        const entregasActividad = entregas.filter(
          (e) => e.actividadId?._id === act._id
        );

        return (
          <div key={act._id} className="space-y-4">
            <ResumenActividad actividad={act} entregas={entregasActividad} />
            <GraficoActividad
              entregas={entregasActividad}
              titulo={act.titulo}
            />
            <DashboardActividadComparativo
              actividad={act}
              entregas={entregasActividad}
            />
          </div>
        );
      })}
    </div>
  </section>
);

export default ResumenPorActividad;
