import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pingUsuario } from "../../services/authService";
import { getCookie } from "../../utils/cookieUtils";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

/**
 * 🧭 Componente envolvente para login y registro
 * Verifica sesión activa y redirige según rol.
 * Alterna entre formulario de login y registro.
 */
const AuthWrapper = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await pingUsuario(token);
        const { role } = res.data;

        localStorage.setItem("userRole", role);
        document.cookie = `userRole=${role}; path=/`;
        setRole(role);

        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "docente") navigate("/docente/dashboard");
        else navigate("/estudiante/dashboard");
      } catch (error) {
        console.error("❌ Error al verificar sesión:", error);
      }
    };

    const storedRole =
      localStorage.getItem("userRole") || getCookie("userRole");
    if (storedRole) setRole(storedRole);

    verificarSesion();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8 border border-white/20">
      {/* 🔐 Ícono institucional centrado */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2v1h4v-1zM6 11V9a6 6 0 1112 0v2m-6 4h.01M4 15h16v6H4v-6z"
          />
        </svg>
      </div>

      {/* 🔄 Formulario dinámico */}
      <div className="w-full">
        {mostrarRegistro ? (
          <RegisterForm onRegistroExitoso={() => setMostrarRegistro(false)} />
        ) : (
          <LoginForm setRole={setRole} />
        )}
      </div>

      {/* 🔁 Alternancia */}
      <button
        type="button"
        onClick={() => setMostrarRegistro(!mostrarRegistro)}
        className="mt-6 text-blue-300 hover:text-white font-medium transition duration-200"
      >
        {mostrarRegistro
          ? "¿Ya tienes cuenta? Inicia sesión"
          : "¿Eres estudiante nuevo? Regístrate aquí"}
      </button>

      {/* ⏳ Estado de carga */}
      {!role && (
        <p className="text-white/60 mt-4 text-sm text-center">
          Verificando sesión activa...
        </p>
      )}
    </div>
  );
};

export default AuthWrapper;
