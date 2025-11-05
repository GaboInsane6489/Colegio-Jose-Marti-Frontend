import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstancia from '@/services/axiosInstancia';
import { BookOpenIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

/**
 * Componente institucional para mostrar los cursos asignados al docente
 */
const CursosAsignados = ({ refrescar = false, fallback = null }) => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const fetchCursos = async () => {
    setLoading(true);
    setErrorMsg('');

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setErrorMsg('No hay sesión activa. Inicia sesión nuevamente.');
      setLoading(false);
      navigate('/auth');
      return;
    }

    try {
      const res = await axiosInstancia.get('/api/docente/cursos');
      const lista = Array.isArray(res.data?.cursos) ? res.data.cursos : [];
      setCursos(lista);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setErrorMsg('Sesión expirada. Inicia sesión nuevamente.');
        navigate('/auth');
        return;
      }

      setErrorMsg('No se pudieron cargar los cursos.');
      setCursos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, [refrescar]);

  const hayCursos = Array.isArray(cursos) && cursos.length > 0;

  if (loading) return fallback || <p className='text-center text-gray-400'>Cargando cursos...</p>;
  if (errorMsg) return fallback || <p className='text-center text-red-400'>{errorMsg}</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
      className='bg-black text-white p-6 rounded-xl border border-white/20 shadow-xl flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto'
    >
      {/* 🧠 Encabezado con icono y título centrado */}
      <div className='flex flex-col items-center gap-2'>
        <BookOpenIcon className='h-12 w-12 text-white mb-2' />
        <h2 className='text-2xl font-serif font-bold tracking-wide'>Tus cursos asignados</h2>
      </div>

      {/* 📦 Estado vacío o lista de cursos */}
      {!hayCursos ? (
        <div className='flex flex-col items-center gap-2'>
          <ExclamationCircleIcon className='h-10 w-10 text-red-400' />
          <p className='text-lg font-medium text-white'>No hay cursos asignados aún.</p>
          <p className='text-sm text-white/60 max-w-md'>
            Puedes crear tus cursos desde el formulario superior. Una vez creados, aparecerán aquí.
          </p>
        </div>
      ) : (
        <ul className='space-y-3 w-full'>
          {cursos.map((curso) => (
            <li
              key={curso._id || curso.id}
              className='bg-white/10 hover:bg-white/20 transition duration-300 px-4 py-3 rounded-lg text-white/90 text-left shadow-sm hover:shadow-md'
            >
              <span className='font-semibold'>{curso.nombre}</span>
              {curso.seccion && <span className='text-white/60'> — Sección {curso.seccion}</span>}
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
};

export default CursosAsignados;
