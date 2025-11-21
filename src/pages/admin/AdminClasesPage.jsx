import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import Footer from '../../components/Footer';
import VideoFondoAdmin from '../../components/admin/VideoFondoAdmin';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../hooks/useAuth';

// 📦 Carga diferida del gestor de clases
const ClasesManager = lazy(() => import('../../components/admin/ClasesManager'));

const AdminClasesPage = () => {
  const navigate = useNavigate();
  const { user, error } = useAuth({ role: 'admin', redirectTo: '/login' });

  // ⚠️ Error de sesión
  if (error) {
    return (
      <div className='relative min-h-screen w-full flex items-center justify-center text-white'>
        <VideoFondoAdmin />
        <div
          className='relative z-10 bg-red-900/70 px-6 py-4 rounded-lg shadow-lg text-center'
          role='alert'
          aria-live='assertive'
        >
          <p className='text-red-400 text-base sm:text-lg font-semibold drop-shadow-[0_0_6px_#FF0000]'>
            🚫 Error de sesión: {error}
          </p>
          <p className='text-white/70 text-sm mt-2'>
            Por favor, inicia sesión nuevamente para continuar.
          </p>
        </div>
      </div>
    );
  }

  // ⏳ Verificación de sesión
  if (!user) {
    return (
      <div className='relative min-h-screen w-full flex items-center justify-center text-white'>
        <VideoFondoAdmin />
        <div
          className='relative z-10 flex flex-col items-center gap-3'
          role='status'
          aria-live='polite'
        >
          <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00FFF7]' />
          <p className='text-white/70 text-sm sm:text-base font-medium animate-pulse'>
            Verificando sesión...
          </p>
        </div>
      </div>
    );
  }

  // ✅ Vista principal
  return (
    <div className='relative min-h-screen w-full overflow-hidden text-white'>
      <VideoFondoAdmin />

      <div className='relative z-10 bg-black/70 min-h-screen w-full flex flex-col'>
        <NavbarAdmin />

        <main className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16 space-y-12'>
          {/* 📘 Encabezado institucional */}
          <div className='flex flex-col items-center text-center mt-16 sm:mt-20 space-y-3'>
            <AcademicCapIcon className='h-10 w-10 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-wide'>
              Gestión de Clases
            </h2>
            <p className='text-xs sm:text-sm md:text-base text-white/80 max-w-xl font-medium'>
              Crea, edita y organiza clases académicas con trazabilidad institucional.
            </p>
          </div>

          {/* 📦 Gestor de clases */}
          <Suspense
            fallback={
              <div
                className='flex flex-col items-center gap-3 text-white/70 text-center'
                role='status'
                aria-live='polite'
              >
                <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00FFF7]' />
                <p className='animate-pulse'>Cargando gestor de clases...</p>
              </div>
            }
          >
            <ClasesManager navigate={navigate} />
          </Suspense>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminClasesPage;
