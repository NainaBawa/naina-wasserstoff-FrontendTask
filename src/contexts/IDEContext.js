import React, { createContext, useState, useEffect, useContext } from 'react';
import Modal from '../components/Modal';

const IDEContext = createContext();

export const IDEProvider = ({ children }) => {
  // Initial state setup
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

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedStructure = localStorage.getItem('ide_structure');
    const storedFileContents = localStorage.getItem('ide_fileContents');

    if (storedStructure) {
      setStructure(JSON.parse(storedStructure));
    }
    if (storedFileContents) {
      setFileContents(JSON.parse(storedFileContents));
    }
  }, []);

  // Update localStorage whenever structure or fileContents change
  useEffect(() => {
    localStorage.setItem('ide_structure', JSON.stringify(structure));
  }, [structure]);

  useEffect(() => {
    localStorage.setItem('ide_fileContents', JSON.stringify(fileContents));
  }, [fileContents]);

  // Function to add a folder or file to the structure
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

  // Handlers for creating folder and file
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

  // Handler for file click
  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  // Handler for updating file content
  const updateFileContent = (filePath, content) => {
    setFileContents((prevContents) => ({
      ...prevContents,
      [filePath]: content,
    }));
  };

  // Handler for submitting modal form
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
