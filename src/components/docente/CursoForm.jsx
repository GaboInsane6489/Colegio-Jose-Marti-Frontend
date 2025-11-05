import { useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

/**
 * Formulario institucional para que el docente cree un nuevo curso
 */
const CursoForm = ({ onCursoCreado }) => {
  const [nombre, setNombre] = useState('');
  const [grado, setGrado] = useState('');
  const [seccion, setSeccion] = useState('');
  const [materia, setMateria] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const materiasDisponibles = ['Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'];
  const gradosDisponibles = [
    '1er grado',
    '2do grado',
    '3er grado',
    '4to grado',
    '5to grado',
    '6to grado',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await axiosInstancia.post('/api/docente/cursos', {
        nombre,
        grado,
        seccion,
        materias: [materia],
      });

      if (res.data?.curso) {
        onCursoCreado?.(res.data.curso);
        setNombre('');
        setGrado('');
        setSeccion('');
        setMateria('');
      }
    } catch (error) {
      console.error('❌ Error al crear curso:', error.response?.data || error.message);
      setErrorMsg('No se pudo crear el curso. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
      className='bg-[#1c1c1c] p-6 rounded-xl shadow-xl space-y-5 text-white max-w-2xl mx-auto'
    >
      <div className='text-center'>
        <ClipboardDocumentIcon className='h-10 w-10 mx-auto text-white mb-2' />
        <h3 className='text-2xl font-serif font-bold tracking-wide'>Crear nuevo curso</h3>
      </div>

      {errorMsg && <p className='text-center text-red-400 font-medium'>{errorMsg}</p>}

      <input
        type='text'
        placeholder='Nombre del curso'
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className='w-full px-4 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600'
      />

      <select
        value={grado}
        onChange={(e) => setGrado(e.target.value)}
        required
        className='w-full px-4 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600'
      >
        <option value=''>Selecciona grado</option>
        {gradosDisponibles.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <input
        type='text'
        placeholder='Sección (ej. 1A, 2B)'
        value={seccion}
        onChange={(e) => setSeccion(e.target.value)}
        required
        className='w-full px-4 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600'
      />

      <select
        value={materia}
        onChange={(e) => setMateria(e.target.value)}
        required
        className='w-full px-4 py-2 rounded bg-black text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600'
      >
        <option value=''>Selecciona materia</option>
        {materiasDisponibles.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300 disabled:opacity-50'
      >
        {loading ? 'Creando...' : 'Crear curso'}
      </button>
    </motion.form>
  );
};

export default CursoForm;
