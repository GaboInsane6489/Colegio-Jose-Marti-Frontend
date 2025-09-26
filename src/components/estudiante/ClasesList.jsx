import ClaseCard from "./ClaseCard";

const ClasesList = ({ clases }) => {
  if (clases.length === 0) {
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
