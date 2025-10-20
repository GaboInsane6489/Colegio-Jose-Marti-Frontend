import { UserCircleIcon } from "@heroicons/react/24/outline";

const PerfilDocente = () => {
  const docente = {
    nombre: "Deglis García",
    email: "deglisgarcia@gmail.com",
    rol: "Docente",
    materias: ["Matemáticas I", "Lengua y Literatura"],
    secciones: ["1A", "2B"],
    estudiantes: 58,
  };

  return (
    <section className="bg-black text-white p-6 rounded-xl border border-white/20 shadow-md flex flex-col items-center justify-center space-y-6 text-center">
      {/* 🧠 Encabezado con icono y título centrado */}
      <div className="flex flex-col items-center gap-2">
        <UserCircleIcon className="h-12 w-12 text-white" />
        <h2 className="text-2xl font-semibold">Perfil institucional</h2>
      </div>

      {/* 📊 Tabla de datos centrada */}
      <div className="overflow-x-auto w-full max-w-md">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <tbody className="text-white/90">
            <tr>
              <td className="font-semibold text-white w-40">Nombre:</td>
              <td>{docente.nombre}</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Correo:</td>
              <td>{docente.email}</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Rol:</td>
              <td>{docente.rol}</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Materias:</td>
              <td>{docente.materias.join(", ")}</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Secciones:</td>
              <td>{docente.secciones.join(", ")}</td>
            </tr>
            <tr>
              <td className="font-semibold text-white">Estudiantes:</td>
              <td>{docente.estudiantes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PerfilDocente;
