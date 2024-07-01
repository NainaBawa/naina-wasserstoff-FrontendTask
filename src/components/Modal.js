import React, { useState, useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, isFolder }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (isFolder && /[^\w\s]/.test(name)) {
      setError('Folder name should not contain special characters.');
      shakeModal();
      return;
    }
    if (!name.trim()) {
      setError('Name cannot be empty.');
      shakeModal();
      return;
    }
    setError('');
    onSubmit(name);
    setName('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const shakeModal = () => {
    modalRef.current.classList.add('animate-shake');
    setTimeout(() => {
      modalRef.current.classList.remove('animate-shake');
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-vscode-sidebar p-4 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold mb-4 text-vscode-text">
          {isFolder ? 'Create Folder' : 'Create File'}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="border p-2 w-full mb-2 bg-vscode-background text-vscode-ide-text"
          placeholder={`Enter ${isFolder ? 'folder' : 'file'} name`}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
