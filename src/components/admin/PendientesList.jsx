import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid';
import {
  obtenerUsuarios,
  validarUsuarioPendiente,
  rechazarUsuarioPendiente,
} from '../../services/usuariosService';

const PendientesList = () => {
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchPendientes = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await obtenerUsuarios();
      if (res.status === 200 && res.data) {
        const lista = Array.isArray(res.data.usuarios)
          ? res.data.usuarios
              .filter((u) => !u.isValidated)
              .map((u) => ({
                ...u,
                id: u.id || u._id,
                isValidated: u.isValidated ?? u.validado ?? false,
              }))
          : [];
        setPendientes(lista);
      } else {
        setErrorMsg('No se pudo cargar la lista de usuarios.');
      }
    } catch (error) {
      console.error('❌ Error al cargar pendientes:', error);
      setErrorMsg(error.response?.data?.msg || 'Error inesperado al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  const handleValidarUsuario = async (id) => {
    try {
      const res = await validarUsuarioPendiente(id);
      if (res.status === 200 && res.data?.user) {
        setPendientes((prev) => prev.filter((user) => (user.id || user._id) !== id));
        setSuccessMsg('✅ Usuario validado correctamente.');
      } else {
        setErrorMsg('No se pudo validar el usuario.');
      }
    } catch (error) {
      console.error('❌ Error al validar usuario:', error);
      setErrorMsg(error.response?.data?.msg || 'Error inesperado al validar usuario.');
    }
  };

  const handleRechazarUsuario = async (id) => {
    try {
      const res = await rechazarUsuarioPendiente(id);
      if (res.status === 200 && res.data?.user) {
        setPendientes((prev) => prev.filter((user) => (user.id || user._id) !== id));
        setSuccessMsg('🗑️ Usuario eliminado correctamente.');
      } else {
        setErrorMsg('No se pudo eliminar el usuario.');
      }
    } catch (error) {
      console.error('❌ Error al rechazar usuario:', error);
      setErrorMsg(error.response?.data?.msg || 'Error inesperado al eliminar usuario.');
    }
  };

  return (
    <motion.section
      id='validacion'
      className='px-4 sm:px-6 py-10 scroll-mt-24'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
    >
      <div className='max-w-screen-xl mx-auto space-y-8'>
        {/* Encabezado */}
        <div className='text-center space-y-4'>
          <ShieldExclamationIcon className='h-10 w-10 mx-auto text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <h2
            className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white drop-shadow-[0_0_6px_#00FFF7]'
            aria-label='Gestión de usuarios pendientes'
          >
            Gestión de usuarios pendientes
          </h2>
          <div className='pb-2'>
            <button
              onClick={fetchPendientes}
              className='inline-flex items-center gap-2 border border-[#00FFF7] px-4 py-2 rounded-full text-sm font-semibold text-[#00FFF7] hover:bg-[#00FFF7]/10 transition-transform duration-200 ease-out hover:scale-105'
              aria-label='Recargar lista de usuarios pendientes'
            >
              <ArrowPathIcon className='h-5 w-5' />
              Recargar
            </button>
          </div>
        </div>

        {/* Estados */}
        {loading ? (
          <div className='flex items-center gap-2 justify-center text-white/70 text-sm'>
            <ShieldExclamationIcon className='h-5 w-5 text-[#00FFF7]' />
            <p>Cargando usuarios...</p>
          </div>
        ) : errorMsg ? (
          <div
            className='flex items-center gap-2 justify-center text-red-500 text-sm font-medium'
            role='alert'
            aria-live='assertive'
          >
            <ExclamationTriangleIcon className='h-5 w-5 text-red-500' />
            <p>{errorMsg}</p>
          </div>
        ) : pendientes.length === 0 ? (
          <div className='text-center text-white/60 flex flex-col items-center text-sm'>
            <CheckCircleIcon className='h-6 w-6 mb-2 text-[#00FF33] drop-shadow-[0_0_4px_#00FF33]' />
            <p>No hay usuarios pendientes por validar.</p>
          </div>
        ) : (
          <div className='bg-gray-950 p-4 rounded-xl shadow-lg border border-white/20 overflow-x-auto'>
            <table className='w-full min-w-[360px] sm:min-w-[520px] md:min-w-[640px] text-sm md:text-base text-white'>
              <thead className='bg-[#00FFF7]/10 text-[#00FFF7] uppercase tracking-wide'>
                <tr className='border-b border-white/20 text-center'>
                  <th className='px-4 py-3 font-semibold text-left'>Email</th>
                  <th className='px-4 py-3 font-semibold text-left'>Rol</th>
                  <th className='px-4 py-3 font-semibold text-left'>Estado</th>
                  <th className='px-4 py-3 font-semibold text-center'>Acción</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/10'>
                {pendientes.map((user, index) => (
                  <motion.tr
                    key={user.id || user._id || index}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
                    className='hover:bg-white/5 transition-colors duration-200'
                  >
                    <td className='px-4 py-3 break-words'>{user.email}</td>
                    <td className='px-4 py-3 capitalize'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'docente'
                            ? 'bg-blue-600/30 text-blue-400'
                            : 'bg-purple-600/30 text-purple-400'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.isValidated
                            ? 'bg-green-600/30 text-green-400'
                            : 'bg-yellow-600/30 text-yellow-400'
                        }`}
                      >
                        {user.isValidated ? 'Validado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-center'>
                      <div className='flex gap-3 justify-center'>
                        <button
                          onClick={() => handleValidarUsuario(user.id || user._id)}
                          className='flex items-center gap-1 border border-green-400 px-3 py-1 rounded-full hover:bg-green-400/20 transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium text-green-400'
                          aria-label={`Validar usuario ${user.email}`}
                        >
                          <CheckCircleIcon className='h-4 w-4' />
                          Validar
                        </button>
                        <button
                          onClick={() => handleRechazarUsuario(user.id || user._id)}
                          className='flex items-center gap-1 border border-red-500 px-3 py-1 rounded-full hover:bg-red-500/20 transition-transform duration-200 ease-out hover:scale-105 text-sm font-medium text-red-500'
                          aria-label={`Eliminar usuario ${user.email}`}
                        >
                          <XCircleIcon className='h-4 w-4' />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {successMsg && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-green-400 text-sm text-center font-medium pt-4'
            role='status'
            aria-live='polite'
          >
            {successMsg}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
};

export default PendientesList;
