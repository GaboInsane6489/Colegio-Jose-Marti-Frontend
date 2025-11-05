import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from '../components/admin/NavbarAdmin';
import PendientesList from '../components/admin/PendientesList';
import EstadisticasPanel from '../components/admin/EstadisticasPanel';
import ConfiguracionPanel from '../components/admin/ConfiguracionPanel';
import UsuariosTable from '../components/admin/UsuariosTable';
import DocentesManager from '../components/admin/DocentesManager';
import VideoFondoAdmin from '../components/admin/VideoFondoAdmin';
import Footer from '../components/Footer';

/**
 * 🧠 Dashboard institucional del administrador
 * Carga modularizada con validación de rol y sesión
 */
const AdminDashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');

    if (!token || !userData) {
      console.warn('🔒 Sesión no encontrada. Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 100);
      return;
    }

    try {
      const parsed = JSON.parse(userData);

      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Usuario inválido o malformado');
      }

      if (parsed.role !== 'admin') {
        console.warn(`⛔ Acceso denegado para rol '${parsed.role}'`);
        setErrorMsg('Acceso denegado. Este panel es exclusivo para administradores.');
        return;
      }

      setUsuario(parsed);
    } catch (error) {
      console.error('❌ Error al parsear usuario:', error.message);
      setTimeout(() => navigate('/login'), 100);
    } finally {
      setCargando(false);
    }
  }, [navigate]);

  if (cargando) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black text-white'>
        <p className='text-gray-400 text-lg'>Cargando panel administrativo...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black text-white'>
        <p className='text-red-400 text-lg font-semibold'>{errorMsg}</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black text-white'>
        <p className='text-gray-400 text-lg'>Sesión inválida. Redirigiendo...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-black text-white overflow-hidden'>
      {/* 🎥 Fondo institucional exclusivo del panel admin */}
      <VideoFondoAdmin />

      {/* 🧠 Overlay de contenido */}
      <div className='relative z-10 flex-1'>
        <NavbarAdmin />

        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20'>
          {/* 🔐 Validación de usuarios pendientes */}
          <section id='validacion' className='scroll-mt-24'>
            <PendientesList />
          </section>

          {/* 📋 Tabla de todos los usuarios */}
          <section id='usuarios' className='scroll-mt-24'>
            <UsuariosTable />
          </section>

          {/* 👩‍🏫 Gestión de docentes */}
          <section id='docentes' className='scroll-mt-24'>
            <DocentesManager />
          </section>

          {/* 📊 Estadísticas generales */}
          <section id='estadisticas' className='scroll-mt-24'>
            <EstadisticasPanel />
          </section>

          {/* ⚙️ Configuración institucional */}
          <section id='configuracion' className='scroll-mt-24'>
            <ConfiguracionPanel />
          </section>
        </main>

        {/* 🦶 Footer institucional compartido */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
