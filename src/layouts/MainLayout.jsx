import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[var(--color-primary)] text-[var(--color-text)] overflow-x-hidden">
      {/* Navbar fijo con sombra institucional */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur-sm bg-[var(--color-primary)]/90">
        <Navbar />
      </div>

      {/* Contenido principal con animación de entrada */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-grow w-full px-4 sm:px-6 lg:px-8 pt-[64px] sm:pt-[72px]"
      >
        {children}
      </motion.main>

      {/* Footer institucional */}
      <Footer />
    </div>
  );
};

export default MainLayout;
