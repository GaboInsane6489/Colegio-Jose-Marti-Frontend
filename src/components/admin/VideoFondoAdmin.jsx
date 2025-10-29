import React from "react";

/**
 * 🎥 Componente institucional para mostrar video de fondo en el panel del administrador
 */
const VideoFondoAdmin = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {/* 🎥 Video institucional para el panel del administrador */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source
          src="https://cdn.pixabay.com/video/2022/10/22/136081-764371377_large.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* 🧱 Capa de oscurecimiento intermedia */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  );
};

export default VideoFondoAdmin;
