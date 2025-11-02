import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
  const { rol, cargando } = usePingUsuario(); // eslint-disable-line no-unused-vars

  /**
   * 🔐 Protección institucional por rol
   * Evita rutas mezcladas, redirige según rol, y muestra carga segura.
   */
  const proteger = (componente, rolEsperado) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const role =
      localStorage.getItem('userRole') ||
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('userRole='))
        ?.split('=')[1];

    if (!token || !role || typeof role !== 'string') {
      if (!window.__warnedNoToken) {
        console.warn('⚠️ Sesión no válida. Redirigiendo a /auth');
        window.__warnedNoToken = true;
      }
      return <Navigate to='/auth' replace />;
    }

    if (rolEsperado && role !== rolEsperado) {
      const clave = `__warned_${role}_vs_${rolEsperado}`;
      if (!window[clave]) {
        console.warn(`⚠️ Rol "${role}" no coincide con esperado "${rolEsperado}". Redirigiendo.`);
        window[clave] = true;
      }
      return <Navigate to={`/${role}/dashboard`} replace />;
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
