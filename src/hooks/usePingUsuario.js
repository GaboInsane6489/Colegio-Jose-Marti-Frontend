import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🧠 Hook institucional para verificar sesión activa en segundo plano
 * Devuelve { loading, error, role } y sincroniza estado.
 * No bloquea el render inicial ni la redirección post-login.
 */
const usePingUsuario = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    let cancelado = false;
    let ejecutado = window.__pingYaEjecutado;

    const rutaActual = window.location.pathname;
    const esRutaPublica =
      rutaActual === '/' ||
      rutaActual.startsWith('/about') ||
      rutaActual.startsWith('/contact') ||
      rutaActual.startsWith('/auth');

    if (esRutaPublica) {
      setLoading(false);
      return;
    }

    if (ejecutado) {
      setLoading(false);
      return;
    }

    window.__pingYaEjecutado = true;

    const verificar = async () => {
      try {
        const res = await axiosInstancia.get('/auth/ping');
        const roleRes = res?.data?.role;

        if (!roleRes || typeof roleRes !== 'string') {
          console.warn('⚠️ Ping sin rol válido:', res.data);
          throw new Error('Rol no recibido o inválido');
        }

        if (!cancelado) {
          setRole(roleRes);

          // 🧠 Guardar rol en el mismo lugar que el token
          if (localStorage.getItem('token')) {
            localStorage.setItem('userRole', roleRes);
          } else {
            sessionStorage.setItem('userRole', roleRes);
          }

          document.cookie = `userRole=${roleRes}; path=/`;
        }
      } catch (err) {
        console.error('❌ Error en pingUsuario:', err);
        setError(err.message || 'Error al verificar sesión');

        // 🧹 Limpieza defensiva de sesión corrupta
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('userRole');
        sessionStorage.removeItem('userRole');
        document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      } finally {
        if (!cancelado) setLoading(false);
      }
    };

    verificar();

    return () => {
      cancelado = true;
    };
  }, []);

  return { loading, error, role };
};

export default usePingUsuario;
