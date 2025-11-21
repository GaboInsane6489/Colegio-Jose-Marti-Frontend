import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';

// 🧩 Layout institucional
import MainLayout from './layouts/MainLayout';

// 🌐 Páginas públicas
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// 🔐 Autenticación
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './routes/ProtectedRoute';

// 🧠 Carga diferida de dashboards y vistas protegidas
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminClasesPage = lazy(() => import('./pages/admin/AdminClasesPage'));
const ClaseDetalle = lazy(() => import('./pages/admin/ClaseDetalle'));
const AdminCursosPage = lazy(() => import('./pages/admin/AdminCursosPage')); // ✅ nueva
const EstadisticasPanel = lazy(() => import('./components/admin/EstadisticasPanel'));

const DocenteDashboard = lazy(() => import('./pages/DocenteDashboard'));
const NotasPage = lazy(() => import('./pages/docente/NotasPage'));
const ActividadesPage = lazy(() => import('./pages/docente/ActividadesPage'));
const ClasesDocente = lazy(() => import('./pages/docente/ClasesDocente'));
const CursosDocente = lazy(() => import('./pages/docente/CursosDocente'));
const NotificacionesPage = lazy(() => import('./pages/docente/NotificacionesDocente'));
const CursoForm = lazy(() => import('./components/docente/CursoForm'));

const EstudianteDashboard = lazy(() => import('./pages/EstudianteDashboard'));
const DashboardActividadesEstudiante = lazy(() =>
  import('./pages/estudiante/DashboardActividadesEstudiante')
);
const ClasesEstudiante = lazy(() => import('./pages/estudiante/ClasesEstudiante'));

// 🛡️ Fallback institucional para errores
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-black text-white p-6'>
      <h1 className='text-xl font-bold text-red-400 mb-4'>⚠️ Error inesperado</h1>
      <p className='text-sm sm:text-base mb-6 text-center'>
        {error?.message || 'Ha ocurrido un error en la aplicación.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className='px-4 py-2 bg-[#00FFF7] text-black font-semibold rounded-md hover:brightness-110'
      >
        Recargar aplicación
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className='min-h-screen flex items-center justify-center text-white bg-black'>
              Cargando vista...
            </div>
          }
        >
          <Toaster position='top-right' toastOptions={{ duration: 4000 }} />
          <Routes>
            {/* 🌐 Rutas públicas */}
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

            {/* 🔐 Autenticación */}
            <Route path='/login' element={<AuthPage />} />
            <Route path='/auth' element={<AuthPage />} />

            {/* 👨‍🏫 Admin */}
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
              path='/admin/cursos'
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCursosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/admin/estadisticas'
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <EstadisticasPanel />
                </ProtectedRoute>
              }
            />

            {/* 👩‍🏫 Docente */}
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
              path='/docente/cursos/formulario'
              element={
                <ProtectedRoute allowedRoles={['docente']}>
                  <CursoForm />
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

            {/* 🎓 Estudiante */}
            <Route
              path='/estudiante/dashboard'
              element={
                <ProtectedRoute allowedRoles={['estudiante']}>
                  <EstudianteDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/estudiante/actividades'
              element={
                <ProtectedRoute allowedRoles={['estudiante']}>
                  <DashboardActividadesEstudiante />
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

            {/* 🚨 Ruta 404 */}
            <Route
              path='*'
              element={
                <div className='min-h-screen flex items-center justify-center bg-black text-white'>
                  <h1 className='text-2xl font-bold text-red-400'>404 - Página no encontrada</h1>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
