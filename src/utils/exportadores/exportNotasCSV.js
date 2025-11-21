/**
 * 📤 Exporta notas académicas como archivo CSV descargable
 * @param {Array} notas - Arreglo de objetos con datos de entrega
 */

export const exportNotasCSV = (notas = []) => {
  if (!Array.isArray(notas) || notas.length === 0) {
    console.warn('⚠️ No hay notas para exportar.');
    return;
  }

  const encabezado = [
    'Estudiante',
    'Actividad',
    'Calificación',
    'Comentario',
    'Estado',
    'Fecha revisión',
  ];

  const filas = notas.map((n) => {
    const estudiante = n?.estudianteId?.nombre?.trim() || '—';
    const actividad = n?.actividadId?.titulo?.trim() || '—';
    const calificacion = typeof n?.calificacion === 'number' ? n.calificacion : '—';
    const comentario = (n?.comentarioDocente || '')
      .replace(/"/g, '""') // Escapa comillas
      .replace(/\n/g, ' ') // Elimina saltos de línea
      .trim();
    const estado = n?.estado || 'Pendiente';
    const fechaRevision = n?.fechaRevision
      ? new Date(n.fechaRevision).toLocaleDateString('es-VE')
      : '—';

    return [estudiante, actividad, calificacion, `"${comentario}"`, estado, fechaRevision];
  });

  const contenido = [encabezado, ...filas].map((fila) => fila.join(',')).join('\n');

  const blob = new Blob(['\uFEFF' + contenido], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const fecha = new Date().toISOString().split('T')[0];
  link.href = url;
  link.setAttribute('download', `notas_${fecha}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 🧹 Liberar memoria
  URL.revokeObjectURL(url);
};
