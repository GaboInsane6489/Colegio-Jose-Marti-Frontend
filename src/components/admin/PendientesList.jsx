import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  ArrowPathIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/solid';

/**
 * 🛡️ Componente institucional para validar usuarios pendientes
 * Presentación en tabla con semántica, responsive y acciones administrativas.
 */
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
      className='bg-black text-white py-10 px-4 sm:px-6'
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
    >
      <div className='max-w-6xl mx-auto space-y-8'>
        <div className='text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold tracking-wide text-white font-[Orbitron]'>
            Gestión de usuarios pendientes
          </h2>
          <button
            onClick={fetchPendientes}
            className='mt-4 inline-flex items-center gap-2 bg-white text-white px-4 py-2 rounded shadow hover:bg-gray-200 transition duration-300'
          >
            <ArrowPathIcon className='h-5 w-5 text-white' />
            <span className='text-white'>Recargar</span>
          </button>
        </div>

        {loading ? (
          <div className='flex items-center gap-2 justify-center text-gray-400'>
            <ShieldExclamationIcon className='h-5 w-5' />
            <p>Cargando usuarios...</p>
          </div>
        ) : errorMsg ? (
          <div className='flex items-center gap-2 justify-center text-red-500'>
            <ExclamationTriangleIcon className='h-5 w-5' />
            <p>{errorMsg}</p>
          </div>
        ) : pendientes.length === 0 ? (
          <div className='text-center text-gray-400 flex flex-col items-center'>
            <CheckCircleIcon className='h-6 w-6 mb-2' style={{ color: '#107C10' }} />
            <p>No hay usuarios pendientes por validar.</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border border-white text-sm sm:text-base'>
              <thead className='bg-black border-b border-white'>
                <tr>
                  <th className='px-4 py-3 text-left font-semibold text-white'>Email</th>
                  <th className='px-4 py-3 text-left font-semibold text-white'>Rol</th>
                  <th className='px-4 py-3 text-left font-semibold text-white'>Estado</th>
                  <th className='px-4 py-3 text-center font-semibold text-white'>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pendientes.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className='border-b border-white hover:bg-white/5'
                  >
                    <td className='px-4 py-3 whitespace-nowrap'>{user.email}</td>
                    <td className='px-4 py-3 capitalize'>{user.role}</td>
                    <td className='px-4 py-3 text-yellow-400'>Pendiente</td>
                    <td className='px-4 py-3 text-center'>
                      <div className='flex gap-2 justify-center flex-wrap'>
                        <button
                          onClick={() => validarUsuario(user._id)}
                          className='flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition'
                        >
                          <CheckCircleIcon className='h-4 w-4' />
                          Validar
                        </button>
                        <button
                          onClick={() => rechazarUsuario(user._id)}
                          className='flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition'
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
