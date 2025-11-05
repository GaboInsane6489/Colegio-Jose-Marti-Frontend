import { Navigate } from 'react-router-dom';
import { getCookie } from '@/utils/cookieUtils';

/**
 * 🔐 Protección de rutas institucionales
 * Valida el token, el rol y el objeto usuario antes de renderizar la vista.
 * Redirige a /login si la sesión está incompleta, o al dashboard correspondiente si el rol no coincide.
 *
 * @param {string[]} allowedRoles - Lista de roles permitidos para esta ruta
 * @param {ReactNode} children - Componente a renderizar si el rol es válido
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const role =
    localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || getCookie('userRole');
  const usuarioRaw = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');

  let usuario = null;
  try {
    usuario = JSON.parse(usuarioRaw);
  } catch (e) {
    console.warn('⚠️ Usuario corrupto o malformado. Ignorando sesión.');
  }

  if (!token || !role || !usuario) {
    console.warn('🔒 Sesión incompleta. Redirigiendo a login.');
    return <Navigate to='/login' replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.warn(`⛔ Rol "${role}" no autorizado para esta ruta. Redirigiendo.`);
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
