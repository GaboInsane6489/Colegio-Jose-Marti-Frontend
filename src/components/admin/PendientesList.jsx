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
 * Componente institucional para validar usuarios pendientes
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
      className='bg-gray-50 text-gray-900 py-10 px-4 sm:px-6'
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
    >
      <div className='max-w-5xl mx-auto space-y-8'>
        <div className='text-center'>
          <h2 className='text-4xl font-serif font-bold tracking-wide text-gray-800'>
            Validación de usuarios registrados
          </h2>
          <button
            onClick={fetchPendientes}
            className='mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300'
          >
            <ArrowPathIcon className='h-5 w-5' />
            Recargar
          </button>
        </div>

        {loading ? (
          <div className='flex items-center gap-2 justify-center text-gray-500'>
            <ShieldExclamationIcon className='h-5 w-5' />
            <p>Cargando usuarios...</p>
          </div>
        ) : errorMsg ? (
          <div className='flex items-center gap-2 justify-center text-red-500'>
            <ExclamationTriangleIcon className='h-5 w-5' />
            <p>{errorMsg}</p>
          </div>
        ) : pendientes.length === 0 ? (
          <div className='text-center text-gray-500 flex flex-col items-center'>
            <CheckCircleIcon className='h-6 w-6 text-green-500 mb-2' />
            <p>No hay usuarios pendientes por validar.</p>
          </div>
        ) : (
          <ul className='space-y-6'>
            {pendientes.map((user, index) => (
              <motion.li
                key={user._id}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  bounce: 0.5,
                  duration: 0.4,
                }}
                className='bg-black p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-white text-center'
              >
                <div className='flex flex-col items-center space-y-2'>
                  <EnvelopeIcon className='h-6 w-6 text-white' />
                  <p className='font-semibold text-lg'>{user.email}</p>
                  <p className='text-sm text-gray-300'>
                    Rol solicitado: <span className='font-medium text-white'>{user.role}</span>
                  </p>
                  <div className='flex gap-3 pt-4'>
                    <button
                      onClick={() => validarUsuario(user._id)}
                      className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300'
                    >
                      <CheckCircleIcon className='h-5 w-5' />
                      Validar
                    </button>
                    <button
                      onClick={() => rechazarUsuario(user._id)}
                      className='flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300'
                    >
                      <XCircleIcon className='h-5 w-5' />
                      Rechazar
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  );
};

export default PendientesList;
