import { useState } from "react";
import axios from "axios";
import { FaPen, FaSave, FaTimesCircle } from "react-icons/fa";

const NotaForm = ({ entrega, onClose, onEdit }) => {
  const [calificacion, setCalificacion] = useState(entrega.calificacion ?? "");
  const [comentarioDocente, setComentarioDocente] = useState(
    entrega.comentarioDocente ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/entregas/${entrega._id}`,
        { calificacion, comentarioDocente },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.ok) {
        onEdit(res.data.entrega);
        onClose();
      } else {
        setError(res.data.msg || "Error al actualizar la nota");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-900 rounded-xl shadow-lg p-6 space-y-6 max-w-md mx-auto"
    >
      {/* Título */}
      <div className="flex items-center justify-center gap-2 text-lg font-bold text-blue-700">
        <FaPen />
        <h3>Editar Nota</h3>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Calificación */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Calificación (0–20)
        </label>
        <input
          type="number"
          min="0"
          max="20"
          step="0.1"
          value={calificacion}
          onChange={(e) => setCalificacion(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>

      {/* Comentario */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Comentario
        </label>
        <textarea
          value={comentarioDocente}
          onChange={(e) => setComentarioDocente(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Observaciones o retroalimentación..."
        />
      </div>

      {/* Botones */}
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <FaTimesCircle />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-500 transition"
        >
          <FaSave />
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};

export default NotaForm;
