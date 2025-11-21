import { useState } from 'react';
import DocentesTable from './DocentesTable';
import DocenteForm from './DocenteForm';
import ConfirmDialog from './ConfirmDialog';
import useDocentes from '../../hooks/useDocentes';

const DocentesManager = () => {
  const {
    data: docentes,
    loading,
    error,
    createDocente,
    updateDocente,
    deleteDocente,
  } = useDocentes();

  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [docenteEnEdicion, setDocenteEnEdicion] = useState(null);

  const handleDeleteClick = (id) => {
    setDocenteSeleccionado(id);
    setMostrarConfirmacion(true);
  };

  const handleConfirmDelete = () => {
    if (docenteSeleccionado) {
      deleteDocente(docenteSeleccionado);
    }
    setMostrarConfirmacion(false);
    setDocenteSeleccionado(null);
  };

  const handleCancelDelete = () => {
    setMostrarConfirmacion(false);
    setDocenteSeleccionado(null);
  };

  const handleEditClick = (id) => {
    const seleccionado = Array.isArray(docentes)
      ? docentes.find((d) => (d.id || d._id) === id)
      : null;
    setDocenteEnEdicion(seleccionado);
  };

  const handleUpdate = (actualizado) => {
    const safeId = docenteEnEdicion?.id || docenteEnEdicion?._id;
    if (safeId) {
      updateDocente(safeId, actualizado);
      setDocenteEnEdicion(null);
    }
  };

  const listaDocentes = Array.isArray(docentes) ? docentes : [];

  return (
    <section
      id='docentes'
      className='w-full px-4 sm:px-6 py-10 space-y-12 bg-black text-white rounded-xl shadow-lg border border-white/10 scroll-mt-24'
    >
      <h2
        className='text-lg sm:text-xl md:text-2xl font-bold text-center text-white drop-shadow-[0_0_4px_#00FFF7]'
        aria-label='Gestión de docentes'
      >
        Gestión de Docentes
      </h2>

      {error && (
        <div
          className='bg-red-600 text-white px-4 py-2 rounded-md text-xs sm:text-sm text-center font-medium'
          role='alert'
          aria-live='assertive'
        >
          {error}
        </div>
      )}

      <div className='w-full'>
        {docenteEnEdicion ? (
          <DocenteForm
            initialValues={docenteEnEdicion}
            onSubmit={handleUpdate}
            onCancel={() => setDocenteEnEdicion(null)}
            modoEdicion
          />
        ) : (
          <DocenteForm onSubmit={createDocente} />
        )}
      </div>

      <div className='w-full'>
        <DocentesTable
          docentes={listaDocentes}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          loading={loading}
        />
      </div>

      <ConfirmDialog
        visible={mostrarConfirmacion}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </section>
  );
};

export default DocentesManager;
