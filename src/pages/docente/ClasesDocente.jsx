import { useState, useEffect } from 'react';
import useClasesDocente from '@/hooks/useClasesDocente';
import AsignarEstudiantesModal from '@/components/docente/AsignarEstudiantesModal';
import NavbarDocente from '@/components/docente/NavbarDocente';
import Footer from '@/components/Footer';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';
import { AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/solid';

/**
 * Página institucional para gestión de clases del docente
 */
const ClasesDocente = () => {
  const { clases, loading, error } = useClasesDocente();
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  useEffect(() => {
    if (loading) console.log('⏳ Cargando clases desde useClasesDocente...');
    if (error) console.error('❌ Error al cargar clases:', error);
    if (clases?.length > 0) {
      console.log(
        `✅ Clases recibidas (${clases.length}):`,
        clases.map((c) => `${c.grado}-${c.seccion}`)
      );
    } else if (!loading && !error) {
      console.warn('⚠️ No se recibieron clases. Verifica backend o asignación.');
    }
  }, [clases, loading, error]);

  const handleSeleccionarClase = (clase) => {
    if (!clase || !clase._id) {
      console.warn('⚠️ Clase inválida seleccionada:', clase);
      return;
    }
    console.log('🎯 Clase seleccionada para asignar estudiantes:', clase);
    setClaseSeleccionada(clase);
  };

  return (
    <div className='min-h-screen flex flex-col bg-white text-white relative overflow-hidden'>
      <VideoFondoDocente />

      <div className='relative z-30'>
        <NavbarDocente />
      </div>

      <main className='relative z-20 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'>
        <header className='text-center'>
          <AcademicCapIcon className='h-12 w-12 mx-auto text-white mb-4' />
          <h1 className='text-4xl font-serif font-bold text-white tracking-wide'>Mis Clases</h1>
          <p className='mt-2 text-sm text-white/80'>
            Gestiona tus espacios académicos, asigna estudiantes y organiza tu jornada.
          </p>
        </header>

        {loading && (
          <div className='text-center text-white/60'>
            <p>Cargando clases...</p>
          </div>
        )}

        {error && (
          <div className='text-center text-red-400'>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && clases.length === 0 && (
          <div className='text-center text-white/60 flex flex-col items-center space-y-2'>
            <AcademicCapIcon className='h-8 w-8 text-white/40' />
            <p className='text-lg'>Aún no tienes clases asignadas.</p>
            <p className='text-sm'>
              Contacta al administrador para configurar tus espacios académicos.
            </p>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {clases.map((clase) => (
            <div
              key={clase._id}
              className='bg-black/60 text-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center text-center'
            >
              <AcademicCapIcon className='h-6 w-6 text-white mb-2' />
              <h2 className='text-xl font-semibold mb-1'>
                {clase.grado} - {clase.seccion}
              </h2>
              <p className='text-sm text-white/80 mb-1'>Materia: {clase.materia}</p>
              <p className='text-sm text-white/70 flex items-center justify-center gap-1'>
                <UserGroupIcon className='h-4 w-4 text-white/70' />
                Estudiantes asignados: {clase.estudiantes?.length ?? 0}
              </p>

              <button
                onClick={() => handleSeleccionarClase(clase)}
                className='mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300'
              >
                Asignar estudiantes
              </button>
            </div>
          ))}
        </div>
      </main>

      <div className='relative z-20 mt-auto'>
        <Footer />
      </div>

      {claseSeleccionada && (
        <AsignarEstudiantesModal
          clase={claseSeleccionada}
          onClose={() => {
            console.log('🔒 Modal cerrado');
            setClaseSeleccionada(null);
          }}
        />
      )}
    </div>
  );
};

export default ClasesDocente;
