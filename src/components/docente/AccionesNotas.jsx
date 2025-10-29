import { FaFilter, FaFileExport } from "react-icons/fa";

/**
 * 🎛️ Componente de acciones para notas académicas
 * Incluye botones para aplicar filtros y exportar en CSV
 */
const AccionesNotas = ({ onAplicarFiltros, onExportar }) => (
  <div className="flex flex-wrap justify-center gap-4 pt-4">
    <button
      onClick={onAplicarFiltros}
      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-500 transition"
      aria-label="Aplicar filtros a las notas"
    >
      <FaFilter className="h-4 w-4" />
      Aplicar filtros
    </button>

    <button
      onClick={onExportar}
      className="flex items-center gap-2 bg-lime-500 text-black px-5 py-2 rounded-full font-medium hover:bg-lime-400 transition"
      aria-label="Exportar notas en formato CSV"
    >
      <FaFileExport className="h-4 w-4" />
      Exportar notas (.csv)
    </button>
  </div>
);

export default AccionesNotas;
