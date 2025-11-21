import { esObjectIdValido } from '@/utils/helpers.js';

/**
 * ✅ Valida si una actividad académica tiene estructura mínima requerida
 * @param {object} actividad - Objeto de actividad a validar
 * @returns {boolean} true si es válida, false si no
 */
const isActividadValida = (actividad) => {
  if (!actividad || typeof actividad !== 'object') return false;

  const { fechaEntrega, tipo, materia, titulo, cursoId } = actividad;

  // Validar campos obligatorios tipo string
  if (
    typeof titulo !== 'string' ||
    titulo.trim() === '' ||
    typeof materia !== 'string' ||
    materia.trim() === ''
  ) {
    return false;
  }

  // Validar fechaEntrega como fecha válida
  const fecha = new Date(fechaEntrega);
  if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
    return false;
  }

  // Validar tipo de actividad (incluye "otro" como en el esquema)
  const tiposPermitidos = ['tarea', 'examen', 'proyecto', 'otro'];
  if (!tiposPermitidos.includes(tipo)) {
    return false;
  }

  // Validar cursoId como ObjectId válido
  if (!esObjectIdValido(cursoId)) {
    return false;
  }

  // docenteId puede ser opcional → no se valida aquí

  return true;
};

export default isActividadValida;
