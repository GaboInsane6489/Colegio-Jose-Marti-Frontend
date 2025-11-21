import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // ✅ usar export default del hook
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthWrapper = () => {
  const navigate = useNavigate();
  // ✅ alias: refetch se usará como verificarSesion
  const { refetch: verificarSesion } = useAuth();
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [verificando, setVerificando] = useState(false);
  const [error, setError] = useState('');

  // ✅ Verificación de sesión centralizada
  const checkSesion = async () => {
    setVerificando(true);
    try {
      const sesionValida = await verificarSesion();
      if (sesionValida) {
        const { role } = sesionValida;
        navigate(`/${role}/dashboard`);
      }
    } catch (err) {
      console.error('❌ Error al verificar sesión:', err);
      setError('Sesión inválida. Inicia sesión nuevamente.');
    } finally {
      setVerificando(false);
    }
  };

  // ✅ Se ejecuta solo al montar
  useEffect(() => {
    checkSesion();
  }, []); // se ejecuta una sola vez al montar

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg bg-black/70 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 md:p-10 border border-white/20 animate-fadeIn'>
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
        className='mt-6 text-[#00FFF7] hover:brightness-125 text-xs sm:text-sm md:text-base font-medium transition duration-200 drop-shadow-[0_0_4px_#00FFF7]'
      >
        {mostrarRegistro
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿Eres estudiante nuevo? Regístrate aquí'}
      </button>

      {/* ⏳ Estado de carga */}
      {verificando && (
        <p
          className='text-white/70 mt-4 text-xs sm:text-sm text-center font-medium'
          aria-live='polite'
        >
          Verificando sesión activa...
        </p>
      )}

      {/* ⚠️ Feedback visual de error */}
      {error && (
        <p className='text-red-400 mt-4 text-xs sm:text-sm text-center font-semibold' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthWrapper;
