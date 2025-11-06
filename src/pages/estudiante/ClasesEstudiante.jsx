import { useEffect, useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { motion } from 'framer-motion';

// 🎥 Visuales
import VideoFondoEstudiante from '@/components/estudiante/VideoFondoEstudiante';

// 🧭 Navegación
import NavbarEstudiante from '@/components/estudiante/NavbarEstudiante';
import Footer from '@/components/Footer';

// 🧩 UI académica
import { FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

/**
 * 🧠 Vista institucional para mostrar clases asignadas al estudiante
 * Incluye docente responsable, actividades y compañeros
 */
const ClasesEstudiante = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const res = await axiosInstancia.get('/api/estudiante/clases');
        setClases(res.data.clases || []);
      } catch (error) {
        console.error('❌ Error al cargar clases del estudiante:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClases();
  }, []);

  return (
    <div className='min-h-screen flex flex-col bg-black text-white overflow-hidden'>
      <VideoFondoEstudiante />
      <div className='relative z-10 flex-1'>
        <NavbarEstudiante />
        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10'>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-8'
          >
            <div className='text-center'>
              <FaChalkboardTeacher className='text-yellow-500 text-4xl mb-2 mx-auto' />
              <h1 className='text-2xl font-bold text-yellow-400'>Información de tus clases</h1>
              <p className='text-sm text-yellow-200 mt-1'>
                Aquí verás los docentes, actividades y compañeros asignados
              </p>
            </div>

            {loading ? (
              <p className='text-center text-yellow-300 animate-pulse'>Cargando clases...</p>
            ) : clases.length === 0 ? (
              <div className='text-center py-6'>
                <p className='text-lg text-white'>No tienes clases asignadas por ahora.</p>
                <p className='text-sm mt-2 italic text-yellow-500'>
                  Cuando se asignen, aparecerán aquí para que comiences tu transformación académica
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {clases.map((clase) => (
                  <div
                    key={clase._id}
                    className='bg-black border border-yellow-600 rounded-lg p-4 shadow-md space-y-3'
                  >
                    <h2 className='text-lg font-semibold text-yellow-400'>{clase.nombre}</h2>
                    <p className='text-sm text-yellow-300'>Materia: {clase.materia}</p>
                    <p className='text-sm text-yellow-300'>Horario: {clase.horario}</p>
                    <p className='text-sm text-yellow-300'>
                      Docente: {clase.docente?.nombre || 'Sin asignar'}
                    </p>
                    <div className='flex items-center gap-2 mt-2'>
                      <FaUsers className='text-yellow-500' />
                      <span className='text-sm text-yellow-200'>
                        {clase.estudiantes?.length || 0} compañeros asignados
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ClasesEstudiante;
