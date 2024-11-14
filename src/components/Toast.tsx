// components/Toast.tsx

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  // Auto-hide the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-14 right-5 p-4 bg-gray-800 text-white rounded-lg shadow-lg animate-fade">
      <span>{message}</span>
      <button className="ml-4 text-gray-400 hover:text-white" onClick={onClose}>✖</button>
    </div>
  );
};

export default Toast;
