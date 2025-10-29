import { FaFileExport, FaFilter } from "react-icons/fa";

/**
 * 🎛️ Componente institucional para aplicar filtros y exportar entregas del estudiante
 */
const FiltrosEstudiante = ({
  filtroMateria,
  setFiltroMateria,
  filtroLapso,
  setFiltroLapso,
  materias = [],
  lapsos = [],
  entregasFiltradas = [],
  exportNotasCSV,
  aplicarFiltros,
}) => (
  <div className="flex flex-wrap justify-center gap-4 pt-8 pb-4">
    {/* Selector de materias */}
    <div className="flex flex-col items-start">
      <label className="text-white text-sm mb-1">Materia</label>
      <select
        value={filtroMateria}
        onChange={(e) => setFiltroMateria(e.target.value)}
        className="bg-white text-black px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
      >
        <option value="todos">Todas las materias</option>
        {materias.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>

    {/* Selector de lapsos */}
    <div className="flex flex-col items-start">
      <label className="text-white text-sm mb-1">Lapso</label>
      <select
        value={filtroLapso}
        onChange={(e) => setFiltroLapso(e.target.value)}
        className="bg-white text-black px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
      >
        <option value="todos">Todos los lapsos</option>
        {lapsos.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>

    {/* Botón aplicar filtros */}
    <button
      onClick={aplicarFiltros}
      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-blue-500 transition"
    >
      <FaFilter />
      Aplicar filtros
    </button>

    {/* Botón exportar entregas */}
    <button
      onClick={() => exportNotasCSV(entregasFiltradas)}
      className="flex items-center gap-2 bg-lime-500 text-black px-5 py-2 rounded-full font-medium shadow-md hover:bg-lime-400 transition"
    >
      <FaFileExport />
      Exportar entregas
    </button>
  </div>
);

export default FiltrosEstudiante;
