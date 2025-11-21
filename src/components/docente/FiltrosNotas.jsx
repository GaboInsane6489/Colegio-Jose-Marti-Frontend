import {
  FaBookOpen,
  FaClipboardCheck,
  FaUserGraduate,
  FaSearch,
  FaSortNumericDown,
  FaSortNumericUp,
  FaSlidersH,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

/**
 * 🎯 Filtros institucionales para gestión de notas académicas
 */
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
  materias = ['todos', 'Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'],
  estadosEntrega = ['todos', 'entregado', 'pendiente', 'revisado'],
  estudiantes = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'est1', nombre: 'Ana Torres' },
    { id: 'est2', nombre: 'Luis Mendoza' },
    { id: 'est3', nombre: 'Carlos Ruiz' },
  ],
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='bg-[#0d0d0d] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8'
    >
      {/* Título centrado */}
      <div className='flex items-center justify-center gap-3'>
        <FaSlidersH className='text-[#00FFF7] text-xl drop-shadow-[0_0_6px_#00FFF7]' />
        <h2 className='text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_6px_#00FFF7] text-center'>
          Filtros de Notas
        </h2>
      </div>

      {/* Grid responsive */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Materia */}
        <div>
          <label className='flex items-center gap-2 text-sm font-medium mb-1 text-white/90'>
            <FaBookOpen className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            Materia
          </label>
          <select
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
            className='w-full bg-black text-white px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition duration-300'
          >
            {materias.map((m) => (
              <option key={m} value={m}>
                {m === 'todos' ? 'Todas' : m}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className='flex items-center gap-2 text-sm font-medium mb-1 text-white/90'>
            <FaClipboardCheck className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            Estado
          </label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className='w-full bg-black text-white px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition duration-300'
          >
            {estadosEntrega.map((estado) => (
              <option key={estado} value={estado}>
                {estado === 'todos' ? 'Todos' : estado.charAt(0).toUpperCase() + estado.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Estudiante */}
        <div>
          <label className='flex items-center gap-2 text-sm font-medium mb-1 text-white/90'>
            <FaUserGraduate className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            Estudiante
          </label>
          <select
            value={filtroEstudiante}
            onChange={(e) => setFiltroEstudiante(e.target.value)}
            className='w-full bg-black text-white px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition duration-300'
          >
            {estudiantes.map((est) => (
              <option key={est.id} value={est.id}>
                {est.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Actividad */}
        <div className='sm:col-span-2 lg:col-span-1'>
          <label className='flex items-center gap-2 text-sm font-medium mb-1 text-white/90'>
            <FaSearch className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            Actividad
          </label>
          <input
            type='text'
            value={filtroActividad}
            onChange={(e) => setFiltroActividad(e.target.value)}
            placeholder='Buscar por título'
            className='w-full bg-black text-white px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition duration-300'
          />
        </div>

        {/* Nota mínima */}
        <div>
          <label className='flex items-center gap-2 text-sm font-medium mb-1 text-white/90'>
            <FaSortNumericDown className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            Nota mínima
          </label>
          <input
            type='number'
            min='0'
            max='100'
            value={filtroNotaMin}
            onChange={(e) => setFiltroNotaMin(e.target.value)}
            className='w-full bg-black text-white px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition duration-300'
          />
        </div>

        {/* Nota máxima */}
        <div>
          <label className='flex items-center gap-2 text-sm font-medium mb-1 text-white/90'>
            <FaSortNumericUp className='text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            Nota máxima
          </label>
          <input
            type='number'
            min='0'
            max='100'
            value={filtroNotaMax}
            onChange={(e) => setFiltroNotaMax(e.target.value)}
            className='w-full bg-black text-white px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:scale-110 hover:-translate-y-[2px] transition duration-300'
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FiltrosNotas;
