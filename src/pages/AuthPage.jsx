import { Link } from "react-router-dom";
import AuthWrapper from "../components/auth/AuthWrapper";

const AuthPage = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white flex items-center justify-center px-8 pt-8 pb-20">
      {/* 🔗 Enlace superior */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="text-white font-semibold text-sm border border-white px-4 py-2 rounded-full transition duration-200 hover:bg-white hover:text-black"
        >
          ← Inicio
        </Link>
      </div>

      {/* 🧾 Tarjeta de autenticación */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-10 border border-white/20 animate-fadeIn">
        <h1 className="text-xl font-semibold text-center mb-6 tracking-wide">
          Ingreso seguro al sistema académico
        </h1>

        <AuthWrapper />
      </div>
    </main>
  );
};

export default AuthPage;
