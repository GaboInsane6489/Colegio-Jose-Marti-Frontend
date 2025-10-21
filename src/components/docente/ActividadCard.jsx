import { format } from "date-fns";
import { es } from "date-fns/locale";

const ActividadCard = ({ actividad, onEditar, onEliminar, onNotificar }) => {
  if (!actividad || typeof actividad !== "object") {
    console.warn("⚠️ ActividadCard recibió actividad inválida:", actividad);
    return null;
  }

  const {
    titulo = "Sin título",
    tipo = "sin tipo",
    fechaEntrega,
    ponderacion = 0,
    estado = "borrador",
    notificada = false,
    recursos = [],
    materia = "Sin materia",
    _id,
    id,
  } = actividad;

  const actividadId = _id || id;
  if (!actividadId) {
    console.warn("⚠️ Actividad sin ID válida:", actividad);
    return null;
  }

  let fechaFormateada = "Sin fecha";
  if (fechaEntrega) {
    try {
      fechaFormateada = format(new Date(fechaEntrega), "PPP", { locale: es });
    } catch (err) {
      console.warn("⚠️ Fecha inválida en actividad:", fechaEntrega);
    }
  }

  const colorEstado = {
    activa: "bg-green-500 hover:bg-green-400",
    vencida: "bg-red-500 hover:bg-red-400",
    borrador: "bg-gray-500 hover:bg-gray-400",
  };

  const estadoClase = colorEstado[estado] || "bg-gray-700 hover:bg-gray-600";

  return (
    <div className="bg-black text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition space-y-4">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-wide">{titulo}</h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold transition ${estadoClase}`}
        >
          {estado.toUpperCase()}
        </span>
      </div>

      {/* Detalles */}
      <div className="space-y-1 text-white/80">
        <p>
          📘 <span className="font-medium">Materia:</span>{" "}
          <strong className="text-white">{materia}</strong>
        </p>
        <p>
          📅 <span className="font-medium">Entrega:</span>{" "}
          <strong className="text-white">{fechaFormateada}</strong>
        </p>
        <p>
          🧮 <span className="font-medium">Ponderación:</span>{" "}
          <strong className="text-white">{ponderacion}%</strong>
        </p>
        <p>
          📌 <span className="font-medium">Tipo:</span>{" "}
          <strong className="text-white">{tipo}</strong>
        </p>
      </div>

      {/* Recursos */}
      {Array.isArray(recursos) && recursos.length > 0 && (
        <div className="pt-2 space-y-1">
          <p className="text-white font-medium">📎 Recursos:</p>
          <ul className="list-disc list-inside text-white/70 space-y-1 pl-4">
            {recursos.map((url, index) => (
              <li key={`${actividadId}-recurso-${index}`}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  Recurso {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Acciones */}
      <div className="pt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-400 transition font-medium"
          onClick={() => onEditar?.(actividad)}
        >
          ✏️ Editar
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-400 transition font-medium"
          onClick={() => onEliminar?.(actividadId)}
        >
          🗑️ Eliminar
        </button>
        {!notificada && (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition font-medium"
            onClick={() => onNotificar?.(actividadId)}
          >
            📣 Notificar
          </button>
        )}
      </div>
    </div>
  );
};

export default ActividadCard;
