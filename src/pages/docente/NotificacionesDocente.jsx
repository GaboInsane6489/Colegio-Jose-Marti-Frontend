import NavbarDocente from '@/components/docente/NavbarDocente';
import Footer from '@/components/Footer';
import NotificacionesDocente from '@/components/docente/NotificacionesDocente';

/**
 * 🔔 Página institucional para notificaciones del docente
 */
const NotificacionesPage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white text-black'>
      {/* 🧭 Navbar institucional */}
      <NavbarDocente />

      {/* 🔔 Contenido principal */}
      <main
        className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'
        aria-label='Sección de notificaciones del docente'
      >
        <header className='text-center' aria-label='Encabezado de notificaciones'>
          <h1 className='text-3xl font-bold text-blue-700'>Notificaciones</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Aquí verás recordatorios, avisos y mensajes institucionales relevantes.
          </p>
        </header>

        <NotificacionesDocente
          fallback={<p className='text-red-500'>⚠️ Error al cargar notificaciones.</p>}
          loadingFallback={<p className='text-gray-500'>🔄 Cargando notificaciones...</p>}
        />
      </main>

      {/* 📦 Footer institucional */}
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default NotificacionesPage;
