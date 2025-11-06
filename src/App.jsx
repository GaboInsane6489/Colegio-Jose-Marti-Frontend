import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout principal
import MainLayout from './layouts/MainLayout';

// Páginas públicas
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Página institucional de autenticación
import AuthPage from './pages/AuthPage';

// Protección institucional
import ProtectedRoute from './routes/ProtectedRoute';

// Carga diferida de dashboards y vistas protegidas
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminClasesPage = lazy(() => import('./pages/admin/AdminClasesPage'));
const ClaseDetalle = lazy(() => import('./pages/admin/ClaseDetalle'));
const EstudianteDashboard = lazy(() => import('./pages/EstudianteDashboard'));
const DocenteDashboard = lazy(() => import('./pages/DocenteDashboard'));
const Entregas = lazy(() => import('./pages/estudiante/Entregas'));
const ActividadesEstudiante = lazy(() => import('./pages/estudiante/ActividadesEstudiante'));
const BandejaNotificaciones = lazy(() => import('./pages/estudiante/BandejaNotificaciones'));
const ClasesEstudiante = lazy(() => import('./pages/estudiante/ClasesEstudiante')); // ✅ Nueva vista
const NotasPage = lazy(() => import('./pages/docente/NotasPage'));
const ActividadesPage = lazy(() => import('./pages/docente/ActividadesPage'));
const ClasesDocente = lazy(() => import('./pages/docente/ClasesDocente'));
const CursosDocente = lazy(() => import('./pages/docente/CursosDocente'));
const NotificacionesPage = lazy(() => import('./pages/docente/NotificacionesDocente'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className='min-h-screen flex items-center justify-center text-white bg-black'>
            Cargando vista...
          </div>
        }
      >
        <Routes>
          {/* 🌐 Rutas públicas con layout institucional */}
          <Route
            path='/'
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path='/about'
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path='/contact'
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />

          {/* 🔓 Ruta única para autenticación */}
          <Route path='/login' element={<AuthPage />} />
          <Route path='/auth' element={<AuthPage />} />

          {/* 🔐 Rutas protegidas por rol */}
          <Route
            path='/admin/dashboard'
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/clases'
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminClasesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/clases/:id'
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ClaseDetalle />
              </ProtectedRoute>
            }
          />

          <Route
            path='/docente/dashboard'
            element={
              <ProtectedRoute allowedRoles={['docente']}>
                <DocenteDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/docente/notas'
            element={
              <ProtectedRoute allowedRoles={['docente']}>
                <NotasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/docente/actividades'
            element={
              <ProtectedRoute allowedRoles={['docente']}>
                <ActividadesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/docente/clases'
            element={
              <ProtectedRoute allowedRoles={['docente']}>
                <ClasesDocente />
              </ProtectedRoute>
            }
          />
          <Route
            path='/docente/cursos'
            element={
              <ProtectedRoute allowedRoles={['docente']}>
                <CursosDocente />
              </ProtectedRoute>
            }
          />
          <Route
            path='/docente/notificaciones'
            element={
              <ProtectedRoute allowedRoles={['docente']}>
                <NotificacionesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/estudiante/dashboard'
            element={
              <ProtectedRoute allowedRoles={['estudiante']}>
                <EstudianteDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/estudiante/mensajes'
            element={
              <ProtectedRoute allowedRoles={['estudiante']}>
                <BandejaNotificaciones />
              </ProtectedRoute>
            }
          />
          <Route
            path='/estudiante/entregas'
            element={
              <ProtectedRoute allowedRoles={['estudiante']}>
                <Entregas />
              </ProtectedRoute>
            }
          />
          <Route
            path='/estudiante/actividades'
            element={
              <ProtectedRoute allowedRoles={['estudiante']}>
                <ActividadesEstudiante />
              </ProtectedRoute>
            }
          />
          <Route
            path='/estudiante/clases'
            element={
              <ProtectedRoute allowedRoles={['estudiante']}>
                <ClasesEstudiante />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
