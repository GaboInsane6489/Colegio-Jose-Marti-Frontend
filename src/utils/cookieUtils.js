/**
 * 🔍 Obtiene el valor de una cookie por nombre
 * Devuelve null si no existe o si el nombre es inválido.
 */
export const getCookie = (name) => {
  if (!name || typeof name !== "string") return null;

  try {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  } catch (error) {
    console.warn("⚠️ Error al leer la cookie:", error);
    return null;
  }
};
