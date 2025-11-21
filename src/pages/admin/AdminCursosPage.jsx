import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CursoFormAdmin from '../../components/admin/CursoFormAdmin';
import CursosTable from '../../components/admin/CursosTable';
import {
  createCursoAdmin,
  getCursosAdmin,
  updateCursoAdmin,
  deleteCursoAdmin,
} from '../../services/cursosService';

// 🧩 Componentes institucionales
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import Footer from '../../components/Footer';
import VideoFondoAdmin from '../../components/admin/VideoFondoAdmin';

const AdminCursosPage = () => {
  const [cursos, setCursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cursoEditando, setCursoEditando] = useState(null);

  const cargarCursos = async () => {
    setCargando(true);
    setError('');
    setMensaje('');
    try {
      const resultado = await getCursosAdmin();
      if (resultado.ok) {
        setCursos(resultado.cursos);
        console.log(`📦 Cursos cargados: ${resultado.cursos.length}`);
      } else {
        setError(resultado.msg || 'No se pudieron cargar los cursos.');
      }
    } catch (err) {
      console.error('❌ Error al cargar cursos:', err);
      setError('Error inesperado al cargar cursos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  const handleCrearCurso = async (datosCurso) => {
    try {
      const resultado = await createCursoAdmin(datosCurso);
      if (resultado.ok) {
        setMensaje('✅ Curso creado correctamente.');
        setError('');
        await cargarCursos();
      } else {
        setError(resultado.msg || 'No se pudo crear el curso.');
      }
    } catch (err) {
      console.error('❌ Error al crear curso:', err);
      setError('Error inesperado al crear curso.');
    }
  };

  const handleActualizarCurso = async (id, datosActualizados) => {
    try {
      const resultado = await updateCursoAdmin(id, datosActualizados);
      if (resultado.ok) {
        setMensaje('✏️ Curso actualizado correctamente.');
        setError('');
        setCursoEditando(null);
        await cargarCursos();
      } else {
        setError(resultado.msg || 'No se pudo actualizar el curso.');
      }
    } catch (err) {
      console.error('❌ Error al actualizar curso:', err);
      setError('Error inesperado al actualizar curso.');
    }
  };

  const handleEliminarCurso = async (id) => {
    try {
      const resultado = await deleteCursoAdmin(id);
      if (resultado.ok) {
        setMensaje('🗑️ Curso eliminado correctamente.');
        setError('');
        await cargarCursos();
      } else {
        setError(resultado.msg || 'No se pudo eliminar el curso.');
      }
    } catch (err) {
      console.error('❌ Error al eliminar curso:', err);
      setError('Error inesperado al eliminar curso.');
    }
  };

  if (cargando) {
    return (
      <div className='bg-black text-white p-6 text-center'>
        <p
          className='text-white/70 text-sm sm:text-base font-medium animate-pulse'
          aria-live='polite'
          role='status'
        >
          ⏳ Cargando gestión de cursos...
        </p>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen bg-[#0d0d0d] text-white'>
      <VideoFondoAdmin />
      <NavbarAdmin />

      <main className='relative z-10 w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 space-y-12 pt-24 pb-16'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-white font-bold tracking-tight drop-shadow-[0_0_6px_#00FFF7] text-2xl text-center'
        >
          Gestión de Cursos
        </motion.h1>

        <CursoFormAdmin
          cursoEditando={cursoEditando}
          onCrear={handleCrearCurso}
          onActualizar={handleActualizarCurso}
          onCancelar={() => setCursoEditando(null)}
        />

        {mensaje && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-green-400 text-sm sm:text-base font-medium text-center'
            aria-live='polite'
            role='alert'
          >
            {mensaje}
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-red-400 text-sm sm:text-base font-medium text-center'
            aria-live='assertive'
            role='alert'
          >
            {error}
          </motion.div>
        )}

        <CursosTable
          cursos={cursos}
          onActualizar={(curso) => setCursoEditando(curso)}
          onEliminar={handleEliminarCurso}
        />
      </main>

      <Footer />
    </div>
  );
};

export default AdminCursosPage;
