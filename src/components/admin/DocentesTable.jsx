import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const DocentesTable = ({ docentes, onEdit, onDelete, loading }) => {
  if (loading)
    return <p className="text-center text-gray-500">Cargando docentes...</p>;
  if (docentes.length === 0)
    return (
      <p className="text-center text-gray-500">No hay docentes registrados.</p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr className="border-b">
            <th className="px-4 py-3 text-left font-semibold">Nombre</th>
            <th className="px-4 py-3 text-left font-semibold">Correo</th>
            <th className="px-4 py-3 text-left font-semibold">Estado</th>
            <th className="px-4 py-3 text-center font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
          {docentes.map((docente) => (
            <tr key={docente._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{docente.nombre}</td>
              <td className="px-4 py-3">{docente.correo}</td>
              <td className="px-4 py-3">{docente.estado || "Activo"}</td>
              <td className="px-4 py-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(docente._id)}
                  className="text-blue-600 hover:text-blue-800 transition"
                  aria-label="Editar docente"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(docente._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  aria-label="Eliminar docente"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocentesTable;
