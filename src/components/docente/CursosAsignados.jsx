import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useCursos from '@/hooks/useCursos'; // ✅ hook institucional para cursos
import {
  BookOpenIcon,
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  TagIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';

/**
 * 📘 Tabla institucional de cursos asignados al docente
 * Adaptada a backend, services y hooks institucionales
 */
const CursosAsignados = ({ refrescar = false, nuevoCurso = null, fallback = null }) => {
  const [cursos, setCursos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { data, loading, error, deleteCurso } = useCursos('docente'); // ✅ usar hook institucional

  useEffect(() => {
    if (Array.isArray(data)) {
      setCursos(data);
    } else {
      setCursos([]);
    }
  }, [data, refrescar]);

  useEffect(() => {
    if (
      nuevoCurso &&
      typeof nuevoCurso === 'object' &&
      (nuevoCurso._id || nuevoCurso.id) &&
      nuevoCurso.nombre &&
      Array.isArray(nuevoCurso.estudiantes)
    ) {
      const yaExiste = cursos.some((c) => c._id === nuevoCurso._id || c.id === nuevoCurso.id);
      if (!yaExiste) {
        setCursos((prev) => [nuevoCurso, ...prev]);
      }
    }
  }, [nuevoCurso]);

  const handleEditarOAsignar = (curso) => {
    const cursoId = curso._id || curso.id;
    if (!curso || !cursoId) {
      toast.error('❌ Curso inválido');
      return;
    }
    navigate('/docente/cursos', { state: { curso } });
  };

  const handleEliminar = async (id) => {
    if (!id || typeof id !== 'string') {
      toast.error('❌ ID de curso inválido');
      return;
    }

    const confirmar = confirm('¿Estás seguro de que deseas eliminar este curso?');
    if (!confirmar) return;

    try {
      await deleteCurso(id);
      setCursos((prev) => prev.filter((c) => c._id !== id && c.id !== id));
      toast.success('🗑️ Curso eliminado correctamente');
    } catch (err) {
      toast.error('❌ Error al eliminar curso');
    }
  };

  const hayCursos = Array.isArray(cursos) && cursos.length > 0;

  if (loading)
    return fallback || <p className='text-center text-gray-400 text-sm'>Cargando cursos...</p>;
  if (error || errorMsg)
    return fallback || <p className='text-center text-red-400 text-sm'>{error || errorMsg}</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      className='bg-[#0a0a0a] text-white px-6 py-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 w-full max-w-[90rem] mx-auto'
    >
      <div className='text-center space-y-2'>
        <BookOpenIcon className='h-10 w-10 mx-auto text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
        <h2 className='text-2xl font-bold tracking-wide'>Tus cursos asignados</h2>
        <p className='text-xs text-white/70 max-w-md mx-auto'>
          Puedes editar, eliminar o asignar estudiantes a cada curso desde esta tabla.
        </p>
      </div>

      {!hayCursos ? (
        <div className='flex flex-col items-center gap-2'>
          <ExclamationCircleIcon className='h-8 w-8 text-red-400' />
          <p className='text-sm font-medium text-white'>No hay cursos asignados aún.</p>
          <p className='text-xs text-white/60 max-w-md'>
            Crea tus cursos desde el formulario superior. Una vez creados, aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className='overflow-x-auto w-full'>
          <table className='min-w-[900px] w-full text-center border-collapse text-xs'>
            <thead>
              <tr className='bg-white/10 text-white/70'>
                <th className='px-3 py-2'>
                  <div className='flex items-center justify-center gap-1'>
                    <Squares2X2Icon className='w-4 h-4 text-[#00FFF7]' />
                    Nombre
                  </div>
                </th>
                <th className='px-3 py-2'>
                  <div className='flex items-center justify-center gap-1'>
                    <CalendarDaysIcon className='w-4 h-4 text-[#00FFF7]' />
                    Año académico
                  </div>
                </th>
                <th className='px-3 py-2'>
                  <div className='flex items-center justify-center gap-1'>
                    <CalendarDaysIcon className='w-4 h-4 text-[#00FFF7]' />
                    Año estudiantil
                  </div>
                </th>
                <th className='px-3 py-2'>
                  <div className='flex items-center justify-center gap-1'>
                    <TagIcon className='w-4 h-4 text-[#00FFF7]' />
                    Sección
                  </div>
                </th>
                <th className='px-3 py-2'>
                  <div className='flex items-center justify-center gap-1'>
                    <CheckCircleIcon className='w-4 h-4 text-[#00FFF7]' />
                    Validado
                  </div>
                </th>
                <th className='px-3 py-2'>
                  <div className='flex items-center justify-center gap-1'>
                    <UserGroupIcon className='w-4 h-4 text-[#00FFF7]' />
                    Estudiantes
                  </div>
                </th>
                <th className='px-3 py-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => {
                const cursoId = curso._id || curso.id;
                if (!curso || !cursoId) return null;
                const esNuevo = nuevoCurso?._id === curso._id || nuevoCurso?.id === curso.id;
                return (
                  <motion.tr
                    key={cursoId}
                    initial={esNuevo ? { opacity: 0, y: -10 } : false}
                    animate={esNuevo ? { opacity: 1, y: 0 } : false}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                    className='border-t border-white/20 hover:bg-white/10 transition duration-200 ease-out'
                  >
                    <td className='px-3 py-2 font-medium text-white'>
                      {curso.nombre ?? 'Sin nombre'}
                    </td>
                    <td className='px-3 py-2 text-white/70'>{curso.anioAcademico ?? '-'}</td>
                    <td className='px-3 py-2 text-white/70'>{curso.anioEstudiantil ?? '-'}</td>
                    <td className='px-3 py-2 text-white/70'>{curso.seccion ?? '-'}</td>
                    <td className='px-3 py-2'>
                      {curso.validado ? (
                        <CheckCircleIcon className='w-4 h-4 mx-auto text-green-400' />
                      ) : (
                        <span className='text-white/50'>No</span>
                      )}
                    </td>
                    <td className='px-3 py-2'>
                      <div className='flex flex-col items-center justify-center gap-1 text-white/70'>
                        <div className='flex items-center gap-1'>
                          <UserGroupIcon className='w-4 h-4 text-cyan-400' />
                          <span>{curso.estudiantes?.length || 0}</span>
                        </div>
                        {curso.estudiantes?.length === 0 && (
                          <span className='text-xs text-yellow-300'>
                            Este curso no tiene estudiantes asignados.
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-3 py-2 flex justify-center gap-1 flex-wrap'>
                      <button
                        type='button'
                        className='bg-yellow-500 text-white px-2 py-1 rounded-full hover:bg-yellow-400 transition text-xs font-semibold flex items-center gap-1'
                        onClick={() => handleEditarOAsignar(curso)}
                      >
                        <PencilIcon className='w-3 h-3' />
                        Editar
                      </button>

                      <button
                        type='button'
                        className='bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-500 transition text-xs font-semibold flex items-center gap-1'
                        onClick={() => handleEliminar(cursoId)}
                      >
                        <TrashIcon className='w-3 h-3' />
                        Eliminar
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.section>
  );
};

export default CursosAsignados;
