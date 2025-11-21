import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * 📊 Tarjeta institucional para mostrar el progreso académico del estudiante
 */
const CardProgresoEstudiante = ({
  etiquetas = ['Matemáticas', 'Lengua', 'Historia', 'Ciencias', 'Arte'],
  rendimientoEstudiante = [85, 78, 90, 88, 95],
  promedioInstitucional = [72, 70, 80, 75, 82],
}) => {
  const datosValidos =
    Array.isArray(etiquetas) &&
    Array.isArray(rendimientoEstudiante) &&
    Array.isArray(promedioInstitucional) &&
    etiquetas.length === rendimientoEstudiante.length &&
    etiquetas.length === promedioInstitucional.length;

  const data = datosValidos
    ? {
        labels: etiquetas,
        datasets: [
          {
            label: 'Tu rendimiento',
            data: rendimientoEstudiante,
            backgroundColor: '#00FFF7',
            borderRadius: 4,
          },
          {
            label: 'Promedio general',
            data: promedioInstitucional,
            backgroundColor: '#00FF33',
            borderRadius: 4,
          },
        ],
      }
    : null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          color: '#00FFF7',
          boxWidth: 12,
          padding: 10,
          font: { family: 'Orbitron', size: 10 },
        },
      },
      title: { display: false },
      tooltip: {
        titleFont: { family: 'Orbitron', size: 10 },
        bodyFont: { family: 'Orbitron', size: 10 },
      },
    },
    scales: {
      x: {
        ticks: { color: '#00FFF7', font: { family: 'Orbitron', size: 10 } },
        grid: { color: 'rgba(0,255,247,0.05)' },
      },
      y: {
        ticks: { color: '#00FFF7', font: { family: 'Orbitron', size: 10 } },
        grid: { color: 'rgba(0,255,247,0.05)' },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='w-full bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-md rounded-xl border border-[#00FFF7]/30 p-6 shadow-lg
                 hover:scale-[1.01] hover:shadow-[0_0_12px_#00FFF7] transition duration-200 ease-out text-center font-[Orbitron]'
    >
      {/* Ícono decorativo */}
      <div className='flex justify-center mb-2'>
        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-[#00FFF7]'>
          <path
            d='M12 2L15 8H9L12 2ZM12 22L9 16H15L12 22ZM2 12L8 15V9L2 12ZM22 12L16 9V15L22 12Z'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>

      {/* Título */}
      <h2 className='text-sm font-semibold text-[#00FFF7] drop-shadow-[0_0_4px_#00FFF7]'>
        Progreso Académico
      </h2>

      {/* Subtítulo institucional */}
      <p className='text-[10px] text-white/50 italic mt-1'>
        Comparación entre tu rendimiento y el promedio institucional
      </p>

      {/* Gráfica centrada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        className='flex justify-center mt-4'
      >
        <div className='w-full max-w-4xl aspect-[2.5/1] px-2 mx-auto'>
          {data ? (
            <Bar data={data} options={options} />
          ) : (
            <p className='text-sm text-white/60 italic'>
              No hay datos disponibles para mostrar tu progreso académico.
            </p>
          )}
        </div>
      </motion.div>

      {/* Texto emocional */}
      <p className='text-[11px] text-white/60 mt-4 mx-auto max-w-prose'>
        Visualiza tu evolución académica. Cada materia refleja tu esfuerzo y compromiso.
      </p>
    </motion.div>
  );
};

export default CardProgresoEstudiante;
