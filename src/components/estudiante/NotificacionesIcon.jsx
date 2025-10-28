import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import useNotificaciones from "@/hooks/useNotificaciones.js";

const NotificacionesIcon = ({ token, usuarioId }) => {
  const [abierto, setAbierto] = useState(false);
  const { notificaciones, loading, error, marcarComoLeida } = useNotificaciones(
    token,
    usuarioId
  );

  const noLeidas = notificaciones.filter((n) => !n.leido);

  return (
    <div className="relative">
      {/* Ícono de campana */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="relative p-2 rounded-full hover:bg-white/10 transition"
        aria-label="Notificaciones"
      >
        <BellIcon className="h-6 w-6 text-white" />
        {noLeidas.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {noLeidas.length}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {abierto && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b font-semibold text-lg">
            🔔 Notificaciones
          </div>

          <div className="max-h-96 overflow-y-auto divide-y">
            {loading && (
              <p className="p-4 text-sm text-gray-500">Cargando...</p>
            )}
            {error && <p className="p-4 text-sm text-red-500">{error}</p>}
            {notificaciones.length === 0 && !loading && (
              <p className="p-4 text-sm text-gray-500">
                No tienes notificaciones.
              </p>
            )}

            {notificaciones.map((n) => (
              <div
                key={n._id}
                className={`p-4 text-sm cursor-pointer hover:bg-gray-100 ${
                  n.leido ? "text-gray-600" : "font-medium"
                }`}
                onClick={() => marcarComoLeida(n._id)}
              >
                {n.mensaje}
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(n.fecha).toLocaleString("es-VE")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificacionesIcon;
