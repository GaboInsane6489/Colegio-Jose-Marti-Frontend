import { useState } from "react";

const NotaForm = ({ nota, onClose, onSave }) => {
  const [calificacion, setCalificacion] = useState(nota.calificacion || "");
  const [retroalimentacion, setRetroalimentacion] = useState(
    nota.retroalimentacion || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const notaNum = parseFloat(calificacion);
    if (isNaN(notaNum) || notaNum < 0 || notaNum > 100) {
      setError("La nota debe estar entre 0 y 100.");
      return;
    }

    const notaActualizada = {
      ...nota,
      calificacion: notaNum,
      retroalimentacion: retroalimentacion.trim(),
    };

    onSave(notaActualizada);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">✏️ Editar Nota</h2>

        <div>
          <label className="block text-sm font-medium mb-1">
            📊 Calificación
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            💬 Retroalimentación
          </label>
          <textarea
            value={retroalimentacion}
            onChange={(e) => setRetroalimentacion(e.target.value)}
            rows={3}
            placeholder="Comentario opcional para el estudiante"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotaForm;
