import { FaTasks, FaChartLine, FaEnvelopeOpenText } from "react-icons/fa";

/**
 * 📊 Panel institucional de resumen académico del estudiante
 */
const PanelResumenEstudiante = ({
  promedio,
  tareasPendientes = [],
  loadingEntregas = false,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Tareas pendientes */}
    <div className="bg-white/90 text-gray-900 rounded-xl p-5 shadow-lg text-center">
      <FaTasks className="text-gray-800 text-3xl mb-2 mx-auto" />
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        Tareas pendientes
      </h3>
      <p className="text-sm text-gray-600">
        {loadingEntregas
          ? "Cargando..."
          : tareasPendientes.length > 0
          ? `${tareasPendientes.length} tareas por entregar`
          : "No tienes tareas pendientes"}
      </p>
    </div>

    {/* Progreso académico */}
    <div className="bg-white/90 text-gray-900 rounded-xl p-5 shadow-lg text-center">
      <FaChartLine className="text-gray-800 text-3xl mb-2 mx-auto" />
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        Progreso académico
      </h3>
      <p className="text-sm text-gray-600">
        {loadingEntregas
          ? "Cargando..."
          : isNaN(promedio)
          ? "Sin notas registradas aún"
          : `Promedio actual: ${promedio.toFixed(2)}/20`}
      </p>
    </div>

    {/* Mensajes recientes */}
    <div className="bg-white/90 text-gray-900 rounded-xl p-5 shadow-lg text-center">
      <FaEnvelopeOpenText className="text-gray-800 text-3xl mb-2 mx-auto" />
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        Mensajes recientes
      </h3>
      <p className="text-sm text-gray-600">
        Revisa tus comentarios docentes en las actividades revisadas.
      </p>
    </div>
  </div>
);

export default PanelResumenEstudiante;
