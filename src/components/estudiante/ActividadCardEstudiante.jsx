import { FaUserTie, FaCalendarAlt, FaBook } from "react-icons/fa";

const ActividadCardEstudiante = ({ actividad }) => {
  const { titulo, descripcion, fechaEntrega, materia, lapso, docente } =
    actividad;

  const fechaFormateada = fechaEntrega
    ? new Date(fechaEntrega).toLocaleDateString()
    : "Sin fecha";

  const lapsoFormateado = lapso?.trim() || "Lapso no definido";

  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-5 space-y-3 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <FaBook className="text-lime-600" />
        {titulo}
      </h3>

      <p className="text-sm text-gray-700">{descripcion}</p>

      <div className="text-sm text-gray-600 flex items-center gap-2">
        <FaUserTie className="text-lime-600" />
        <span>{docente?.nombre || "Docente desconocido"}</span>
      </div>

      <div className="text-sm text-gray-600 flex items-center gap-2">
        <FaCalendarAlt className="text-lime-600" />
        <span>Entrega: {fechaFormateada}</span>
      </div>

      <div className="text-xs text-gray-500 italic">
        {materia} — {lapsoFormateado}
      </div>
    </div>
  );
};

export default ActividadCardEstudiante;
