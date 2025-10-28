import NotaCard from "./NotaCard";

const ListaNotas = ({ notas, loading, error, onEdit }) => {
  if (loading) {
    return (
      <p className="text-center text-white/70 col-span-full">
        Cargando entregas...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 col-span-full">
        Error al cargar notas: {error}
      </p>
    );
  }

  if (notas.length === 0) {
    return (
      <p className="text-center text-white/50 col-span-full">
        No hay entregas que coincidan con los filtros aplicados.
      </p>
    );
  }

  return notas.map((entrega) => (
    <NotaCard key={entrega._id} entrega={entrega} onEdit={onEdit} />
  ));
};

export default ListaNotas;
