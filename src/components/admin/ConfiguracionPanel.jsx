import { motion } from "framer-motion";

const ConfiguracionPanel = () => {
  return (
    <motion.section
      id="configuracion"
      className="bg-[#121212] text-white py-10 px-4 sm:px-6"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold">Configuración</h2>
        <p className="text-gray-400">
          Aquí podrás ajustar parámetros institucionales, gestionar roles,
          permisos y personalizar la experiencia administrativa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white text-black p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Gestión de roles</h3>
            <p className="text-sm text-gray-600">
              Asignar, editar o eliminar roles institucionales.
            </p>
            <button className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
              Configurar
            </button>
          </div>

          <div className="bg-white text-black p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Preferencias visuales</h3>
            <p className="text-sm text-gray-600">
              Cambiar temas, animaciones o accesibilidad.
            </p>
            <button className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition">
              Personalizar
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ConfiguracionPanel;
