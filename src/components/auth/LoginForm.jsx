import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // ✅ usar export default del hook
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ usar la función login del hook
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
      const { token, role, isValidated } = await login(email, password, mantenerSesion);

      if (!token || !role) {
        throw new Error('Token o rol no recibido.');
      }

      if (!isValidated) {
        setError('Tu cuenta aún no ha sido validada por un administrador.');
        return;
      }

      navigate(`/${role}/dashboard`);
    } catch (err) {
      console.error('❌ Error en el login:', err);
      setError('Credenciales inválidas. Verifica tu correo y contraseña.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <form
        onSubmit={handleLogin}
        className='w-full max-w-xs sm:max-w-sm md:max-w-md bg-black border border-white/20 p-6 sm:p-7 md:p-8 shadow-2xl rounded-xl space-y-6 animate-fadeIn'
        aria-label='Formulario de inicio de sesión'
      >
        <h2 className='text-base sm:text-lg md:text-xl font-bold text-center text-white font-[Orbitron] drop-shadow-[0_0_6px_#00FFF7]'>
          Iniciar sesión
        </h2>

        <div className='flex justify-center'>
          <UserIcon className='h-7 w-7 sm:h-8 sm:w-8 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
        </div>

        {error && (
          <div
            id='login-error'
            role='alert'
            aria-live='polite'
            className='bg-red-600 text-white px-4 py-2 rounded-md text-xs sm:text-sm text-center font-medium'
          >
            {error}
          </div>
        )}

        <div className='w-full'>
          <label htmlFor='email' className='block text-xs sm:text-sm font-medium text-white mb-1'>
            Correo institucional
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <EnvelopeIcon className='h-5 w-5 text-[#00FFF7] drop-shadow-[0_0_4px_#00FFF7]' />
            </div>
            <input
              id='email'
              type='email'
              placeholder='Ej. maria@colegio.edu.ve'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-xs sm:text-sm md:text-base bg-black text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] ${
                error ? 'border-red-400' : 'border-white/30'
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? 'login-error' : undefined}
              required
            />
          </div>
        </div>

        <div className='w-full'>
          <label
            htmlFor='password'
            className='block text-xs sm:text-sm font-medium text-white mb-1'
          >
            Contraseña
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <LockClosedIcon className='h-5 w-5 text-[#00FFF7] drop-shadow-[0_0_4px_#00FFF7]' />
            </div>
            <input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-xs sm:text-sm md:text-base bg-black text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#00FFF7] ${
                error ? 'border-red-400' : 'border-white/30'
              }`}
              aria-invalid={!!error}
              aria-describedby={error ? 'login-error' : undefined}
              required
            />
          </div>
        </div>

        <div className='flex items-center gap-3 text-xs sm:text-sm text-white/80'>
          <input
            type='checkbox'
            id='mantenerSesion'
            checked={mantenerSesion}
            onChange={(e) => setMantenerSesion(e.target.checked)}
            className='h-4 w-4 rounded-sm bg-[#0f0f0f] border border-[#00FFF7]/40 text-[#00FFF7] focus:ring-[#00FFF7] focus:outline-none drop-shadow-[0_0_4px_#00FFF7]'
          />
          <label htmlFor='mantenerSesion' className='cursor-pointer'>
            Mantener sesión iniciada
          </label>
        </div>

        <button
          type='submit'
          disabled={cargando}
          className={`w-full py-2 rounded-md font-semibold text-xs sm:text-sm md:text-base border transition ${
            cargando
              ? 'bg-gray-500 text-white cursor-not-allowed border-gray-500'
              : 'bg-black text-[#00FFF7] border-[#00FFF7] hover:brightness-125 hover:drop-shadow-[0_0_8px_#00FFF7]'
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
