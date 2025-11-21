/**
 * 🔍 Obtiene el valor de una cookie por nombre
 * Devuelve null si no existe o si el nombre es inválido.
 */

export const getCookie = (name) => {
  if (!name || typeof name !== 'string' || typeof document === 'undefined') return null;

  try {
    const safeName = name.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
    const regex = new RegExp(`(?:^|; )${safeName}=([^;]*)`);
    const match = document.cookie.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
  } catch (error) {
    console.warn('⚠️ Error al leer la cookie:', error);
    return null;
  }
};

/**
 * 🍪 Establece una cookie
 * @param {string} name - Nombre de la cookie
 * @param {string} value - Valor de la cookie
 * @param {number} days - Días hasta la expiración (opcional, por defecto 7)
 */
export const setCookie = (name, value, days = 7) => {
  if (!name || typeof document === 'undefined') return;

  let expires = '';
  if (days) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${fecha.toUTCString()}`;
  }
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
};

/**
 * ❌ Elimina una cookie
 * @param {string} name - Nombre de la cookie
 */
export const deleteCookie = (name) => {
  if (!name || typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
