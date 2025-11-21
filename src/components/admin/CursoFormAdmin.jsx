import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  AcademicCapIcon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import { createCursoAdmin } from '@/services/cursosService';
import { getEstudiantes } from '@/services/usuariosService';

const CursoFormAdmin = ({
  cursoEditando = null,
  onCrear = createCursoAdmin,
  onActualizar,
  onCancelar,
}) => {
  const [nombre, setNombre] = useState('');
  const [anioAcademico, setAnioAcademico] = useState('');
  const [anioEstudiantil, setAnioEstudiantil] = useState('');
  const [seccion, setSeccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estudiantes, setEstudiantes] = useState([]); // ✅ multi‑select visual
  const [listaEstudiantes, setListaEstudiantes] = useState([]); // lista cargada desde backend
  const [error, setError] = useState('');

  // Prellenar campos si hay curso en edición
  useEffect(() => {
    if (cursoEditando) {
      setNombre(cursoEditando.nombre || '');
      setAnioAcademico(cursoEditando.anioAcademico || '');
      setAnioEstudiantil(cursoEditando.anioEstudiantil || '');
      setSeccion(cursoEditando.seccion || '');
      setDescripcion(cursoEditando.descripcion || '');
      setEstudiantes(cursoEditando.estudiantes?.map((e) => e._id || e.id) || []);
    }
  }, [cursoEditando]);

  // Cargar estudiantes activos
  useEffect(() => {
    const cargarEstudiantes = async () => {
      const resultado = await getEstudiantes();
      if (resultado.ok) {
        setListaEstudiantes(resultado.estudiantes);
      } else {
        setError(resultado.msg || 'No se pudieron cargar los estudiantes.');
      }
    };
    cargarEstudiantes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !anioAcademico || !anioEstudiantil || !seccion.trim()) {
      setError('Todos los campos obligatorios deben estar completos.');
      return;
    }

    if (nombre.trim().length < 2) {
      setError('El nombre del curso debe tener al menos 2 caracteres.');
      return;
    }

    const anioAcadNum = Number(anioAcademico);
    if (isNaN(anioAcadNum) || anioAcadNum < 2000 || anioAcadNum > 2100) {
      setError('El año académico debe estar entre 2000 y 2100.');
      return;
    }

    const anioEstNum = Number(anioEstudiantil);
    if (isNaN(anioEstNum) || anioEstNum < 1 || anioEstNum > 6) {
      setError('El año estudiantil debe estar entre 1 y 6.');
      return;
    }

    const datosCurso = {
      nombre: nombre.trim(),
      anioAcademico: anioAcadNum,
      anioEstudiantil: anioEstNum,
      seccion: seccion.trim(),
      descripcion: descripcion.trim(),
      materias: [],
      estudiantes, // ✅ ahora se envían estudiantes seleccionados
    };

    try {
      if (cursoEditando) {
        await onActualizar(cursoEditando._id || cursoEditando.id, datosCurso);
      } else {
        await onCrear(datosCurso);
        // Resetear formulario si fue creación
        setNombre('');
        setAnioAcademico('');
        setAnioEstudiantil('');
        setSeccion('');
        setDescripcion('');
        setEstudiantes([]);
      }
      setError('');
    } catch (err) {
      setError(err.message || 'Error al guardar curso');
    }
  };

  // Generar opciones de año académico entre 2000 y 2100
  const opcionesAnioAcademico = Array.from({ length: 101 }, (_, i) => 2000 + i);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='bg-[#0d0d0d] border border-white/10 rounded-2xl p-10 shadow-2xl w-full max-w-4xl mx-auto space-y-8'
      aria-label={
        cursoEditando ? 'Formulario de edición de curso' : 'Formulario de creación de curso'
      }
    >
      <div className='flex flex-col items-center gap-3'>
        <PlusIcon className='h-10 w-10 text-[#00FFF7] drop-shadow-[0_0_8px_#00FFF7]' />
        <h3 className='text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_6px_#00FFF7] text-center'>
          {cursoEditando ? 'Editar curso' : 'Crear nuevo curso'}
        </h3>
      </div>

      {error && (
        <motion.div
          role='alert'
          aria-live='assertive'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='bg-red-600 text-white px-4 py-2 rounded-md text-sm text-center font-medium'
        >
          {error}
        </motion.div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Nombre */}
        <div>
          <label
            htmlFor='nombre'
            className='text-white font-semibold text-sm mb-2 flex items-center gap-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <AcademicCapIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Nombre del curso *
          </label>
          <input
            id='nombre'
            type='text'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            placeholder='Matemáticas'
            required
          />
        </div>

        {/* Año académico */}
        <div>
          <label
            htmlFor='anioAcademico'
            className='text-white font-semibold text-sm mb-2 flex items-center gap-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <CalendarIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Año académico *
          </label>
          <select
            id='anioAcademico'
            value={anioAcademico}
            onChange={(e) => setAnioAcademico(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          >
            <option value=''>Seleccione año académico</option>
            {opcionesAnioAcademico.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>

        {/* Año estudiantil */}
        <div>
          <label
            htmlFor='anioEstudiantil'
            className='text-white font-semibold text-sm mb-2 flex items-center gap-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <UserGroupIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Año estudiantil *
          </label>
          <select
            id='anioEstudiantil'
            value={anioEstudiantil}
            onChange={(e) => setAnioEstudiantil(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          >
            <option value=''>Seleccione año estudiantil</option>
            {[1, 2, 3, 4, 5, 6].map((anio) => (
              <option key={anio} value={anio}>
                {anio}° año
              </option>
            ))}
          </select>
        </div>

        {/* Sección */}
        <div>
          <label
            htmlFor='seccion'
            className='text-white font-semibold text-sm mb-2 flex items-center gap-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <UserGroupIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Sección *
          </label>
          <select
            id='seccion'
            value={seccion}
            onChange={(e) => setSeccion(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          >
            <option value=''>Seleccione sección</option>
            <option value='A'>A</option>
            <option value='B'>B</option>
          </select>
        </div>

        {/* Descripción */}
        <div className='md:col-span-2'>
          <label
            htmlFor='descripcion'
            className='text-white font-semibold text-sm mb-2 block drop-shadow-[0_0_6px_#00FFF7]'
          >
            Descripción (opcional)
          </label>
          <textarea
            id='descripcion'
            value={descripcion || ''} // asegura que nunca sea undefined
            onChange={(e) => setDescripcion(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7] resize-none'
            placeholder='Curso de matemáticas básicas con enfoque en álgebra y geometría'
            rows={3}
          />
        </div>

        {/* Estudiantes - versión visual con ícono diferencial */}
        <div className='md:col-span-2'>
          <label className='text-white text-sm font-semibold mb-3 block tracking-wide drop-shadow-[0_0_6px_#00FFF7]'>
            Asignar estudiantes (opcional)
          </label>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {listaEstudiantes.map((est) => {
              const id = est._id || est.id;
              const seleccionado = estudiantes.includes(id);
              return (
                <div
                  key={id}
                  onClick={() =>
                    setEstudiantes((prev) =>
                      seleccionado ? prev.filter((e) => e !== id) : [...prev, id]
                    )
                  }
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition duration-200
            ${
              seleccionado
                ? 'bg-[#00FFF7]/30 border-[#00FFF7] shadow-[0_0_12px_#00FFF7]'
                : 'bg-gray-900 border-white/30 hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            }`}
                >
                  <UserGroupIcon
                    className={`h-7 w-7 ${
                      seleccionado
                        ? 'text-[#00FFF7] drop-shadow-[0_0_8px_#00FFF7]'
                        : 'text-white/60 hover:text-white drop-shadow-[0_0_4px_#00FFF7]'
                    }`}
                  />
                  <div className='flex-1'>
                    <p className='text-white font-semibold drop-shadow-[0_0_4px_#00FFF7]'>
                      {est.nombre}
                    </p>
                    <p className='text-xs text-white/80'>{est.email}</p>
                  </div>
                  {/* Ícono de estado en lugar de checkbox */}
                  <UserGroupIcon
                    className={`h-6 w-6 ${
                      seleccionado
                        ? 'text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]'
                        : 'text-white/40'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botones centrados */}
      <div className='flex justify-center mt-8 gap-4'>
        <motion.button
          type='submit'
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className='inline-flex items-center gap-2 bg-[#00FFF7] text-white px-8 py-3 rounded-full font-semibold text-base transition duration-200 hover:drop-shadow-[0_0_12px_#00FFF7] shadow-md'
          aria-label={cursoEditando ? 'Terminar edición de curso' : 'Crear nuevo curso'}
        >
          <CheckCircleIcon className='h-6 w-6 text-white drop-shadow-[0_0_6px_#00FFF7]' />
          {cursoEditando ? 'Terminar edición' : 'Crear curso'}
        </motion.button>

        {cursoEditando && (
          <button
            type='button'
            onClick={onCancelar}
            className='text-sm text-white underline hover:text-[#00FFF7] transition'
          >
            Cancelar
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default CursoFormAdmin;
