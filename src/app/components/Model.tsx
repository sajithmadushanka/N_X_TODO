'use client'

interface ModalProps {
  isOpen: boolean
}

const Modal = ({ isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Enter Details</h2>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border p-2 rounded mb-4"
        />
        <div className="flex justify-end space-x-3">
          <button  className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;