import ClaseCard from "./ClaseCard";

/**
 * 🧑‍🏫 Componente institucional para listar clases asignadas
 */
const ClasesList = ({ clases = [] }) => {
  if (!Array.isArray(clases) || clases.length === 0) {
    return (
      <p className="text-gray-500 text-center">No tienes clases asignadas.</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      {clases.map((clase) => (
        <ClaseCard key={clase._id} clase={clase} />
      ))}
    </div>
  );
};

export default ClasesList;
