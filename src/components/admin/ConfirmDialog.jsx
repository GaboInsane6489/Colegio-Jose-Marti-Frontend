import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ⚠️ Diálogo institucional de confirmación para acciones críticas
 */
const ConfirmDialog = ({ visible, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'
          role='dialog'
          aria-modal='true'
          aria-labelledby='confirm-dialog-title'
          aria-describedby='confirm-dialog-description'
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='bg-gray-900 text-white p-6 rounded-xl shadow-2xl max-w-sm w-full border border-white/20'
          >
            <div className='flex items-center gap-3 mb-4'>
              <ExclamationTriangleIcon className='h-6 w-6 text-[#00FFF7] drop-shadow-[0_0_6px_#00FFF7]' />
              <h3
                id='confirm-dialog-title'
                className='text-base sm:text-lg font-semibold text-white'
              >
                ¿Estás seguro?
              </h3>
            </div>

            <p
              id='confirm-dialog-description'
              className='text-xs sm:text-sm text-white/70 mb-6 font-medium'
            >
              Esta acción no se puede deshacer.
            </p>

            <div className='flex justify-end space-x-3'>
              <button
                onClick={onCancel}
                className='px-4 py-2 text-xs sm:text-sm rounded-md bg-gray-700 text-white hover:bg-gray-600 transition font-medium'
                aria-label='Cancelar acción'
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className='px-4 py-2 text-xs sm:text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold'
                aria-label='Confirmar eliminación'
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
