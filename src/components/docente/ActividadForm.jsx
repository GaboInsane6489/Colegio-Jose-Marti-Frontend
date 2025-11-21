import { useState, useMemo } from 'react';
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
import useCursos from '@/hooks/useCursos';
import axiosInstancia from '@/services/axiosInstancia';

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { data: cursos = [], loading: loadingCursos, error: errorCursos } = useCursos('docente');

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

  // Fecha mínima local en formato YYYY-MM-DD para input date
  const hoyISO = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const y = hoy.getFullYear();
    const m = String(hoy.getMonth() + 1).padStart(2, '0');
    const d = String(hoy.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const setErrorMsg = (msg) => {
    setError(msg);
    setLoading(false);
  };

  const setFieldError = (name, msg) => setFieldErrors((prev) => ({ ...prev, [name]: msg }));

  const clearFieldError = (name) =>
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearFieldError(name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    const entrega = new Date(formData.fechaEntrega);
    entrega.setHours(0, 0, 0, 0);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!formData.titulo.trim()) errs.titulo = 'El título es obligatorio.';
    if (formData.titulo.trim().length > 120) errs.titulo = 'Máximo 120 caracteres.';
    if (!formData.tipo.trim()) errs.tipo = 'El tipo de actividad es obligatorio.';
    if (!formData.materia.trim()) errs.materia = 'La materia es obligatoria.';
    if (!formData.lapso.trim()) errs.lapso = 'El lapso académico es obligatorio.';
    if (isNaN(entrega.getTime())) errs.fechaEntrega = 'Selecciona una fecha válida.';
    else if (entrega < hoy) errs.fechaEntrega = 'La fecha no puede ser anterior a hoy.';
    if (formData.ponderacion === '' || formData.ponderacion === null)
      errs.ponderacion = 'La ponderación es obligatoria.';
    else if (Number(formData.ponderacion) < 0 || Number(formData.ponderacion) > 100)
      errs.ponderacion = 'Debe estar entre 0 y 100.';
    if (!esObjectIdValido(formData.cursoId)) errs.cursoId = 'Selecciona un curso válido.';
    if (claseId && !esObjectIdValido(claseId)) errs.claseId = 'ID de clase inválido.'; // ✅ solo valida si existe

    setFieldErrors(errs);
    return errs;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setFieldErrors({});

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      console.warn('🧪 Errores de validación:', errs);
      setError('Revisa los campos marcados en rojo.');
      setLoading(false);
      return;
    }

    const payload = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      tipo: formData.tipo,
      fechaEntrega: formData.fechaEntrega,
      ponderacion: Number(formData.ponderacion),
      materia: formData.materia,
      lapso: formData.lapso,
      recursos: Array.isArray(formData.recursos) ? formData.recursos : [],
      cursoId: formData.cursoId,
      ...(claseId ? { claseId } : {}), // ✅ solo se envía si existe
    };

    try {
      const { data } = await axiosInstancia.post('/actividades', payload);
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
    {
      label: 'Título',
      name: 'titulo',
      type: 'text',
      icon: PencilSquareIcon,
      maxLength: 120,
      placeholder: 'Ej. Ensayo sobre independencia',
    },
    {
      label: 'Descripción',
      name: 'descripcion',
      type: 'textarea',
      icon: DocumentTextIcon,
      maxLength: 1000,
      placeholder: 'Indicaciones, rúbrica y recursos',
    },
    { label: 'Tipo', name: 'tipo', type: 'select', options: tipos, icon: Squares2X2Icon },
    {
      label: 'Fecha de entrega',
      name: 'fechaEntrega',
      type: 'date',
      icon: CalendarDaysIcon,
      min: hoyISO,
    },
    {
      label: 'Ponderación (%)',
      name: 'ponderacion',
      type: 'number',
      min: 0,
      max: 100,
      step: 1,
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
      transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
      className='bg-black/80 backdrop-blur-md text-white px-8 py-10 rounded-3xl shadow-2xl 
             font-[Inter] space-y-8 border border-[#00FFF7]/30 max-w-5xl mx-auto
             transition-all duration-200 ease-out'
      noValidate
    >
      {/* Encabezado institucional premium */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/20 shadow-xl'
      >
        {/* Imagen institucional como fondo */}
        <img
          src='https://cdn.pixabay.com/photo/2020/03/11/23/24/lamp-post-4923527_1280.jpg'
          alt='Fondo institucional'
          className='w-full h-[320px] object-cover'
        />

        {/* Overlay fosforescente */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-center text-center space-y-3 px-6'>
          <Squares2X2Icon className='w-12 h-12 mx-auto text-[#00FFF7] drop-shadow-[0_0_8px_#00FFF7]' />
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_8px_#00FFF7]'>
            Nueva Actividad
          </h2>
          <p className='text-base text-white/70 leading-relaxed max-w-xl'>
            Completa los campos para crear una actividad académica.
          </p>
        </div>
      </motion.div>

      {/* Mensajes generales */}
      {error && (
        <p
          className='text-center text-red-400 text-sm font-medium'
          role='alert'
          aria-live='assertive'
        >
          {error}
        </p>
      )}
      {errorCursos && (
        <p
          className='text-center text-red-400 text-sm font-medium'
          role='alert'
          aria-live='assertive'
        >
          {errorCursos}
        </p>
      )}

      {/* Curso asociado */}
      <div className='space-y-3'>
        <div className='flex flex-col items-center text-center'>
          <BookOpenIcon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <label
            htmlFor='cursoId'
            className='text-sm font-semibold text-[#00FFF7] tracking-wide drop-shadow-[0_0_6px_#00FFF7]'
          >
            Curso asociado
          </label>
        </div>
        <select
          id='cursoId'
          name='cursoId'
          value={formData.cursoId}
          onChange={handleChange}
          disabled={loadingCursos}
          aria-invalid={!!fieldErrors.cursoId}
          aria-describedby={fieldErrors.cursoId ? 'cursoId-error' : undefined}
          className='w-full bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm 
               focus:outline-none focus:ring-2 focus:ring-[#00FFF7] transition duration-200 ease-out 
               border border-white/20 hover:border-[#00FFF7] disabled:opacity-60'
          required
        >
          <option value=''>{loadingCursos ? 'Cargando cursos...' : 'Selecciona un curso'}</option>
          {!loadingCursos &&
            cursos.map((curso) => {
              const id = curso._id || curso.id;
              if (!esObjectIdValido(id)) return null;
              return (
                <option key={id} value={id}>
                  {curso.nombre} ({curso.anioAcademico} - {curso.seccion})
                </option>
              );
            })}
        </select>
        {fieldErrors.cursoId && (
          <p id='cursoId-error' className='text-xs text-red-400'>
            {fieldErrors.cursoId}
          </p>
        )}
      </div>

      {/* Campos dinámicos */}
      {campos.map(({ label, name, type, icon: Icon, placeholder, ...rest }) => {
        const errId = `${name}-error`;
        const hasErr = !!fieldErrors[name];
        return (
          <div key={name} className='space-y-3'>
            {/* Encabezado con ícono institucional */}
            <div className='flex flex-col items-center text-center'>
              <Icon className='w-6 h-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
              <label
                htmlFor={name}
                className='text-sm font-semibold text-[#00FFF7] tracking-wide drop-shadow-[0_0_6px_#00FFF7]'
              >
                {label}
              </label>
            </div>

            {/* Tipos de campo */}
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                maxLength={rest.maxLength}
                placeholder={placeholder}
                aria-invalid={hasErr}
                aria-describedby={hasErr ? errId : undefined}
                className='w-full bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl resize-none text-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#00FFF7] transition duration-200 ease-out 
                     border border-white/20 hover:border-[#00FFF7]'
                required
              />
            ) : type === 'select' ? (
              <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                aria-invalid={hasErr}
                aria-describedby={hasErr ? errId : undefined}
                className='w-full bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#00FFF7] transition duration-200 ease-out 
                     border border-white/20 hover:border-[#00FFF7]'
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
              <div className='relative'>
                <input
                  id={name}
                  type={name === 'fechaEntrega' ? 'date' : type} // fuerza el calendario en fechaEntrega
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  aria-invalid={hasErr}
                  aria-describedby={hasErr ? errId : undefined}
                  className='w-full bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm 
                       focus:outline-none focus:ring-2 focus:ring-[#00FFF7] transition duration-200 ease-out 
                       border border-white/20 hover:border-[#00FFF7] pr-10'
                  {...rest}
                  required
                />
                {/* Ícono institucional dentro del input */}
                {name === 'fechaEntrega' && (
                  <Icon className='absolute right-3 top-2.5 w-5 h-5 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] pointer-events-none' />
                )}
              </div>
            )}

            {/* Errores */}
            {hasErr && (
              <p id={errId} className='text-xs text-red-400'>
                {fieldErrors[name]}
              </p>
            )}

            {/* Mensaje especial para fechaEntrega */}
            {name === 'fechaEntrega' && (
              <p className='text-xs text-white/60'>La fecha mínima permitida es {hoyISO}.</p>
            )}
          </div>
        );
      })}

      {/* Botón de envío */}
      <motion.div whileTap={{ scale: 0.95 }} className='pt-6 flex justify-center'>
        <motion.button
          whileHover={{ scale: 1.08, y: -3, rotate: 0.5 }}
          whileTap={{ scale: 0.95 }}
          type='submit'
          disabled={loading}
          className='bg-[#00FFF7] text-white px-10 py-4 rounded-3xl font-bold text-base tracking-wide
               flex items-center gap-3 transition-all duration-200 ease-out
               hover:drop-shadow-[0_0_20px_#00FFF7] active:drop-shadow-[0_0_12px_#00FFF7]
               disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Squares2X2Icon className='w-6 h-6 text-black drop-shadow-[0_0_6px_#00FFF7]' />
          {loading ? 'Creando...' : 'Crear Actividad'}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ActividadForm;
