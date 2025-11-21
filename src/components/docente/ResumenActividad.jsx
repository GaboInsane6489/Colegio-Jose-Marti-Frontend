/**
 * 📋 Componente institucional para mostrar resumen de una actividad
 * Muestra datos básicos y métricas de entregas asociadas
 */
const ResumenActividad = ({ actividad, entregas = [] }) => {
  if (!actividad) return null;

  // ✅ Normalización de IDs y métricas
  const totalEntregas = Array.isArray(entregas) ? entregas.length : 0;
  const entregasRevisadas = entregas.filter((e) => e.estado === 'revisado').length;
  const promedio =
    entregasRevisadas > 0
      ? (
          entregas
            .filter((e) => typeof e.calificacion === 'number')
            .reduce((acc, e) => acc + e.calificacion, 0) / entregasRevisadas
        ).toFixed(2)
      : '—';

  return (
    <div className='p-4 bg-gray-900 text-white rounded-xl shadow-md space-y-2'>
      <h3 className='text-lg font-semibold'>{actividad.titulo}</h3>
      <p className='text-sm text-gray-300'>{actividad.descripcion || 'Sin descripción'}</p>

      <ul className='text-sm space-y-1'>
        <li>
          <span className='font-bold'>Tipo:</span> {actividad.tipo}
        </li>
        <li>
          <span className='font-bold'>Lapso:</span> {actividad.lapso}
        </li>
        <li>
          <span className='font-bold'>Fecha entrega:</span>{' '}
          {actividad.fechaEntrega
            ? new Date(actividad.fechaEntrega).toLocaleDateString()
            : 'Sin fecha'}
        </li>
        <li>
          <span className='font-bold'>Estado:</span> {actividad.estado}
        </li>
        <li>
          <span className='font-bold'>Total entregas:</span> {totalEntregas}
        </li>
        <li>
          <span className='font-bold'>Revisadas:</span> {entregasRevisadas}
        </li>
        <li>
          <span className='font-bold'>Promedio:</span> {promedio}
        </li>
      </ul>
    </div>
  );
};

export default ResumenActividad;
