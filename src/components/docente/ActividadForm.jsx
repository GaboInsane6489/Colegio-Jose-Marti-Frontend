import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import {
  PencilSquareIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);

const ActividadForm = ({ claseId, onActividadCreada }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'tarea',
    fechaEntrega: '',
    ponderacion: 0,
    materia: '',
    lapso: '',
    recursos: [],
    cursoId: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState([]);

  const tipos = ['tarea', 'proyecto', 'examen', 'otro'];
  const materias = [
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
  const lapsos = ['Lapso 1', 'Lapso 2', 'Lapso 3'];

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const { data } = await axiosInstancia.get('/api/cursos/docente');
        setCursos(data.cursos || []);
      } catch (err) {
        console.error('❌ Error al cargar cursos del docente:', err.message);
        setCursos([]);
      }
    };
    cargarCursos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setErrorMsg = (msg) => {
    setError(msg);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const entrega = new Date(formData.fechaEntrega);
    entrega.setHours(0, 0, 0, 0);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!formData.titulo.trim()) return setErrorMsg('El título es obligatorio.');
    if (!formData.tipo.trim()) return setErrorMsg('El tipo de actividad es obligatorio.');
    if (!formData.materia.trim()) return setErrorMsg('La materia es obligatoria.');
    if (!formData.lapso.trim()) return setErrorMsg('El lapso académico es obligatorio.');
    if (isNaN(entrega.getTime()) || entrega < hoy)
      return setErrorMsg('La fecha de entrega no puede ser anterior al día actual.');
    if (formData.ponderacion < 0 || formData.ponderacion > 100)
      return setErrorMsg('La ponderación debe estar entre 0 y 100.');
    if (!esObjectIdValido(formData.cursoId)) return setErrorMsg('ID de curso inválido.');
    if (!esObjectIdValido(claseId)) return setErrorMsg('ID de clase inválido.');

    const payload = {
      ...formData,
      ponderacion: Number(formData.ponderacion),
      cursoId: formData.cursoId,
      claseId,
    };

    try {
      const { data } = await axiosInstancia.post('/api/actividades', payload);

      if (typeof onActividadCreada === 'function' && data?.actividad) {
        onActividadCreada(data.actividad);
      }

      setFormData({
        titulo: '',
        descripcion: '',
        tipo: 'tarea',
        fechaEntrega: '',
        ponderacion: 0,
        materia: '',
        lapso: '',
        recursos: [],
        cursoId: '',
      });
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al registrar la actividad.');
    } finally {
      setLoading(false);
    }
  };

  const campos = [
    { label: 'Título', name: 'titulo', type: 'text', icon: PencilSquareIcon },
    { label: 'Descripción', name: 'descripcion', type: 'textarea', icon: DocumentTextIcon },
    { label: 'Tipo', name: 'tipo', type: 'select', options: tipos, icon: Squares2X2Icon },
    { label: 'Fecha de entrega', name: 'fechaEntrega', type: 'date', icon: CalendarDaysIcon },
    {
      label: 'Ponderación (%)',
      name: 'ponderacion',
      type: 'number',
      min: 0,
      max: 100,
      icon: AdjustmentsHorizontalIcon,
    },
    { label: 'Materia', name: 'materia', type: 'select', options: materias, icon: BookOpenIcon },
    {
      label: 'Lapso académico',
      name: 'lapso',
      type: 'select',
      options: lapsos,
      icon: AcademicCapIcon,
    },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      className='bg-[#0d0d0d] text-white p-10 rounded-2xl shadow-2xl font-[Inter] space-y-8 border border-white/20 max-w-5xl mx-auto'
    >
      <div className='text-center space-y-2'>
        <Squares2X2Icon className='w-10 h-10 mx-auto text-white' />
        <h2 className='text-3xl font-bold tracking-wide'>Nueva Actividad</h2>
      </div>

      {error && <p className='text-center text-red-400 text-sm'>{error}</p>}

      <div className='space-y-2'>
        <label className='block text-sm font-medium flex items-center gap-2'>
          <BookOpenIcon className='w-5 h-5 text-white/70' />
          Curso asociado
        </label>
        <select
          name='cursoId'
          value={formData.cursoId}
          onChange={handleChange}
          className='w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white'
          required
        >
          <option value=''>Selecciona un curso</option>
          {cursos.map((curso) => (
            <option key={curso.id || curso._id} value={curso.id || curso._id}>
              {curso.nombre} ({curso.anio} - {curso.seccion})
            </option>
          ))}
        </select>
      </div>

      {campos.map(({ label, name, type, icon: Icon, ...rest }) => (
        <div key={name} className='space-y-2'>
          <label className='block text-sm font-medium flex items-center gap-2'>
            <Icon className='w-5 h-5 text-white/70' />
            {label}
          </label>

          {type === 'textarea' ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className='w-full bg-white text-black px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-white transition duration-200 ease-out'
              required
            />
          ) : type === 'select' ? (
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className='w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition duration-200 ease-out'
              required
            >
              <option value=''>Selecciona una opción</option>
              {rest.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className='w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition duration-200 ease-out'
              {...rest}
              required
            />
          )}
        </div>
      ))}

      <motion.div whileTap={{ scale: 0.97 }} className='pt-6 flex justify-center'>
        <button
          type='submit'
          disabled={loading}
          className='bg-[#0a0a0a] text-white border border-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition duration-200 ease-out hover:bg-white hover:text-black hover:border-black shadow-md hover:shadow-xl disabled:opacity-50'
        >
          <Squares2X2Icon className='w-5 h-5 text-white transition duration-200 ease-out' />
          {loading ? 'Creando...' : 'Crear Actividad'}
        </button>
      </motion.div>
    </motion.form>
  );
};

export default ActividadForm;
