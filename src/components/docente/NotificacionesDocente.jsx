import { BellAlertIcon, InboxIcon } from "@heroicons/react/24/outline";

const NotificacionesDocente = () => {
  const notificaciones = [
    "Reunión institucional el viernes a las 10am.",
    "Entrega de notas antes del 30 de octubre.",
  ];

  return (
    <section className="bg-black text-white p-6 rounded-xl border border-white/20 shadow-md flex flex-col items-center justify-center space-y-6 text-center">
      {/* 🧠 Encabezado con icono y título centrado */}
      <div className="flex flex-col items-center gap-2">
        <BellAlertIcon className="h-10 w-10 text-white" />
        <h2 className="text-2xl font-semibold">Notificaciones</h2>
      </div>

      {/* 📦 Estado vacío o lista de notificaciones */}
      {notificaciones.length === 0 ? (
        <div className="flex flex-col items-center gap-2">
          <InboxIcon className="h-10 w-10 text-white/40" />
          <p className="text-lg font-medium text-white">
            No tienes notificaciones por el momento.
          </p>
          <p className="text-sm text-white/60 max-w-md">
            Aquí aparecerán avisos importantes sobre reuniones, entregas y
            novedades institucionales.
          </p>
        </div>
      ) : (
        <ul className="list-disc list-inside space-y-2 text-white/90 max-w-md mx-auto">
          {notificaciones.map((nota, index) => (
            <li key={index}>{nota}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default NotificacionesDocente;
