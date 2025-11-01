import { useState, useEffect } from 'react';
import axios from 'axios';

import ActividadCard from '@/components/docente/ActividadCard.jsx';
import ActividadForm from '@/components/docente/ActividadForm.jsx';
import FiltrosActividades from '@/components/docente/FiltrosActividades.jsx';
import NavbarDocente from '@/components/docente/NavbarDocente.jsx';
import Footer from '@/components/Footer.jsx';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente.jsx';
import ToastFeedback from '@/components/ui/ToastFeedback.jsx';

import useActividades from '@/hooks/useActividades.js';
import isActividadValida from '@/utils/validadores/isActividadValida.js';

const API_URL = import.meta.env.VITE_API_URL?.trim() || 'http://localhost:3000';

const ActividadesPage = () => {
  const token = localStorage.getItem('token');
  const cursoId = '652f1a9b3c2e4f0012a4dabc';

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [toast, setToast] = useState(null);
  const [orden, setOrden] = useState('fechaAsc');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroMateria, setFiltroMateria] = useState('todos');
  const [filtroTipoTemp, setFiltroTipoTemp] = useState('todos');
  const [filtroEstadoTemp, setFiltroEstadoTemp] = useState('todos');
  const [filtroMateriaTemp, setFiltroMateriaTemp] = useState('todos');

  const [paginaActual, setPaginaActual] = useState(1);
  const [actividades, setActividades] = useState([]);
  const [actividadEditando, setActividadEditando] = useState(null);

  const actividadesPorPagina = 18;

  const {
    actividades: actividadesBackend,
    loading,
    error,
  } = useActividades(token, {
    cursoId,
    tipo: filtroTipo,
    estado: filtroEstado,
    materia: filtroMateria,
  });

  useEffect(() => {
    if (!token) {
      console.warn('⚠️ Token no definido en ActividadesPage');
    }
  }, [token]);

  useEffect(() => {
    if (Array.isArray(actividadesBackend)) {
      const limpias = actividadesBackend.filter(isActividadValida);
      setActividades(limpias);
    }
  }, [actividadesBackend]);

  const handleNuevaActividad = (nuevaActividad) => {
    const actividadFinal = {
      ...nuevaActividad,
      estado: nuevaActividad.estado || 'activa',
      _id: nuevaActividad._id || `temp-${Date.now()}`,
    };

    if (actividadEditando) {
      setActividades((prev) =>
        prev.map((act) => (act._id === actividadFinal._id ? actividadFinal : act))
      );
      setToast({ mensaje: '✏️ Actividad actualizada', tipo: 'success' });
    } else {
      setActividades((prev) => [actividadFinal, ...prev]);
      setToast({
        mensaje: '✅ Actividad creada correctamente',
        tipo: 'success',
      });
    }

    setActividadEditando(null);
    setMostrarFormulario(false);
  };

  const handleEliminarActividad = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/actividades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActividades((prev) => prev.filter((act) => act._id !== id));
      setToast({ mensaje: '🗑️ Actividad eliminada', tipo: 'success' });
    } catch (err) {
      console.error('❌ Error al eliminar:', err.message);
      setToast({ mensaje: '❌ No se pudo eliminar', tipo: 'error' });
    }
  };

  const handleNotificarActividad = async (id) => {
    try {
      await axios.post(
        `${API_URL}/api/actividades/${id}/notificar`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setActividades((prev) =>
        prev.map((act) => (act._id === id ? { ...act, notificada: true } : act))
      );
      setToast({ mensaje: '📣 Estudiantes notificados', tipo: 'success' });
    } catch (err) {
      console.error('❌ Error al notificar:', err.message);
      setToast({ mensaje: '❌ No se pudo notificar', tipo: 'error' });
    }
  };

  const handleEditarActividad = (actividad) => {
    setActividadEditando(actividad);
    setMostrarFormulario(true);
  };

  const actividadesOrdenadas = [...actividades].filter(isActividadValida).sort((a, b) => {
    switch (orden) {
      case 'fechaAsc':
        return new Date(a.fechaEntrega) - new Date(b.fechaEntrega);
      case 'fechaDesc':
        return new Date(b.fechaEntrega) - new Date(a.fechaEntrega);
      case 'ponderacionAsc':
        return (a.ponderacion || 0) - (b.ponderacion || 0);
      case 'ponderacionDesc':
        return (b.ponderacion || 0) - (a.ponderacion || 0);
      default:
        return 0;
    }
  });

  const actividadesFiltradas = actividadesOrdenadas.filter((act) => {
    if (!isActividadValida(act)) return false;

    const tipoMatch = filtroTipo === 'todos' || act.tipo === filtroTipo;
    const estadoMatch = filtroEstado === 'todos' || act.estado === filtroEstado;
    const materiaMatch = filtroMateria === 'todos' || act.materia === filtroMateria;

    return tipoMatch && estadoMatch && materiaMatch;
  });

  const totalPaginas = Math.ceil(actividadesFiltradas.length / actividadesPorPagina);
  const actividadesPaginadas = actividadesFiltradas.slice(
    (paginaActual - 1) * actividadesPorPagina,
    paginaActual * actividadesPorPagina
  );

  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
      <VideoFondoDocente />
      <div className='relative z-30'>
        <NavbarDocente />
      </div>

      <main className='relative z-20 px-6 py-24 max-w-6xl mx-auto space-y-10'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>📚 Actividades Académicas</h1>
          <p className='text-white/70 text-lg'>
            Crea, organiza y publica actividades para tus cursos. Puedes incluir fechas, recursos,
            materia y criterios de evaluación.
          </p>
        </div>

        <FiltrosActividades
          orden={orden}
          setOrden={setOrden}
          filtroTipo={filtroTipoTemp}
          setFiltroTipo={setFiltroTipoTemp}
          filtroEstado={filtroEstadoTemp}
          setFiltroEstado={setFiltroEstadoTemp}
          filtroMateria={filtroMateriaTemp}
          setFiltroMateria={setFiltroMateriaTemp}
        />

        <div className='text-center pt-4'>
          <button
            onClick={() => {
              setFiltroTipo(filtroTipoTemp);
              setFiltroEstado(filtroEstadoTemp);
              setFiltroMateria(filtroMateriaTemp);
              setPaginaActual(1); // Reinicia paginación
              setToast({ mensaje: '✅ Filtros aplicados', tipo: 'success' });
            }}
            className='bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-500 transition'
          >
            🔍 Aplicar filtros
          </button>
        </div>

        <div className='text-center'>
          <button
            onClick={() => {
              setMostrarFormulario((prev) => !prev);
              setActividadEditando(null);
            }}
            className='bg-black text-white px-6 py-2 rounded-full transition font-medium hover:text-white/90'
          >
            <span className='tracking-wide'>
              {mostrarFormulario ? '✖️ Cancelar' : '➕ Nueva Actividad'}
            </span>
          </button>
        </div>

        {mostrarFormulario && (
          <div className='bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20'>
            <ActividadForm
              cursoId={'652f1a9b3c2e4f0012a4dabc'}
              onActividadCreada={handleNuevaActividad}
              actividadInicial={actividadEditando}
            />
          </div>
        )}

        {loading ? (
          <p className='text-white/50 text-center'>⏳ Cargando actividades...</p>
        ) : error ? (
          <p className='text-red-400 text-center'>❌ {error}</p>
        ) : actividadesFiltradas.length === 0 ? (
          <div className='text-center text-white/60 space-y-4'>
            <p className='text-2xl'>🗂️ No hay actividades que coincidan</p>
            <p className='text-sm'>Ajusta los filtros o crea una nueva actividad.</p>
          </div>
        ) : (
          <>
            <div className='max-h-[80vh] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent rounded-md'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2'>
                {actividadesPaginadas.map((actividad, index) => {
                  if (!isActividadValida(actividad)) {
                    console.warn('⚠️ Actividad inválida detectada:', actividad);
                    return null;
                  }

                  const clave = `actividad-${actividad._id || actividad.id || index}`;

                  return (
                    <ActividadCard
                      key={clave}
                      actividad={actividad}
                      onEditar={handleEditarActividad}
                      onEliminar={handleEliminarActividad}
                      onNotificar={handleNotificarActividad}
                    />
                  );
                })}
              </div>
            </div>

            <div className='flex justify-center items-center gap-4 pt-6'>
              <button
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
                className='px-4 py-2 bg-white text-black rounded-full font-medium disabled:opacity-40'
              >
                ← Anterior
              </button>
              <span className='text-white/70 font-medium'>
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                disabled={paginaActual === totalPaginas}
                className='px-4 py-2 bg-white text-black rounded-full font-medium disabled:opacity-40'
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
      </main>

      <div className='relative z-20 mt-10'>
        <Footer />
      </div>

      {toast && (
        <ToastFeedback mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default ActividadesPage;
