import { useState, useEffect } from "react";
import axiosInstancia from "@/services/axiosInstancia";

/**
 * 📦 Componente institucional para listar entregas de una actividad
 */
const EntregasList = ({ actividadId }) => {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!actividadId) {
      console.warn("⚠️ actividadId no definido:", actividadId);
      return;
    }

    const fetchEntregas = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstancia.get(
          `/api/entregas/${actividadId}`
        );

        if (Array.isArray(data.entregas)) {
          console.log("📥 Entregas recibidas:", data.entregas);
          setEntregas(data.entregas);
          setError(null);
        } else {
          console.warn("⚠️ Respuesta inesperada del backend:", data);
          setEntregas([]);
          setError(data.msg || "Respuesta inesperada del servidor");
        }
      } catch (err) {
        console.error("❌ Error al cargar entregas:", err.message);
        setError(
          err.response?.data?.msg || "No se pudieron cargar las entregas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEntregas();
  }, [actividadId]);

  if (loading) return <p className="text-white">🔄 Cargando entregas...</p>;
  if (error) return <p className="text-red-400">❌ {error}</p>;
  if (!Array.isArray(entregas) || entregas.length === 0)
    return <p className="text-white/70">No hay entregas registradas aún.</p>;

  return (
    <div className="space-y-6">
      {entregas.map((entrega) => {
        const estado = entrega.estado || "pendiente";
        const fechaFormateada = entrega.fechaEntrega
          ? new Date(entrega.fechaEntrega).toLocaleDateString("es-VE")
          : "Sin fecha";

        return (
          <div
            key={entrega._id}
            className="bg-black text-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                📚 {entrega.estudianteId?.nombre || "Estudiante desconocido"}
              </h3>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  estado === "entregado"
                    ? "bg-green-500"
                    : estado === "vencido"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {estado.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-white/80 mb-1">
              📅 Fecha de entrega:{" "}
              <strong className="text-white">{fechaFormateada}</strong>
            </p>

            {entrega.calificacion !== undefined && (
              <p className="text-sm text-white/80 mb-1">
                🧮 Calificación:{" "}
                <strong className="text-white">
                  {entrega.calificacion}/20
                </strong>
              </p>
            )}

            {entrega.comentarioDocente && (
              <p className="text-sm text-white/80 mb-1">
                💬 Comentario:{" "}
                <span className="italic text-white">
                  {entrega.comentarioDocente}
                </span>
              </p>
            )}

            {entrega.archivoUrl && (
              <a
                href={entrega.archivoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-blue-400 underline hover:text-blue-300"
              >
                📎 Ver archivo entregado
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EntregasList;
