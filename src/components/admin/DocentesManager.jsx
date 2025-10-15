import { useState } from "react";
import DocentesTable from "./DocentesTable";
import DocenteForm from "./DocenteForm";
import ConfirmDialog from "./ConfirmDialog";
import useDocentes from "../../hooks/useDocentes";

const DocentesManager = () => {
  const {
    docentes,
    loading,
    error,
    crearDocente,
    actualizarDocente,
    eliminarDocente,
  } = useDocentes();

  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [docenteEnEdicion, setDocenteEnEdicion] = useState(null);

  const handleDeleteClick = (id) => {
    setDocenteSeleccionado(id);
    setMostrarConfirmacion(true);
  };

  const handleConfirmDelete = () => {
    eliminarDocente(docenteSeleccionado);
    setMostrarConfirmacion(false);
    setDocenteSeleccionado(null);
  };

  const handleCancelDelete = () => {
    setMostrarConfirmacion(false);
    setDocenteSeleccionado(null);
  };

  const handleEditClick = (id) => {
    const seleccionado = docentes.find((d) => d._id === id);
    setDocenteEnEdicion(seleccionado);
  };

  const handleUpdate = (actualizado) => {
    actualizarDocente(docenteEnEdicion._id, actualizado);
    setDocenteEnEdicion(null);
  };

  return (
    <section className="p-6 space-y-12">
      <h2 className="text-2xl font-bold text-center">Gestión de Docentes</h2>

      {docenteEnEdicion ? (
        <DocenteForm
          initialValues={docenteEnEdicion}
          onSubmit={handleUpdate}
          onCancel={() => setDocenteEnEdicion(null)}
          modoEdicion
        />
      ) : (
        <DocenteForm onSubmit={crearDocente} />
      )}

      <DocentesTable
        docentes={docentes}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      <ConfirmDialog
        visible={mostrarConfirmacion}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </section>
  );
};

export default DocentesManager;
