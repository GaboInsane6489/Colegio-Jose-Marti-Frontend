/**
 * 🧠 Filtros institucionales para actividades académicas
 * Permite ordenar y filtrar por tipo, estado y materia
 */
const FiltrosActividades = ({
  orden,
  setOrden,
  filtroTipo,
  setFiltroTipo,
  filtroEstado,
  setFiltroEstado,
  filtroMateria,
  setFiltroMateria,
}) => {
  const tipos = ["todos", "tarea", "proyecto", "examen", "otro"];
  const estados = ["todos", "activa", "vencida", "borrador"];
  const materias = [
    "todos",
    "Matemáticas",
    "Lengua",
    "Historia",
    "Ciencias",
    "Arte",
  ];

  const selectClass =
    "bg-black text-white px-4 py-2 rounded-full border border-white/20";

  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {/* Orden */}
      <select
        value={orden}
        onChange={(e) => setOrden(e.target.value)}
        className={selectClass}
      >
        <option value="fechaAsc">📅 Fecha ↑</option>
        <option value="fechaDesc">📅 Fecha ↓</option>
        <option value="ponderacionAsc">📊 Ponderación ↑</option>
        <option value="ponderacionDesc">📊 Ponderación ↓</option>
      </select>

      {/* Tipo */}
      <select
        value={filtroTipo}
        onChange={(e) => setFiltroTipo(e.target.value)}
        className={selectClass}
      >
        {tipos.map((tipo) => (
          <option key={tipo} value={tipo}>
            📂 Tipo: {tipo}
          </option>
        ))}
      </select>

      {/* Estado */}
      <select
        value={filtroEstado}
        onChange={(e) => setFiltroEstado(e.target.value)}
        className={selectClass}
      >
        {estados.map((estado) => (
          <option key={estado} value={estado}>
            🚦 Estado: {estado}
          </option>
        ))}
      </select>

      {/* Materia */}
      <select
        value={filtroMateria}
        onChange={(e) => setFiltroMateria(e.target.value)}
        className={selectClass}
      >
        {materias.map((materia) => (
          <option key={materia} value={materia}>
            📘 Materia: {materia}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltrosActividades;
