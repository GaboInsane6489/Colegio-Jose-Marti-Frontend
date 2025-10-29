/**
 * 📤 Exporta notas académicas como archivo CSV descargable
 * @param {Array} notas - Arreglo de objetos con datos de entrega
 */
export const exportNotasCSV = (notas = []) => {
  if (!Array.isArray(notas) || notas.length === 0) return;

  const encabezado = ["Estudiante", "Actividad", "Calificación", "Comentario"];

  const filas = notas.map((n) => [
    n.estudianteId?.nombre || "—",
    n.actividad?.titulo || "—",
    n.calificacion ?? "—",
    `"${(n.comentarioDocente || "").replace(/"/g, '""')}"`, // Escapa comillas internas
  ]);

  const contenido = [encabezado, ...filas]
    .map((fila) => fila.join(","))
    .join("\n");

  const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "notas_exportadas.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
