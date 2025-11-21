import NotaCard from './NotaCard';

/**
 * 🧾 Componente institucional para listar notas entregadas
 */
const ListaNotas = ({ notas = [], loading, error, onEdit }) => {
  if (loading) {
    return <p className='text-center text-white/70 col-span-full'>🔄 Cargando entregas...</p>;
  }

  if (error) {
    return (
      <p className='text-center text-red-400 col-span-full'>❌ Error al cargar notas: {error}</p>
    );
  }

  if (!Array.isArray(notas) || notas.length === 0) {
    return (
      <p className='text-center text-white/50 col-span-full'>
        No hay entregas que coincidan con los filtros aplicados.
      </p>
    );
  }

  return notas.map((entrega) => (
    <NotaCard key={entrega._id || entrega.id} entrega={entrega} onEdit={onEdit} />
  ));
};

export default ListaNotas;
