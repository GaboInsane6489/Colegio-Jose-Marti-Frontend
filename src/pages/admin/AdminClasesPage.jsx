import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import ClasesManager from '../../components/admin/ClasesManager';
import Footer from '../../components/Footer';
import VideoFondoAdmin from '../../components/admin/VideoFondoAdmin';

/**
 * 📚 Página institucional para gestión de clases académicas
 * Exclusiva para administradores
 */
const AdminClasesPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
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
      if (parsed.role !== 'admin') {
        console.warn(`⛔ Acceso denegado para rol '${parsed.role}'`);
        setErrorMsg('Acceso denegado. Solo administradores pueden gestionar clases.');
        return;
      }
      setUsuario(parsed);
    } catch (error) {
      console.error('❌ Error al parsear usuario:', error.message);
      setTimeout(() => navigate('/login'), 100);
    }
  }, [navigate]);

  if (errorMsg) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-black text-white'>
        <p className='text-red-400 text-lg font-semibold'>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-black text-white'>
      {/* 🎥 Video institucional modularizado */}
      <VideoFondoAdmin />

      {/* 🧠 Capa de contenido */}
      <div className='relative z-10 bg-black/70 min-h-screen w-full flex flex-col'>
        <NavbarAdmin />

        <main className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 space-y-12'>
          <h2 className='text-2xl font-bold text-white text-center sm:text-left'>
            📚 Gestión de Clases
          </h2>
          <ClasesManager navigate={navigate} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminClasesPage;
