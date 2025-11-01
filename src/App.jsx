import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout principal
import MainLayout from './layouts/MainLayout';

// Páginas públicas
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Páginas independientes
import AuthPage from './pages/AuthPage';

// Hook institucional
import usePingUsuario from './hooks/usePingUsuario';

// Carga diferida de dashboards y vistas protegidas
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const EstudianteDashboard = lazy(() => import('./pages/EstudianteDashboard'));
const DocenteDashboard = lazy(() => import('./pages/DocenteDashboard'));
const Entregas = lazy(() => import('./pages/estudiante/Entregas'));
const ActividadesEstudiante = lazy(() => import('./pages/estudiante/ActividadesEstudiante'));
const BandejaNotificaciones = lazy(() => import('./pages/estudiante/BandejaNotificaciones'));
const NotasPage = lazy(() => import('./pages/docente/NotasPage'));
const ActividadesPage = lazy(() => import('./pages/docente/ActividadesPage'));

function App() {
  const { rol, cargando } = usePingUsuario();

  /**
   * 🔐 Protección institucional por rol
   * Evita rutas mezcladas, redirige según rol, y muestra carga segura.
   */
  const proteger = (componente, rolEsperado) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (cargando || (token && !rol)) {
      return (
        <div className='min-h-screen flex items-center justify-center text-white bg-black'>
          Verificando sesión...
        </div>
      );
    }

    if (!token || !rol || typeof rol !== 'string') {
      console.warn('⚠️ Sesión no válida. Redirigiendo a /auth');
      return <Navigate to='/auth' replace />;
    }

    if (rolEsperado && rol !== rolEsperado) {
      console.warn(`⚠️ Rol "${rol}" no coincide con esperado "${rolEsperado}". Redirigiendo.`);
      return <Navigate to={`/${rol}/dashboard`} replace />;
    }

    return componente;
  };

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

          {/* 🔓 Ruta pública para login */}
          <Route path='/auth' element={<AuthPage />} />

          {/* 🔐 Rutas protegidas por rol */}
          <Route path='/admin/dashboard' element={proteger(<AdminDashboard />, 'admin')} />
          <Route path='/docente/dashboard' element={proteger(<DocenteDashboard />, 'docente')} />
          <Route
            path='/estudiante/dashboard'
            element={proteger(<EstudianteDashboard />, 'estudiante')}
          />
          <Route
            path='/estudiante/mensajes'
            element={proteger(<BandejaNotificaciones />, 'estudiante')}
          />
          <Route path='/estudiante/entregas' element={proteger(<Entregas />, 'estudiante')} />
          <Route
            path='/estudiante/actividades'
            element={proteger(<ActividadesEstudiante />, 'estudiante')}
          />
          <Route path='/docente/notas' element={proteger(<NotasPage />, 'docente')} />
          <Route path='/docente/actividades' element={proteger(<ActividadesPage />, 'docente')} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
