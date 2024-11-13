import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
  yes: string;
  no: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, onSave, yes = 'Save', no = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-white text-xl mb-4">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            onClick={onSave}
          >
            {yes}
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            {no}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
