import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { motion } from 'framer-motion';

// 🎥 Visuales
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';

// 🧭 Navegación
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';

// 🧩 UI académica
import EncabezadoDashboard from '@/components/estudiante/EncabezadoDashboard';
import SeccionClases from '@/components/estudiante/SeccionClases';
import PanelResumenEstudiante from '@/components/estudiante/PanelResumenEstudiante';
import FiltrosEstudiante from '@/components/estudiante/FiltrosEstudiante';

// 📋 Utilidades
import { exportNotasCSV } from '@/utils/exportadores/useExportNotas';

/**
 * 🧠 Dashboard institucional del estudiante
 * Carga clases y entregas sin revalidación redundante.
 * La sesión ya fue verificada por App.jsx.
 */
const EstudianteDashboard = () => {
  const [clases, setClases] = useState([]);
  const [entregas, setEntregas] = useState([]);

  const [loadingClases, setLoadingClases] = useState(true);
  const [loadingEntregas, setLoadingEntregas] = useState(true);

  const [filtroMateria, setFiltroMateria] = useState('todos');
  const [filtroLapso, setFiltroLapso] = useState('todos');

  const materias = ['Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'];
  const lapsos = ['Lapso 1', 'Lapso 2', 'Lapso 3'];

  const normalizar = (valor) => (typeof valor === 'string' ? valor.trim().toLowerCase() : '');

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const res = await axiosInstancia.get('/api/estudiante/clases');
        setClases(res.data.clases || []);
      } catch (error) {
        console.error('❌ Error al cargar clases:', error);
      } finally {
        setLoadingClases(false);
      }
    };

    const fetchEntregas = async () => {
      try {
        const res = await axiosInstancia.get('/api/estudiante/entregas');
        setEntregas(res.data.entregas || []);
      } catch (error) {
        console.error('❌ Error al cargar entregas:', error);
      } finally {
        setLoadingEntregas(false);
      }
    };

    fetchClases();
    fetchEntregas();
  }, []);

  const entregasFiltradas = entregas.filter((e) => {
    const materia = e.materia || e.actividad?.materia || '';
    const lapso = e.lapso || e.actividad?.lapso || '';

    const materiaMatch =
      filtroMateria === 'todos' || normalizar(materia) === normalizar(filtroMateria);

    const lapsoMatch = filtroLapso === 'todos' || normalizar(lapso) === normalizar(filtroLapso);

    return materiaMatch && lapsoMatch;
  });

  const tareasPendientes = entregasFiltradas.filter((e) => e.estado === 'pendiente');
  const entregasRevisadas = entregasFiltradas.filter((e) => e.estado === 'revisado');
  const promedio =
    entregasRevisadas.reduce((acc, e) => acc + (e.calificacion || 0), 0) /
    Math.max(entregasRevisadas.length, 1);

  return (
    <div className='min-h-screen flex flex-col bg-black text-white overflow-hidden'>
      <VideoFondoEstudiante />
      <div className='relative z-10 flex-1'>
        <NavbarEstudiante />
        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <EncabezadoDashboard />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <SeccionClases clases={clases} loading={loadingClases} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <PanelResumenEstudiante
              promedio={promedio}
              tareasPendientes={tareasPendientes}
              loadingEntregas={loadingEntregas}
            />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <FiltrosEstudiante
              filtroMateria={filtroMateria}
              setFiltroMateria={setFiltroMateria}
              filtroLapso={filtroLapso}
              setFiltroLapso={setFiltroLapso}
              materias={materias}
              lapsos={lapsos}
              entregasFiltradas={entregasFiltradas}
              exportNotasCSV={exportNotasCSV}
            />
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default EstudianteDashboard;
