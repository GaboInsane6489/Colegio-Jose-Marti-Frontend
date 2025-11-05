import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../../services/authService';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

/**
 * 🔐 Formulario de login institucional
 * Permite acceso universal por correo y contraseña.
 * Redirige según rol: admin, docente, estudiante.
 */
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mantenerSesion, setMantenerSesion] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // 🔄 Limpieza de sesión previa
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // ✅ Login con sesión persistente
      const { token, role, usuario } = await loginUsuario(email, password, mantenerSesion);

      if (!token || !role || !usuario) {
        throw new Error('Token, rol o usuario no recibido. Verifica credenciales o validación.');
      }

      // 🚀 Redirigir según rol (después de guardar sesión en authService.js)
      setTimeout(() => {
        navigate(`/${role}/dashboard`);
      }, 100); // ⏳ Pequeño delay para asegurar que el interceptor lea el token
    } catch (err) {
      console.error('❌ Error en el login:', err);

      // 🧼 Limpieza defensiva si el login falla
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      setError('Credenciales inválidas o cuenta no validada.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <form
        onSubmit={handleLogin}
        className='w-full max-w-xs sm:max-w-sm md:max-w-md bg-white p-5 sm:p-6 md:p-8 shadow-lg rounded-xl space-y-5 border border-black animate-fadeIn'
        aria-label='Formulario de inicio de sesión'
      >
        <h2 className='text-sm sm:text-base md:text-lg font-semibold text-center text-black mb-2'>
          Iniciar sesión
        </h2>

        <div className='flex justify-center mb-4'>
          <UserIcon className='h-8 w-8 text-black' />
        </div>

        {error && (
          <div
            id='login-error'
            className='bg-red-100 text-red-700 px-4 py-2 rounded-md text-xs sm:text-sm text-center'
          >
            {error}
          </div>
        )}

        <div className='w-full'>
          <label htmlFor='email' className='block text-sm font-medium text-black mb-1'>
            Correo institucional
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <EnvelopeIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              id='email'
              type='email'
              placeholder='Ej. maria@colegio.edu.ve'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-gray-800 ${
                error ? 'border-red-400' : 'border-black'
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? 'login-error' : undefined}
              required
            />
          </div>
        </div>

        <div className='w-full'>
          <label htmlFor='password' className='block text-sm font-medium text-black mb-1'>
            Contraseña
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <LockClosedIcon className='h-5 w-5 text-gray-500' />
            </div>
            <input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-gray-800 ${
                error ? 'border-red-400' : 'border-black'
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? 'login-error' : undefined}
              required
            />
          </div>
        </div>

        <div className='flex items-center gap-2 text-xs sm:text-sm text-gray-700'>
          <input
            type='checkbox'
            id='mantenerSesion'
            checked={mantenerSesion}
            onChange={(e) => setMantenerSesion(e.target.checked)}
            className='accent-gray-800'
          />
          <label htmlFor='mantenerSesion'>Mantener sesión iniciada</label>
        </div>

        <button
          type='submit'
          disabled={cargando}
          className={`w-full py-2 rounded-md font-medium text-sm sm:text-base transition ${
            cargando
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-300 hover:text-black'
          }`}
          aria-label='Acceder al sistema'
        >
          {cargando ? 'Ingresando...' : 'Acceder'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
