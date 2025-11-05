import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

/**
 * 🧾 Formulario institucional para crear clases académicas
 * Solo visible para administradores
 */
const ClaseFormAdmin = ({ docentes = [], onCrear }) => {
  const [nombre, setNombre] = useState('');
  const [docenteId, setDocenteId] = useState('');
  const [horario, setHorario] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!Array.isArray(docentes)) {
      console.warn("⚠️ Prop 'docentes' no es un array:", docentes);
    } else if (docentes.length === 0) {
      console.warn('📭 Lista de docentes vacía. Verifica el endpoint /api/usuarios?role=docente');
    } else {
      console.log(`📚 Docentes disponibles: ${docentes.length}`);
    }
  }, [docentes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !docenteId || !horario.trim()) {
      setError('Todos los campos obligatorios deben estar completos.');
      return;
    }

    const nuevaClase = {
      nombre: nombre.trim(),
      docenteId,
      horario: horario.trim(),
      descripcion: descripcion.trim(),
    };

    console.log('📡 Enviando clase al backend:', nuevaClase);
    setError('');
    onCrear(nuevaClase);

    setNombre('');
    setDocenteId('');
    setHorario('');
    setDescripcion('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-black border border-white rounded-xl p-6 shadow-lg w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
    >
      <h3 className='text-lg font-semibold text-white flex items-center gap-2 mb-6'>
        <PlusIcon className='h-5 w-5 text-white' />
        Crear nueva clase
      </h3>

      {error && (
        <div className='bg-red-600 text-white px-4 py-2 rounded-md text-sm text-center mb-6'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Nombre */}
        <div>
          <label htmlFor='nombre' className='block text-sm text-white mb-1'>
            Nombre de la clase *
          </label>
          <input
            id='nombre'
            type='text'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white rounded-md p-3 text-sm'
            placeholder='Lengua y Literatura'
            required
          />
        </div>

        {/* Horario */}
        <div>
          <label htmlFor='horario' className='block text-sm text-white mb-1'>
            Horario *
          </label>
          <input
            id='horario'
            type='text'
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white rounded-md p-3 text-sm'
            placeholder='Martes 10:00am'
            required
          />
        </div>

        {/* Docente */}
        <div className='md:col-span-2'>
          <label htmlFor='docente' className='block text-sm text-white mb-1'>
            Docente asignado *
          </label>
          <select
            id='docente'
            value={docenteId}
            onChange={(e) => setDocenteId(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white rounded-md p-3 text-sm'
            required
          >
            <option value=''>Selecciona un docente</option>
            {Array.isArray(docentes) &&
              docentes.map((docente) => (
                <option key={docente._id} value={docente._id}>
                  {docente.nombre} ({docente.email})
                </option>
              ))}
          </select>
        </div>

        {/* Descripción */}
        <div className='md:col-span-2'>
          <label htmlFor='descripcion' className='block text-sm text-white mb-1'>
            Descripción (opcional)
          </label>
          <textarea
            id='descripcion'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white rounded-md p-3 text-sm'
            placeholder='Clase de análisis literario y expresión oral'
            rows={3}
          />
        </div>
      </div>

      <div className='flex justify-end mt-8'>
        <button
          type='submit'
          className='inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition duration-200'
        >
          <CheckCircleIcon className='h-5 w-5' />
          Crear clase
        </button>
      </div>
    </form>
  );
};

export default ClaseFormAdmin;
