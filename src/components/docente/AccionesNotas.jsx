import { FaFilter, FaFileExport } from "react-icons/fa";

const AccionesNotas = ({ onAplicarFiltros, onExportar }) => (
  <div className="flex flex-wrap justify-center gap-4 pt-4">
    <button
      onClick={onAplicarFiltros}
      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-500 transition"
    >
      <FaFilter />
      Aplicar filtros
    </button>

    <button
      onClick={onExportar}
      className="flex items-center gap-2 bg-lime-500 text-black px-5 py-2 rounded-full font-medium hover:bg-lime-400 transition"
    >
      <FaFileExport />
      Exportar notas (.csv)
    </button>
  </div>
);

export default AccionesNotas;
