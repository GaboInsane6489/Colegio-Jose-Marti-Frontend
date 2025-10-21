import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario, pingUsuario } from "../../services/authService";
import InputField from "../shared/InputField";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

/**
 * 🔐 Formulario de login institucional
 * Permite acceso universal por correo y contraseña.
 * Redirige según rol: admin, docente, estudiante.
 */
const LoginForm = ({ setRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mantenerSesion, setMantenerSesion] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUsuario(email, password);
      const { token } = res.data;

      if (mantenerSesion) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      const pingRes = await pingUsuario(token);
      const { role } = pingRes.data;

      localStorage.setItem("userRole", role);
      document.cookie = `userRole=${role}; path=/`;
      setRole(role);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "docente") navigate("/docente/dashboard");
      else navigate("/estudiante/dashboard");
    } catch (err) {
      console.error("❌ Error en el login:", err);
      setError("Credenciales inválidas o cuenta no validada.");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 px-4 shadow-md rounded-xl space-y-5 border border-gray-200"
        aria-label="Formulario de inicio de sesión"
      >
        <h2 className="text-lg font-semibold text-center text-gray-800 flex items-center justify-center gap-2">
          <UserIcon className="h-5 w-5 text-gray-600" />
          Iniciar sesión
        </h2>

        {error && (
          <div
            id="login-error"
            className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm text-center"
          >
            {error}
          </div>
        )}

        <InputField
          id="email"
          label="Correo institucional"
          type="email"
          placeholder="Ej. maria@colegio.edu.ve"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
          aria-invalid={!!error}
          aria-describedby={error ? "login-error" : undefined}
          className={error ? "border-red-400" : ""}
        />
        <InputField
          id="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
          aria-invalid={!!error}
          aria-describedby={error ? "login-error" : undefined}
          className={error ? "border-red-400" : ""}
        />

        {/* ✅ Mantener sesión iniciada */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            id="mantenerSesion"
            checked={mantenerSesion}
            onChange={(e) => setMantenerSesion(e.target.checked)}
            className="accent-gray-800"
          />
          <label htmlFor="mantenerSesion">Mantener sesión iniciada</label>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2.5 rounded-md hover:bg-gray-800 transition font-medium"
          aria-label="Acceder al sistema"
        >
          Acceder
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
