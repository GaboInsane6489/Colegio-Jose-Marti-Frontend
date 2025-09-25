import { motion } from "framer-motion";

const EstadisticasPanel = () => {
  // Puedes reemplazar estos valores con datos reales del backend si lo deseas
  const estadisticas = [
    {
      label: "Usuarios registrados",
      valor: 128,
      color: "text-blue-700",
    },
    {
      label: "Pendientes de validación",
      valor: 0,
      color: "text-yellow-600",
    },
    {
      label: "Docentes activos",
      valor: 34,
      color: "text-green-600",
    },
  ];

  return (
    <motion.section
      id="estadisticas"
      className="bg-[#121212] text-white py-10 px-4 sm:px-6"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold">Estadísticas generales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {estadisticas.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white text-black p-4 rounded shadow hover:shadow-md transition"
            >
              <p className="text-gray-600">{item.label}</p>
              <p className={`text-2xl font-bold ${item.color}`}>
                {item.valor}*
              </p>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          *Datos ficticios para demostración
        </p>
      </div>
    </motion.section>
  );
};

export default EstadisticasPanel;
