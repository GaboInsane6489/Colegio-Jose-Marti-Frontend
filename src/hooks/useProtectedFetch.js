import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🧠 Hook institucional para llamadas protegidas
 * Devuelve { data, loading, error } desde cualquier endpoint.
 * Limpia sesión si el token es inválido o se recibe 401.
 */
const useProtectedFetch = (endpoint, activar = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activar || !endpoint) return;

    const rutaActual = window.location.pathname;
    const esRutaPublica =
      rutaActual === '/' ||
      rutaActual.startsWith('/about') ||
      rutaActual.startsWith('/contact') ||
      rutaActual.startsWith('/auth');

    if (esRutaPublica) return;

    const obtenerDatos = async () => {
      setLoading(true);
      try {
        const res = await axiosInstancia.get(endpoint);

        if (!res?.data) {
          console.warn('⚠️ Respuesta sin datos:', res);
          throw new Error('No se recibieron datos válidos.');
        }

        setData(res.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error en fetch protegido:', err);

        // 🛡️ Limpieza defensiva si el token es inválido
        if (err?.response?.status === 401) {
          console.warn('⚠️ Token inválido o expirado. Limpiando sesión.');
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          localStorage.removeItem('userRole');
          sessionStorage.removeItem('userRole');
          document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        setError(err.message || 'Error en la solicitud protegida');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [endpoint, activar]);

  return { data, loading, error };
};

export default useProtectedFetch;
