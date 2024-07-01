import { useIDE } from '../contexts/IDEContext';
import Sidebar from '../components/Sidebar';
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
    handleCreateFolder,
    handleCreateFile,
    handleFileClick,
  } = useIDE();

  const renderContent = () => {
    if (!selectedFile) return <div className="text-center text-vscode-text">Select a file to view its content</div>;

    const filePath = selectedFile.path.length > 0 ? `${selectedFile.path.join('/')}/${selectedFile.name}` : selectedFile.name;
    const extension = selectedFile.name.split('.').pop();
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
    <div className="flex h-screen bg-vscode-bg text-vscode-text">
      <Sidebar
        structure={structure}
        onCreateFolder={handleCreateFolder}
        onCreateFile={handleCreateFile}
        handleFileClick={handleFileClick}
        className="w-1/4" // Set sidebar width
      />
      <div className="flex-1 p-4">
        {renderContent()}
      </div>
    </div>
  );
}
