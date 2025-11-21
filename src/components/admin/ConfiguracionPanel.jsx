import { motion } from 'framer-motion';
import { useState } from 'react';
import { actualizarPreferencias, gestionarRoles } from '../../services/settingsService'; // ✅ integración real

/**
 * 🛠️ Panel institucional para configuración administrativa
 */
const ConfiguracionPanel = () => {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleGestionRoles = async () => {
    try {
      const res = await gestionarRoles();
      if (res.ok) {
        setMensaje('✅ Roles actualizados correctamente.');
      } else {
        setError(res.msg || 'No se pudieron actualizar los roles.');
      }
    } catch (err) {
      console.error('❌ Error en gestión de roles:', err);
      setError('Error inesperado al gestionar roles.');
    }
  };

  const handlePreferencias = async () => {
    try {
      const res = await actualizarPreferencias();
      if (res.ok) {
        setMensaje('✅ Preferencias visuales actualizadas.');
      } else {
        setError(res.msg || 'No se pudieron actualizar las preferencias.');
      }
    } catch (err) {
      console.error('❌ Error en preferencias:', err);
      setError('Error inesperado al actualizar preferencias.');
    }
  };

  return (
    <motion.section
      id='configuracion'
      className='bg-black text-white py-10 px-4 sm:px-6'
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
      aria-label='Panel de configuración administrativa'
    >
      <div className='max-w-4xl mx-auto space-y-6'>
        <h2 className='text-lg sm:text-xl font-semibold text-white'>⚙️ Configuración</h2>
        <p className='text-xs sm:text-sm md:text-base text-white/70 font-medium'>
          Ajusta parámetros institucionales, gestiona roles, permisos y personaliza la experiencia
          administrativa.
        </p>

        {mensaje && (
          <p
            className='text-green-400 text-xs sm:text-sm text-center font-medium'
            role='status'
            aria-live='polite'
          >
            {mensaje}
          </p>
        )}

        {error && (
          <p
            className='text-red-400 text-xs sm:text-sm text-center font-medium'
            role='alert'
            aria-live='assertive'
          >
            {error}
          </p>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Gestión de roles */}
          <div className='bg-gray-900 text-white p-4 rounded-xl shadow hover:shadow-lg transition'>
            <h3 className='font-semibold mb-2 text-sm sm:text-base'>👥 Gestión de roles</h3>
            <p className='text-xs sm:text-sm text-white/70'>
              Asignar, editar o eliminar roles institucionales.
            </p>
            <button
              onClick={handleGestionRoles}
              className='mt-3 bg-black text-[#00FFF7] px-4 py-2 rounded-md font-semibold text-xs sm:text-sm hover:brightness-125 hover:drop-shadow-[0_0_8px_#00FFF7] transition border border-[#00FFF7]/40'
              aria-label='Configurar roles institucionales'
            >
              Configurar
            </button>
          </div>

          {/* Preferencias visuales */}
          <div className='bg-gray-900 text-white p-4 rounded-xl shadow hover:shadow-lg transition'>
            <h3 className='font-semibold mb-2 text-sm sm:text-base'>🎨 Preferencias visuales</h3>
            <p className='text-xs sm:text-sm text-white/70'>
              Cambiar temas, animaciones o accesibilidad.
            </p>
            <button
              onClick={handlePreferencias}
              className='mt-3 bg-black text-[#00FFF7] px-4 py-2 rounded-md font-semibold text-xs sm:text-sm hover:brightness-125 hover:drop-shadow-[0_0_8px_#00FFF7] transition border border-[#00FFF7]/40'
              aria-label='Configurar preferencias visuales'
            >
              Personalizar
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ConfiguracionPanel;
