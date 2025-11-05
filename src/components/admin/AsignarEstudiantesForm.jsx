import { useEffect, useState } from 'react';
import { obtenerEstudiantes, asignarEstudiantesAClase } from '../../services/clasesService';

/**
 * 👥 Formulario institucional para asignar estudiantes a una clase
 */
const AsignarEstudiantesForm = ({ claseId, onAsignacionExitosa }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarEstudiantes = async () => {
      const res = await obtenerEstudiantes();
      if (res.ok) {
        setEstudiantes(res.estudiantes);
      } else {
        setMensaje(res.msg);
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
      setMensaje('⚠️ Debes seleccionar al menos un estudiante.');
      return;
    }

    setCargando(true);
    const res = await asignarEstudiantesAClase(claseId, seleccionados);
    setCargando(false);

    if (res.ok) {
      setMensaje('✅ Estudiantes asignados correctamente.');
      setSeleccionados([]);
      onAsignacionExitosa?.(res.clase); // callback opcional
    } else {
      setMensaje(res.msg);
    }
  };

  return (
    <form onSubmit={manejarAsignacion} className='space-y-6'>
      <h3 className='text-xl font-semibold'>👥 Asignar estudiantes a la clase</h3>

      {mensaje && <p className='text-sm text-center text-green-400'>{mensaje}</p>}

      <ul className='space-y-2'>
        {estudiantes.map((est) => (
          <li key={est._id}>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                value={est._id}
                checked={seleccionados.includes(est._id)}
                onChange={() => manejarSeleccion(est._id)}
                className='accent-blue-600'
              />
              <span>
                {est.nombre} <span className='text-sm text-gray-400'>({est.email})</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={cargando}
          className='bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition'
        >
          {cargando ? 'Asignando...' : 'Asignar estudiantes'}
        </button>
      </div>
    </form>
  );
};

export default AsignarEstudiantesForm;
