import React, { createContext, useState, useContext } from 'react';

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
  const [fileContents, setFileContents] = useState({}); // To store file contents

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
    const name = prompt('Enter folder name:');
    if (name) {
      setStructure((prevStructure) =>
        addFolderOrFile(prevStructure, path, { type: 'folder', name, children: [], path: path })
      );
    }
  };

  const handleCreateFile = (path = []) => {
    const name = prompt('Enter file name:');
    if (name) {
      const filePath = path.length > 0 ? `${path.join('/')}/${name}` : name;

      console.log("handleCreateFile", filePath, path)
      setStructure((prevStructure) =>
        addFolderOrFile(prevStructure, path, { type: 'file', name , path: path})
      );

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
  };

  const handleFileClick = (file) => {
    console.log("handleFileClick", file)
    setSelectedFile(file);
  };

  const updateFileContent = (filePath, content) => {
    setFileContents((prevContents) => ({
      ...prevContents,
      [filePath]: content,
    }));
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
    </IDEContext.Provider>
  );
};

export const useIDE = () => useContext(IDEContext);
