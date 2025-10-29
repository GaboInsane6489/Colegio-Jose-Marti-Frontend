import { FaClipboardCheck } from "react-icons/fa";

/**
 * 🧾 Encabezado institucional para la sección de gestión de notas
 */
const EncabezadoNotas = () => (
  <div className="text-center space-y-2">
    <h1 className="text-3xl sm:text-4xl font-bold flex justify-center items-center gap-2 text-white">
      <FaClipboardCheck className="text-blue-400 h-6 w-6 sm:h-7 sm:w-7" />
      Gestión de Notas
    </h1>
    <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
      Registra, edita y visualiza las calificaciones de tus estudiantes con
      claridad y trazabilidad institucional.
    </p>
  </div>
);

export default EncabezadoNotas;
