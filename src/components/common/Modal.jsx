import { HiOutlineX } from "react-icons/hi";

/**
 * A reusable modal dialog component.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.show - Determines whether the modal is visible.
 * @param {Function} props.onClose - Function to call when the modal is requested to close.
 * @param {React.ReactNode} props.children - Content to render inside the modal.
 *
 * @example
 * <Modal show={isOpen} onClose={() => setIsOpen(false)}>
 *   <p>Hello from modal!</p>
 * </Modal>
 */

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-2xl"
          aria-label="Close modal"
        >
          <HiOutlineX />
        </button>
        {children}
      </div>
    </div>
  );
}
