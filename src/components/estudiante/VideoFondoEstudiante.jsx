import React from 'react';

/**
 * 🎥 Componente institucional para mostrar video de fondo en el panel del estudiante
 */
const VideoFondoEstudiante = () => {
  return (
    <div className='fixed inset-0 z-0'>
      {/* 🎥 Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className='min-w-full min-h-full aspect-video object-fill pointer-events-none'
      >
        <source
          src='https://cdn.pixabay.com/video/2023/11/12/188778-883818276_large.mp4'
          type='video/mp4'
        />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* 🧱 Capa de oscurecimiento intermedia */}
      <div className='absolute inset-0 bg-black opacity-30 pointer-events-none'></div>
    </div>
  );
};

export default VideoFondoEstudiante;
