import { useState } from 'react';
import { motion } from 'framer-motion';

import useEntregasEstudiante from '@/hooks/useEntregasEstudiante';
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';
import SeccionEntregasEstudiante from '@/components/estudiante/SeccionEntregasEstudiante';
import EntregasForm from '@/components/estudiante/EntregasForm';

/**
 * Historial de entregas académicas del estudiante
 * Muestra entregas realizadas, con filtros por materia y lapso
 */
const HistorialEntregasEstudiante = () => {
  // ✅ destructuración correcta: el hook retorna "data"
  const { data: entregas, loading, error, refetch } = useEntregasEstudiante();

  const [filtroMateria, setFiltroMateria] = useState('');
  const [filtroLapso, setFiltroLapso] = useState('');
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  // Derivar materias y lapsos disponibles desde las entregas (defensivo)
  const materiasDisponibles = Array.isArray(entregas)
    ? [...new Set(entregas.map((e) => e.actividad?.materia).filter(Boolean))]
    : [];

  const lapsosDisponibles = Array.isArray(entregas)
    ? [...new Set(entregas.map((e) => e.actividad?.lapso).filter(Boolean))]
    : [];

  // 🔹 Filtrado defensivo
  const entregasFiltradas = Array.isArray(entregas)
    ? entregas.filter((e) => {
        const actividad = e.actividad || {};
        const coincideMateria = filtroMateria ? actividad.materia === filtroMateria : true;
        const coincideLapso = filtroLapso ? actividad.lapso === filtroLapso : true;
        const coincideSeleccion = actividadSeleccionada
          ? actividad.id === actividadSeleccionada.id
          : true;
        return coincideMateria && coincideLapso && coincideSeleccion;
      })
    : [];

  const limpiarFiltros = () => {
    setFiltroMateria('');
    setFiltroLapso('');
    setActividadSeleccionada(null);
  };

  return (
    <div className='min-h-screen flex flex-col bg-[#0d0d0d] text-white overflow-hidden font-[Orbitron] tracking-tight'>
      <VideoFondoEstudiante />
      <div className='relative z-10 flex-1'>
        <NavbarEstudiante />
        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'>
          {/* Encabezado institucional */}
          <header className='text-center space-y-2'>
            <h1 className='text-3xl font-bold text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]'>
              Historial de Entregas
            </h1>
            <p className='text-white/70 text-sm'>
              Aquí puedes revisar tus entregas académicas por materia y lapso.
            </p>
          </header>

          {/* Filtros académicos */}
          <div className='flex flex-wrap gap-4 justify-center items-center text-sm text-white'>
            <select
              value={filtroMateria}
              onChange={(e) => setFiltroMateria(e.target.value)}
              className='bg-black border border-white/30 px-3 py-2 rounded'
            >
              <option value=''>Todas las materias</option>
              {materiasDisponibles.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={filtroLapso}
              onChange={(e) => setFiltroLapso(e.target.value)}
              className='bg-black border border-white/30 px-3 py-2 rounded'
            >
              <option value=''>Todos los lapsos</option>
              {lapsosDisponibles.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <button
              onClick={limpiarFiltros}
              className='px-4 py-2 bg-[#00FFF7] text-black rounded hover:scale-105 hover:drop-shadow-[0_0_8px_#00FFF7] transition'
            >
              Limpiar filtros
            </button>
          </div>

          {/* Formulario de entrega */}
          {actividadSeleccionada && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <EntregasForm actividad={actividadSeleccionada} actualizarEntregas={refetch} />
            </motion.section>
          )}

          {/* Entregas realizadas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <SeccionEntregasEstudiante
              entregasFiltradas={entregasFiltradas}
              loadingEntregas={loading}
              error={error}
            />
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HistorialEntregasEstudiante;
