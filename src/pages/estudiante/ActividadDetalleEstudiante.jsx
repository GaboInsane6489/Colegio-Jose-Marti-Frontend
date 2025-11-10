import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { ArrowPathIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';

import FormularioEntrega from '@/components/estudiante/FormularioEntrega';
import EntregaCard from '@/components/estudiante/EntregaCard';

/**
 * 📄 Vista detallada de una actividad académica + entrega del estudiante
 */
const ActividadDetalleEstudiante = () => {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [entrega, setEntrega] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const res = await axiosInstancia.get(`/api/estudiante/actividad/${id}`);
        setActividad(res.data.actividad || null);
        setEntrega(res.data.entrega || null);
        setErrorMsg('');
      } catch (error) {
        console.error('❌ Error al cargar actividad:', error.message);
        setErrorMsg('No se pudo cargar la actividad.');
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
  }, [id]);

  const handleEntregaExitosa = (nuevaEntrega) => {
    console.log('📦 Entrega registrada exitosamente:', nuevaEntrega);
    setEntrega(nuevaEntrega);
  };

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      <VideoFondoEstudiante />
      <NavbarEstudiante />

      <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 relative z-10'>
        {loading ? (
          <p className='text-center text-white/60 flex items-center justify-center gap-2'>
            <ArrowPathIcon className='w-5 h-5 animate-spin' />
            Cargando actividad...
          </p>
        ) : errorMsg ? (
          <div className='text-center text-red-400 space-y-2'>
            <p>{errorMsg}</p>
            <p className='text-sm text-white/50'>
              Verifica que el enlace sea correcto o vuelve al listado de actividades.
            </p>
          </div>
        ) : actividad ? (
          <>
            <header className='text-center space-y-2'>
              <ClipboardDocumentCheckIcon className='w-10 h-10 mx-auto text-yellow-400' />
              <h1 className='text-3xl font-bold text-yellow-400'>{actividad.titulo}</h1>
              <p className='text-white/70 text-sm'>
                {actividad.materia || 'Materia no definida'} —{' '}
                {actividad.lapso || 'Lapso no definido'}
              </p>
            </header>

            {/* Detalles */}
            <section className='space-y-4'>
              <p className='text-white/80'>
                {actividad.descripcion || 'Sin descripción disponible.'}
              </p>
              <p className='text-sm text-white/60'>
                Fecha de entrega:{' '}
                {actividad.fechaEntrega
                  ? new Date(actividad.fechaEntrega).toLocaleDateString('es-VE', {
                      dateStyle: 'medium',
                    })
                  : 'Sin fecha'}
              </p>
              <p className='text-sm text-white/60'>Ponderación: {actividad.ponderacion || 0}%</p>
              <p className='text-sm text-white/60'>Tipo: {actividad.tipo || 'otro'}</p>
            </section>

            {/* Recursos */}
            {Array.isArray(actividad.recursos) && actividad.recursos.length > 0 && (
              <section className='space-y-2'>
                <h2 className='text-lg font-semibold text-white'>Recursos</h2>
                <ul className='list-disc list-inside text-white/70 space-y-1'>
                  {actividad.recursos.map((url, index) => (
                    <li key={index}>
                      <a
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline hover:text-white'
                      >
                        Recurso {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Estado de entrega */}
            {entrega ? (
              <section className='pt-6'>
                <h2 className='text-lg font-semibold text-white mb-2'>Tu entrega</h2>
                <EntregaCard entrega={entrega} />
              </section>
            ) : (
              <FormularioEntrega
                actividadId={actividad._id || actividad.id}
                onEntregaExitosa={handleEntregaExitosa}
              />
            )}
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default ActividadDetalleEstudiante;
