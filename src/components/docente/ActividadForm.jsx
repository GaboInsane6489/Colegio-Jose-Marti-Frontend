import { useState } from "react";
import axiosInstancia from "@/services/axiosInstancia";
import { jwtDecode } from "jwt-decode";

/**
 * 📝 Formulario institucional para crear actividad académica
 */
const ActividadForm = ({ cursoId, onActividadCreada }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "tarea",
    fechaEntrega: "",
    ponderacion: 0,
    materia: "",
    lapso: "",
    recursos: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const tipos = ["tarea", "proyecto", "examen", "otro"];
  const materias = ["Matemáticas", "Lengua", "Historia", "Ciencias", "Arte"];
  const lapsos = ["Lapso 1", "Lapso 2", "Lapso 3"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const hoy = new Date();
    const entrega = new Date(formData.fechaEntrega);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("❌ No se encontró token de autenticación.");
      setLoading(false);
      return;
    }

    let docenteId;
    try {
      const decoded = jwtDecode(token);
      docenteId = decoded.id || decoded._id;
    } catch {
      setError("❌ Token inválido o no contiene ID de usuario.");
      setLoading(false);
      return;
    }

    if (!formData.materia || !formData.lapso) {
      setError("⚠️ La materia y el lapso son obligatorios.");
      setLoading(false);
      return;
    }

    if (entrega < hoy) {
      setError("⚠️ La fecha de entrega no puede ser anterior al día actual.");
      setLoading(false);
      return;
    }

    if (formData.ponderacion < 0 || formData.ponderacion > 100) {
      setError("⚠️ La ponderación debe estar entre 0 y 100.");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      cursoId,
      docenteId,
    };

    console.log("📤 Enviando actividad al backend:", payload);

    try {
      const { data } = await axiosInstancia.post("/api/actividades", payload);

      console.log("📥 Respuesta del backend:", data);

      if (typeof onActividadCreada === "function" && data?.actividad) {
        onActividadCreada(data.actividad);
      } else {
        console.warn("⚠️ No se recibió actividad válida del backend.");
      }

      setFormData({
        titulo: "",
        descripcion: "",
        tipo: "tarea",
        fechaEntrega: "",
        ponderacion: 0,
        materia: "",
        lapso: "",
        recursos: [],
      });
    } catch (err) {
      console.error("❌ Error al crear actividad:", err);
      setError(
        err.response?.data?.msg || "❌ Error al registrar la actividad."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-white p-8 rounded-xl shadow-lg font-[Inter] space-y-6"
    >
      <h2 className="text-2xl font-semibold tracking-wide mb-2">
        📝 Nueva Actividad
      </h2>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Campos del formulario */}
      {[
        { label: "📌 Título", name: "titulo", type: "text" },
        { label: "🗒️ Descripción", name: "descripcion", type: "textarea" },
        { label: "📂 Tipo", name: "tipo", type: "select", options: tipos },
        { label: "📅 Fecha de entrega", name: "fechaEntrega", type: "date" },
        {
          label: "🎯 Ponderación (%)",
          name: "ponderacion",
          type: "number",
          min: 0,
          max: 100,
        },
        {
          label: "📘 Materia",
          name: "materia",
          type: "select",
          options: materias,
        },
        {
          label: "📆 Lapso académico",
          name: "lapso",
          type: "select",
          options: lapsos,
        },
      ].map(({ label, name, type, ...rest }) => (
        <div key={name} className="space-y-2">
          <label className="block text-sm font-medium">{label}</label>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full bg-white text-black px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          ) : type === "select" ? (
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              required
            >
              <option value="">Selecciona una opción</option>
              {rest.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              {...rest}
              required
            />
          )}
        </div>
      ))}

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-6 py-2 rounded-full transition font-semibold hover:bg-white/90"
        >
          {loading ? "⏳ Creando..." : "✅ Crear Actividad"}
        </button>
      </div>
    </form>
  );
};

export default ActividadForm;
