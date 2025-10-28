import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const EntregasForm = ({ actividad, actualizarEntregas }) => {
  const [archivoUrl, setArchivoUrl] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivoUrl.trim()) {
      setFeedback({
        tipo: "error",
        mensaje: "Debes ingresar la URL del archivo.",
      });
      return;
    }

    setEnviando(true);
    setFeedback(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/entregas`,
        {
          actividadId: actividad._id,
          archivoUrl: archivoUrl.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedback({
        tipo: "exito",
        mensaje: "Entrega registrada correctamente.",
      });
      setArchivoUrl("");

      // 🆕 Actualizar entregas en la vista
      const nuevaEntrega = res.data.entrega;
      actualizarEntregas((prev) => [nuevaEntrega, ...prev]);
    } catch (error) {
      console.error("❌ Error al enviar entrega:", error);
      setFeedback({
        tipo: "error",
        mensaje: error.response?.data?.msg || "Error al registrar entrega.",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/5 border border-white/20 rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white text-center">
        Entregar actividad:{" "}
        <span className="text-yellow-300">{actividad.titulo}</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="URL del archivo (Google Drive, Dropbox, etc.)"
          value={archivoUrl}
          onChange={(e) => setArchivoUrl(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black text-white border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          disabled={enviando}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition disabled:opacity-50"
        >
          <FaPaperPlane />
          {enviando ? "Enviando..." : "Enviar entrega"}
        </button>
      </form>

      {feedback && (
        <div
          className={`text-sm text-center px-4 py-2 rounded ${
            feedback.tipo === "exito"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {feedback.mensaje}
        </div>
      )}
    </motion.section>
  );
};

export default EntregasForm;
