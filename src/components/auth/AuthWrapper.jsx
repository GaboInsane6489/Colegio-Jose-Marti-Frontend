import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pingUsuario } from '../../services/authService';
import { getCookie } from '../../utils/cookieUtils';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthWrapper = () => {
  const navigate = useNavigate();
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [verificando, setVerificando] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedRole =
      localStorage.getItem('userRole') ||
      sessionStorage.getItem('userRole') ||
      getCookie('userRole');

    if (!token) return;

    setVerificando(true);

    const verificarSesion = async () => {
      try {
        const res = await pingUsuario(token);
        const { role: userRole, usuario } = res.data;

        if (!userRole || typeof userRole !== 'string' || !usuario || typeof usuario !== 'object') {
          throw new Error('Rol o usuario no recibido. Sesión inválida.');
        }

        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        storage.setItem('userRole', userRole);
        storage.setItem('usuario', JSON.stringify(usuario));
        document.cookie = `userRole=${userRole}; path=/`;

        navigate(`/${userRole}/dashboard`);
      } catch (error) {
        console.error('❌ Error al verificar sesión:', error);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('userRole');
        sessionStorage.removeItem('userRole');
        localStorage.removeItem('usuario');
        sessionStorage.removeItem('usuario');
        document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      } finally {
        setVerificando(false);
      }
    };

    verificarSesion();
  }, [navigate]);

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-xl bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 md:p-10 border border-white/20 animate-fadeIn'>
      {/* 🔐 Ícono institucional */}
      <div className='mb-4 sm:mb-6'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8 sm:h-10 sm:w-10 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mx-auto'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 11c0-1.105-.895-2-2-2s-2 .895-2 2v1h4v-1zM6 11V9a6 6 0 1112 0v2m-6 4h.01M4 15h16v6H4v-6z'
          />
        </svg>
      </div>

      {/* 🔄 Formulario dinámico */}
      <div className='w-full'>
        {mostrarRegistro ? (
          <RegisterForm onRegistroExitoso={() => setMostrarRegistro(false)} />
        ) : (
          <LoginForm />
        )}
      </div>

      {/* 🔁 Alternancia */}
      <button
        type='button'
        onClick={() => setMostrarRegistro(!mostrarRegistro)}
        className='mt-6 text-[#00FFF7] hover:brightness-125 text-sm sm:text-base font-medium transition duration-200 drop-shadow-[0_0_4px_#00FFF7]'
      >
        {mostrarRegistro
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿Eres estudiante nuevo? Regístrate aquí'}
      </button>

      {/* ⏳ Estado de carga */}
      {verificando && (
        <p className='text-white/60 mt-4 text-xs sm:text-sm text-center'>
          Verificando sesión activa...
        </p>
      )}
    </div>
  );
};

export default AuthWrapper;
