import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario, pingUsuario } from "../../services/authService";
import InputField from "../shared/InputField";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const LoginForm = ({ setRole }) => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUsuario(correo, password);
      const { token } = res.data;
      localStorage.setItem("token", token);

      const pingRes = await pingUsuario(token);
      const { role } = pingRes.data;

      localStorage.setItem("userRole", role);
      document.cookie = `userRole=${role}; path=/`;
      setRole(role);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "docente") navigate("/docente/dashboard");
      else if (role === "estudiante") navigate("/estudiante/dashboard");
    } catch (err) {
      console.error("❌ Error en el login:", err);
      setError("Credenciales inválidas o cuenta no validada.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm bg-white p-6 shadow-md rounded-xl space-y-5 border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
        <UserIcon className="h-5 w-5 text-gray-600" />
        Iniciar sesión
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm text-center">
          {error}
        </div>
      )}

      <InputField
        id="correo"
        label="Correo institucional"
        type="email"
        placeholder="Ej. maria@colegio.edu.ve"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
      />
      <InputField
        id="password"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
      />

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2.5 rounded-md hover:bg-gray-800 transition font-medium"
      >
        Acceder
      </button>
    </form>
  );
};

export default LoginForm;
