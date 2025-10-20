import { useState } from "react";
import { registerUsuario } from "../../services/authService";
import InputField from "../shared/InputField";
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
  const [email, setEmail] = useState(""); // 🔄 Renombrado para coincidir con backend
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
      className="w-full max-w-sm bg-white p-6 shadow-md rounded-xl space-y-5 border border-gray-200 mt-6"
    >
      <h2 className="text-lg font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
        <UserIcon className="h-5 w-5 text-gray-600" />
        Registro de usuario
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm text-center">
          {error}
        </div>
      )}

      <InputField
        id="nombre"
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        icon={<UserIcon className="h-5 w-5 text-gray-400" />}
      />
      <InputField
        id="email"
        type="email"
        placeholder="Correo institucional"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
      />
      <InputField
        id="password"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 transition font-medium"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
