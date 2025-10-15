import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout principal
import MainLayout from "./layouts/MainLayout";

// Páginas públicas
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Páginas independientes
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import EstudianteDashboard from "./pages/EstudianteDashboard";
import DocenteDashboard from "./pages/DocenteDashboard"; // ✅ nueva ruta

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas con layout institucional */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        {/* Rutas independientes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/estudiante/dashboard" element={<EstudianteDashboard />} />
        <Route path="/docente/dashboard" element={<DocenteDashboard />} />{" "}
        {/* ✅ nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
