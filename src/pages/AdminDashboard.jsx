import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';

import NavbarAdmin from '../components/admin/NavbarAdmin';
import PendientesList from '../components/admin/PendientesList';
import EstadisticasPanel from '../components/admin/EstadisticasPanel';
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
      if (!parsed || typeof parsed !== 'object') throw new Error('Usuario inválido o malformado');

      const role = (parsed.role || '').toLowerCase();
      if (role !== 'admin') {
        console.warn(`⛔ Acceso denegado para rol '${parsed.role}'`);
        setErrorMsg('Acceso denegado. Este panel es exclusivo para administradores.');
        return;
      }

      const isActive = parsed.active ?? true;
      const isValidated = parsed.isValidated ?? true;
      if (!isActive || !isValidated) {
        setErrorMsg('Tu cuenta no está activa o validada. Contacta al soporte institucional.');
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
        <p className='text-white/70 text-sm sm:text-base'>Cargando panel administrativo...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black text-white px-4'>
        <div
          role='alert'
          aria-live='assertive'
          className='bg-black text-white border border-[#00FFF7] border-[1px] rounded-md px-4 py-3 text-center max-w-md'
        >
          <p className='text-sm sm:text-base'>{errorMsg}</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black text-white'>
        <p className='text-white/70 text-sm sm:text-base'>Sesión inválida. Redirigiendo...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-black text-white font-[Orbitron] tracking-wide overflow-x-hidden'>
      <VideoFondoAdmin />

      <div className='relative z-10 flex-1'>
        <NavbarAdmin />

        <main className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-20'>
          {/* Presentación institucional */}
          <section id='presentacion' className='scroll-mt-24 relative'>
            {/* 🎥 Video de fondo */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className='absolute inset-0 w-full h-full object-cover rounded-xl'
            >
              <source
                src='https://cdn.pixabay.com/video/2024/04/03/206779_large.mp4'
                type='video/mp4'
              />
              Tu navegador no soporta videos en HTML5.
            </video>

            {/* Overlay para legibilidad */}
            <div className='absolute inset-0 bg-black/70 rounded-xl'></div>

            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
              className='relative z-10 p-6 sm:p-10 text-center space-y-8 border border-white/10 rounded-xl'
            >
              <div className='space-y-3'>
                <h1 className='text-3xl sm:text-4xl font-bold tracking-wide text-white drop-shadow-[0_0_6px_#00FFF7]'>
                  Panel Administrativo
                </h1>
                <h2 className='text-base sm:text-lg font-semibold text-white'>
                  Colegio José Martí
                </h2>
                <div className='flex justify-center pt-2'>
                  <ClipboardDocumentListIcon
                    className='w-12 h-12 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]'
                    aria-hidden='true'
                  />
                </div>
              </div>

              <p className='text-white text-sm sm:text-base max-w-3xl mx-auto'>
                Gestiona docentes, visualiza estadísticas académicas y mantiene el control
                institucional con precisión y trazabilidad.
              </p>

              {/* Tarjetas */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className='bg-black/60 border border-white/20 rounded-xl p-6 text-center space-y-3 hover:shadow-[0_0_12px_#00FFF7] transition'
                >
                  <ShieldCheckIcon
                    className='h-10 w-10 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mx-auto'
                    aria-hidden='true'
                  />
                  <h3 className='text-base font-bold text-white'>Validación</h3>
                  <p className='text-sm text-white/80'>
                    Revisión y aprobación de cuentas institucionales. Control sobre el acceso a la
                    plataforma.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className='bg-black/60 border border-white/20 rounded-xl p-6 text-center space-y-3 hover:shadow-[0_0_12px_#00FFF7] transition'
                >
                  <UserGroupIcon
                    className='h-10 w-10 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mx-auto'
                    aria-hidden='true'
                  />
                  <h3 className='text-base font-bold text-white'>Usuarios</h3>
                  <p className='text-sm text-white/80'>
                    Visualización y gestión de usuarios institucionales. Roles, estados y acciones
                    administrativas.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className='bg-black/60 border border-white/20 rounded-xl p-6 text-center space-y-3 hover:shadow-[0_0_12px_#00FFF7] transition'
                >
                  <ChartBarIcon
                    className='h-10 w-10 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7] mx-auto'
                    aria-hidden='true'
                  />
                  <h3 className='text-base font-bold text-white'>Estadísticas</h3>
                  <p className='text-sm text-white/80'>
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
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
