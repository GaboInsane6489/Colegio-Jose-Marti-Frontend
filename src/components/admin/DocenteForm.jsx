import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PencilSquareIcon,
  PlusIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

const validarCorreo = (correo) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

const DocenteForm = ({
  onSubmit,
  initialValues = {},
  modoEdicion = false,
  onCancel,
}) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (modoEdicion) {
      setNombre(initialValues.nombre || "");
      setEmail(initialValues.email || "");
      setPassword(""); // 👈 no se precarga por seguridad
    }
  }, [initialValues, modoEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim()) {
      return setError("Nombre y correo son obligatorios.");
    }

    if (!modoEdicion && !password.trim()) {
      return setError("La contraseña es obligatoria.");
    }

    if (!validarCorreo(email)) {
      return setError("Ingresa un correo válido.");
    }

    setError("");
    onSubmit({ nombre, correo: email.trim(), password: password.trim() });

    if (!modoEdicion) {
      setNombre("");
      setEmail("");
      setPassword("");
    }
  };

  const handleCancel = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setError("");
    onCancel?.();
  };

  return (
    <section className="flex justify-center px-4 py-6">
      <div className="w-full max-w-xl">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-black p-6 rounded-xl shadow-lg space-y-6 border border-white"
        >
          <h3 className="text-xl font-semibold text-white flex justify-center items-center gap-2">
            <PencilSquareIcon className="h-6 w-6 text-white" />
            {modoEdicion ? "Editar docente" : "Crear nuevo docente"}
          </h3>

          {error && (
            <div className="bg-red-600 text-white px-4 py-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-white mb-1"
            >
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-gray-900 text-white border border-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white transition"
              placeholder="María González"
              autoFocus
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 text-white border border-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white transition"
              placeholder="maria@colegio.edu.ve"
              required
            />
          </div>

          {!modoEdicion && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-1"
              >
                Contraseña inicial
              </label>
              <input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 text-white border border-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white transition"
                placeholder="Marti2025!"
                required
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-md transition font-medium shadow-sm bg-[#1e3a8a] hover:bg-[#3749a3] text-white"
            >
              <span>
                {modoEdicion ? "Actualizar docente" : "Crear docente"}
              </span>
              <PlusIcon className="h-5 w-5 text-white" />
            </button>

            {modoEdicion && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-2.5 rounded-md hover:bg-gray-600 transition font-medium shadow-sm"
              >
                <span>Cancelar</span>
                <ArrowUturnLeftIcon className="h-5 w-5 text-white" />
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default DocenteForm;
