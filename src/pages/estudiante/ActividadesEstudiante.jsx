import { useState } from 'react';
import { motion } from 'framer-motion';
import useActividadesEstudiante from '@/hooks/useActividadesEstudiante';

// 🎥 Visuales
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante.jsx';

// 🧭 Navegación
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante.jsx';
import Footer from '@/components/Footer.jsx';

// 🧩 UI académica
import SeccionActividadesEstudiante from '@/components/estudiante/SeccionActividadesEstudiante.jsx';

/**
 * 📚 Vista institucional para mostrar actividades asignadas al estudiante
 */
const ActividadesEstudiante = () => {
  const { actividades, loading, error } = useActividadesEstudiante();
  const [filtroMateria, setFiltroMateria] = useState('');
  const [filtroLapso, setFiltroLapso] = useState('');

  const materiasDisponibles = [...new Set(actividades.map((a) => a.materia))];
  const lapsosDisponibles = [...new Set(actividades.map((a) => a.lapso))];

  const actividadesFiltradas = actividades.filter((a) => {
    const coincideMateria = filtroMateria ? a.materia === filtroMateria : true;
    const coincideLapso = filtroLapso ? a.lapso === filtroLapso : true;
    return coincideMateria && coincideLapso;
  });

  const limpiarFiltros = () => {
    setFiltroMateria('');
    setFiltroLapso('');
  };

  return (
    <div className='min-h-screen flex flex-col bg-black text-white overflow-hidden'>
      <VideoFondoEstudiante />

      <div className='relative z-10 flex-1'>
        <NavbarEstudiante />

        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'>
          {/* Encabezado emocional */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='text-center'
          >
            <h1 className='text-3xl font-bold text-yellow-400'>Actividades Académicas</h1>
            <p className='mt-2 text-white/80 text-sm'>
              Aquí puedes consultar las actividades asignadas por tus docentes. Selecciona una para
              ver detalles o realizar tu entrega.
            </p>
          </motion.section>

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
              className='px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition'
            >
              Limpiar filtros
            </button>
          </div>

          {/* Sección de actividades */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <SeccionActividadesEstudiante
              actividadesFiltradas={actividadesFiltradas}
              loadingActividades={loading}
              onSeleccionarActividad={(actividad) => {
                console.log('Actividad seleccionada:', actividad);
              }}
            />
            {error && <p className='text-center text-red-400 mt-4'>{error}</p>}
          </motion.section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ActividadesEstudiante;
