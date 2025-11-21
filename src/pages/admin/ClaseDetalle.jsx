import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClaseById } from '../../services/clasesService';
import AsignarEstudiantesForm from '../../components/admin/AsignarEstudiantesForm';
import { motion } from 'framer-motion';
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import Footer from '../../components/Footer';
import VideoFondoAdmin from '../../components/admin/VideoFondoAdmin';

/**
 * 📘 Vista institucional para detalle de clase y asignación de estudiantes
 */
const ClaseDetalle = () => {
  const { id } = useParams(); // 🆔 ID de la clase desde la URL
  const [clase, setClase] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarClase = async () => {
      try {
        const res = await getClaseById(id);
        if (res.ok && res.clase) {
          setClase(res.clase);
        } else {
          setMensaje(res.msg || '⚠️ Clase no encontrada.');
        }
      } catch (error) {
        console.error('❌ Error al cargar clase:', error);
        setMensaje('Error inesperado al cargar la clase.');
      } finally {
        setCargando(false);
      }
    };
    cargarClase();
  }, [id]);

  const actualizarClaseLocal = (claseActualizada) => {
    setClase(claseActualizada);
    setMensaje('✅ Clase actualizada con nuevos estudiantes.');
  };

  if (cargando) {
    return (
      <div className='relative min-h-screen w-full flex items-center justify-center text-white'>
        <VideoFondoAdmin />
        <p className='relative z-10 text-white/70 text-sm sm:text-base font-medium animate-pulse'>
          ⏳ Cargando clase...
        </p>
      </div>
    );
  }

  if (!clase) {
    return (
      <div className='relative min-h-screen w-full flex items-center justify-center text-white'>
        <VideoFondoAdmin />
        <p className='relative z-10 text-red-400 text-sm sm:text-base font-semibold'>{mensaje}</p>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen w-full overflow-hidden text-white'>
      <VideoFondoAdmin />

      <div className='relative z-10 bg-black/70 min-h-screen w-full flex flex-col'>
        <NavbarAdmin />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-10 sm:py-12 rounded-xl'
        >
          {/* 📘 Detalles de la clase */}
          <article className='space-y-3'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left text-white drop-shadow-[0_0_6px_#00FFF7]'>
              📘 Detalles de la clase
            </h2>
            <p className='text-sm sm:text-base font-medium text-white/90'>
              <strong>Nombre:</strong> {clase.nombre}
            </p>
            <p className='text-sm sm:text-base font-medium text-white/90'>
              <strong>Docente:</strong> {clase.docenteId?.nombre} ({clase.docenteId?.email})
            </p>
            <p className='text-sm sm:text-base font-medium text-white/90'>
              <strong>Horario:</strong>{' '}
              {clase.horario
                ? `${clase.horario.dia} ${clase.horario.horaInicio}–${clase.horario.horaFin}`
                : 'No definido'}
            </p>
            <p className='text-sm sm:text-base font-medium text-white/70'>
              <strong>Descripción:</strong> {clase.descripcion || 'Sin descripción'}
            </p>
          </article>

          {/* 👥 Estudiantes asignados */}
          <article className='space-y-3'>
            <h3 className='text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow-[0_0_6px_#00FFF7]'>
              👥 Estudiantes asignados
            </h3>
            {clase.estudiantes.length === 0 ? (
              <p className='text-yellow-400 text-sm sm:text-base font-medium'>
                ⚠️ No hay estudiantes asignados aún.
              </p>
            ) : (
              <ul className='list-disc list-inside space-y-1 text-sm sm:text-base font-medium'>
                {clase.estudiantes.map((e) => (
                  <li key={e.id}>
                    {e.nombre} <span className='text-xs sm:text-sm text-white/60'>({e.email})</span>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <hr className='border-white/30' />

          {/* 📑 Formulario de asignación */}
          <AsignarEstudiantesForm claseId={clase.id} onAsignacionExitosa={actualizarClaseLocal} />

          {mensaje && (
            <div className='text-green-400 text-xs sm:text-sm text-center pt-4 font-medium'>
              {mensaje}
            </div>
          )}
        </motion.section>

        <Footer />
      </div>
    </div>
  );
};

export default ClaseDetalle;
