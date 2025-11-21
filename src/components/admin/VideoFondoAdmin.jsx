import React from 'react';

/**
 * 🎥 Componente institucional para mostrar video de fondo en el panel del administrador
 */
const VideoFondoAdmin = ({
  srcVideo = 'https://cdn.pixabay.com/video/2019/07/24/25477-350507890_large.mp4',
}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-0 pointer-events-none'>
      {/* 🎥 Video institucional para el panel del administrador */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload='metadata'
        aria-hidden='true'
        className='w-full h-full object-cover brightness-75'
      >
        <source src={srcVideo} type='video/mp4' />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* 🧱 Capa de oscurecimiento intermedia */}
      <div className='absolute inset-0 bg-black opacity-30' aria-hidden='true'></div>
    </div>
  );
};

export default VideoFondoAdmin;
