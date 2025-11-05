import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * 🧑‍💼 Tabla institucional para listar y validar usuarios registrados
 */
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

  const toggleValidacion = async (id, validado) => {
    const endpoint = validado ? `rechazar/${id}` : `validar/${id}`;
    const method = validado ? 'delete' : 'patch';

    try {
      const token = localStorage.getItem('token');
      await axios[method](`http://localhost:3000/api/admin/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuarios((prev) => prev.map((u) => (u._id === id ? { ...u, validado: !validado } : u)));
    } catch (error) {
      console.error('❌ Error al actualizar usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <section className='bg-[#121212] text-white py-10 px-4 sm:px-6'>
      <div className='max-w-6xl mx-auto space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>Todos los usuarios</h2>
          <button
            onClick={() => navigate('/admin/pendientes')}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
          >
            🔙 Volver a pendientes
          </button>
        </div>

        {loading ? (
          <p className='text-gray-400'>Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p className='text-gray-400'>No hay usuarios registrados.</p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white text-black rounded shadow'>
              <thead className='bg-gray-100 text-left'>
                <tr>
                  <th className='px-4 py-2'>Email</th>
                  <th className='px-4 py-2'>Rol</th>
                  <th className='px-4 py-2'>Estado</th>
                  <th className='px-4 py-2'>Acción</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user._id} className='border-t'>
                    <td className='px-4 py-2'>{user.email}</td>
                    <td className='px-4 py-2 capitalize'>{user.role}</td>
                    <td className='px-4 py-2'>
                      {user.validado ? (
                        <span className='text-green-600 font-semibold'>Validado</span>
                      ) : (
                        <span className='text-yellow-600 font-semibold'>Pendiente</span>
                      )}
                    </td>
                    <td className='px-4 py-2'>
                      <button
                        onClick={() => toggleValidacion(user._id, user.validado)}
                        className={`px-4 py-2 rounded text-white ${
                          user.validado
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                        } transition`}
                      >
                        {user.validado ? '❌ Cancelar' : '✅ Validar'}
                      </button>
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
