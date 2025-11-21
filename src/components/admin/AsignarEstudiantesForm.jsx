import { useEffect, useState } from 'react';
import { getEstudiantes } from '../../services/usuariosService'; // ✅ centralización
import { assignEstudiantesToClase } from '../../services/clasesService';

/**
 * 👥 Formulario institucional para asignar estudiantes a una clase
 */
const AsignarEstudiantesForm = ({ claseId, onAsignacionExitosa }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarEstudiantes = async () => {
      try {
        const res = await getEstudiantes();
        if (res.ok) {
          setEstudiantes(res.estudiantes);
        } else {
          setError(res.msg || 'No se pudieron cargar los estudiantes.');
        }
      } catch (err) {
        console.error('❌ Error al cargar estudiantes:', err);
        setError('Error inesperado al cargar estudiantes.');
      }
    };
    cargarEstudiantes();
  }, []);

  const manejarSeleccion = (id) => {
    setSeleccionados((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  const manejarAsignacion = async (e) => {
    e.preventDefault();
    if (seleccionados.length === 0) {
      setError('⚠️ Debes seleccionar al menos un estudiante.');
      return;
    }

    setCargando(true);
    try {
      const res = await assignEstudiantesToClase(claseId, seleccionados);
      if (res.ok) {
        setMensaje('✅ Estudiantes asignados correctamente.');
        setSeleccionados([]);
        onAsignacionExitosa?.(res.clase); // callback opcional
      } else {
        setError(res.msg || 'No se pudo asignar estudiantes.');
      }
    } catch (err) {
      console.error('❌ Error al asignar estudiantes:', err);
      setError('Error inesperado al asignar estudiantes.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={manejarAsignacion} className='space-y-6'>
      <h3 className='text-base sm:text-lg md:text-xl font-semibold text-white'>
        👥 Asignar estudiantes a la clase
      </h3>

      {mensaje && (
        <p
          className='text-green-400 text-xs sm:text-sm text-center font-medium'
          role='status'
          aria-live='polite'
        >
          {mensaje}
        </p>
      )}

      {error && (
        <p
          className='text-red-400 text-xs sm:text-sm text-center font-medium'
          role='alert'
          aria-live='assertive'
        >
          {error}
        </p>
      )}

      <ul className='space-y-2'>
        {estudiantes.map((est) => (
          <li key={est._id}>
            <label className='flex items-center gap-2 text-xs sm:text-sm text-white'>
              <input
                type='checkbox'
                value={est._id}
                checked={seleccionados.includes(est._id)}
                onChange={() => manejarSeleccion(est._id)}
                className='h-4 w-4 rounded-sm bg-[#0f0f0f] border border-[#00FFF7]/40 text-[#00FFF7] focus:ring-[#00FFF7] focus:outline-none drop-shadow-[0_0_4px_#00FFF7]'
              />
              <span>
                {est.nombre} <span className='text-xs sm:text-sm text-white/60'>({est.email})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={cargando}
          className={`px-6 py-2 rounded-md font-semibold text-xs sm:text-sm md:text-base border transition ${
            cargando
              ? 'bg-gray-500 text-white cursor-not-allowed border-gray-500'
              : 'bg-black text-[#00FFF7] border-[#00FFF7] hover:brightness-125 hover:drop-shadow-[0_0_8px_#00FFF7]'
          }`}
        >
          {cargando ? 'Asignando...' : 'Asignar estudiantes'}
        </button>
      </div>
    </form>
  );
};

export default AsignarEstudiantesForm;
