import React, { useState } from 'react';
import { useIDE } from '../contexts/IDEContext';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faFolderPlus, faFileAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import TextEditor from '../components/TextEditor';
import NoteMaker from '../components/NoteMaker';
import ListMaker from '../components/ListMaker';
import ReadmePreviewer from '../components/ReadmePreviewer';

export default function Home() {
  const {
    structure,
    selectedFile,
    fileContents,
    updateFileContent,
  } = useIDE(); // Accessing IDE context values

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const EditorPanel = () => {
    if (!selectedFile) return <div className="h-full flex items-center justify-center text-center text-vscode-text">Select a file to view its content</div>;

    const filePath = selectedFile.path.length > 0 ? `${selectedFile.path.join('/')}/${selectedFile.name}` : selectedFile.name;
    const extension = selectedFile.name.split('.').pop();

    // Viewing different editor based on extension of the file
    switch (extension) {
      case 'ed':
        return (
          <TextEditor
            content={fileContents[filePath]}
            onChange={(content) =>
              updateFileContent(filePath, content)
            }
          />
        );
      case 'note':
        return <NoteMaker notes={fileContents[filePath]} setNotes={updateFileContent} filePath={filePath} />;
      case 'lt':
        return <ListMaker list={fileContents[filePath]} setList={updateFileContent} filePath={filePath} />;
      case 'readme':
        return (
          <ReadmePreviewer
            content={fileContents[filePath]}
            setReadme={updateFileContent}
            filePath={filePath}
          />
        );
      default:
        return <div className="text-center text-vscode-text">Unsupported file type</div>;
    }
  };

  return (
    <div className="flex h-screen bg-vscode-bg text-vscode-text relative">
      <Sidebar
        structure={structure}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex-1 p-4">
        {EditorPanel()}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-vscode-sidebar visible md:invisible text-white p-4 rounded-full shadow-lg z-50"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faFolder} />
      </button>
    </div>
  );
}
