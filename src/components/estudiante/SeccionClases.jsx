import { FaChalkboardTeacher } from "react-icons/fa";
import ClasesList from "./ClasesList";

const SeccionClases = ({ clases, loading }) => (
  <section className="bg-white/90 text-gray-900 rounded-xl shadow-lg p-6 space-y-6 scroll-mt-24">
    <div className="text-center mb-6">
      <FaChalkboardTeacher className="text-gray-800 text-4xl mb-2 mx-auto" />
      <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
        Tus clases activas
      </h2>
    </div>

    {loading ? (
      <p className="text-gray-500 animate-pulse">Cargando clases...</p>
    ) : clases.length === 0 ? (
      <div className="text-center py-6">
        <p className="text-lg">No tienes clases asignadas por ahora.</p>
        <p className="text-sm mt-2 italic text-gray-500">
          Cuando se asignen, aparecerán aquí para que comiences tu
          transformación académica
        </p>
      </div>
    ) : (
      <ClasesList clases={clases} />
    )}
  </section>
);

export default SeccionClases;
