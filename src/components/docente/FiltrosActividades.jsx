import {
  CalendarDaysIcon,
  ChartBarIcon,
  Squares2X2Icon,
  SignalIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

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
  const tipos = ['todos', 'tarea', 'proyecto', 'examen', 'otro'];
  const estados = ['todos', 'activa', 'vencida', 'borrador'];
  const materias = ['todos', 'Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'];

  const selectClass =
    'bg-black text-white px-4 py-2 rounded-full border border-white/20 appearance-none pr-10';

  return (
    <div className='flex flex-wrap justify-center gap-4 py-4'>
      {/* Orden */}
      <div className='relative'>
        <select value={orden} onChange={(e) => setOrden(e.target.value)} className={selectClass}>
          <option value='fechaAsc'>Fecha ↑</option>
          <option value='fechaDesc'>Fecha ↓</option>
          <option value='ponderacionAsc'>Ponderación ↑</option>
          <option value='ponderacionDesc'>Ponderación ↓</option>
        </select>
        <CalendarDaysIcon className='w-5 h-5 text-white absolute right-3 top-2.5 pointer-events-none' />
      </div>

      {/* Tipo */}
      <div className='relative'>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className={selectClass}
        >
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              Tipo: {tipo}
            </option>
          ))}
        </select>
        <Squares2X2Icon className='w-5 h-5 text-white absolute right-3 top-2.5 pointer-events-none' />
      </div>

      {/* Estado */}
      <div className='relative'>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className={selectClass}
        >
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              Estado: {estado}
            </option>
          ))}
        </select>
        <SignalIcon className='w-5 h-5 text-white absolute right-3 top-2.5 pointer-events-none' />
      </div>

      {/* Materia */}
      <div className='relative'>
        <select
          value={filtroMateria}
          onChange={(e) => setFiltroMateria(e.target.value)}
          className={selectClass}
        >
          {materias.map((materia) => (
            <option key={materia} value={materia}>
              Materia: {materia}
            </option>
          ))}
        </select>
        <BookOpenIcon className='w-5 h-5 text-white absolute right-3 top-2.5 pointer-events-none' />
      </div>
    </div>
  );
};

export default FiltrosActividades;
