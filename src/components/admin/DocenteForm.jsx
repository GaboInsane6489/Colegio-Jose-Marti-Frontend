import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PencilSquareIcon, PlusIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { FaInfoCircle } from 'react-icons/fa';

const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

/**
 * 🧑‍🏫 Formulario institucional para crear o editar docentes
 */
const DocenteForm = ({ onSubmit, initialValues = {}, modoEdicion = false, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (modoEdicion) {
      setNombre(initialValues.nombre || '');
      setEmail(initialValues.email || '');
      setPassword('');
    }
  }, [initialValues, modoEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim()) {
      return setError('Nombre y correo son obligatorios.');
    }

    if (!modoEdicion && !password.trim()) {
      return setError('La contraseña es obligatoria.');
    }

    if (!validarCorreo(email)) {
      return setError('Ingresa un correo válido.');
    }

    setError('');
    onSubmit({ nombre, correo: email.trim(), password: password.trim() });

    if (!modoEdicion) {
      setNombre('');
      setEmail('');
      setPassword('');
    }
  };

  const handleCancel = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setError('');
    onCancel?.();
  };

  return (
    <section className='flex justify-center px-4 py-6'>
      <div className='w-full max-w-2xl bg-[#0d0d0d] p-6 rounded-2xl shadow-2xl space-y-6'>
        {/* 🧠 Introducción institucional */}
        <div className='text-center text-white space-y-2'>
          <FaInfoCircle className='mx-auto h-6 w-6 sm:h-8 sm:w-8 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
          <p className='text-sm sm:text-base text-white/70 max-w-xl mx-auto'>
            Este formulario permite registrar o editar docentes en el sistema institucional. Los
            campos son obligatorios y validados automáticamente.
          </p>
        </div>

        {/* 📋 Formulario principal */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='w-full bg-black p-6 rounded-xl shadow-lg space-y-6 border border-white/20'
        >
          <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 text-center'>
            <h3 className='text-2xl font-bold text-white tracking-wide'>
              {modoEdicion ? 'Editar docente' : 'Crear nuevo docente'}
            </h3>
            <PencilSquareIcon className='h-6 w-6 text-[#00FFF7] drop-shadow-[0_0_4px_#00FFF7]' />
          </div>

          {error && (
            <div className='bg-red-600 text-white px-4 py-2 rounded-md text-sm text-center'>
              {error}
            </div>
          )}

          <div>
            <label htmlFor='nombre' className='block text-sm font-medium text-[#00FFF7] mb-1'>
              Nombre completo
            </label>
            <input
              id='nombre'
              type='text'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className='w-full bg-gray-900 text-white border border-white/20 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7]'
              placeholder='María González'
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-[#00FFF7] mb-1'>
              Correo electrónico
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-gray-900 text-white border border-white/20 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7]'
              placeholder='maria@colegio.edu.ve'
              required
            />
          </div>

          {!modoEdicion && (
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-[#00FFF7] mb-1'>
                Contraseña inicial
              </label>
              <input
                id='password'
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-gray-900 text-white border border-white/20 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00FFF7]'
                placeholder='Marti2025!'
                required
              />
            </div>
          )}

          <div className='flex flex-col sm:flex-row justify-center gap-4 pt-2'>
            <button
              type='submit'
              className='w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#00FFF7] to-[#00FF33] text-black px-6 py-2.5 rounded-full font-semibold text-sm transition duration-200 hover:opacity-90 shadow-md hover:shadow-xl'
            >
              <span>{modoEdicion ? 'Actualizar docente' : 'Crear docente'}</span>
              <PlusIcon className='h-5 w-5 text-black' />
            </button>

            {modoEdicion && (
              <button
                type='button'
                onClick={handleCancel}
                className='w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-2.5 rounded-full hover:bg-gray-600 transition font-medium shadow-sm'
              >
                <span>Cancelar</span>
                <ArrowUturnLeftIcon className='h-5 w-5 text-white' />
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default DocenteForm;
