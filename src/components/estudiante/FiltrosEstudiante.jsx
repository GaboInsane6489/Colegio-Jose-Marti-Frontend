import { FaFileExport, FaFilter } from 'react-icons/fa';

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
}) => {
  const listaMaterias = Array.isArray(materias) ? materias : [];
  const listaLapsos = Array.isArray(lapsos) ? lapsos : [];

  const handleExport = () => {
    if (!Array.isArray(entregasFiltradas) || entregasFiltradas.length === 0) {
      alert('⚠️ No hay entregas disponibles para exportar.');
      return;
    }
    exportNotasCSV(entregasFiltradas);
  };

  return (
    <div className='flex flex-wrap justify-center gap-4 pt-8 pb-4 font-[Orbitron]'>
      {/* Selector de materias */}
      <div className='flex flex-col items-start'>
        <label className='text-white text-sm mb-1' aria-label='Filtro por materia'>
          Materia
        </label>
        <select
          value={filtroMateria}
          onChange={(e) => setFiltroMateria(e.target.value)}
          className='bg-black text-white px-4 py-2 rounded-md shadow-md border border-[#00FFF7]/30 
                     focus:outline-none focus:ring-2 focus:ring-[#00FFF7] transition'
        >
          <option value='todos'>Todas las materias</option>
          {listaMaterias.length === 0 ? (
            <option disabled>No hay materias disponibles</option>
          ) : (
            listaMaterias.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Selector de lapsos */}
      <div className='flex flex-col items-start'>
        <label className='text-white text-sm mb-1' aria-label='Filtro por lapso'>
          Lapso
        </label>
        <select
          value={filtroLapso}
          onChange={(e) => setFiltroLapso(e.target.value)}
          className='bg-black text-white px-4 py-2 rounded-md shadow-md border border-[#FFD700]/30 
                     focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition'
        >
          <option value='todos'>Todos los lapsos</option>
          {listaLapsos.length === 0 ? (
            <option disabled>No hay lapsos disponibles</option>
          ) : (
            listaLapsos.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Botón aplicar filtros */}
      <button
        onClick={aplicarFiltros}
        aria-label='Aplicar filtros'
        className='flex items-center gap-2 bg-[#00FFF7] text-black px-5 py-2 rounded-full font-medium shadow-md 
                   hover:bg-[#00FFB2] transition hover:scale-105 hover:drop-shadow-[0_0_8px_#00FFF7]'
      >
        <FaFilter />
        Aplicar filtros
      </button>

      {/* Botón exportar entregas */}
      <button
        onClick={handleExport}
        aria-label='Exportar entregas'
        className='flex items-center gap-2 bg-[#FFD700] text-black px-5 py-2 rounded-full font-medium shadow-md 
                  hover:bg-yellow-400 transition hover:scale-105 hover:drop-shadow-[0_0_8px_#FFD700]'
      >
        <FaFileExport />
        Exportar entregas
      </button>
    </div>
  );
};

export default FiltrosEstudiante;
