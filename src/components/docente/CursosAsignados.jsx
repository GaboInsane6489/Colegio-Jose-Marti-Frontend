import {
  BookOpenIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

/**
 * 🎓 Componente institucional para mostrar los cursos asignados al docente
 * Puede recibir los cursos como prop o integrarse con un hook externo
 */
const CursosAsignados = ({ cursos = [] }) => {
  console.log("📚 Cursos recibidos:", cursos);

  const hayCursos = Array.isArray(cursos) && cursos.length > 0;

  return (
    <section className="bg-black text-white p-6 rounded-xl border border-white/20 shadow-md flex flex-col items-center justify-center space-y-6 text-center">
      {/* 🧠 Encabezado con icono y título centrado */}
      <div className="flex flex-col items-center gap-2">
        <BookOpenIcon className="h-10 w-10 text-white" />
        <h2 className="text-2xl font-semibold">Tus cursos asignados</h2>
      </div>

      {/* 📦 Estado vacío o lista de cursos */}
      {!hayCursos ? (
        <div className="flex flex-col items-center gap-2">
          <ExclamationCircleIcon className="h-10 w-10 text-red-400" />
          <p className="text-lg font-medium text-white">
            No hay cursos asignados aún.
          </p>
          <p className="text-sm text-white/60 max-w-md">
            Cuando el administrador te asigne materias, aparecerán aquí con sus
            respectivas secciones y estudiantes.
          </p>
        </div>
      ) : (
        <ul className="list-disc list-inside space-y-2 text-white/90 max-w-md mx-auto">
          {cursos.map((curso) => (
            <li key={curso.id || curso._id}>
              <span className="font-semibold">{curso.nombre}</span>
              {curso.seccion && (
                <span className="text-white/60">
                  {" "}
                  — Sección {curso.seccion}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CursosAsignados;
