import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBookOpen, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const materias = [
  { nombre: 'Matemáticas', rango: '1er a 2do Año', docente: 'Prof. Luis Ramírez' },
  { nombre: 'Lengua y Literatura', rango: '1er a 3er Año', docente: 'Prof. Ana Torres' },
  { nombre: 'Biología', rango: '2do a 3er Año', docente: 'Prof. Carla Mendoza' },
  { nombre: 'Historia Universal', rango: '2do a 4to Año', docente: 'Prof. Jorge Salas' },
  { nombre: 'Física', rango: '3er a 4to Año', docente: 'Prof. Daniel Ríos' },
  {
    nombre: 'Educación para la Ciudadanía',
    rango: '3er a 5to Año',
    docente: 'Prof. Mariana López',
  },
  { nombre: 'Química', rango: '4to Año', docente: 'Prof. Andrés Peña' },
  { nombre: 'Filosofía', rango: '4to a 5to Año', docente: 'Prof. Laura Gómez' },
  { nombre: 'Orientación Vocacional', rango: '5to Año', docente: 'Prof. Silvia Herrera' },
  { nombre: 'Proyecto de Investigación', rango: '5to Año', docente: 'Prof. Ricardo Díaz' },
  { nombre: 'Inglés', rango: '1er a 5to Año', docente: 'Prof. Emily Johnson' },
  { nombre: 'Educación Física', rango: '1er a 3er Año', docente: 'Prof. Miguel Torres' },
];

const MateriasSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className='w-full bg-black py-20 px-6 flex justify-center'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
        className='max-w-6xl w-full space-y-10'
      >
        <h2 className='text-3xl md:text-4xl font-bold text-center text-white'>Materias por Año</h2>

        <div className='overflow-x-auto rounded-xl border border-white'>
          <table className='w-full text-white text-sm sm:text-base'>
            <thead className='bg-[#1a1a1a] text-white'>
              <tr>
                <th className='px-4 py-3 font-semibold text-center whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-2'>
                    <FaBookOpen className='text-blue-400' />
                    Materia
                  </div>
                </th>
                <th className='px-4 py-3 font-semibold text-center whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-2'>
                    <FaUserGraduate className='text-yellow-400' />
                    Rango Académico
                  </div>
                </th>
                <th className='px-4 py-3 font-semibold text-center whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-2'>
                    <FaChalkboardTeacher className='text-green-400' />
                    Docente
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: index * 0.05,
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.4,
                  }}
                  className='border-t border-white text-center hover:bg-[#1f1f1f] transition-colors'
                >
                  <td className='px-4 py-3 font-medium'>{materia.nombre}</td>
                  <td className='px-4 py-3'>{materia.rango}</td>
                  <td className='px-4 py-3'>{materia.docente}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default MateriasSection;
