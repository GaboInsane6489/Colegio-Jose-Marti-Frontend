import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[var(--color-primary)] text-[var(--color-text)] overflow-x-hidden">
      {/* Navbar fijo */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Espaciador para compensar altura del navbar */}
      <div className="h-16" />

      {/* Contenido principal */}
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
