import { useState, useEffect, useCallback } from 'react';
import { loginUsuario, logoutUsuario, registerUsuario, pingUsuario } from '@/services/authService';

/**
 * 🔐 Hook institucional para manejar autenticación de usuario
 * Devuelve { user, role, loading, error, login, logout, register, refetch }
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Verificar sesión activa
  const refetch = useCallback(async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setUser(null);
      setRole(null);
      setError('No hay sesión activa');
      return;
    }

    setLoading(true);
    try {
      const res = await pingUsuario(); // devuelve { id, email, role, isValidated }
      if (res?.id && res?.email && res?.role) {
        // ✅ Sesión válida con respuesta completa
        setUser(res);
        setRole(res.role);
        setError(null);

        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        storage.setItem('userRole', res.role);
        storage.setItem('usuario', JSON.stringify(res));
      } else {
        // ✅ Caso especial: backend responde 304 → usar datos ya guardados
        const usuarioGuardado =
          localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
        if (usuarioGuardado) {
          const parsed = JSON.parse(usuarioGuardado);
          setUser(parsed);
          setRole(parsed.role);
          setError(null);
        } else {
          throw new Error('Sesión inválida');
        }
      }
    } catch (err) {
      console.error('❌ Error al verificar sesión:', err.message);

      // 🧹 Limpieza defensiva
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      setUser(null);
      setRole(null);
      setError('Sesión expirada o inválida');

      // 🚪 Redirección inmediata
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔑 Login
  const login = async (email, password, mantenerSesion = false) => {
    setLoading(true);
    try {
      const res = await loginUsuario(email, password, mantenerSesion);
      if (res?.token) {
        setUser(res);
        setRole(res.role);
        setError(null);

        const storage = mantenerSesion ? localStorage : sessionStorage;
        storage.setItem('token', res.token);
        storage.setItem('userRole', res.role);
        storage.setItem('usuario', JSON.stringify(res));

        return res;
      } else {
        throw new Error('Error en login');
      }
    } catch (err) {
      console.error('❌ Error en login:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await logoutUsuario();
    } catch (err) {
      console.warn('⚠️ Error en logout:', err.message);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setUser(null);
      setRole(null);
    }
  };

  // 🆕 Registro
  const register = async ({ nombre, email, password, role = 'estudiante' }) => {
    setLoading(true);
    try {
      const res = await registerUsuario({ nombre, email, password, role });

      if (res?.usuario) {
        // Caso en que backend devuelve el objeto usuario
        setUser(res.usuario);
        setRole(res.usuario.role);
        setError(null);

        sessionStorage.setItem('usuario', JSON.stringify(res.usuario));
        sessionStorage.setItem('userRole', res.usuario.role);

        return res.usuario;
      } else if (res?.msg) {
        // Caso en que backend devuelve solo mensaje de éxito
        setError(null);
        return { msg: res.msg };
      } else {
        throw new Error('Error en registro');
      }
    } catch (err) {
      console.error('❌ Error en registro:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Verificar sesión al montar
  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    user,
    role,
    loading,
    error,
    login,
    logout,
    register,
    refetch,
  };
};

export default useAuth;
