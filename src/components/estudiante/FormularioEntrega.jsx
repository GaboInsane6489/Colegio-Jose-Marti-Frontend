import { useState } from 'react';
import axiosInstancia from '@/services/axiosInstancia';
import { PaperAirplaneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const FormularioEntrega = ({ actividadId, onEntregaExitosa }) => {
  const [texto, setTexto] = useState('');
  const [enlace, setEnlace] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje('');

    if (!actividadId || typeof actividadId !== 'string') {
      console.warn('❌ ID de actividad inválido o ausente:', actividadId);
      setMensaje('No se puede enviar la entrega. ID de actividad inválido.');
      setEnviando(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('texto', texto);
      formData.append('enlace', enlace);
      if (archivo) formData.append('archivo', archivo);

      console.log('📤 Enviando entrega con datos:', {
        actividadId,
        texto,
        enlace,
        archivoNombre: archivo?.name || null,
      });

      const res = await axiosInstancia.post(
        `/api/estudiante/actividad/${actividadId}/entrega`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('✅ Respuesta del backend al enviar entrega:', res.data);

      if (res.data?.entrega) {
        setMensaje('Entrega enviada correctamente.');
        setTexto('');
        setEnlace('');
        setArchivo(null);
        onEntregaExitosa?.(res.data.entrega);
      } else {
        console.warn('⚠️ El backend no devolvió una entrega válida:', res.data);
        setMensaje('La entrega fue enviada pero no se recibió confirmación.');
      }
    } catch (error) {
      console.error('❌ Error al enviar entrega:', error.message, error);
      setMensaje('No se pudo enviar la entrega. Intenta nuevamente.');
    } finally {
      setEnviando(false);
      console.log('⏹️ Finalizó envío de entrega. Estado:', {
        enviando: false,
        mensaje,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white/5 border border-white/20 p-6 rounded-lg space-y-4'
    >
      <h3 className='text-lg font-semibold text-white'>Enviar entrega</h3>

      {mensaje && <p className='text-sm text-center text-yellow-400 font-medium'>{mensaje}</p>}

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Escribe tu respuesta o comentarios...'
        className='w-full bg-black text-white border border-white/30 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400'
        rows={4}
      />

      <input
        type='url'
        value={enlace}
        onChange={(e) => setEnlace(e.target.value)}
        placeholder='Enlace externo (opcional)'
        className='w-full bg-black text-white border border-white/30 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
      />

      <input
        type='file'
        onChange={(e) => setArchivo(e.target.files[0])}
        className='w-full text-sm text-white file:bg-yellow-400 file:text-black file:rounded file:px-4 file:py-2 file:mr-4 file:cursor-pointer'
      />

      <button
        type='submit'
        disabled={enviando}
        className='bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition flex items-center gap-2 justify-center disabled:opacity-50'
      >
        {enviando ? (
          <>
            <PaperAirplaneIcon className='w-5 h-5 animate-pulse' />
            Enviando...
          </>
        ) : (
          <>
            <CheckCircleIcon className='w-5 h-5' />
            Enviar entrega
          </>
        )}
      </button>
    </form>
  );
};

export default FormularioEntrega;
