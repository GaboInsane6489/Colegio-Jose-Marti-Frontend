import { useState, useEffect } from 'react';
import { pingUsuario } from '../services/authService';
import { getCookie } from '../utils/cookieUtils';

/**
 * 🧠 Hook institucional para verificar sesión activa
 * Devuelve { cargando, error, rol } y sincroniza estado.
 * Limpia sesión si el token es inválido o el rol no se recibe.
 */
const usePingUsuario = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole') || getCookie('userRole');

    if (storedRole) setRol(storedRole);
    if (!token) return;

    setCargando(true);

    const verificar = async () => {
      try {
        const res = await pingUsuario(token);
        const role = res?.data?.role;

        if (!role || typeof role !== 'string') {
          console.warn('⚠️ Ping sin rol válido:', res.data);
          throw new Error('Rol no recibido o inválido');
        }

        localStorage.setItem('userRole', role);
        document.cookie = `userRole=${role}; path=/`;
        setRol(role);
      } catch (err) {
        console.error('❌ Error en pingUsuario:', err);
        setError(err);

        // 🧹 Limpieza defensiva de sesión
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        sessionStorage.removeItem('token');
        document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      } finally {
        setCargando(false);
      }
    };

    verificar();
  }, []);

  return { cargando, error, rol };
};

export default usePingUsuario;
