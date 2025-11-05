/**
 * 📤 Exporta notas académicas como archivo CSV descargable
 * @param {Array} notas - Arreglo de objetos con datos de entrega
 */
export const exportNotasCSV = (notas = []) => {
  if (!Array.isArray(notas) || notas.length === 0) return;

  const encabezado = ['Estudiante', 'Actividad', 'Calificación', 'Comentario'];

  const filas = notas.map((n) => {
    const estudiante = n.estudianteId?.nombre?.trim() || '—';
    const actividad = n.actividadId?.titulo?.trim() || '—';
    const calificacion = typeof n.calificacion === 'number' ? n.calificacion : '—';
    const comentario = (n.comentarioDocente || '')
      .replace(/"/g, '""') // Escapa comillas
      .replace(/\n/g, ' ') // Elimina saltos de línea
      .trim();

    return [estudiante, actividad, calificacion, `"${comentario}"`];
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
};
