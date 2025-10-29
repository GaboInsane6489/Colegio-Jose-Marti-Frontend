import {
  FaClipboardCheck,
  FaChartLine,
  FaCheckCircle,
  FaTasks,
} from "react-icons/fa";

/**
 * 📊 Componente institucional para mostrar resumen de entregas por actividad
 */
const ResumenActividad = ({ actividad, entregas = [] }) => {
  if (!actividad || !actividad._id) return null;

  const entregasActividad = entregas.filter(
    (e) => e.actividadId?._id === actividad._id
  );

  const total = entregasActividad.length;
  const revisadas = entregasActividad.filter(
    (e) => e.estado === "revisado"
  ).length;

  const promedio =
    entregasActividad.reduce((acc, e) => acc + (e.calificacion || 0), 0) /
    Math.max(total, 1);

  const porcentajeRevisado = Math.round((revisadas / Math.max(total, 1)) * 100);

  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-6 space-y-6">
      {/* Título de actividad */}
      <div className="flex items-center gap-3 text-lg font-bold text-gray-800">
        <FaClipboardCheck className="text-blue-600 text-xl" />
        <span>{actividad.titulo || "Actividad"}</span>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <FaChartLine className="text-lime-600" />
          <span>
            Promedio:{" "}
            <strong>
              {isNaN(promedio) ? "—" : `${promedio.toFixed(2)}/20`}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-gray-700" />
          <span>
            Revisadas: <strong>{revisadas}</strong> de {total} (
            {isNaN(porcentajeRevisado) ? "—" : `${porcentajeRevisado}%`})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaTasks className="text-purple-500" />
          <span>
            Total de entregas: <strong>{total}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResumenActividad;
