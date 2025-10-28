import { FaClipboardCheck } from "react-icons/fa";

const EncabezadoNotas = () => (
  <div className="text-center space-y-2">
    <h1 className="text-3xl sm:text-4xl font-bold flex justify-center items-center gap-2">
      <FaClipboardCheck className="text-blue-400" />
      Gestión de Notas
    </h1>
    <p className="text-white/70 text-base sm:text-lg">
      Registra, edita y visualiza las calificaciones de tus estudiantes.
    </p>
  </div>
);

export default EncabezadoNotas;
