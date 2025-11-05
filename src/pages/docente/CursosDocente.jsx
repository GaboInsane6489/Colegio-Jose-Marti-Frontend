import NavbarDocente from '@/components/docente/NavbarDocente';
import Footer from '@/components/Footer';
import CursosAsignados from '@/components/docente/CursosAsignados';
import CursoForm from '@/components/docente/CursoForm';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';
import { BookOpenIcon } from '@heroicons/react/24/solid';

/**
 * Página institucional para gestión de cursos del docente
 */
const CursosDocente = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white text-white relative overflow-hidden'>
      {/* 🎥 Fondo institucional */}
      <VideoFondoDocente />

      {/* 🧭 Navbar institucional */}
      <div className='relative z-30'>
        <NavbarDocente />
      </div>

      {/* 📚 Contenido principal */}
      <main className='relative z-20 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'>
        <header className='text-center'>
          <BookOpenIcon className='h-12 w-12 mx-auto text-white mb-4' />
          <h1 className='text-4xl font-serif font-bold text-white tracking-wide'>Mis Cursos</h1>
          <p className='mt-2 text-sm text-gray-200'>
            Crea, organiza y visualiza tus cursos asignados.
          </p>
        </header>

        {/* 📝 Formulario para crear cursos */}
        <section className='rounded-xl shadow-xl'>
          <CursoForm />
        </section>

        {/* 📦 Cursos asignados */}
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold text-white text-center'>Cursos asignados</h2>
          <CursosAsignados
            fallback={<p className='text-center text-red-300'>Error al cargar cursos.</p>}
          />
        </section>
      </main>

      {/* 📦 Footer institucional */}
      <div className='relative z-20 mt-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default CursosDocente;
