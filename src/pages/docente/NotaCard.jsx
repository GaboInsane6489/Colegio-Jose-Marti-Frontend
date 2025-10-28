const NotaCard = ({ nota, onEditar }) => {
  const {
    actividad,
    estudianteNombre,
    estado,
    calificacion,
    retroalimentacion,
  } = nota;

  const estadoColor = {
    entregado: "bg-yellow-500",
    revisado: "bg-green-600",
    pendiente: "bg-red-500",
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-lg border border-white/20 space-y-3 shadow-md hover:shadow-lg transition">
      {/* Título de actividad */}
      <h3 className="text-xl font-semibold text-white">
        📝 {actividad?.titulo || "Sin título"}
      </h3>

      {/* Estudiante */}
      <p className="text-white/80 text-sm">
        👤{" "}
        <span className="font-medium">{estudianteNombre || "Estudiante"}</span>
      </p>

      {/* Estado */}
      <div
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
          estadoColor[estado] || "bg-gray-600"
        }`}
      >
        {estado?.charAt(0).toUpperCase() + estado?.slice(1)}
      </div>

      {/* Nota */}
      <p className="text-white text-lg font-bold">
        📊 Nota: {calificacion !== undefined ? calificacion : "—"}
      </p>

      {/* Retroalimentación */}
      {retroalimentacion && (
        <p className="text-white/70 text-sm italic">💬 "{retroalimentacion}"</p>
      )}

      {/* Botón editar */}
      <div className="pt-2">
        <button
          onClick={onEditar}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-medium transition"
        >
          ✏️ Editar nota
        </button>
      </div>
    </div>
  );
};

export default NotaCard;
