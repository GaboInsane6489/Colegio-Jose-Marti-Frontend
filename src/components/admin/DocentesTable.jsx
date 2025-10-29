import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

/**
 * 🧑‍🏫 Tabla institucional para listar docentes con acciones de edición y eliminación
 */
const DocentesTable = ({ docentes = [], onEdit, onDelete, loading }) => {
  if (loading)
    return (
      <p className="text-center text-white animate-pulse">
        🔄 Cargando docentes...
      </p>
    );

  if (!Array.isArray(docentes) || docentes.length === 0)
    return (
      <p className="text-center text-white">
        No hay docentes registrados actualmente.
      </p>
    );

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="w-full max-w-3xl mx-auto bg-black p-6 rounded-xl shadow-lg border border-white">
        <table className="min-w-full text-sm text-white">
          <thead>
            <tr className="border-b border-white text-left">
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Correo</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/20">
            {docentes.map((docente) => (
              <tr key={docente._id} className="hover:bg-gray-900 transition">
                <td className="px-4 py-3">{docente.nombre}</td>
                <td className="px-4 py-3">
                  {docente.email || docente.correo || "—"}
                </td>
                <td className="px-4 py-3">
                  {docente.isValidated ? "Validado" : "Pendiente"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(docente._id)}
                      className="text-blue-400 hover:text-blue-300 transition"
                      aria-label={`Editar ${docente.nombre}`}
                      title="Editar docente"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(docente._id)}
                      className="text-red-400 hover:text-red-300 transition"
                      aria-label={`Eliminar ${docente.nombre}`}
                      title="Eliminar docente"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocentesTable;
