import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

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

        {/* 🔓 Ruta pública para login */}
        <Route path="/auth" element={<AuthPage />} />

        {/* 🔐 Rutas protegidas */}
        <Route
          path="/admin/dashboard"
          element={token ? <AdminDashboard /> : <Navigate to="/auth" />}
        />
        <Route
          path="/estudiante/dashboard"
          element={token ? <EstudianteDashboard /> : <Navigate to="/auth" />}
        />
        <Route
          path="/docente/dashboard"
          element={token ? <DocenteDashboard /> : <Navigate to="/auth" />}
        />
        <Route
          path="/estudiante/mensajes"
          element={token ? <BandejaNotificaciones /> : <Navigate to="/auth" />}
        />
        <Route
          path="/estudiante/entregas"
          element={token ? <Entregas /> : <Navigate to="/auth" />}
        />
        <Route
          path="/estudiante/actividades"
          element={token ? <ActividadesEstudiante /> : <Navigate to="/auth" />}
        />
        <Route
          path="/docente/notas"
          element={token ? <NotasPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/docente/actividades"
          element={token ? <ActividadesPage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
