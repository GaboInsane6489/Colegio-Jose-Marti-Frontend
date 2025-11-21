import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/solid';

import NavbarDocente from '@/components/docente/NavbarDocente';
import VideoFondoDocente from '@/components/docente/VideoFondoDocente';
import Footer from '@/components/Footer';

const carruselSlides = [
  {
    url: 'https://cdn.pixabay.com/photo/2021/02/18/12/03/people-6027028_1280.jpg',
    texto: `Conexión humana y aprendizaje colaborativo en cada jornada académica.
El vínculo entre docentes y estudiantes fortalece el proceso formativo.
Cada clase es una oportunidad para crecer juntos.
La empatía y el respeto son pilares del entorno educativo.
La participación activa genera experiencias memorables.
El diálogo constante construye comunidades de aprendizaje sólidas.`,
  },
  {
    url: 'https://cdn.pixabay.com/photo/2013/11/27/02/13/rikkyo-university-219058_1280.jpg',
    texto: `Infraestructura institucional que respalda tu labor docente con excelencia.
Espacios diseñados para fomentar la concentración y el intercambio de ideas.
Tecnología al servicio de la pedagogía moderna.
Ambientes seguros y estimulantes para el desarrollo integral.
Cada rincón refleja el compromiso con la educación de calidad.
La arquitectura académica inspira disciplina y creatividad.`,
  },
  {
    url: 'https://cdn.pixabay.com/photo/2023/06/11/14/11/flowers-8056102_1280.jpg',
    texto: `Ambientes que inspiran crecimiento, reflexión y formación integral.
La belleza natural como estímulo para el pensamiento crítico.
El entorno escolar influye en el bienestar emocional.
Espacios verdes que promueven la calma y la introspección.
La armonía visual potencia la motivación y el enfoque.
Cada detalle está pensado para enriquecer la experiencia educativa.`,
  },
];

const DocenteDashboard = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % carruselSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative min-h-screen bg-black text-white font-[Orbitron] tracking-wide overflow-x-hidden'>
      {/* 🎥 Fondo institucional */}
      <VideoFondoDocente />
      <div className='absolute inset-0 bg-black/40 z-10 pointer-events-none' />

      {/* 🧭 Navbar docente */}
      <div className='relative z-30 shadow-[0_0_12px_#FFFFFF]'>
        <NavbarDocente />
      </div>

      {/* 📦 Contenido principal */}
      <main className='relative z-20 px-4 sm:px-6 lg:px-8 py-24 max-w-6xl mx-auto space-y-16'>
        {/* Encabezado institucional */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='text-center flex flex-col items-center space-y-2'
        >
          <ClipboardDocumentListIcon className='h-12 w-12 text-white drop-shadow-[0_0_6px_#FFFFFF]' />
          <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_6px_#FFFFFF]'>
            Panel Docente
          </h1>
          <p className='mt-2 text-sm sm:text-base text-gray-300 max-w-xl'>Colegio José Martí</p>
          <p className='mt-1 text-xs sm:text-sm text-white/70 max-w-md'>
            Este panel permite gestionar tus clases, actividades y visualizar estadísticas
            académicas con precisión y trazabilidad.
          </p>
        </motion.header>

        {/* 🎞️ Carrusel institucional */}
        <div className='relative w-full h-[600px] rounded-2xl overflow-hidden border-2 border-white shadow-[0_0_16px_#FFFFFF]'>
          {carruselSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === slideIndex ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`absolute inset-0 w-full h-full object-cover ${
                index === slideIndex ? 'z-10' : 'z-0'
              }`}
            >
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className='w-full h-full object-cover'
              />
              <div className='absolute bottom-0 w-full bg-black/50 text-center py-3 px-4'>
                <p className='text-[10px] text-white drop-shadow-[0_0_3px_#000] whitespace-pre-line leading-tight'>
                  {slide.texto}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secciones principales */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6'>
          {/* Clases */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='bg-black border border-white/30 rounded-xl shadow-lg p-6 text-center space-y-4 hover:shadow-[0_0_12px_#FFFFFF] transition-all duration-200'
          >
            <BookOpenIcon className='h-12 w-12 text-white drop-shadow-[0_0_4px_#FFFFFF] mx-auto' />
            <h3 className='text-xl font-bold text-white'>Clases</h3>
            <p className='text-sm text-white/80'>
              Visualiza y organiza las clases que impartes, con horarios y estudiantes asignados.
            </p>
          </motion.div>

          {/* Actividades */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='bg-black border border-white/30 rounded-xl shadow-lg p-6 text-center space-y-4 hover:shadow-[0_0_12px_#FFFFFF] transition-all duration-200'
          >
            <ClipboardDocumentListIcon className='h-12 w-12 text-white drop-shadow-[0_0_4px_#FFFFFF] mx-auto' />
            <h3 className='text-xl font-bold text-white'>Actividades</h3>
            <p className='text-sm text-white/80'>
              Crea, asigna y revisa actividades académicas para tus estudiantes.
            </p>
          </motion.div>

          {/* Estadísticas */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='bg-black border border-white/30 rounded-xl shadow-lg p-6 text-center space-y-4 hover:shadow-[0_0_12px_#FFFFFF] transition-all duration-200'
          >
            <ChartBarIcon className='h-12 w-12 text-white drop-shadow-[0_0_4px_#FFFFFF] mx-auto' />
            <h3 className='text-xl font-bold text-white'>Estadísticas</h3>
            <p className='text-sm text-white/80'>
              Consulta métricas de desempeño académico y progreso de tus estudiantes.
            </p>
          </motion.div>
        </div>
      </main>

      {/* ✅ Footer institucional */}
      <div className='relative z-20 mt-10'>
        <Footer />
      </div>
    </div>
  );
};

export default DocenteDashboard;
