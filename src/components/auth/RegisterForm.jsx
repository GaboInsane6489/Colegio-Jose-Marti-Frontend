import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const RegisterForm = ({ onRegistroExitoso, role = 'estudiante' }) => {
  const { register } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setCargando(true);

    try {
      const payload = { nombre, email, password, role };
      const res = await register(payload);

      const mensaje = res?.msg || 'Registro exitoso. Espera validación del administrador.';
      setSuccessMsg(mensaje);

      // Opcional: mantener alert como respaldo (puedes quitar esta línea si no lo quieres)
      alert(`✅ ${mensaje}`);

      onRegistroExitoso?.();
    } catch (err) {
      console.error('❌ Error en el registro:', err);
      setError(
        err.response?.data?.message ||
          'Hubo un problema al registrar. Verifica los datos ingresados.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <form
      onSubmit={handleRegistro}
      className='w-full max-w-xs sm:max-w-sm md:max-w-md bg-black p-5 sm:p-6 md:p-8 shadow-xl rounded-xl space-y-6 border border-white/20 animate-fadeIn mt-6 relative'
      aria-label='Formulario de registro de usuario'
    >
      {/* Banner de éxito institucional */}
      {successMsg && (
        <div
          className='absolute -top-10 left-0 right-0 mx-auto w-full max-w-md'
          role='status'
          aria-live='polite'
        >
          <div className='flex items-center justify-center gap-2 rounded-lg border border-[#00FFF7] bg-black px-4 py-2 shadow-lg'>
            <CheckCircleIcon className='h-5 w-5 text-[#00FF7F]' />
            <p className='text-xs sm:text-sm font-semibold text-white'>{successMsg}</p>
          </div>
        </div>
      )}

      <h2 className='text-base sm:text-lg font-semibold text-center text-white'>
        Registro de usuario
      </h2>

      <div className='flex justify-center'>
        <UserIcon className='h-8 w-8 sm:h-10 sm:w-10 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
      </div>

      {error && (
        <div
          id='registro-error'
          role='alert'
          aria-live='polite'
          className='bg-red-600 text-white px-4 py-2 rounded-md text-xs sm:text-sm text-center font-medium'
        >
          {error}
        </div>
      )}

      {/* Nombre */}
      <div className='w-full'>
        <label htmlFor='nombre' className='block text-xs sm:text-sm font-medium text-white mb-1'>
          Nombre completo
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <UserIcon className='h-5 w-5 text-[#00FFF7] drop-shadow-[0_0_4px_#00FFF7]' />
          </div>
          <input
            id='nombre'
            type='text'
            placeholder='Ej. María González'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-md text-xs sm:text-sm md:text-base bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#00FFF7] ${
              error ? 'border-red-400' : 'border-white/30'
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? 'registro-error' : undefined}
            required
          />
        </div>
      </div>

      {/* Email */}
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
            className={`w-full pl-10 pr-4 py-2 border rounded-md text-xs sm:text-sm md:text-base bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#00FFF7] ${
              error ? 'border-red-400' : 'border-white/30'
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? 'registro-error' : undefined}
            required
          />
        </div>
      </div>

      {/* Contraseña */}
      <div className='w-full'>
        <label htmlFor='password' className='block text-xs sm:text-sm font-medium text-white mb-1'>
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
            className={`w-full pl-10 pr-4 py-2 border rounded-md text-xs sm:text-sm md:text-base bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#00FFF7] ${
              error ? 'border-red-400' : 'border-white/30'
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? 'registro-error' : undefined}
            required
          />
        </div>
      </div>

      <button
        type='submit'
        disabled={cargando}
        className={`w-full py-2 rounded-md font-semibold text-xs sm:text-sm md:text-base border transition ${
          cargando
            ? 'bg-gray-500 text-white cursor-not-allowed border-gray-500'
            : 'bg-black text-[#00FFF7] border-[#00FFF7] hover:brightness-125 hover:drop-shadow-[0_0_8px_#00FFF7]'
        }`}
        aria-label='Enviar registro'
      >
        {cargando ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default RegisterForm;
