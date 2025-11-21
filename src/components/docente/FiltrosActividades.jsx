import { useEffect, useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import {
  CalendarDaysIcon,
  Squares2X2Icon,
  SignalIcon,
  BookOpenIcon,
  AcademicCapIcon,
  IdentificationIcon,
  AcademicCapIcon as CursoIcon,
} from '@heroicons/react/24/outline';

const FiltrosActividades = ({
  orden,
  setOrden,
  filtroTipo,
  setFiltroTipo,
  filtroEstado,
  setFiltroEstado,
  filtroMateria,
  setFiltroMateria,
  filtroAnio,
  setFiltroAnio,
  filtroSeccion,
  setFiltroSeccion,
  filtroCursoId,
  setFiltroCursoId,
  materias = ['todos', 'Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'],
  anios = ['todos', '1ero', '2do', '3ero', '4to', '5to'],
  secciones = ['todos', 'A', 'B', 'C', 'D'],
}) => {
  const tipos = ['todos', 'tarea', 'proyecto', 'examen', 'otro'];
  const estados = ['todos', 'activa', 'vencida', 'borrador'];
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const { data } = await axiosInstancia.get('/docente/cursos');
        if (data?.ok && Array.isArray(data.cursos)) {
          setCursos(data.cursos);
        } else {
          setCursos([]);
          console.warn('⚠️ Respuesta inesperada al cargar cursos:', data);
        }
      } catch (err) {
        console.error('❌ Error al cargar cursos:', err?.response?.data?.msg || err.message);
        setCursos([]);
      }
    };
    cargarCursos();
  }, []);

  const selectClass =
    'bg-black text-white px-4 py-2 rounded-full border border-white/10 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#00FFF7]';

  const SelectFiltro = ({ value, onChange, options, icon: Icon }) => (
    <div className='relative'>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
        aria-label='Filtro'
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Icon className='w-5 h-5 text-[#00FFF7] absolute right-3 top-2.5 pointer-events-none' />
    </div>
  );

  return (
    <div className='flex flex-wrap justify-center gap-4 py-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 px-4'>
      <SelectFiltro
        value={orden}
        onChange={setOrden}
        options={['fechaAsc', 'fechaDesc', 'ponderacionAsc', 'ponderacionDesc']}
        icon={CalendarDaysIcon}
      />
      <SelectFiltro
        value={filtroTipo}
        onChange={setFiltroTipo}
        options={tipos}
        icon={Squares2X2Icon}
      />
      <SelectFiltro
        value={filtroEstado}
        onChange={setFiltroEstado}
        options={estados}
        icon={SignalIcon}
      />
      <SelectFiltro
        value={filtroMateria}
        onChange={setFiltroMateria}
        options={materias}
        icon={BookOpenIcon}
      />
      <SelectFiltro
        value={filtroAnio}
        onChange={setFiltroAnio}
        options={anios}
        icon={AcademicCapIcon}
      />
      <SelectFiltro
        value={filtroSeccion}
        onChange={setFiltroSeccion}
        options={secciones}
        icon={IdentificationIcon}
      />
      <div className='relative'>
        <select
          value={filtroCursoId}
          onChange={(e) => setFiltroCursoId(e.target.value)}
          className={selectClass}
          aria-label='Filtro por curso'
        >
          <option value=''>Todos los cursos</option>
          {cursos.map((curso) => (
            <option key={curso._id || curso.id} value={curso._id || curso.id}>
              {curso.nombre} ({curso.anio} - {curso.seccion})
            </option>
          ))}
        </select>
        <CursoIcon className='w-5 h-5 text-[#00FFF7] absolute right-3 top-2.5 pointer-events-none' />
      </div>
    </div>
  );
};

export default FiltrosActividades;
