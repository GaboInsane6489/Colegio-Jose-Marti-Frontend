import { useEffect, useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import ActividadCard from '@/components/docente/ActividadCard';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

// 🎥 Visuales y navegación
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';

/**
 * 📋 Vista principal del estudiante para ver actividades asignadas
 */
const DashboardActividadesEstudiante = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const cargarActividades = async () => {
      try {
        const { data } = await axiosInstancia.post('/api/actividades/estudiante');
        setActividades(data.actividades || []);
        setErrorMsg('');
      } catch (error) {
        console.error('❌ Error al cargar actividades:', error.message);
        setErrorMsg('No se pudieron cargar tus actividades.');
        setActividades([]);
      } finally {
        setLoading(false);
      }
    };

    cargarActividades();
  }, []);

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      <VideoFondoEstudiante />
      <NavbarEstudiante />

      <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 relative z-10'>
        <header className='text-center space-y-2'>
          <h1 className='text-3xl font-bold text-yellow-400'>Tus Actividades Académicas</h1>
          <p className='text-white/70 text-sm'>
            Aquí verás todas las actividades asignadas en tus cursos.
          </p>
        </header>

        {loading ? (
          <p className='text-center text-white/60 flex items-center justify-center gap-2'>
            <ArrowPathIcon className='w-5 h-5 animate-spin' />
            Cargando actividades...
          </p>
        ) : errorMsg ? (
          <div className='text-center text-red-400 space-y-2'>
            <p>{errorMsg}</p>
            <p className='text-sm text-white/50'>
              Intenta recargar la página o verifica tu conexión.
            </p>
          </div>
        ) : actividades.length === 0 ? (
          <p className='text-center text-white/50'>No tienes actividades asignadas por ahora.</p>
        ) : (
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {actividades.map((actividad) => (
              <ActividadCard
                key={actividad._id || actividad.id}
                actividad={actividad}
                modo='estudiante'
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DashboardActividadesEstudiante;
