/**
 * 🔢 Convierte un número en porcentaje con dos decimales
 */
export const formatearPorcentaje = (valor) => {
  if (typeof valor !== "number") return "0.00%";
  return `${(valor * 100).toFixed(2)}%`;
};

/**
 * 🧠 Capitaliza la primera letra de una cadena
 */
export const capitalizar = (texto = "") => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

/**
 * 📅 Formatea fecha en formato institucional (DD/MM/YYYY)
 */
export const formatearFecha = (fecha) => {
  const f = new Date(fecha);
  return f.toLocaleDateString("es-VE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * 🧪 Verifica si un valor es un ObjectId válido
 */
export const esObjectIdValido = (id) =>
  typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

/**
 * 🧼 Limpia un string eliminando espacios y normalizando
 */
export const limpiarTexto = (texto = "") =>
  texto
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
