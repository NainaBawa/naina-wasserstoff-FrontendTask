import React from 'react';

const TextEditor = ({ content, onChange }) => {
    return (
        <div className="p-6 bg-gray-800 h-full text-white">
            <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-full border border-gray-600 p-2 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your content here..."
            />
        </div>
    );
};

export default TextEditor;
