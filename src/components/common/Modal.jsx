import { HiOutlineX } from "react-icons/hi";

/**
 * A reusable modal dialog component that displays content overlayed on the screen.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {Function} props.onClose - Callback function invoked when the modal should close.
 * @param {React.ReactNode} props.children - The content to render inside the modal.
 *
 * @returns {React.ReactNode|null} The modal JSX if visible, otherwise null.
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
      <div className="relative bg-[#F4E9DC] text-gray-900  rounded shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700  text-2xl"
          aria-label="Close modal"
        >
          <HiOutlineX />
        </button>
        {children}
      </div>
    </div>
  );
}
