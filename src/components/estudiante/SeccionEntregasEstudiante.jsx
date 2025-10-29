import { FaClipboardCheck } from "react-icons/fa";
import ActividadDetalleEstudiante from "./ActividadDetalleEstudiante";

/**
 * 📋 Sección institucional para mostrar entregas realizadas por el estudiante
 */
const SeccionEntregasEstudiante = ({
  entregasFiltradas = [],
  loadingEntregas = false,
}) => (
  <section className="space-y-6 pt-8">
    {/* Título emocional */}
    <h2 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
      <FaClipboardCheck className="text-yellow-400" />
      Detalle de tus entregas
    </h2>

    {/* Contenido dinámico */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {loadingEntregas ? (
        <p className="text-white/70 col-span-full">Cargando entregas...</p>
      ) : entregasFiltradas.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg col-span-full text-center border border-yellow-300">
          <p className="font-semibold">
            Sin entregas que coincidan con los filtros seleccionados.
          </p>
          <p className="text-sm mt-1">
            Prueba cambiar la materia o el lapso para ver otras entregas.
          </p>
        </div>
      ) : (
        entregasFiltradas.map((e) => (
          <ActividadDetalleEstudiante key={e._id} entrega={e} />
        ))
      )}
    </div>
  </section>
);

export default SeccionEntregasEstudiante;
