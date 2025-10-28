import { FaCheckCircle, FaClock, FaCommentDots, FaEdit } from "react-icons/fa";
import { useState } from "react";
import NotaForm from "./NotaForm.jsx";

const NotaCard = ({ entrega, onEdit }) => {
  const [modoEdicion, setModoEdicion] = useState(false);

  if (!entrega) return null;

  const {
    estudianteId,
    calificacion,
    comentarioDocente,
    estado,
    fechaEntrega,
    actividadId,
  } = entrega;

  const nombreEstudiante = estudianteId?.nombre || "Estudiante";
  const fechaFormateada = new Date(fechaEntrega).toLocaleString("es-VE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-lg p-5 space-y-4">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{nombreEstudiante}</h3>
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            estado === "revisado"
              ? "bg-lime-500 text-black"
              : "bg-yellow-400 text-black"
          }`}
        >
          {estado === "revisado" ? "Revisado" : "Pendiente"}
        </span>
      </div>

      {/* Detalles */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-lime-600" />
          <span>
            Calificación:{" "}
            <strong>
              {calificacion !== undefined ? `${calificacion}/20` : "Sin nota"}
            </strong>
          </span>
        </div>

        {comentarioDocente && (
          <div className="flex items-center gap-2 text-gray-700">
            <FaCommentDots className="text-blue-500" />
            <span>Comentario: {comentarioDocente}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <FaClock />
          <span>Entregado el {fechaFormateada}</span>
        </div>
      </div>

      {/* Botón de edición */}
      <div className="text-right">
        <button
          onClick={() => setModoEdicion(!modoEdicion)}
          className="inline-flex items-center gap-2 text-sm text-lime-700 hover:text-lime-900 transition"
        >
          <FaEdit />
          {modoEdicion ? "Cancelar edición" : "Editar nota"}
        </button>
      </div>

      {/* Formulario de edición */}
      {modoEdicion && (
        <div className="mt-4">
          <NotaForm
            entrega={entrega}
            onClose={() => setModoEdicion(false)}
            onEdit={onEdit}
          />
        </div>
      )}
    </div>
  );
};

export default NotaCard;
