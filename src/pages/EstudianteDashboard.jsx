import { useState } from 'react';
import { motion } from 'framer-motion';
import useActividadesEstudiante from '@/hooks/useActividadesEstudiante';

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
 * Carga clases y actividades asignadas por el docente
 */
const EstudianteDashboard = () => {
  const [filtroMateria, setFiltroMateria] = useState('todos');
  const [filtroLapso, setFiltroLapso] = useState('todos');

  const materias = ['Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'];
  const lapsos = ['Lapso 1', 'Lapso 2', 'Lapso 3'];

  const { actividades, loading, error } = useActividadesEstudiante();

  const normalizar = (valor) => (typeof valor === 'string' ? valor.trim().toLowerCase() : '');

  const actividadesFiltradas = actividades.filter((a) => {
    const materiaMatch =
      filtroMateria === 'todos' || normalizar(a.materia) === normalizar(filtroMateria);
    const lapsoMatch = filtroLapso === 'todos' || normalizar(a.lapso) === normalizar(filtroLapso);
    return materiaMatch && lapsoMatch;
  });

  const tareasPendientes = actividadesFiltradas.filter((a) => a.estado === 'activa');
  const tareasRevisadas = actividadesFiltradas.filter((a) => a.estado === 'revisado');

  const promedio =
    tareasRevisadas.reduce((acc, a) => acc + (a.calificacion || 0), 0) /
    Math.max(tareasRevisadas.length, 1);

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
            <SeccionClases clases={actividadesFiltradas} loading={loading} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <PanelResumenEstudiante
              promedio={promedio}
              tareasPendientes={tareasPendientes}
              loadingEntregas={loading}
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
              entregasFiltradas={actividadesFiltradas}
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
