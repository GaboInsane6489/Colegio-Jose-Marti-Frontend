import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  BookOpenIcon,
  CalendarIcon,
  CalculatorIcon,
  TagIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";

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
    lapso = "Sin lapso",
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
    } catch {
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
    <div className="bg-black text-white rounded-lg shadow-md p-6 hover:shadow-lg transition space-y-3 max-w-md">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-wide">{titulo}</h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold transition ${estadoClase}`}
        >
          {estado.toUpperCase()}
        </span>
      </div>

      {/* Detalles */}
      <div className="space-y-2 text-white/80 text-sm">
        <p className="flex items-center gap-2">
          <BookOpenIcon className="w-5 h-5 text-white/70" />
          <span className="font-medium">Materia:</span>
          <strong className="text-white">{materia}</strong>
        </p>
        <p className="flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-white/70" />
          <span className="font-medium">Lapso:</span>
          <strong className="text-white">{lapso}</strong>
        </p>
        <p className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-white/70" />
          <span className="font-medium">Entrega:</span>
          <strong className="text-white">{fechaFormateada}</strong>
        </p>
        <p className="flex items-center gap-2">
          <CalculatorIcon className="w-5 h-5 text-white/70" />
          <span className="font-medium">Ponderación:</span>
          <strong className="text-white">{ponderacion}%</strong>
        </p>
        <p className="flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-white/70" />
          <span className="font-medium">Tipo:</span>
          <strong className="text-white">{tipo}</strong>
        </p>
      </div>

      {/* Recursos */}
      {Array.isArray(recursos) && recursos.length > 0 && (
        <div className="pt-2 space-y-1">
          <p className="flex items-center gap-2 font-medium text-white">
            <PaperClipIcon className="w-5 h-5 text-white/70" />
            Recursos:
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-1 pl-4 text-sm">
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
          className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-400 transition font-medium flex items-center gap-2"
          onClick={() => onEditar?.(actividad)}
        >
          <PencilIcon className="w-4 h-4" />
          Editar
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-400 transition font-medium flex items-center gap-2"
          onClick={() => onEliminar?.(actividadId)}
        >
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </button>
        {!notificada && (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition font-medium flex items-center gap-2"
            onClick={() => onNotificar?.(actividadId)}
          >
            <MegaphoneIcon className="w-4 h-4" />
            Notificar
          </button>
        )}
      </div>
    </div>
  );
};

export default ActividadCard;
