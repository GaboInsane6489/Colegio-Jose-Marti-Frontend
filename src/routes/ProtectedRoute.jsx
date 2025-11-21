import { Navigate } from 'react-router-dom';
import { getCookie } from '@/utils/cookieUtils';

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

  // ✅ tolerancia: si no existen los campos, asumimos true
  const isActive = usuario.active ?? true;
  const isValidated = usuario.isValidated ?? true;

  if (!isActive || !isValidated) {
    console.warn('⛔ Usuario no activo o no validado. Redirigiendo a login.');
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
