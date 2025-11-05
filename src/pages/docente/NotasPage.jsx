import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotas from '@/hooks/useNotas.js';
import { exportNotasCSV } from '@/utils/exportadores/useExportNotas.js';

import NavbarDocente from '@/components/docente/NavbarDocente.jsx';
import Footer from '@/components/Footer.jsx';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente.jsx';

import EncabezadoNotas from '@/components/docente/EncabezadoNotas.jsx';
import FiltrosNotas from '@/components/docente/FiltrosNotas.jsx';
import AccionesNotas from '@/components/docente/AccionesNotas.jsx';
import ListaNotas from '@/components/docente/ListaNotas.jsx';
import ResumenEstudiante from '@/components/docente/ResumenEstudiante.jsx';
import ResumenPorActividad from '@/components/docente/ResumenPorActividad.jsx';
import ToastFeedback from '@/components/ui/ToastFeedback.jsx';
import NotaForm from '@/components/docente/NotaForm.jsx';

const NotasPage = () => {
  const navigate = useNavigate();
  const [evaluando, setEvaluando] = useState(true);
  const [accesoPermitido, setAccesoPermitido] = useState(false);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const role =
    localStorage.getItem('userRole') ||
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('userRole='))
      ?.split('=')[1];

  useEffect(() => {
    if (token && role === 'docente') {
      setAccesoPermitido(true);
    } else {
      console.warn('⚠️ Sesión inválida o rol incorrecto. Redirigiendo.');
      navigate('/auth', { replace: true });
    }

    setEvaluando(false);
  }, [navigate, token, role]);

  const cursoId = '652f1a9b3c2e4f0012a4dabc';

  const [filtroMateria, setFiltroMateria] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroEstudiante, setFiltroEstudiante] = useState('todos');
  const [filtroActividad, setFiltroActividad] = useState('');
  const [filtroNotaMin, setFiltroNotaMin] = useState('');
  const [filtroNotaMax, setFiltroNotaMax] = useState('');

  const [filtroMateriaTemp, setFiltroMateriaTemp] = useState('todos');
  const [filtroEstadoTemp, setFiltroEstadoTemp] = useState('todos');
  const [filtroEstudianteTemp, setFiltroEstudianteTemp] = useState('todos');
  const [filtroActividadTemp, setFiltroActividadTemp] = useState('');
  const [filtroNotaMinTemp, setFiltroNotaMinTemp] = useState('');
  const [filtroNotaMaxTemp, setFiltroNotaMaxTemp] = useState('');

  const filtros = useMemo(
    () => ({
      materia: filtroMateria,
      estado: filtroEstado,
      estudianteId: filtroEstudiante,
      actividad: filtroActividad,
      notaMin: filtroNotaMin,
      notaMax: filtroNotaMax,
    }),
    [filtroMateria, filtroEstado, filtroEstudiante, filtroActividad, filtroNotaMin, filtroNotaMax]
  );

  const { entregas, loading, error } = useNotas(cursoId, filtros);

  const [notas, setNotas] = useState([]);
  const [notaEditando, setNotaEditando] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (Array.isArray(entregas)) {
      setNotas(entregas);
    } else {
      setNotas([]);
    }
  }, [entregas]);

  if (evaluando) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-black text-white'>
        Verificando sesión docente...
      </main>
    );
  }

  if (!accesoPermitido) {
    return null;
  }

  const notasFiltradas = Array.isArray(notas)
    ? notas.filter((nota) => {
        const materiaMatch = filtroMateria === 'todos' || nota.materia === filtroMateria;
        const estadoMatch = filtroEstado === 'todos' || nota.estado === filtroEstado;
        const estudianteMatch =
          filtroEstudiante === 'todos' ||
          nota.estudianteId?._id === filtroEstudiante ||
          nota.estudianteId === filtroEstudiante;
        const actividadMatch =
          !filtroActividad ||
          nota.actividadId?.titulo?.toLowerCase().includes(filtroActividad.toLowerCase());
        const notaMatch =
          (!filtroNotaMin || nota.calificacion >= parseFloat(filtroNotaMin)) &&
          (!filtroNotaMax || nota.calificacion <= parseFloat(filtroNotaMax));

        return materiaMatch && estadoMatch && estudianteMatch && actividadMatch && notaMatch;
      })
    : [];

  const estudiantesUnicos = [
    ...new Map(
      notasFiltradas
        .filter((n) => n.estudianteId && n.estudianteId._id)
        .map((n) => [n.estudianteId._id, n.estudianteId])
    ).values(),
  ];

  const actividadesUnicas = [
    ...new Map(
      notasFiltradas
        .filter((n) => n.actividadId && n.actividadId._id)
        .map((n) => [n.actividadId._id, n.actividadId])
    ).values(),
  ];

  const aplicarFiltros = () => {
    setFiltroMateria(filtroMateriaTemp);
    setFiltroEstado(filtroEstadoTemp);
    setFiltroEstudiante(filtroEstudianteTemp);
    setFiltroActividad(filtroActividadTemp);
    setFiltroNotaMin(filtroNotaMinTemp);
    setFiltroNotaMax(filtroNotaMaxTemp);
    setToast({ mensaje: 'Filtros aplicados', tipo: 'success' });
  };

  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      <VideoFondoDocente />
      <div className='relative z-30'>
        <NavbarDocente />
      </div>

      <main className='relative z-20 px-4 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto space-y-12'>
        <EncabezadoNotas />

        <FiltrosNotas
          filtroMateria={filtroMateriaTemp}
          setFiltroMateria={setFiltroMateriaTemp}
          filtroEstado={filtroEstadoTemp}
          setFiltroEstado={setFiltroEstadoTemp}
          filtroEstudiante={filtroEstudianteTemp}
          setFiltroEstudiante={setFiltroEstudianteTemp}
          filtroActividad={filtroActividadTemp}
          setFiltroActividad={setFiltroActividadTemp}
          filtroNotaMin={filtroNotaMinTemp}
          setFiltroNotaMin={setFiltroNotaMinTemp}
          filtroNotaMax={filtroNotaMaxTemp}
          setFiltroNotaMax={setFiltroNotaMaxTemp}
        />

        <AccionesNotas
          onAplicarFiltros={aplicarFiltros}
          onExportar={() => exportNotasCSV(notasFiltradas)}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6'>
          {notasFiltradas.length > 0 ? (
            <ListaNotas
              notas={notasFiltradas}
              loading={loading}
              error={error}
              onEdit={(actualizada) => {
                setNotas((prev) => prev.map((n) => (n._id === actualizada._id ? actualizada : n)));
                setToast({ mensaje: 'Nota actualizada', tipo: 'success' });
              }}
            />
          ) : (
            <p className='text-center text-white/70 italic col-span-full'>
              No hay entregas registradas para este curso.
            </p>
          )}
        </div>

        {estudiantesUnicos.length > 0 && (
          <section className='pt-12 space-y-6'>
            <h2 className='text-2xl font-bold text-center flex justify-center items-center gap-2'>
              <span className='text-pink-400'>🎓</span>
              Resumen por estudiante
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {estudiantesUnicos.map((est) => (
                <ResumenEstudiante key={est._id} estudiante={est} entregas={notasFiltradas} />
              ))}
            </div>
          </section>
        )}

        {actividadesUnicas.length > 0 && (
          <section className='pt-12 space-y-6'>
            <h2 className='text-2xl font-bold text-center flex justify-center items-center gap-2'>
              <span className='text-yellow-400'>📚</span>
              Resumen por actividad
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {actividadesUnicas.map((act) => (
                <ResumenPorActividad key={act._id} actividad={act} entregas={notasFiltradas} />
              ))}
            </div>
          </section>
        )}
      </main>

      <div className='relative z-20 mt-10'>
        <Footer />
      </div>

      {toast && (
        <ToastFeedback mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />
      )}

      {notaEditando && (
        <NotaForm
          entrega={notaEditando}
          onClose={() => setNotaEditando(null)}
          onEdit={(actualizada) => {
            setNotas((prev) => prev.map((n) => (n._id === actualizada._id ? actualizada : n)));
            setNotaEditando(null);
            setToast({ mensaje: 'Nota actualizada', tipo: 'success' });
          }}
        />
      )}
    </div>
  );
};

export default NotasPage;
