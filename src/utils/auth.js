/**
 * 🍪 Obtiene el valor de una cookie por nombre
 * @param {string} nombre - Nombre de la cookie
 * @returns {string|null} Valor de la cookie o null si no existe
 */
export const getCookie = (nombre) => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(
      `(?:^|; )${nombre.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`
    )
  );

  return match ? decodeURIComponent(match[1]) : null;
};
