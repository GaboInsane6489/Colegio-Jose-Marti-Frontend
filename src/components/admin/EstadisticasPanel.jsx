import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaUserGraduate,
  FaUserCheck,
  FaChalkboardTeacher,
} from "react-icons/fa";

/**
 * 📊 Panel institucional para mostrar métricas clave del sistema académico
 */
const EstadisticasPanel = () => {
  const [estadisticas, setEstadisticas] = useState(null);

  const iconMap = {
    "Usuarios registrados": FaUserGraduate,
    "Pendientes de validación": FaUserCheck,
    "Docentes activos": FaChalkboardTeacher,
  };

  const getColor = (label, valor) => {
    if (label === "Pendientes de validación" && valor > 10)
      return "text-red-600";
    return {
      "Usuarios registrados": "text-blue-700",
      "Pendientes de validación": "text-yellow-600",
      "Docentes activos": "text-green-600",
    }[label];
  };

  const fetchEstadisticas = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/estadisticas");
      setEstadisticas([
        {
          label: "Usuarios registrados",
          valor: data.usuariosRegistrados,
          color: getColor("Usuarios registrados", data.usuariosRegistrados),
        },
        {
          label: "Pendientes de validación",
          valor: data.pendientesValidacion,
          color: getColor(
            "Pendientes de validación",
            data.pendientesValidacion
          ),
        },
        {
          label: "Docentes activos",
          valor: data.docentesActivos,
          color: getColor("Docentes activos", data.docentesActivos),
        },
      ]);
    } catch (error) {
      console.error("Error al cargar estadísticas", error);
    }
  }, []);

  useEffect(() => {
    fetchEstadisticas();
    const interval = setInterval(fetchEstadisticas, 30000);
    return () => clearInterval(interval);
  }, [fetchEstadisticas]);

  return (
    <motion.section
      id="estadisticas"
      aria-labelledby="estadisticas-title"
      className="bg-[#121212] text-white py-10 px-4 sm:px-6"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 id="estadisticas-title" className="text-xl font-semibold">
          Estadísticas generales
        </h2>

        <div className="flex overflow-x-auto gap-4 sm:grid sm:grid-cols-3 snap-x">
          {estadisticas?.map((item, index) => {
            const Icon = iconMap[item.label];
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="min-w-[200px] snap-center bg-white text-black p-4 rounded shadow hover:shadow-md transition"
                role="region"
                aria-label={item.label}
                tabIndex={0}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`text-xl ${item.color}`} />
                  <p className="text-gray-600">{item.label}</p>
                </div>
                <p className={`text-2xl font-bold ${item.color}`}>
                  {item.valor}
                </p>
              </motion.div>
            );
          })}
        </div>

        {!estadisticas && (
          <p className="text-sm text-gray-400">Cargando estadísticas...</p>
        )}
      </div>
    </motion.section>
  );
};

export default EstadisticasPanel;
