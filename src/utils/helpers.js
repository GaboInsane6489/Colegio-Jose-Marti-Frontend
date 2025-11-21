// src/utils/helpers.js

/**
 * 🧠 Validación robusta de ObjectId (24 caracteres hexadecimales)
 * @param {string} id - ID a validar
 * @returns {boolean} true si es válido
 */
export const esObjectIdValido = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id.trim());

/**
 * 📚 Validación de actividad institucional
 * @param {object} actividad - Objeto actividad
 * @returns {boolean} true si es válido
 */
export const esActividadValida = (actividad) =>
  actividad &&
  typeof actividad._id === 'string' &&
  typeof actividad.titulo === 'string' &&
  typeof actividad.descripcion === 'string';

/**
 * 📅 Formatea fecha a string legible
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha en formato DD/MM/YYYY HH:mm
 */
export const formatearFecha = (fecha) => {
  try {
    const d = new Date(fecha);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  } catch {
    return '';
  }
};

/**
 * ✂️ Capitaliza la primera letra de un texto
 * @param {string} texto - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalizar = (texto) =>
  typeof texto === 'string' && texto.length > 0
    ? texto.charAt(0).toUpperCase() + texto.slice(1)
    : texto;
