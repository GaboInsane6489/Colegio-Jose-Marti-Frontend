import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// 🧭 Navegación
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante.jsx';
import Footer from '@/components/Footer.jsx';

// 🎥 Visuales
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante.jsx';

// 🧩 UI académica
import SeccionEntregasEstudiante from '@/components/estudiante/SeccionEntregasEstudiante.jsx';
import EntregasForm from '@/components/estudiante/EntregasForm.jsx';

/**
 * 📤 Vista institucional para gestionar entregas académicas del estudiante
 */
const Entregas = () => {
  const [actividades, setActividades] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [loadingActividades, setLoadingActividades] = useState(true);
  const [loadingEntregas, setLoadingEntregas] = useState(true);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [filtroMateria, setFiltroMateria] = useState('');
  const [filtroLapso, setFiltroLapso] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/estudiante/actividades`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('✅ Actividades recibidas:', res.data);
        setActividades(res.data.actividades || []);
      } catch (error) {
        console.error('❌ Error al cargar actividades:', error);
      } finally {
        setLoadingActividades(false);
      }
    };

    const fetchEntregas = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/estudiante/entregas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('✅ Entregas recibidas:', res.data);
        setEntregas(res.data.entregas || []);
      } catch (error) {
        console.error('❌ Error al cargar entregas:', error);
      } finally {
        setLoadingEntregas(false);
      }
    };

    fetchActividades();
    fetchEntregas();
  }, [token]);

  const materiasDisponibles = [...new Set(actividades.map((a) => a.materia))];
  const lapsosDisponibles = [...new Set(actividades.map((a) => a.lapso))];

  const entregasFiltradas = entregas.filter((e) => {
    const actividad = e.actividad;
    const coincideMateria = filtroMateria ? actividad?.materia === filtroMateria : true;
    const coincideLapso = filtroLapso ? actividad?.lapso === filtroLapso : true;
    const coincideSeleccion = actividadSeleccionada
      ? actividad?._id === actividadSeleccionada._id
      : true;
    return coincideMateria && coincideLapso && coincideSeleccion;
  });

  const limpiarFiltros = () => {
    setFiltroMateria('');
    setFiltroLapso('');
    setActividadSeleccionada(null);
  };

  return (
    <div className='min-h-screen flex flex-col bg-black text-white overflow-hidden'>
      <VideoFondoEstudiante />
      <div className='relative z-10 flex-1'>
        <NavbarEstudiante />
        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'>
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

          {/* Formulario de entrega */}
          {actividadSeleccionada && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <EntregasForm actividad={actividadSeleccionada} actualizarEntregas={setEntregas} />
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
              loadingEntregas={loadingEntregas}
            />
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Entregas;
