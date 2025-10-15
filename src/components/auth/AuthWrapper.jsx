import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pingUsuario } from "../../services/authService";
import { getCookie } from "../../utils/cookieUtils";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthWrapper = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  // ✅ Verifica sesión si ya hay token
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
        else if (role === "estudiante") navigate("/estudiante/dashboard");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Acceso a la plataforma</h1>

      {mostrarRegistro ? (
        <RegisterForm onRegistroExitoso={() => setMostrarRegistro(false)} />
      ) : (
        <LoginForm setRole={setRole} />
      )}

      <button
        type="button"
        onClick={() => setMostrarRegistro(!mostrarRegistro)}
        className="mt-4 text-blue-600 hover:underline"
      >
        {mostrarRegistro
          ? "¿Ya tienes cuenta? Inicia sesión"
          : "¿Eres estudiante nuevo? Regístrate aquí"}
      </button>

      {!role && (
        <p className="text-gray-600 mt-4">
          Cargando información del usuario...
        </p>
      )}
    </div>
  );
};

export default AuthWrapper;
