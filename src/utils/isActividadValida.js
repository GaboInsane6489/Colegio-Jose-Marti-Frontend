const isActividadValida = (actividad) => {
  if (!actividad || typeof actividad !== "object") return false;

  const { fechaEntrega, tipo, materia, titulo } = actividad;

  return (
    typeof fechaEntrega === "string" &&
    typeof tipo === "string" &&
    typeof materia === "string" &&
    typeof titulo === "string" &&
    fechaEntrega.trim() !== "" &&
    tipo.trim() !== "" &&
    materia.trim() !== "" &&
    titulo.trim() !== ""
  );
};

export default isActividadValida;
