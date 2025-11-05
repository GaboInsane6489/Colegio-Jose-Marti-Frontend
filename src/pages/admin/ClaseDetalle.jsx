import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerTodasClases } from '../../services/clasesService';
import AsignarEstudiantesForm from '../../components/admin/AsignarEstudiantesForm';

/**
 * 📘 Vista institucional para detalle de clase y asignación de estudiantes
 */
const ClaseDetalle = () => {
  const { id } = useParams(); // 🆔 ID de la clase desde la URL
  const [clase, setClase] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarClase = async () => {
      const res = await obtenerTodasClases(); // 🔍 Busca todas y filtra localmente
      if (res.ok) {
        const encontrada = res.clases.find((c) => c._id === id);
        if (encontrada) {
          setClase(encontrada);
        } else {
          setMensaje('⚠️ Clase no encontrada.');
        }
      } else {
        setMensaje(res.msg);
      }
      setCargando(false);
    };
    cargarClase();
  }, [id]);

  const actualizarClaseLocal = (claseActualizada) => {
    setClase(claseActualizada);
    setMensaje('✅ Clase actualizada con nuevos estudiantes.');
  };

  if (cargando) {
    return (
      <div className='bg-black text-white p-6 text-center'>
        <p className='text-gray-400 animate-pulse'>⏳ Cargando clase...</p>
      </div>
    );
  }

  if (!clase) {
    return (
      <div className='bg-black text-white p-6 text-center'>
        <p className='text-red-400'>{mensaje}</p>
      </div>
    );
  }

  return (
    <section className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-black text-white py-12'>
      <article className='space-y-4'>
        <h2 className='text-2xl font-bold text-center sm:text-left'>📘 Detalles de la clase</h2>
        <p>
          <strong>Nombre:</strong> {clase.nombre}
        </p>
        <p>
          <strong>Docente:</strong> {clase.docente?.nombre} ({clase.docente?.email})
        </p>
        <p>
          <strong>Horario:</strong> {clase.horario}
        </p>
        <p>
          <strong>Descripción:</strong> {clase.descripcion || 'Sin descripción'}
        </p>
      </article>

      <article className='space-y-4'>
        <h3 className='text-xl font-semibold'>👥 Estudiantes asignados</h3>
        {clase.estudiantes.length === 0 ? (
          <p className='text-yellow-400'>⚠️ No hay estudiantes asignados aún.</p>
        ) : (
          <ul className='list-disc list-inside space-y-1'>
            {clase.estudiantes.map((e) => (
              <li key={e._id}>
                {e.nombre} <span className='text-sm text-gray-400'>({e.email})</span>
              </li>
            ))}
          </ul>
        )}
      </article>

      <hr className='border-white/30' />

      <AsignarEstudiantesForm claseId={clase._id} onAsignacionExitosa={actualizarClaseLocal} />

      {mensaje && <div className='text-green-400 text-sm text-center pt-4'>{mensaje}</div>}
    </section>
  );
};

export default ClaseDetalle;
