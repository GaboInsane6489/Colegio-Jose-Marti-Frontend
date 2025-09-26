import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, ping } from "../../services/authService";
import { getCookie } from "../../utils/cookieUtils";
import InputField from "../shared/InputField";

const LoginForm = ({ setRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      const { token } = res.data;
      localStorage.setItem("token", token);

      const pingRes = await ping(token);
      const { role } = pingRes.data;

      localStorage.setItem("userRole", role);
      document.cookie = `userRole=${role}; path=/`;
      setRole(role);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "docente") navigate("/docente/dashboard");
      else if (role === "estudiante") navigate("/estudiante/dashboard");
    } catch (error) {
      console.error("❌ Error en el login:", error);
      alert("Credenciales inválidas o cuenta no validada.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm bg-white p-4 shadow-md rounded space-y-4"
    >
      <InputField
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
