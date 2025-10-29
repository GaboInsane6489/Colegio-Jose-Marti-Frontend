import { FaUserTie, FaCalendarAlt, FaBook } from "react-icons/fa";

/**
 * 📚 Componente institucional para mostrar actividad asignada al estudiante
 */
const ActividadCardEstudiante = ({ actividad }) => {
  const { titulo, descripcion, fechaEntrega, materia, lapso, docente } =
    actividad;

  const fechaFormateada = fechaEntrega
    ? new Date(fechaEntrega).toLocaleDateString("es-VE", {
        dateStyle: "medium",
      })
    : "Sin fecha";

  const lapsoFormateado = lapso?.trim() || "Lapso no definido";

  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-5 space-y-3 hover:shadow-lg transition-shadow duration-200">
      {/* Título */}
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <FaBook className="text-lime-600" />
        {titulo}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-gray-700">{descripcion}</p>

      {/* Docente */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <FaUserTie className="text-lime-600" />
        <span>{docente?.nombre || "Docente desconocido"}</span>
      </div>

      {/* Fecha de entrega */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <FaCalendarAlt className="text-lime-600" />
        <span>Entrega: {fechaFormateada}</span>
      </div>

      {/* Materia y lapso */}
      <div className="text-xs text-gray-500 italic">
        {materia || "Materia no definida"} — {lapsoFormateado}
      </div>
    </div>
  );
};

export default ActividadCardEstudiante;
