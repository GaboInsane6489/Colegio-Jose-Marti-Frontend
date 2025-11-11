import { useEffect, useState } from 'react';
import axios from 'axios';
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

const UsuariosTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/admin/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const lista = Array.isArray(res.data?.usuarios) ? res.data.usuarios : [];
      setUsuarios(lista);
    } catch (error) {
      console.error('❌ Error al cargar usuarios:', error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/admin/rechazar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error('❌ Error al eliminar usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <motion.section
      id='usuarios'
      className='bg-black text-white py-10 px-4 sm:px-6 scroll-mt-24'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
    >
      <div className='w-full max-w-5xl mx-auto space-y-8'>
        <div className='text-center space-y-4'>
          <FaUsers className='mx-auto h-7 w-7 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <h2 className='text-3xl font-bold font-[Orbitron] tracking-wide text-white'>
            Gestión de usuarios
          </h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className='inline-flex items-center gap-2 bg-gradient-to-r from-[#00FFF7] to-[#00FF33] text-black px-4 py-1.5 rounded-full font-semibold text-xs transition hover:opacity-90 shadow-md hover:shadow-xl'
          >
            <FaUserShield className='text-sm' />
            Volver al panel
          </button>
        </div>

        {loading ? (
          <p className='text-white/60 text-sm text-center'>Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p className='text-white/60 text-sm text-center'>No hay usuarios registrados.</p>
        ) : (
          <div className='w-full'>
            <table className='w-full table-auto bg-black text-white text-xs sm:text-sm rounded-xl shadow-xl border border-white/10'>
              <thead className='bg-[#00FFF7]/10 text-[#00FFF7] uppercase tracking-wide'>
                <tr className='text-center'>
                  <th className='px-3 py-2'>
                    <div className='flex justify-center items-center gap-1'>
                      <FaEnvelope />
                      <span>Email</span>
                    </div>
                  </th>
                  <th className='px-3 py-2'>
                    <div className='flex justify-center items-center gap-1'>
                      <FaUserTag />
                      <span>Rol</span>
                    </div>
                  </th>
                  <th className='px-3 py-2'>
                    <div className='flex justify-center items-center gap-1'>
                      <FaCheckCircle className='text-green-400 drop-shadow-[0_0_4px_#00FF33]' />
                      <span>Estado</span>
                    </div>
                  </th>
                  <th className='px-3 py-2'>
                    <div className='flex justify-center items-center gap-1'>
                      <FaTools />
                      <span>Acción</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className='border-t border-white/10 text-center hover:bg-black/30'
                  >
                    <td className='px-3 py-2 break-words'>{user.email}</td>
                    <td className='px-3 py-2 capitalize'>{user.role}</td>
                    <td className='px-3 py-2'>
                      <span
                        className={`font-semibold ${
                          user.validado ? 'text-green-400' : 'text-yellow-400'
                        }`}
                      >
                        {user.validado ? 'Validado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className='px-3 py-2'>
                      <div className='flex justify-center'>
                        <button
                          onClick={() => eliminarUsuario(user._id)}
                          className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full flex items-center gap-2 justify-center transition text-xs font-medium'
                        >
                          <FaTrashAlt className='text-xs' />
                          <span>Eliminar</span>
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

export default UsuariosTable;
