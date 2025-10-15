import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PencilSquareIcon,
  PlusIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

const DocenteForm = ({
  onSubmit,
  initialValues = {},
  modoEdicion = false,
  onCancel,
}) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (modoEdicion) {
      setNombre(initialValues.nombre || "");
      setCorreo(initialValues.correo || "");
    }
  }, [initialValues, modoEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      return setError("Todos los campos son obligatorios.");
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!correoValido) {
      return setError("Ingresa un correo válido.");
    }

    setError("");
    onSubmit({ nombre, correo, password, rol: "docente" });

    if (!modoEdicion) {
      setNombre("");
      setCorreo("");
      setPassword("");
    }
  };

  return (
    <section className="flex justify-center px-4">
      <div className="w-full max-w-xl">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-800 flex justify-center items-center gap-2">
            <PencilSquareIcon className="h-6 w-6 text-gray-700" />
            {modoEdicion ? "Editar docente" : "Crear nuevo docente"}
          </h3>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ej. María González"
              autoFocus
              required
            />
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ej. maria@colegio.edu.ve"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña inicial
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ej. Marti2025!"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition font-medium shadow-sm"
            >
              <span>
                {modoEdicion ? "Actualizar docente" : "Crear docente"}
              </span>
              <PlusIcon className="h-5 w-5" />
            </button>

            {modoEdicion && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-2.5 rounded-md hover:bg-gray-300 transition font-medium shadow-sm"
              >
                <span>Cancelar</span>
                <ArrowUturnLeftIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default DocenteForm;
