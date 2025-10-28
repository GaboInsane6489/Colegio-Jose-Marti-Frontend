import { Link } from "react-router-dom";
import AuthWrapper from "../components/auth/AuthWrapper";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";

const AuthPage = () => {
  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "#000000" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: { opacity: 0.3 },
        },
      },
    },
    particles: {
      number: {
        value: 60,
        density: { enable: true, area: 800 },
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.3,
        random: false,
      },
      size: {
        value: 1.5,
        random: true,
      },
      links: {
        enable: true,
        distance: 120,
        color: "#ffffff",
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        outModes: { default: "bounce" },
      },
    },
    detectRetina: true,
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-gray-800 via-black to-black text-white flex items-center justify-center px-4 pt-20 pb-20 md:px-8 md:pt-24 overflow-hidden">
      {/* ✨ Fondo animado con partículas */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="w-full h-full pointer-events-none"
        />
      </div>

      {/* 🔗 Botón de regreso */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
        <Link
          to="/"
          className="text-white font-medium text-xs md:text-sm border border-white px-3 py-1.5 rounded-full transition duration-300 hover:bg-white hover:text-black shadow-md"
        >
          ← Inicio
        </Link>
      </div>

      {/* 🧾 Tarjeta de autenticación */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-xl bg-white/5 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-7 md:p-8 border border-white/20 animate-fadeIn"
      >
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-center mb-4 tracking-wide text-white drop-shadow">
          Ingreso seguro al sistema académico
        </h1>

        <p className="text-xs sm:text-sm text-center text-gray-300 mb-6">
          Tu espacio institucional, emocional y estratégico. Accede con tu
          correo y contraseña.
        </p>

        <AuthWrapper />
      </motion.div>
    </main>
  );
};

export default AuthPage;
