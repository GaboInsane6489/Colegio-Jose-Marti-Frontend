import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid';

const PendientesList = () => {
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchPendientes = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMsg('Sesión inválida. Por favor inicia sesión nuevamente.');
        return;
      }

      const res = await axios.get('/api/admin/pendientes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const lista = Array.isArray(res.data?.pendientes) ? res.data.pendientes : [];
      setPendientes(lista);
    } catch (error) {
      if (error.response?.status === 403) {
        setErrorMsg('Acceso denegado. No tienes permisos para ver esta sección.');
      } else if (error.response?.status === 401) {
        setErrorMsg('Sesión expirada o inválida. Por favor inicia sesión nuevamente.');
      } else {
        setErrorMsg('No se pudo cargar la lista de usuarios.');
      }

      setPendientes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  const validarUsuario = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sesión inválida. Inicia sesión nuevamente.');
        return;
      }

      await axios.patch(`/api/admin/validar/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendientes((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      alert(
        error.response?.status === 401 || error.response?.status === 403
          ? 'No tienes permiso para validar usuarios.'
          : 'Error inesperado al validar usuario.'
      );
    }
  };

  const rechazarUsuario = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sesión inválida. Inicia sesión nuevamente.');
        return;
      }

      await axios.delete(`/api/admin/rechazar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendientes((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      alert(
        error.response?.status === 401 || error.response?.status === 403
          ? 'No tienes permiso para rechazar usuarios.'
          : 'Error inesperado al rechazar usuario.'
      );
    }
  };

  return (
    <motion.section
      id='validacion'
      className='bg-black text-white py-10 px-4 sm:px-6 scroll-mt-24'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
    >
      <div className='max-w-6xl mx-auto space-y-8'>
        <div className='text-center space-y-4'>
          <ShieldExclamationIcon className='h-10 w-10 mx-auto text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <h2 className='text-4xl sm:text-5xl font-bold tracking-wide text-white font-[Orbitron]'>
            Gestión de usuarios pendientes
          </h2>
          <div className='pb-4'>
            <button
              onClick={fetchPendientes}
              className='inline-flex items-center gap-2 bg-gradient-to-r from-[#00FFF7] to-[#00FF33] text-black px-4 py-2 rounded-full font-semibold text-sm transition hover:opacity-90 shadow-md hover:shadow-xl'
            >
              <ArrowPathIcon className='h-5 w-5 text-black' />
              Recargar
            </button>
          </div>
        </div>

        {loading ? (
          <div className='flex items-center gap-2 justify-center text-white/60'>
            <ShieldExclamationIcon className='h-5 w-5' />
            <p>Cargando usuarios...</p>
          </div>
        ) : errorMsg ? (
          <div className='flex items-center gap-2 justify-center text-red-500'>
            <ExclamationTriangleIcon className='h-5 w-5' />
            <p>{errorMsg}</p>
          </div>
        ) : pendientes.length === 0 ? (
          <div className='text-center text-white/60 flex flex-col items-center'>
            <CheckCircleIcon className='h-6 w-6 mb-2 text-green-400 drop-shadow-[0_0_4px_#00FF33]' />
            <p>No hay usuarios pendientes por validar.</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border border-white/20 text-sm sm:text-base'>
              <thead className='bg-[#00FFF7]/10 text-[#00FFF7] uppercase tracking-wide'>
                <tr>
                  <th className='px-4 py-3 text-left font-semibold'>Email</th>
                  <th className='px-4 py-3 text-left font-semibold'>Rol</th>
                  <th className='px-4 py-3 text-left font-semibold'>Estado</th>
                  <th className='px-4 py-3 text-center font-semibold'>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pendientes.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className='border-b border-white/10 hover:bg-black/30'
                  >
                    <td className='px-4 py-3 whitespace-nowrap'>{user.email}</td>
                    <td className='px-4 py-3 capitalize'>{user.role}</td>
                    <td className='px-4 py-3 text-yellow-400'>Pendiente</td>
                    <td className='px-4 py-3 text-center'>
                      <div className='flex gap-2 justify-center flex-wrap'>
                        <button
                          onClick={() => validarUsuario(user._id)}
                          className='flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition text-sm font-medium'
                        >
                          <CheckCircleIcon className='h-4 w-4' />
                          Validar
                        </button>
                        <button
                          onClick={() => rechazarUsuario(user._id)}
                          className='flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition text-sm font-medium'
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
      </div>
    </motion.section>
  );
};

export default PendientesList;
