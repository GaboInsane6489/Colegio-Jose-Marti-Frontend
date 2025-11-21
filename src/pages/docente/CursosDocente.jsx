import NavbarDocente from '@/components/docente/NavbarDocente';
import Footer from '@/components/Footer';
import CursosAsignados from '@/components/docente/CursosAsignados';
import CursoForm from '@/components/docente/CursoForm';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import useCursos from '@/hooks/useCursos'; // ✅ hook institucional

/**
 * 🏫 Página institucional para gestión de cursos del docente
 */
const CursosDocente = () => {
  const { data: cursos = [], loading, error, createCurso } = useCursos('docente');

  const handleCursoCreado = async (cursoData) => {
    try {
      const nuevoCurso = await createCurso(cursoData);
      console.log('📦 Curso creado en CursosDocente:', nuevoCurso);
    } catch (err) {
      console.error('❌ Error al crear curso:', err.message);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-black text-white relative overflow-hidden'>
      {/* 🎥 Fondo institucional */}
      <VideoFondoDocente />
      <div className='absolute inset-0 bg-black/40 z-10 pointer-events-none' />

      {/* 🧭 Navbar institucional */}
      <div className='relative z-30 drop-shadow-[0_0_12px_#00FFF7]'>
        <NavbarDocente />
      </div>

      {/* 📚 Contenido principal */}
      <main className='relative z-20 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16'>
        {/* 🧠 Encabezado institucional */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className='text-center space-y-4'
        >
          <BookOpenIcon className='h-12 w-12 mx-auto text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <h1 className='text-4xl font-serif font-bold tracking-wide drop-shadow-[0_0_6px_#00FFF7]'>
            Mis Cursos
          </h1>
          <p className='text-sm text-white/80 max-w-xl mx-auto'>
            Crea, organiza y visualiza tus cursos asignados como docente institucional.
          </p>
        </motion.header>

        {/* 📝 Formulario para crear cursos */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className='rounded-2xl shadow-2xl border border-white/10 hover:border-[#00FFF7] transition duration-300'
        >
          <CursoForm onCursoCreado={handleCursoCreado} />
        </motion.section>

        {/* 📦 Cursos asignados */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className='space-y-6'
        >
          <h2 className='text-xl font-semibold text-white text-center'>Cursos asignados</h2>

          {loading && <p className='text-center text-white/70'>🔄 Cargando cursos...</p>}
          {error && <p className='text-center text-red-300'>❌ {error}</p>}

          {cursos.length === 0 && !loading && (
            <p className='text-center text-[#FFDD00]'>
              Crea un curso para visualizarlo aquí. Asegúrate de asignar estudiantes.
            </p>
          )}

          <CursosAsignados
            cursos={Array.isArray(cursos) ? cursos : []}
            fallback={<p className='text-center text-red-300'>Error al cargar cursos.</p>}
          />
        </motion.section>
      </main>

      {/* 📦 Footer institucional */}
      <div className='relative z-20 mt-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default CursosDocente;
