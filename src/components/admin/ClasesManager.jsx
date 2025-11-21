import { useEffect, useState } from 'react';
import ClaseFormAdmin from './ClaseFormAdmin';
import ClasesTable from './ClasesTable';
import {
  createClase,
  getClasesAdmin,
  updateClase,
  deleteClase,
} from '../../services/clasesService';
import { getDocentes } from '../../services/usuariosService';
import { getCursosAdmin } from '../../services/cursosService';

const ClasesManager = ({ navigate }) => {
  const [docentes, setDocentes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // 🧠 Carga inicial de datos
  const cargarDatos = async () => {
    setCargando(true);
    setError('');
    setMensaje('');

    try {
      const resultadoDocentes = await getDocentes();
      if (resultadoDocentes.ok && Array.isArray(resultadoDocentes.docentes)) {
        setDocentes(resultadoDocentes.docentes);
        console.log(`📚 Docentes cargados: ${resultadoDocentes.docentes.length}`);
      } else {
        setError(resultadoDocentes.msg || 'No se pudieron cargar los docentes.');
        setDocentes([]);
      }

      const resultadoCursos = await getCursosAdmin();
      if (resultadoCursos.ok && Array.isArray(resultadoCursos.cursos)) {
        setCursos(resultadoCursos.cursos);
        console.log(`📘 Cursos cargados: ${resultadoCursos.cursos.length}`);
      } else {
        setError(resultadoCursos.msg || 'No se pudieron cargar los cursos.');
        setCursos([]);
      }

      const resultadoClases = await getClasesAdmin();
      if (resultadoClases.ok && Array.isArray(resultadoClases.clases)) {
        setClases(resultadoClases.clases);
        console.log(`📦 Clases cargadas: ${resultadoClases.clases.length}`);
      } else {
        setError(resultadoClases.msg || 'No se pudieron cargar las clases.');
        setClases([]); // evita undefined
      }
    } catch (err) {
      console.error('❌ Error al cargar datos:', err);
      setError('Error inesperado al cargar datos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Crear clase
  const handleCrearClase = async (datosClase) => {
    try {
      const resultado = await createClase(datosClase);
      if (resultado.ok) {
        setMensaje('✅ Clase creada correctamente.');
        await cargarDatos();
      } else {
        setError(resultado.msg || 'No se pudo crear la clase.');
      }
    } catch (err) {
      console.error('❌ Error al crear clase:', err);
      setError('Error inesperado al crear clase.');
    }
  };

  // ✏️ Actualizar clase
  const handleActualizarClase = async (id, datosActualizados) => {
    try {
      const resultado = await updateClase(id, datosActualizados);
      if (resultado.ok) {
        setMensaje('✏️ Clase actualizada correctamente.');
        await cargarDatos();
      } else {
        setError(resultado.msg || 'No se pudo actualizar la clase.');
      }
    } catch (err) {
      console.error('❌ Error al actualizar clase:', err);
      setError('Error inesperado al actualizar clase.');
    }
  };

  // Eliminar clase
  const handleEliminarClase = async (id) => {
    try {
      const resultado = await deleteClase(id);
      if (resultado.ok) {
        setMensaje('🗑️ Clase eliminada correctamente.');
        await cargarDatos();
      } else {
        setError(resultado.msg || 'No se pudo eliminar la clase.');
      }
    } catch (err) {
      console.error('❌ Error al eliminar clase:', err);
      setError('Error inesperado al eliminar clase.');
    }
  };

  if (cargando) {
    return (
      <div className='bg-black text-white p-6 text-center'>
        <div className='flex flex-col items-center gap-3' role='status' aria-live='polite'>
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00FFF7]' />
          <p className='text-white/70 text-sm sm:text-base font-medium animate-pulse'>
            ⏳ Cargando gestión de clases...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
      <ClaseFormAdmin docentes={docentes} cursos={cursos} onCrear={handleCrearClase} />

      {mensaje && (
        <div
          className='bg-green-900/40 text-green-400 px-4 py-2 rounded-md text-sm sm:text-base font-medium text-center shadow-md'
          aria-live='polite'
          role='alert'
        >
          {mensaje}
        </div>
      )}
      {error && (
        <div
          className='bg-red-900/40 text-red-400 px-4 py-2 rounded-md text-sm sm:text-base font-medium text-center shadow-md'
          aria-live='assertive'
          role='alert'
        >
          {error}
        </div>
      )}

      <ClasesTable
        clases={clases}
        navigate={navigate}
        onActualizar={handleActualizarClase}
        onEliminar={handleEliminarClase}
      />
    </section>
  );
};

export default ClasesManager;
