import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useNotificaciones from "@/hooks/useNotificaciones.js";
import {
  FaCheckCircle,
  FaClipboardList,
  FaInfoCircle,
  FaBell,
} from "react-icons/fa";
import NavbarEstudiante from "@/components/estudiante/NavbarEstudiante";
import Footer from "@/components/Footer";
import VideoFondoEstudiante from "@/components/estudiante/VideoFondoEstudiante";

const BandejaNotificaciones = () => {
  const [token, setToken] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedId =
      localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (storedToken && storedId) {
      setToken(storedToken);
      setUsuarioId(storedId);
    }
  }, []);

  const { notificaciones, loading, error, marcarComoLeida } = useNotificaciones(
    token,
    usuarioId
  );

  const tipos = ["todos", "nota", "actividad", "general"];

  const filtradas = notificaciones.filter((n) =>
    filtroTipo === "todos" ? true : n.tipo === filtroTipo
  );

  const agrupadas = filtradas.reduce((acc, n) => {
    const fechaClave = new Intl.DateTimeFormat("es-VE", {
      dateStyle: "full",
    }).format(new Date(n.fecha));

    acc[fechaClave] = acc[fechaClave] || [];
    acc[fechaClave].push(n);
    return acc;
  }, {});

  const iconoTipo = {
    nota: <FaCheckCircle className="text-lime-400 mt-1 mr-2" />,
    actividad: <FaClipboardList className="text-blue-400 mt-1 mr-2" />,
    general: <FaInfoCircle className="text-white mt-1 mr-2" />,
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <VideoFondoEstudiante />
      <div className="relative z-10">
        <NavbarEstudiante />

        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold flex justify-center items-center gap-2">
              <FaBell className="text-lime-400" />
              Notificaciones
            </h1>
            <p className="text-white/70 text-base sm:text-lg">
              Aquí verás tus actualizaciones académicas más recientes.
            </p>
          </div>

          {/* Filtro por tipo */}
          <div className="flex justify-center gap-4 flex-wrap">
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  filtroTipo === tipo
                    ? "bg-lime-500 text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </button>
            ))}
          </div>

          {/* Lista agrupada por fecha */}
          <section className="space-y-6">
            {loading && (
              <p className="text-center text-white/70">
                Cargando notificaciones...
              </p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && filtradas.length === 0 && (
              <p className="text-center text-white/50">
                No hay notificaciones en esta categoría.
              </p>
            )}

            {Object.entries(agrupadas).map(([fecha, grupo]) => (
              <div key={fecha} className="space-y-3">
                <h2 className="text-white/80 font-semibold text-lg">{fecha}</h2>
                {grupo.map((n) => {
                  const enlace =
                    n.tipo === "nota"
                      ? `/entregas/${n.entregaId}`
                      : n.tipo === "actividad"
                      ? `/actividades/${n.actividadId}`
                      : null;

                  const contenido = (
                    <div
                      className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ${
                        n.leido
                          ? "border-white/20 bg-white/5 text-white/70"
                          : "border-lime-400 bg-white/10 text-white"
                      } hover:scale-[1.01] hover:shadow-md cursor-pointer`}
                      onClick={() => marcarComoLeida(n._id)}
                    >
                      {iconoTipo[n.tipo] || iconoTipo.general}
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{n.mensaje}</span>
                          {!n.leido && (
                            <span className="text-xs bg-lime-500 text-black px-2 py-0.5 rounded-full">
                              Nuevo
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          {new Date(n.fecha).toLocaleTimeString("es-VE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );

                  return enlace ? (
                    <Link to={enlace} key={n._id}>
                      {contenido}
                    </Link>
                  ) : (
                    <div key={n._id}>{contenido}</div>
                  );
                })}
              </div>
            ))}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default BandejaNotificaciones;
