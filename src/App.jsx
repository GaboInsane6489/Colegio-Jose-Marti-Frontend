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
import DocenteDashboard from "./pages/DocenteDashboard";

// Páginas estudiante
import Entregas from "./pages/estudiante/Entregas";
import ActividadesEstudiante from "./pages/estudiante/ActividadesEstudiante";
import BandejaNotificaciones from "./pages/estudiante/BandejaNotificaciones";

// Páginas docente
import NotasPage from "./pages/docente/NotasPage";
import ActividadesPage from "./pages/docente/ActividadesPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Rutas públicas con layout institucional */}
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

        {/* 🔐 Rutas independientes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/estudiante/dashboard" element={<EstudianteDashboard />} />
        <Route path="/docente/dashboard" element={<DocenteDashboard />} />
        <Route
          path="/estudiante/mensajes"
          element={<BandejaNotificaciones />}
        />

        {/* 🎓 Rutas estudiante */}
        <Route path="/estudiante/entregas" element={<Entregas />} />
        <Route
          path="/estudiante/actividades"
          element={<ActividadesEstudiante />}
        />

        {/* 🧠 Rutas docente */}
        <Route path="/docente/notas" element={<NotasPage />} />
        <Route path="/docente/actividades" element={<ActividadesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
