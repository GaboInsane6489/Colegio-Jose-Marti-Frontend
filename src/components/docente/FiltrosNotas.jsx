import {
  FaBookOpen,
  FaClipboardCheck,
  FaUserGraduate,
  FaSearch,
  FaSortNumericDown,
  FaSortNumericUp,
  FaSlidersH,
} from "react-icons/fa";

const materias = ["Matemáticas", "Lengua", "Historia", "Ciencias", "Arte"];
const estadosEntrega = ["entregado", "pendiente", "revisado"];
const estudiantes = [
  { id: "todos", nombre: "Todos" },
  { id: "est1", nombre: "Ana Torres" },
  { id: "est2", nombre: "Luis Mendoza" },
  { id: "est3", nombre: "Carlos Ruiz" },
];

const FiltrosNotas = ({
  filtroMateria,
  setFiltroMateria,
  filtroEstado,
  setFiltroEstado,
  filtroEstudiante,
  setFiltroEstudiante,
  filtroActividad,
  setFiltroActividad,
  filtroNotaMin,
  setFiltroNotaMin,
  filtroNotaMax,
  setFiltroNotaMax,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/20 space-y-8">
      {/* Título centrado */}
      <div className="flex items-center justify-center gap-3 text-white">
        <FaSlidersH className="text-lime-400 text-xl" />
        <h2 className="text-2xl font-semibold text-center">Filtros de Notas</h2>
      </div>

      {/* Grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Materia */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1 text-white">
            <FaBookOpen className="text-blue-400" />
            Materia
          </label>
          <select
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
            className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="todos">Todas</option>
            {materias.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1 text-white">
            <FaClipboardCheck className="text-yellow-400" />
            Estado
          </label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option value="todos">Todos</option>
            {estadosEntrega.map((estado) => (
              <option key={estado} value={estado}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Estudiante */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1 text-white">
            <FaUserGraduate className="text-pink-400" />
            Estudiante
          </label>
          <select
            value={filtroEstudiante}
            onChange={(e) => setFiltroEstudiante(e.target.value)}
            className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            {estudiantes.map((est) => (
              <option key={est.id} value={est.id}>
                {est.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Actividad */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="flex items-center gap-2 text-sm font-medium mb-1 text-white">
            <FaSearch className="text-cyan-400" />
            Actividad
          </label>
          <input
            type="text"
            value={filtroActividad}
            onChange={(e) => setFiltroActividad(e.target.value)}
            placeholder="Buscar por título"
            className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
        </div>

        {/* Nota mínima */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1 text-white">
            <FaSortNumericDown className="text-green-400" />
            Nota mínima
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={filtroNotaMin}
            onChange={(e) => setFiltroNotaMin(e.target.value)}
            className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* Nota máxima */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-1 text-white">
            <FaSortNumericUp className="text-red-400" />
            Nota máxima
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={filtroNotaMax}
            onChange={(e) => setFiltroNotaMax(e.target.value)}
            className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
      </div>
    </div>
  );
};

export default FiltrosNotas;
