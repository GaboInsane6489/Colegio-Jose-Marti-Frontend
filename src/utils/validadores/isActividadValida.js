/**
 * ✅ Valida si una actividad académica tiene estructura mínima requerida
 * @param {object} actividad - Objeto de actividad a validar
 * @returns {boolean} true si es válida, false si no
 */
const isActividadValida = (actividad) => {
  if (!actividad || typeof actividad !== "object") return false;

  const campos = ["fechaEntrega", "tipo", "materia", "titulo"];

  return campos.every(
    (campo) =>
      typeof actividad[campo] === "string" && actividad[campo].trim() !== ""
  );
};

export default isActividadValida;
