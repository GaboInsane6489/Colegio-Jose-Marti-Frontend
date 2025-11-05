import { useEffect, useState } from 'react';
import ClaseFormAdmin from './ClaseFormAdmin';
import ClasesTable from './ClasesTable';
import { obtenerDocentes, crearClase, obtenerTodasClases } from '../../services/clasesService';

/**
 * 🧠 Contenedor institucional para gestión de clases
 * Incluye formulario, tabla y lógica de recarga
 */
const ClasesManager = ({ navigate }) => {
  const [docentes, setDocentes] = useState([]);
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🧠 Carga inicial de datos
  const cargarDatos = async () => {
    setCargando(true);

    const resultadoDocentes = await obtenerDocentes();
    if (resultadoDocentes.ok) {
      setDocentes(resultadoDocentes.docentes);
      console.log(`📚 Docentes cargados: ${resultadoDocentes.docentes.length}`);
    } else {
      console.warn('⚠️ No se pudieron cargar los docentes:', resultadoDocentes.msg);
    }

    const resultadoClases = await obtenerTodasClases();
    if (resultadoClases.ok) {
      setClases(resultadoClases.clases);
      console.log(`📦 Clases cargadas: ${resultadoClases.clases.length}`);
    } else {
      console.warn('⚠️ No se pudieron cargar las clases:', resultadoClases.msg);
    }

    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // 🧠 Manejo de creación con recarga real
  const handleCrearClase = async (datosClase) => {
    const resultado = await crearClase(datosClase);
    if (resultado.ok) {
      console.log('✅ Clase creada correctamente:', resultado.clase);
      await cargarDatos(); // 🔁 Recarga desde backend para reflejar persistencia real
    } else {
      console.error('❌ Error al crear clase:', resultado.msg);
    }
  };

  if (cargando) {
    return (
      <div className='bg-black text-white p-6 text-center'>
        <p className='text-gray-400 animate-pulse'>Cargando gestión de clases...</p>
      </div>
    );
  }

  return (
    <section className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12'>
      <ClaseFormAdmin docentes={docentes} onCrear={handleCrearClase} />
      <ClasesTable clases={clases} navigate={navigate} />
    </section>
  );
};

export default ClasesManager;
