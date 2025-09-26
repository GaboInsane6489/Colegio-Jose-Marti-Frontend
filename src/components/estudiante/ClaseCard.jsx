const ClaseCard = ({ clase }) => (
  <div className="bg-white p-5 rounded shadow hover:shadow-lg transition border border-gray-200">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-indigo-700">
          📘 {clase.nombre}
        </h3>
        <p className="text-sm text-gray-600">Profesor: {clase.docente}</p>
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
        Ver clase
      </button>
    </div>
  </div>
);

export default ClaseCard;
