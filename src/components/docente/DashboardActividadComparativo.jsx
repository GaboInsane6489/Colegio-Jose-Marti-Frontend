import {
  FaChartPie,
  FaTrophy,
  FaExclamationTriangle,
  FaEquals,
} from "react-icons/fa";

const calcularEstadisticas = (entregas) => {
  const calificaciones = entregas
    .map((e) => e.calificacion)
    .filter((n) => typeof n === "number");

  const total = calificaciones.length;
  const promedio =
    calificaciones.reduce((acc, n) => acc + n, 0) / Math.max(total, 1);

  const desviacion = Math.sqrt(
    calificaciones.reduce((acc, n) => acc + Math.pow(n - promedio, 2), 0) /
      Math.max(total, 1)
  );

  const top3 = [...calificaciones].sort((a, b) => b - a).slice(0, 3);

  return {
    total,
    promedio: promedio.toFixed(2),
    desviacion: desviacion.toFixed(2),
    top3,
  };
};

const DashboardActividadComparativo = ({ actividad, entregas }) => {
  const { promedio, desviacion, top3, total } = calcularEstadisticas(entregas);

  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-6 space-y-4">
      <h3 className="text-lg font-bold">{actividad.titulo}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <FaChartPie className="text-blue-600" />
          <span>
            Promedio general: <strong>{promedio}/20</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaEquals className="text-purple-600" />
          <span>
            Desviación estándar: <strong>{desviacion}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          <span>
            Top 3 calificaciones:{" "}
            <strong>{top3.length ? top3.join(", ") : "—"}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaExclamationTriangle className="text-red-500" />
          <span>
            Total de entregas: <strong>{total}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardActividadComparativo;
