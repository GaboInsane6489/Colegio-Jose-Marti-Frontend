/**
 * 🎥 Componente institucional para mostrar video de fondo en el panel del docente
 */
const VideoFondoDocente = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {/* 🎥 Video institucional para el panel del docente */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source
          src="https://cdn.pixabay.com/video/2023/09/27/182592-868916643_large.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* 🧱 Capa de oscurecimiento intermedia */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  );
};

export default VideoFondoDocente;
