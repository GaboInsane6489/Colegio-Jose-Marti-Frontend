import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTrashAlt,
  FaUserShield,
  FaUsers,
  FaEnvelope,
  FaUserTag,
  FaCheckCircle,
  FaTools,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { obtenerUsuarios, rechazarUsuarioPendiente } from '../../services/usuariosService';

const UsuariosTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await obtenerUsuarios();
      if (res.status === 200 && res.data) {
        const lista = Array.isArray(res.data.usuarios)
          ? res.data.usuarios.map((u) => ({ ...u, id: u.id || u._id }))
          : [];
        setUsuarios(lista);
      } else {
        setErrorMsg('No se pudo cargar la lista de usuarios.');
      }
    } catch (error) {
      console.error('❌ Error al cargar usuarios:', error);
      setErrorMsg(error.response?.data?.msg || 'Error inesperado al cargar usuarios.');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    const safeId = id;
    if (!safeId) {
      console.error('❌ ID inválido para eliminar usuario');
      setErrorMsg('ID inválido para eliminación');
      return;
    }
    try {
      const res = await rechazarUsuarioPendiente(safeId);
      if (res.status === 200 && res.data) {
        setUsuarios((prev) => prev.filter((u) => (u.id || u._id) !== safeId));
        setSuccessMsg('Usuario eliminado correctamente.');
      } else {
        setErrorMsg('No se pudo eliminar el usuario.');
      }
    } catch (error) {
      console.error('❌ Error al eliminar usuario:', error);
      setErrorMsg(error.response?.data?.msg || 'Error inesperado al eliminar usuario.');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <motion.section
      id='usuarios'
      className='px-4 sm:px-6 py-10 scroll-mt-24'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
    >
      <div className='w-full max-w-screen-xl mx-auto space-y-8'>
        {/* Encabezado */}
        <div className='text-center space-y-4'>
          <FaUsers className='mx-auto h-8 w-8 text-white drop-shadow-[0_0_6px_#00FFF7]' />
          <h2
            className='text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-[0_0_6px_#00FFF7]'
            aria-label='Gestión de usuarios'
          >
            Gestión de usuarios
          </h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className='inline-flex items-center gap-2 border border-white px-4 py-1.5 rounded-full font-semibold text-sm text-white hover:bg-white/10 transition-transform duration-200 ease-out hover:scale-105'
            aria-label='Volver al panel principal'
          >
            <FaUserShield className='text-white drop-shadow-[0_0_6px_#00FFF7]' />
            Volver al panel
          </button>
        </div>

        {/* Estados */}
        {loading ? (
          <p className='text-white/60 text-sm text-center font-medium'>Cargando usuarios...</p>
        ) : errorMsg ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-red-400 text-sm text-center font-medium'
            role='alert'
            aria-live='assertive'
          >
            {errorMsg}
          </motion.p>
        ) : usuarios.length === 0 ? (
          <p className='text-white/60 text-sm text-center font-medium'>
            No hay usuarios registrados.
          </p>
        ) : (
          <div className='bg-gray-950 p-4 rounded-xl shadow-lg border border-white/20 overflow-x-auto'>
            <table className='w-full min-w-[360px] sm:min-w-[520px] md:min-w-[640px] text-sm md:text-base text-white'>
              <thead className='bg-[#00FFF7]/10 text-[#00FFF7] uppercase tracking-wide'>
                <tr className='border-b border-white/20 text-center'>
                  <th className='px-4 py-3 font-semibold'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaEnvelope className='text-white drop-shadow-[0_0_6px_#00FFF7]' />
                      Email
                    </div>
                  </th>
                  <th className='px-4 py-3 font-semibold'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaUserTag className='text-white drop-shadow-[0_0_6px_#00FFF7]' />
                      Rol
                    </div>
                  </th>
                  <th className='px-4 py-3 font-semibold'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaCheckCircle className='text-white drop-shadow-[0_0_6px_#00FF33]' />
                      Estado
                    </div>
                  </th>
                  <th className='px-4 py-3 font-semibold'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaTools className='text-white drop-shadow-[0_0_6px_#00FFF7]' />
                      Acción
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/10'>
                {usuarios.map((user, index) => (
                  <motion.tr
                    key={user.id || user._id || index}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
                    className='text-center hover:bg-white/5 transition-colors duration-200'
                  >
                    <td className='px-4 py-3 break-words'>{user.email}</td>
                    <td className='px-4 py-3 capitalize'>{user.role}</td>
                    <td className='px-4 py-3'>
                      <span
                        className={`font-semibold ${
                          user.validado ? 'text-[#00FF33]' : 'text-yellow-400'
                        }`}
                      >
                        {user.validado ? 'Validado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex justify-center'>
                        <button
                          onClick={() => eliminarUsuario(user.id || user._id)}
                          className='border border-white px-3 py-1 rounded-full flex items-center gap-2 justify-center hover:bg-white/10 hover:scale-110 hover:drop-shadow-[0_0_6px_#FF0033] transition-transform duration-200 ease-out text-sm font-medium text-white'
                          aria-label={`Eliminar usuario ${user.email}`}
                        >
                          <FaTrashAlt className='text-white drop-shadow-[0_0_6px_#FF0033]' />
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

export default UsuariosTable;
