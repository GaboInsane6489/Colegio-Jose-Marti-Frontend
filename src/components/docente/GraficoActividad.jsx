import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaChartBar } from "react-icons/fa";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GraficoActividad = ({ entregas = [], titulo = "Actividad" }) => {
  const labels = entregas.map((e) => e.estudianteId?.nombre || "Estudiante");
  const data = entregas.map((e) =>
    typeof e.calificacion === "number" ? e.calificacion : 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Calificación",
        data,
        backgroundColor: "rgba(132, 204, 22, 0.8)", // lime-500
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937", // gray-800
        titleColor: "#fff",
        bodyColor: "#d1d5db", // gray-300
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
        ticks: {
          stepSize: 5,
          color: "#9ca3af", // gray-400
          font: { size: 12 },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        ticks: {
          color: "#9ca3af",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-6 space-y-4">
      <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
        <FaChartBar className="text-blue-600" />
        <span>Rendimiento — {titulo}</span>
      </div>
      <div className="h-72">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GraficoActividad;
