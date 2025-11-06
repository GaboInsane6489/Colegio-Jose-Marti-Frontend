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
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      const { token, role, usuario } = await loginUsuario(email, password, mantenerSesion);

      if (!token || !role || !usuario) {
        throw new Error('Token, rol o usuario no recibido. Verifica credenciales o validación.');
      }

      setTimeout(() => {
        navigate(`/${role}/dashboard`);
      }, 100);
    } catch (err) {
      console.error('❌ Error en el login:', err);
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
        className='w-full max-w-xs sm:max-w-sm md:max-w-md bg-black border border-white p-6 sm:p-7 md:p-8 shadow-2xl rounded-xl space-y-6 animate-fadeIn'
        aria-label='Formulario de inicio de sesión'
      >
        <h2 className='text-lg sm:text-xl font-bold text-center text-white font-[Orbitron]'>
          Iniciar sesión
        </h2>

        <div className='flex justify-center'>
          <UserIcon className='h-8 w-8 text-white' />
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
          <label htmlFor='email' className='block text-sm font-medium text-white mb-1'>
            Correo institucional
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <EnvelopeIcon className='h-5 w-5 text-black' />
            </div>
            <input
              id='email'
              type='email'
              placeholder='Ej. maria@colegio.edu.ve'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base bg-black text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white ${
                error ? 'border-red-400' : 'border-white'
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? 'login-error' : undefined}
              required
            />
          </div>
        </div>

        <div className='w-full'>
          <label htmlFor='password' className='block text-sm font-medium text-white mb-1'>
            Contraseña
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <LockClosedIcon className='h-5 w-5 text-black' />
            </div>
            <input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base bg-black text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white ${
                error ? 'border-red-400' : 'border-white'
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? 'login-error' : undefined}
              required
            />
          </div>
        </div>

        <div className='flex items-center gap-2 text-xs sm:text-sm text-white/70'>
          <input
            type='checkbox'
            id='mantenerSesion'
            checked={mantenerSesion}
            onChange={(e) => setMantenerSesion(e.target.checked)}
            className='accent-white'
          />
          <label htmlFor='mantenerSesion'>Mantener sesión iniciada</label>
        </div>

        <button
          type='submit'
          disabled={cargando}
          className={`w-full py-2 rounded-md font-semibold text-sm sm:text-base border transition ${
            cargando
              ? 'bg-gray-500 text-white cursor-not-allowed border-gray-500'
              : 'bg-black text-white border-white hover:bg-white hover:text-black'
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
