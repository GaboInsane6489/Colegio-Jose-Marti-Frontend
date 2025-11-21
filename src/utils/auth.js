// src/utils/auth.js

/**
 * 🍪 Obtiene el valor de una cookie por nombre
 * @param {string} nombre - Nombre de la cookie
 * @returns {string|null} Valor de la cookie o null si no existe
 */
export const getCookie = (nombre) => {
  if (typeof document === 'undefined') return null;

  const safeName = nombre.replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
  const regex = new RegExp(`(?:^|; )${safeName}=([^;]*)`);
  const match = document.cookie.match(regex);

  return match ? decodeURIComponent(match[1]) : null;
};

/**
 * 🍪 Establece una cookie
 * @param {string} nombre - Nombre de la cookie
 * @param {string} valor - Valor de la cookie
 * @param {number} dias - Días hasta la expiración (opcional)
 */
export const setCookie = (nombre, valor, dias = 7) => {
  if (typeof document === 'undefined') return;

  let expires = '';
  if (dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    expires = `; expires=${fecha.toUTCString()}`;
  }
  document.cookie = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}${expires}; path=/`;
};

/**
 * 🍪 Elimina una cookie
 * @param {string} nombre - Nombre de la cookie
 */
export const deleteCookie = (nombre) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(
    nombre
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
