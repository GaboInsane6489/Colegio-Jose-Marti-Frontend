import { useState, useEffect } from 'react';
import axiosInstancia from '@/services/axiosInstancia';

/**
 * 🧠 Hook institucional para llamadas protegidas
 * Devuelve { datos, cargando, error } desde cualquier endpoint.
 * Limpia sesión si el token es inválido o se recibe 401.
 */
const useProtectedFetch = (endpoint, activar = true) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activar || !endpoint) return;

    const obtenerDatos = async () => {
      setCargando(true);
      try {
        const res = await axiosInstancia.get(endpoint);

        if (!res?.data) {
          console.warn('⚠️ Respuesta sin datos:', res);
          throw new Error('No se recibieron datos válidos.');
        }

        setDatos(res.data);
      } catch (err) {
        console.error('❌ Error en fetch protegido:', err);

        // 🛡️ Limpieza defensiva si el token es inválido
        if (err?.response?.status === 401) {
          console.warn('⚠️ Token inválido o expirado. Limpiando sesión.');
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          sessionStorage.removeItem('token');
          document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        setError(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [endpoint, activar]);

  return { datos, cargando, error };
};

export default useProtectedFetch;
