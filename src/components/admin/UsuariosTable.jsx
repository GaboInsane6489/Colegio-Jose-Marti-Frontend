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
    <section className='bg-black text-white py-6 px-4 sm:px-6'>
      <div className='max-w-6xl mx-auto space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left'>
          <div className='flex flex-col items-center sm:items-start'>
            <h2 className='text-lg sm:text-2xl font-semibold'>Gestión de usuarios</h2>
            <FaUsers className='text-blue-400 text-xl sm:hidden mt-2' />
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className='bg-gray-700 text-white px-3 py-1.5 rounded hover:bg-gray-800 transition text-sm flex items-center gap-2'
          >
            <FaUserShield />
            Volver al panel
          </button>
        </div>

        {loading ? (
          <p className='text-gray-400 text-sm text-center'>Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p className='text-gray-400 text-sm text-center'>No hay usuarios registrados.</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-black text-white text-xs sm:text-sm rounded shadow-lg'>
              <thead className='bg-gray-900'>
                <tr className='text-center'>
                  <th className='px-2 sm:px-4 py-2'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaEnvelope />
                      <span>Email</span>
                    </div>
                  </th>
                  <th className='px-2 sm:px-4 py-2'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaUserTag />
                      <span>Rol</span>
                    </div>
                  </th>
                  <th className='px-2 sm:px-4 py-2'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaCheckCircle style={{ color: '#107C10' }} />
                      <span>Estado</span>
                    </div>
                  </th>
                  <th className='px-2 sm:px-4 py-2 min-w-[120px]'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaTools />
                      <span>Acción</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user._id} className='border-t border-gray-800 text-center'>
                    <td className='px-2 sm:px-4 py-2 break-words'>{user.email}</td>
                    <td className='px-2 sm:px-4 py-2 capitalize'>{user.role}</td>
                    <td className='px-2 sm:px-4 py-2'>
                      <span
                        className={`font-medium ${
                          user.validado ? 'text-green-400' : 'text-yellow-400'
                        }`}
                        style={user.validado ? { color: '#107C10' } : {}}
                      >
                        {user.validado ? 'Validado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className='px-2 sm:px-4 py-2'>
                      <div className='flex justify-center'>
                        <button
                          onClick={() => eliminarUsuario(user._id)}
                          className='bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 rounded flex items-center gap-2 justify-center transition'
                        >
                          <FaTrashAlt className='text-xs sm:text-sm' />
                          <span className='hidden sm:inline'>Eliminar</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default UsuariosTable;
