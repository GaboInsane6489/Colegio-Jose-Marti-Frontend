import React from "react";

const VideoFondoEstudiante = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {/* 🎥 Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source
          src="https://cdn.pixabay.com/video/2021/04/06/70216-533814725_large.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* 🧱 Capa de oscurecimiento intermedia */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  );
};

export default VideoFondoEstudiante;
