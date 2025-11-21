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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className='w-full bg-black py-16 px-4 sm:px-6 md:px-8 flex justify-center scroll-mt-24 border border-white drop-shadow-[0_0_4px_#00FFF7]'
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
        className='max-w-6xl w-full space-y-8'
      >
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white drop-shadow-[0_0_4px_#00FFF7] pt-2'>
          Materias por Año
        </h2>

        <div className='overflow-x-auto rounded-xl border border-white shadow-[0_0_12px_#00FFF7]'>
          <table className='w-full text-white text-[15px]'>
            <thead className='bg-[#1a1a1a] text-white/90'>
              <tr>
                <th className='px-4 py-3 font-medium text-center whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-2 text-white drop-shadow-[0_0_4px_#00FFF7]'>
                    <FaBookOpen />
                    Materia
                  </div>
                </th>
                <th className='px-4 py-3 font-medium text-center whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-2 text-white drop-shadow-[0_0_4px_#00FFF7]'>
                    <FaUserGraduate />
                    Rango Académico
                  </div>
                </th>
                <th className='px-4 py-3 font-medium text-center whitespace-nowrap'>
                  <div className='flex items-center justify-center gap-2 text-white drop-shadow-[0_0_4px_#00FFF7]'>
                    <FaChalkboardTeacher />
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
                  className='border-t border-white/60 text-center hover:bg-[#1f1f1f] transition-colors'
                >
                  <td className='px-4 py-3 font-medium text-white/90'>{materia.nombre}</td>
                  <td className='px-4 py-3 text-white/80'>{materia.rango}</td>
                  <td className='px-4 py-3 text-white/80'>{materia.docente}</td>
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
