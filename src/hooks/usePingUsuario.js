import { useState, useEffect } from 'react';
import { pingUsuario } from '../services/authService';

/**
 * 🧠 Hook institucional para verificar sesión activa en segundo plano
 * Devuelve { cargando, error, rol } y sincroniza estado.
 * No bloquea el render inicial ni la redirección post-login.
 */
const usePingUsuario = () => {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ Token no encontrado. No se puede verificar sesión.');
      setCargando(false);
      return;
    }

    const verificar = async () => {
      try {
        const res = await pingUsuario(token);
        const role = res?.data?.role;

        if (!role || typeof role !== 'string') {
          console.warn('⚠️ Ping sin rol válido:', res.data);
          throw new Error('Rol no recibido o inválido');
        }

        if (!cancelado) {
          setRol(role);
          localStorage.setItem('userRole', role);
          document.cookie = `userRole=${role}; path=/`;
        }
      } catch (err) {
        console.error('❌ Error en pingUsuario:', err);
        setError(err);

        // 🧹 Limpieza defensiva de sesión corrupta
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('userRole');
        document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    verificar();

    return () => {
      cancelado = true;
    };
  }, []);

  return { cargando, error, rol };
};

export default usePingUsuario;
