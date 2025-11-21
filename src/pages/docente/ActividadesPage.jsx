import { useState, useEffect, useMemo } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
  MegaphoneIcon,
  FunnelIcon,
  PlusCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  FolderOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import ActividadCard from '@/components/docente/ActividadCard.jsx';
import ActividadForm from '@/components/docente/ActividadForm.jsx';
import FiltrosActividades from '@/components/docente/FiltrosActividades.jsx';
import NavbarDocente from '@/components/docente/NavbarDocente.jsx';
import Footer from '@/components/Footer.jsx';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente.jsx';
import ToastFeedback from '@/components/ui/ToastFeedback.jsx';

import useActividades from '@/hooks/useActividades.js';
import isActividadValida from '@/utils/validadores/isActividadValida.js';
import { deleteActividadDocente } from '@/services/actividadesService.js';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 📄 Página institucional de actividades del docente
 * Alineada a hooks/services: useActividades('docente'), deleteActividadDocente, notificación
 */
const ActividadesPage = () => {
  const [cursoId, setCursoId] = useState(null);
  const [claseId, setClaseId] = useState(null);

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

  const filtrosActividades = useMemo(
    () => ({
      cursoId: cursoId || undefined,
      claseId: claseId || undefined,
      tipo: filtroTipo !== 'todos' ? filtroTipo : undefined,
      estado: filtroEstado !== 'todos' ? filtroEstado : undefined,
      materia: filtroMateria !== 'todos' ? filtroMateria : undefined,
    }),
    [cursoId, claseId, filtroTipo, filtroEstado, filtroMateria]
  );

  const {
    data: actividadesBackend,
    loading,
    error,
    refetch,
    setData: setDataBackend,
  } = useActividades(filtrosActividades, 'docente'); // ✅ rol explícito

  useEffect(() => {
    if (Array.isArray(actividadesBackend)) {
      const limpias = actividadesBackend.filter(isActividadValida);
      setActividades(limpias);
    } else {
      setActividades([]);
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
        prev.map((act) =>
          act._id === actividadFinal._id || act.id === actividadFinal._id ? actividadFinal : act
        )
      );
      setDataBackend((prev = []) =>
        (prev || []).map((act) =>
          act._id === actividadFinal._id || act.id === actividadFinal._id ? actividadFinal : act
        )
      );
      setToast({
        mensaje: (
          <span className='inline-flex items-center gap-2'>
            <CheckCircleIcon className='w-5 h-5 text-green-400' />
            Actividad actualizada
          </span>
        ),
        tipo: 'success',
      });
    } else {
      setActividades((prev) => [actividadFinal, ...prev]);
      setDataBackend((prev = []) => [actividadFinal, ...(prev || [])]);
      setToast({
        mensaje: (
          <span className='inline-flex items-center gap-2'>
            <ClipboardDocumentListIcon className='w-5 h-5 text-[#00FFF7]' />
            Actividad creada correctamente
          </span>
        ),
        tipo: 'success',
      });
    }

    setActividadEditando(null);
    setMostrarFormulario(false);
  };

  const handleEliminarActividad = async (id) => {
    try {
      await deleteActividadDocente(id);
      setActividades((prev) => prev.filter((act) => act._id !== id && act.id !== id));
      setDataBackend((prev = []) => (prev || []).filter((act) => act._id !== id && act.id !== id));
      setToast({
        mensaje: (
          <span className='inline-flex items-center gap-2'>
            <TrashIcon className='w-5 h-5 text-red-400' />
            Actividad eliminada
          </span>
        ),
        tipo: 'success',
      });
    } catch (err) {
      console.error('❌ Error al eliminar:', err?.response?.data?.msg || err.message);
      setToast({
        mensaje: (
          <span className='inline-flex items-center gap-2'>
            <ExclamationCircleIcon className='w-5 h-5 text-red-400' />
            No se pudo eliminar
          </span>
        ),
        tipo: 'error',
      });
    }
  };

  const handleNotificarActividad = async (id) => {
    try {
      await axiosInstancia.post(`/actividades/${id}/notificar`);
      setActividades((prev) =>
        prev.map((act) => (act._id === id || act.id === id ? { ...act, notificada: true } : act))
      );
      setDataBackend((prev = []) =>
        (prev || []).map((act) =>
          act._id === id || act.id === id ? { ...act, notificada: true } : act
        )
      );
      setToast({
        mensaje: (
          <span className='inline-flex items-center gap-2'>
            <MegaphoneIcon className='w-5 h-5 text-[#00FFF7]' />
            Estudiantes notificados
          </span>
        ),
        tipo: 'success',
      });
    } catch (err) {
      console.error('❌ Error al notificar:', err?.response?.data?.msg || err.message);
      setToast({
        mensaje: (
          <span className='inline-flex items-center gap-2'>
            <ExclamationCircleIcon className='w-5 h-5 text-red-400' />
            No se pudo notificar
          </span>
        ),
        tipo: 'error',
      });
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
    <div className='relative min-h-screen text-white overflow-hidden bg-black'>
      <VideoFondoDocente />
      <div className='absolute inset-0 bg-black/40 z-10 pointer-events-none' />

      <div className='relative z-30 drop-shadow-[0_0_12px_#00FFF7]'>
        <NavbarDocente />
      </div>

      <main className='relative z-20 px-6 py-24 max-w-6xl mx-auto space-y-12'>
        {/* 🧠 Encabezado institucional */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4 inline-flex items-center justify-center gap-2 drop-shadow-[0_0_6px_#00FFF7]'>
            <ClipboardDocumentListIcon className='w-6 h-6 text-[#00FFF7]' />
            Actividades Académicas
          </h1>
          <p className='text-white/80 text-lg max-w-2xl mx-auto'>
            Crea, organiza y publica actividades para tus cursos. Puedes incluir fechas, recursos,
            materia y criterios de evaluación.
          </p>
        </div>

        {/* 🎛️ Filtros institucionales */}
        <div className='bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10'>
          <FiltrosActividades
            orden={orden}
            setOrden={setOrden}
            filtroTipo={filtroTipoTemp}
            setFiltroTipo={setFiltroTipoTemp}
            filtroEstado={filtroEstadoTemp}
            setFiltroEstado={setFiltroEstadoTemp}
            filtroMateria={filtroMateriaTemp}
            setFiltroMateria={setFiltroMateriaTemp}
            cursoId={cursoId}
            setCursoId={setCursoId}
          />

          <div className='text-center pt-4'>
            <button
              onClick={() => {
                setFiltroTipo(filtroTipoTemp);
                setFiltroEstado(filtroEstadoTemp);
                setFiltroMateria(filtroMateriaTemp);
                setPaginaActual(1);
                setToast({ mensaje: 'Filtros aplicados', tipo: 'success' });
                refetch();
              }}
              className='inline-flex items-center gap-2 bg-gradient-to-r from-[#00FFF7] to-[#C580FF] text-black px-5 py-2 rounded-full font-medium hover:opacity-90 transition'
            >
              <FunnelIcon className='w-5 h-5' />
              Aplicar filtros
            </button>
          </div>
        </div>

        {/* ➕ Botón de nueva actividad */}
        <div className='text-center'>
          <button
            onClick={() => {
              setMostrarFormulario((prev) => !prev);
              setActividadEditando(null);
            }}
            className='inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full transition font-medium hover:text-white/90 border border-white/20'
          >
            {mostrarFormulario ? (
              <>
                <XCircleIcon className='w-5 h-5' />
                Cancelar
              </>
            ) : (
              <>
                <PlusCircleIcon className='w-5 h-5' />
                Nueva Actividad
              </>
            )}
          </button>
        </div>

        {/* 📝 Formulario de actividad */}
        {mostrarFormulario && (
          <div className='bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20'>
            <ActividadForm
              cursoId={cursoId}
              claseId={claseId}
              onActividadCreada={handleNuevaActividad}
              actividadInicial={actividadEditando}
            />
          </div>
        )}

        {/* 📦 Renderizado de actividades */}
        {loading ? (
          <p className='text-white/50 text-center inline-flex items-center gap-2 justify-center'>
            <ArrowPathIcon className='w-5 h-5 animate-spin' />
            Cargando actividades...
          </p>
        ) : error ? (
          <p className='text-red-400 text-center'>Error: {error}</p>
        ) : actividadesFiltradas.length === 0 ? (
          <div className='text-center text-white/60 space-y-4'>
            <p className='text-2xl inline-flex items-center gap-2 justify-center'>
              <FolderOpenIcon className='w-6 h-6' />
              No hay actividades que coincidan
            </p>
            <p className='text-sm'>Ajusta los filtros o crea una nueva actividad.</p>
          </div>
        ) : (
          <>
            <div className='max-h-[80vh] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-[#00FFF7] scrollbar-track-transparent rounded-md'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2'>
                {actividadesPaginadas.map((actividad, index) => {
                  if (!isActividadValida(actividad)) return null;
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

            {/* 📄 Paginación */}
            <div className='flex justify-center items-center gap-4 pt-6'>
              <button
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
                className='inline-flex items-center gap-2 px-4 py-2 bg-[#C580FF] text-white rounded-full font-medium disabled:opacity-40'
              >
                <ChevronLeftIcon className='w-5 h-5' />
                Anterior
              </button>
              <span className='text-white/70 font-medium'>
                Página {paginaActual} de {totalPaginas}
              </span>
              <button
                onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                disabled={paginaActual === totalPaginas}
                className='inline-flex items-center gap-2 px-4 py-2 bg-[#C580FF] text-white rounded-full font-medium disabled:opacity-40'
              >
                Siguiente
                <ChevronRightIcon className='w-5 h-5' />
              </button>
            </div>
          </>
        )}
      </main>

      {/* 🧭 Footer institucional */}
      <div className='relative z-20 mt-10'>
        <Footer />
      </div>

      {/* 🔔 Feedback institucional */}
      {toast && (
        <ToastFeedback mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default ActividadesPage;
