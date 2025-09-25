import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Función auxiliar para leer cookies
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Verifica sesión si ya hay token
  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3000/api/auth/ping", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { role } = res.data;

        localStorage.setItem("userRole", role);
        document.cookie = `userRole=${role}; path=/`;
        setRole(role);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "docente") {
          navigate("/docente/dashboard");
        } else if (role === "estudiante") {
          navigate("/estudiante/dashboard");
        }
      } catch (error) {
        console.error("❌ Error al verificar sesión:", error);
      }
    };

    const storedRole =
      localStorage.getItem("userRole") || getCookie("userRole");
    if (storedRole) setRole(storedRole);

    verificarSesion();
  }, [navigate]);

  // ✅ Maneja el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);

      // ✅ Verifica sesión inmediatamente después del login
      const ping = await axios.get("http://localhost:3000/api/auth/ping", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { role } = ping.data;
      localStorage.setItem("userRole", role);
      document.cookie = `userRole=${role}; path=/`;
      setRole(role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "docente") {
        navigate("/docente/dashboard");
      } else if (role === "estudiante") {
        navigate("/estudiante/dashboard");
      }
    } catch (error) {
      console.error("❌ Error en el login:", error);
      alert("Credenciales inválidas o cuenta no validada.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Acceso a la plataforma</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-4 shadow-md rounded space-y-4"
      >
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </button>
      </form>

      {!role && (
        <p className="text-gray-600 mt-4">
          Cargando información del usuario...
        </p>
      )}
    </div>
  );
};

export default Login;
