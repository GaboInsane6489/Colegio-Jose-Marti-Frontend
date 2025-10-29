import {
  FaUserGraduate,
  FaChartBar,
  FaClipboardList,
  FaUserCircle,
} from "react-icons/fa";

/**
 * 🎓 Componente institucional para mostrar resumen de rendimiento de un estudiante
 */
const ResumenEstudiante = ({ estudiante, entregas = [] }) => {
  if (!estudiante || !estudiante._id) return null;

  const entregasEstudiante = entregas.filter(
    (e) => e.estudianteId?._id === estudiante._id
  );

  const promedio =
    entregasEstudiante.reduce((acc, e) => acc + (e.calificacion || 0), 0) /
    Math.max(entregasEstudiante.length, 1);

  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center gap-3 text-lg font-bold text-gray-800">
        <FaUserCircle className="text-blue-600 text-xl" />
        <span>{estudiante.nombre || "Estudiante"}</span>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <FaClipboardList className="text-gray-700" />
          <span>
            Entregas: <strong>{entregasEstudiante.length}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaChartBar className="text-lime-600" />
          <span>
            Promedio:{" "}
            <strong>
              {isNaN(promedio) ? "—" : `${promedio.toFixed(2)}/20`}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResumenEstudiante;
