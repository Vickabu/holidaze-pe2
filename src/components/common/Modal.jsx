import { HiOutlineX } from "react-icons/hi";

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-2xl"
          aria-label="Lukk"
        >
          <HiOutlineX   />
        </button>
        {children}
      </div>
    </div>
  );
}