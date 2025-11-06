import { useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { jwtDecode } from 'jwt-decode';

import {
  PencilSquareIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

/**
 * Formulario institucional para crear actividad académica
 */
const ActividadForm = ({ cursoId, claseId, onActividadCreada }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'tarea',
    fechaEntrega: '',
    ponderacion: 0,
    materia: '',
    lapso: '',
    recursos: [],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tipos = ['tarea', 'proyecto', 'examen', 'otro'];
  const materias = ['Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'];
  const lapsos = ['Lapso 1', 'Lapso 2', 'Lapso 3'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const hoy = new Date();
    const entrega = new Date(formData.fechaEntrega);
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No se encontró token de autenticación.');
      setLoading(false);
      return;
    }

    let docenteId;
    try {
      const decoded = jwtDecode(token);
      docenteId = decoded.id || decoded._id;
    } catch {
      setError('Token inválido o no contiene ID de usuario.');
      setLoading(false);
      return;
    }

    if (!formData.materia || !formData.lapso) {
      setError('La materia y el lapso son obligatorios.');
      setLoading(false);
      return;
    }

    if (entrega < hoy) {
      setError('La fecha de entrega no puede ser anterior al día actual.');
      setLoading(false);
      return;
    }

    if (formData.ponderacion < 0 || formData.ponderacion > 100) {
      setError('La ponderación debe estar entre 0 y 100.');
      setLoading(false);
      return;
    }

    if (!claseId) {
      setError('No se ha seleccionado una clase.');
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      cursoId,
      claseId,
      docenteId,
    };

    console.log('📤 Enviando actividad al backend:', payload);

    try {
      const { data } = await axiosInstancia.post('/api/actividades', payload);

      console.log('📥 Respuesta del backend:', data);

      if (typeof onActividadCreada === 'function' && data?.actividad) {
        onActividadCreada(data.actividad);
      } else {
        console.warn('No se recibió actividad válida del backend.');
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
      });
    } catch (err) {
      console.error('Error al crear actividad:', err);
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
    },
    {
      label: 'Descripción',
      name: 'descripcion',
      type: 'textarea',
      icon: DocumentTextIcon,
    },
    {
      label: 'Tipo',
      name: 'tipo',
      type: 'select',
      options: tipos,
      icon: Squares2X2Icon,
    },
    {
      label: 'Fecha de entrega',
      name: 'fechaEntrega',
      type: 'date',
      icon: CalendarDaysIcon,
    },
    {
      label: 'Ponderación (%)',
      name: 'ponderacion',
      type: 'number',
      min: 0,
      max: 100,
      icon: AdjustmentsHorizontalIcon,
    },
    {
      label: 'Materia',
      name: 'materia',
      type: 'select',
      options: materias,
      icon: BookOpenIcon,
    },
    {
      label: 'Lapso académico',
      name: 'lapso',
      type: 'select',
      options: lapsos,
      icon: AcademicCapIcon,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-black text-white p-8 rounded-xl shadow-lg font-[Inter] space-y-6 border border-white/20 backdrop-blur-md'
    >
      <h2 className='text-2xl font-semibold tracking-wide mb-2 flex items-center gap-2'>
        <Squares2X2Icon className='w-6 h-6 text-white/80' />
        Nueva Actividad
      </h2>

      {error && <p className='text-red-400 text-sm'>{error}</p>}

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
              className='w-full bg-white text-black px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-white'
              required
            />
          ) : type === 'select' ? (
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className='w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white'
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
              className='w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white'
              {...rest}
              required
            />
          )}
        </div>
      ))}

      <div className='pt-4'>
        <button
          type='submit'
          disabled={loading}
          className='bg-white text-black px-6 py-2 rounded-full transition font-semibold hover:bg-white/90 flex items-center gap-2 justify-center'
        >
          <Squares2X2Icon className='w-5 h-5 text-black' />
          {loading ? 'Creando...' : 'Crear Actividad'}
        </button>
      </div>
    </form>
  );
};

export default ActividadForm;
