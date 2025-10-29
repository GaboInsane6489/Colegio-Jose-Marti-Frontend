import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

/**
 * 📈 Componente institucional para mostrar evolución académica del estudiante por lapso
 */
const GraficoEvolucionEstudiante = ({ datos = [] }) => {
  return (
    <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-6 space-y-4">
      {/* Título emocional */}
      <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
        <FaChartLine className="text-blue-600" />
        Evolución académica por lapso
      </div>

      {/* Validación de datos */}
      {datos.length === 0 ? (
        <p className="text-sm text-gray-600">
          No hay datos suficientes para mostrar el gráfico.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={datos}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lapso" />
            <YAxis domain={[0, 20]} />
            <Tooltip formatter={(value) => `${value}/20`} />
            <Line
              type="monotone"
              dataKey="promedio"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GraficoEvolucionEstudiante;
