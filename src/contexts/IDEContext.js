import React, { createContext, useState, useContext } from 'react';
import Modal from '../components/Modal';

const IDEContext = createContext();

export const IDEProvider = ({ children }) => {
  const initialStructure = [
    {
      type: 'folder',
      name: 'root',
      children: [],
      path: [],
    },
  ];

  const [structure, setStructure] = useState(initialStructure);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentPath, setCurrentPath] = useState([]);

  const addFolderOrFile = (currentStructure, path, item) => {
    if (path.length === 0) {
      return [...currentStructure, item];
    }

    return currentStructure.map((node) => {
      if (node.type === 'folder' && node.name === path[0]) {
        return {
          ...node,
          children: addFolderOrFile(node.children, path.slice(1), item),
        };
      }
      return node;
    });
  };

  const handleCreateFolder = (path = []) => {
    setModalOpen(true);
    setModalType('folder');
    setCurrentPath(path);
  };

  const handleCreateFile = (path = []) => {
    setModalOpen(true);
    setModalType('file');
    setCurrentPath(path);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const updateFileContent = (filePath, content) => {
    setFileContents((prevContents) => ({
      ...prevContents,
      [filePath]: content,
    }));
  };

  const handleModalSubmit = (name) => {
    setModalOpen(false);
    if (name) {
      const item = { type: modalType, name, children: modalType === 'folder' ? [] : undefined, path: currentPath };
      const filePath = currentPath.length > 0 ? `${currentPath.join('/')}/${name}` : name;
      setStructure((prevStructure) => addFolderOrFile(prevStructure, currentPath, item));
      
      if (modalType === 'file') {
        const extension = name.split('.').pop();
        let content;

        if (extension === 'ed') {
          content = '';
        } else if (extension === 'note' || extension === 'lt') {
          content = [];
        } else if (extension === 'readme') {
          content = '';
        } else {
          content = null;
        }

        setFileContents((prevContents) => ({
          ...prevContents,
          [filePath]: content,
        }));
      }
    }
  };

  return (
    <IDEContext.Provider
      value={{
        structure,
        selectedFile,
        fileContents,
        handleCreateFolder,
        handleCreateFile,
        handleFileClick,
        updateFileContent,
      }}
    >
      {children}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        isFolder={modalType === 'folder'}
      />
    </IDEContext.Provider>
  );
};

export const useIDE = () => useContext(IDEContext);
