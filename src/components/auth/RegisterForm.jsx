import { useState } from "react";
import { registerUsuario } from "@/services/authService";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

/**
 * 📝 Formulario de registro institucional
 * Crea usuario con rol "estudiante" y estado pendiente de validación.
 */
const RegisterForm = ({ onRegistroExitoso }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUsuario(nombre, email, password);
      alert("✅ Registro exitoso. Espera validación del administrador.");
      onRegistroExitoso();
    } catch (err) {
      console.error("❌ Error en el registro:", err);
      setError(
        err.response?.data?.message ||
          "Hubo un problema al registrar. Verifica los datos."
      );
    }
  };

  return (
    <form
      onSubmit={handleRegistro}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white p-5 sm:p-6 md:p-8 shadow-lg rounded-xl space-y-5 border border-black animate-fadeIn mt-6"
      aria-label="Formulario de registro de usuario"
    >
      <h2 className="text-base sm:text-lg font-semibold text-center text-black flex items-center justify-center gap-2">
        <UserIcon className="h-5 w-5 text-black" />
        Registro de usuario
      </h2>

      {error && (
        <div
          id="registro-error"
          className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-xs sm:text-sm text-center"
        >
          {error}
        </div>
      )}

      {/* Nombre */}
      <div className="w-full">
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-black mb-1"
        >
          Nombre completo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. María González"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-gray-800 ${
              error ? "border-red-400" : "border-black"
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? "registro-error" : undefined}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black mb-1"
        >
          Correo institucional
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="email"
            type="email"
            placeholder="Ej. maria@colegio.edu.ve"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-gray-800 ${
              error ? "border-red-400" : "border-black"
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? "registro-error" : undefined}
            required
          />
        </div>
      </div>

      {/* Contraseña */}
      <div className="w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black mb-1"
        >
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-gray-800 ${
              error ? "border-red-400" : "border-black"
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? "registro-error" : undefined}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-300 hover:text-black transition font-medium text-sm sm:text-base"
        aria-label="Enviar registro"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
