import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon, // ✅ Import corregido
} from '@heroicons/react/24/solid';

import NavbarAdmin from '../components/admin/NavbarAdmin';
import PendientesList from '../components/admin/PendientesList';
import EstadisticasPanel from '../components/admin/EstadisticasPanel';
// import ConfiguracionPanel from '../components/admin/ConfiguracionPanel'; // 🔒 Comentado para presentación
import UsuariosTable from '../components/admin/UsuariosTable';
import DocentesManager from '../components/admin/DocentesManager';
import VideoFondoAdmin from '../components/admin/VideoFondoAdmin';
import Footer from '../components/Footer';

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
      <VideoFondoAdmin />

      <div className='relative z-10 flex-1'>
        <NavbarAdmin />

        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20'>
          {/* Presentación institucional del dashboard */}
          <section id='presentacion' className='scroll-mt-24'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
              className='bg-black rounded-xl shadow-xl p-6 sm:p-10 text-center space-y-10'
            >
              <div className='space-y-4'>
                <h1
                  className='text-4xl sm:text-5xl font-bold tracking-wide font-[Orbitron]'
                  style={{ color: '#b8860b' }}
                >
                  Panel Administrativo
                </h1>
                <h2 className='text-xl sm:text-2xl font-semibold text-white'>Colegio José Martí</h2>
                <div className='flex justify-center pt-2'>
                  <ClipboardDocumentListIcon className='w-16 h-16 text-white/80' />
                </div>
              </div>

              <p className='text-white text-sm sm:text-base max-w-3xl mx-auto'>
                Este panel permite validar usuarios, gestionar docentes, visualizar estadísticas
                académicas y mantener el control institucional con precisión y trazabilidad.
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6'>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className='bg-black border border-gray-800 rounded-xl shadow-lg p-6 text-center space-y-4'
                >
                  <ShieldCheckIcon className='h-12 w-12 text-green-500 mx-auto' />
                  <h3 className='text-xl font-bold text-white font-[Orbitron]'>Validación</h3>
                  <p className='text-sm text-white'>
                    Revisión y aprobación de cuentas institucionales. Control sobre el acceso a la
                    plataforma institucional.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className='bg-black border border-gray-800 rounded-xl shadow-lg p-6 text-center space-y-4'
                >
                  <UserGroupIcon className='h-12 w-12 text-blue-400 mx-auto' />
                  <h3 className='text-xl font-bold text-white font-[Orbitron]'>Usuarios</h3>
                  <p className='text-sm text-white'>
                    Visualización y gestión de todos los usuarios institucionales. Roles, estados y
                    acciones administrativas.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className='bg-black border border-gray-800 rounded-xl shadow-lg p-6 text-center space-y-4'
                >
                  <ChartBarIcon className='h-12 w-12 text-purple-400 mx-auto' />
                  <h3 className='text-xl font-bold text-white font-[Orbitron]'>Estadísticas</h3>
                  <p className='text-sm text-white'>
                    Métricas académicas y administrativas en tiempo real. Análisis de desempeño
                    institucional.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Validación de usuarios pendientes */}
          <section id='validacion' className='scroll-mt-24'>
            <PendientesList />
          </section>

          {/* Tabla de todos los usuarios */}
          <section id='usuarios' className='scroll-mt-24'>
            <UsuariosTable />
          </section>

          {/* Gestión de docentes */}
          <section id='docentes' className='scroll-mt-24'>
            <DocentesManager />
          </section>

          {/* Estadísticas generales */}
          <section id='estadisticas' className='scroll-mt-24'>
            <EstadisticasPanel />
          </section>

          {/* Configuración institucional (comentado para presentación) */}
          {/*
          <section id='configuracion' className='scroll-mt-24'>
            <ConfiguracionPanel />
          </section>
          */}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
