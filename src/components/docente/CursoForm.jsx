import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCursos from '@/hooks/useCursos';
import { getEstudiantes } from '@/services/usuariosService';
import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

/**
 * 📘 Formulario institucional para crear/editar cursos del docente
 * Adaptado a backend, services y hooks institucionales
 */
const CursoForm = ({ onCursoCreado }) => {
  const [nombre, setNombre] = useState('');
  const [anioAcademico, setAnioAcademico] = useState('');
  const [anioEstudiantil, setAnioEstudiantil] = useState('');
  const [seccion, setSeccion] = useState('');
  const [materia, setMateria] = useState('');
  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState([]);
  const [estudiantesDisponibles, setEstudiantesDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { createCurso, updateCurso } = useCursos('docente');
  const location = useLocation();
  const cursoEnEdicion = location.state?.curso || null;

  // ✅ Cargar estudiantes activos y validados
  useEffect(() => {
    const cargarEstudiantes = async () => {
      try {
        const res = await getEstudiantes();
        if (res?.ok && Array.isArray(res.estudiantes)) {
          setEstudiantesDisponibles(res.estudiantes);
        } else {
          console.error('❌ No se pudieron cargar estudiantes:', res?.msg);
        }
      } catch (err) {
        console.error('❌ Error al cargar estudiantes:', err?.message || err);
      }
    };
    cargarEstudiantes();
  }, []);

  // ✅ Poblar datos si estamos en edición
  useEffect(() => {
    if (!cursoEnEdicion || typeof cursoEnEdicion !== 'object') return;

    const {
      nombre = '',
      anioAcademico = '',
      anioEstudiantil = '',
      seccion = '',
      materias = [],
      estudiantes = [],
    } = cursoEnEdicion;

    setNombre(typeof nombre === 'string' ? nombre : '');
    setAnioAcademico(anioAcademico ? String(anioAcademico) : '');
    setAnioEstudiantil(anioEstudiantil ? String(anioEstudiantil) : '');
    setSeccion(typeof seccion === 'string' ? seccion : '');
    setMateria(Array.isArray(materias) && materias[0]?.nombre ? materias[0].nombre : '');
    setEstudiantesSeleccionados(
      Array.isArray(estudiantes)
        ? estudiantes
            .map((e) => {
              if (typeof e === 'object' && e) return e.id || e._id;
              if (typeof e === 'string') return e;
              return null;
            })
            .filter(Boolean)
        : []
    );
  }, [cursoEnEdicion]);

  const materiasDisponibles = [
    'Matemáticas',
    'Lengua',
    'Historia',
    'Ciencias Naturales',
    'Arte',
    'Física',
    'Química',
    'Biología',
    'Informática',
    'Literatura',
  ];

  const resetFormulario = () => {
    setNombre('');
    setAnioAcademico('');
    setAnioEstudiantil('');
    setSeccion('');
    setMateria('');
    setEstudiantesSeleccionados([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (
      !nombre.trim() ||
      !anioAcademico.trim() ||
      !anioEstudiantil.trim() ||
      !seccion.trim() ||
      !materia.trim()
    ) {
      const msg = 'Todos los campos son obligatorios.';
      setErrorMsg(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    if (estudiantesSeleccionados.length === 0) {
      const msg = 'Debes seleccionar al menos un estudiante.';
      setErrorMsg(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        nombre: nombre.trim(),
        anioAcademico: Number(anioAcademico),
        anioEstudiantil: Number(anioEstudiantil),
        seccion: seccion.trim(),
        materias: [{ nombre: materia.trim() }],
        estudiantes: estudiantesSeleccionados,
      };

      console.log('📤 Payload enviado:', payload);

      let cursoCreado;
      if (cursoEnEdicion?.id || cursoEnEdicion?._id) {
        const idCurso = cursoEnEdicion.id || cursoEnEdicion._id;
        cursoCreado = await updateCurso(idCurso, payload);
        toast.success('✅ Curso actualizado correctamente');
      } else {
        cursoCreado = await createCurso(payload);
        toast.success('✅ Curso creado correctamente con estudiantes asignados');
      }

      onCursoCreado?.(cursoCreado);
      resetFormulario();
    } catch (error) {
      const msg =
        error?.message ||
        error?.response?.data?.msg ||
        'No se pudo crear/actualizar el curso. Intenta nuevamente.';
      console.error('❌ Error en curso:', msg);
      setErrorMsg(msg);
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      className='bg-[#0d0d0d] p-8 rounded-2xl shadow-emerald-900 space-y-8 text-white max-w-6xl mx-auto border border-white/10'
    >
      <div className='text-center space-y-2'>
        <ClipboardDocumentListIcon className='h-10 w-10 mx-auto text-[#00FFF7]' />
        <h3 className='text-3xl font-bold tracking-wide'>
          {cursoEnEdicion ? 'Editar curso' : 'Crear nuevo curso'}
        </h3>
        <p className='text-sm text-gray-300 max-w-xl mx-auto'>
          Completa los campos académicos y asigna estudiantes al curso institucional.
        </p>
      </div>

      {errorMsg && <p className='text-center text-red-400 font-medium'>{errorMsg}</p>}

      {/* Campos académicos */}
      <div className='space-y-6'>
        <div className='text-center space-y-2'>
          <InformationCircleIcon className='h-6 w-6 mx-auto text-green-500' />
          <p className='text-sm text-white/80'>
            Los campos académicos definen la estructura del curso.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2'>
          <input
            type='text'
            placeholder='Nombre del curso'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className='px-4 py-2 rounded bg-black text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-out'
          />

          <select
            value={anioAcademico}
            onChange={(e) => setAnioAcademico(e.target.value)}
            required
            className='px-4 py-2 rounded bg-black text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-out'
          >
            <option value=''>Selecciona año académico</option>
            {['2025', '2026', '2027'].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            value={anioEstudiantil}
            onChange={(e) => setAnioEstudiantil(e.target.value)}
            required
            className='px-4 py-2 rounded bg-black text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-out'
          >
            <option value=''>Selecciona año estudiantil</option>
            {['1', '2', '3', '4', '5'].map((s) => (
              <option key={s} value={s}>
                {s}° año
              </option>
            ))}
          </select>

          <select
            value={seccion}
            onChange={(e) => setSeccion(e.target.value)}
            required
            className='px-4 py-2 rounded bg-black text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-out'
          >
            <option value=''>Selecciona sección</option>
            {['A', 'B'].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            required
            className='px-4 py-2 rounded bg-black text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-out'
          >
            <option value=''>Selecciona materia</option>
            {materiasDisponibles.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📋 Lista de estudiantes */}
      <div className='space-y-6'>
        <div className='text-center space-y-2'>
          <UserGroupIcon className='h-8 w-8 mx-auto text-[#00FFF7]' />
          <h4 className='text-lg font-semibold text-white'>Asignar estudiantes</h4>
          <p className='text-sm text-gray-400'>
            Selecciona los estudiantes que formarán parte del curso.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {(cursoEnEdicion?.estudiantes?.length > 0
            ? cursoEnEdicion.estudiantes
            : estudiantesDisponibles
          ).map((est) => {
            const id = est.id || est._id;
            const seleccionado = estudiantesSeleccionados.includes(id);
            return (
              <button
                type='button'
                key={id}
                onClick={() =>
                  setEstudiantesSeleccionados((prev) =>
                    seleccionado ? prev.filter((x) => x !== id) : [...prev, id]
                  )
                }
                className={`relative flex flex-col items-center justify-center text-center px-4 py-6 rounded-xl border transition-all duration-200 ease-out ${
                  seleccionado
                    ? 'bg-green-700 border-green-400 shadow-lg scale-[1.02]'
                    : 'bg-black border-white/20 hover:border-[#00FFF7] hover:scale-[1.01] hover:shadow-xl'
                }`}
              >
                <div className='absolute top-2 right-2'>
                  {seleccionado ? (
                    <div className='bg-green-500 rounded-full p-1'>
                      <CheckCircleIcon className='w-4 h-4 text-white' />
                    </div>
                  ) : (
                    <div className='bg-gray-700 rounded-full p-1 opacity-50'>
                      <UserGroupIcon className='w-4 h-4 text-white' />
                    </div>
                  )}
                </div>
                <UserGroupIcon className='h-10 w-10 text-[#00FFF7] mb-2' />
                <span className='font-semibold text-white'>{est.nombre}</span>
                <span className='text-sm text-white/60'>{est.email || est.correo}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.button
        type='submit'
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className='w-full bg-gradient-to-r from-[#00FFF7] to-[#00FF33] hover:opacity-90 text-black px-4 py-3 rounded-xl transition duration-200 ease-out disabled:opacity-50 font-semibold text-lg shadow-md hover:shadow-xl'
      >
        {loading ? 'Procesando...' : cursoEnEdicion ? 'Actualizar curso' : 'Crear curso'}
      </motion.button>
    </motion.form>
  );
};

export default CursoForm;
