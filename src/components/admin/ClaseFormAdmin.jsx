import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
  UserGroupIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';

/**
 * 🧾 Formulario institucional para crear clases académicas
 * Solo visible para administradores
 * 📌 Mejoras aplicadas:
 * - Validación robusta de campos obligatorios (incluye cursoId)
 * - Naming consistente (id, email, cursoId)
 * - Estética institucional (fondo negro, textos blancos jerarquizados, íconos fosforescentes)
 * - Accesibilidad ARIA en mensajes dinámicos
 */
const ClaseFormAdmin = ({ docentes = [], cursos = [], onCrear }) => {
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [docenteId, setDocenteId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!Array.isArray(docentes)) {
      console.warn("⚠️ Prop 'docentes' no es un array:", docentes);
    } else if (docentes.length === 0) {
      console.warn('📭 Lista de docentes vacía. Verifica el endpoint /usuarios?role=docente');
    }

    if (!Array.isArray(cursos)) {
      console.warn("⚠️ Prop 'cursos' no es un array:", cursos);
    } else if (cursos.length === 0) {
      console.warn('📭 Lista de cursos vacía. Verifica el endpoint /admin/cursos');
    }
  }, [docentes, cursos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !nombre.trim() ||
      !materia.trim() ||
      !docenteId ||
      !cursoId ||
      !dia ||
      !horaInicio ||
      !horaFin
    ) {
      setError('Todos los campos obligatorios deben estar completos.');
      return;
    }

    const nuevaClase = {
      nombre: nombre.trim(),
      materia: materia.trim(),
      docenteId,
      cursoId,
      horario: { dia, horaInicio, horaFin },
      descripcion: descripcion.trim(),
    };

    setError('');
    onCrear(nuevaClase);

    // Resetear formulario solo si creación fue exitosa
    setNombre('');
    setMateria('');
    setDocenteId('');
    setCursoId('');
    setDia('');
    setHoraInicio('');
    setHoraFin('');
    setDescripcion('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-gray-950/80 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-xl w-full max-w-4xl mx-auto space-y-8 hover:shadow-[#00FFF7]/30 transition'
      aria-label='Formulario de creación de clase'
    >
      <h3 className='text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-3 mb-6 drop-shadow-[0_0_6px_#00FFF7]'>
        <PlusIcon className='h-7 w-7 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
        Crear nueva clase
      </h3>

      {error && (
        <div
          role='alert'
          aria-live='assertive'
          className='bg-red-600 text-white px-4 py-2 rounded-md text-xs sm:text-sm text-center font-medium'
        >
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-gray-950/40 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-[#00FFF7]/30 transition'>
        {/* Nombre */}
        <div>
          <label
            htmlFor='nombre'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <ClipboardDocumentListIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Nombre de la clase *
          </label>
          <input
            id='nombre'
            type='text'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            placeholder='Lengua y Literatura'
            required
          />
        </div>

        {/* Materia */}
        <div>
          <label
            htmlFor='materia'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <AcademicCapIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Materia *
          </label>
          <input
            id='materia'
            type='text'
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            placeholder='Literatura Venezolana'
            required
          />
        </div>

        {/* Curso */}
        <div>
          <label
            htmlFor='curso'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <AcademicCapIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Curso asignado *
          </label>
          <select
            id='curso'
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          >
            <option value=''>Selecciona un curso</option>
            {Array.isArray(cursos) &&
              cursos.map((curso) => (
                <option key={curso._id || curso.id} value={curso._id || curso.id}>
                  {curso.nombre} ({curso.anioAcademico}° {curso.seccion})
                </option>
              ))}
          </select>
        </div>

        {/* Día */}
        <div>
          <label
            htmlFor='dia'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <CalendarIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Día *
          </label>
          <select
            id='dia'
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          >
            <option value=''>Selecciona un día</option>
            <option value='Lunes'>Lunes</option>
            <option value='Martes'>Martes</option>
            <option value='Miércoles'>Miércoles</option>
            <option value='Jueves'>Jueves</option>
            <option value='Viernes'>Viernes</option>
            <option value='Sábado'>Sábado</option>
          </select>
        </div>

        {/* Hora inicio */}
        <div>
          <label
            htmlFor='horaInicio'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <ClockIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Hora inicio *
          </label>
          <input
            id='horaInicio'
            type='time'
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          />
        </div>

        {/* Hora fin */}
        <div>
          <label
            htmlFor='horaFin'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <ClockIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Hora fin *
          </label>
          <input
            id='horaFin'
            type='time'
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          />
        </div>

        {/* Docente */}
        <div>
          <label
            htmlFor='docente'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <UserGroupIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Docente asignado *
          </label>
          <select
            id='docente'
            value={docenteId}
            onChange={(e) => setDocenteId(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7]'
            required
          >
            <option value=''>Selecciona un docente</option>
            {Array.isArray(docentes) &&
              docentes.map((docente) => (
                <option key={docente._id || docente.id} value={docente._id || docente.id}>
                  {docente.nombre} ({docente.email})
                </option>
              ))}
          </select>
        </div>

        {/* Descripción */}
        <div className='md:col-span-2'>
          <label
            htmlFor='descripcion'
            className='flex items-center gap-2 text-white font-semibold text-sm mb-2 drop-shadow-[0_0_6px_#00FFF7]'
          >
            <ClipboardDocumentListIcon className='h-5 w-5 text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Descripción (opcional)
          </label>
          <textarea
            id='descripcion'
            value={descripcion || ''}
            onChange={(e) => setDescripcion(e.target.value)}
            className='w-full bg-gray-900 text-white border border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7] hover:border-[#00FFF7] hover:shadow-[0_0_8px_#00FFF7] resize-none'
            placeholder='Clase de análisis literario y expresión oral'
            rows={3}
          />
        </div>
      </div>

      {/* Botón Crear clase */}
      <div className='flex justify-center mt-8'>
        <button
          type='submit'
          className='inline-flex items-center gap-2 bg-[#00FFF7]/20 text-white px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition duration-200 hover:bg-[#00FFF7]/40 hover:shadow-[0_0_8px_#00FFF7] hover:scale-105'
          aria-label='Crear nueva clase'
        >
          <CheckCircleIcon
            className='h-5 w-5 text-white drop-shadow-[0_0_4px_#00FFF7]'
            aria-hidden='true'
          />
          Crear clase
        </button>
      </div>
    </form>
  );
};

export default ClaseFormAdmin;
