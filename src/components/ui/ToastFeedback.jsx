import { useEffect } from "react";

const ToastFeedback = ({ mensaje, tipo = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // ⏳ Duración del toast

    return () => clearTimeout(timer);
  }, [onClose]);

  const estilos = {
    info: "bg-blue-600",
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white ${estilos[tipo]} animate-fade-in`}
    >
      <p className="text-sm font-medium">{mensaje}</p>
    </div>
  );
};

export default ToastFeedback;
