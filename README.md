## Super Editor
This project is a web-based IDE built with Next.js and Tailwind CSS. It features a folder and file structure, supporting various file types with specific functionalities. The application is styled to resemble VS Code and is deployed on Vercel.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder and File Structure](#folder-and-file-structure)
- [File Types and Functionalities](#file-types-and-functionalities)
- [State Management](#state-management)
- [Styling](#styling)
## Features

- **Folder and File Structure**: Create and manage folders and files hierarchically.
- **File Types and Functionalities**:
  - `.ed` files: Text editor.
  - `.note` files: Note maker with drag-and-drop status categories.
  - `.lt` files: List-making interface.
  - `.readme` files: README file previewer.
- **State Management**: Clean and organized state management using React Context.
- **Styling**: Responsive design with animations using Tailwind CSS.
- **Deployment**: Deployed on Vercel.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ide-project.git
   cd ide-project
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Folder and File Structure

The sidebar displays folders and files in a hierarchical manner. Users can create folders and files by interacting with the sidebar. 

### Sidebar Component

- **Location**: `components/Sidebar.js`
- **Functionality**: Displays the folder and file structure, allows the creation of folders and files, and supports hierarchical navigation.

## File Types and Functionalities

### Text Editor (.ed)

- **Component**: `components/TextEditor.js`
- **Description**: Opens a text editor to edit plain text files.

### Note Maker (.note)

- **Component**: `components/NoteMaker.js`
- **Description**: Allows creating and managing notes with drag-and-drop functionality for changing status categories.

### List Maker (.lt)

- **Component**: `components/ListMaker.js`
- **Description**: Provides an interface for creating lists.

### README Previewer (.readme)

- **Component**: `components/ReadmePreviewer.js`
- **Description**: Previews formatted README files.

## State Management

State management is handled using React Context API.

### IDE Context

- **Location**: `contexts/IDEContext.js`
- **Functionality**: Manages the state for the folder and file structure, selected file, file contents, notes, and lists.

## Styling

Styling is done using Tailwind CSS, with custom classes to mimic the VS Code theme. Animations for drag-and-drop are provided by `react-beautiful-dnd`.
