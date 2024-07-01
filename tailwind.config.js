/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'vscode-bg': '#1e1e1e',
        'vscode-sidebar': '#252526',
        'vscode-text': '#d4d4d4',
        'vscode-ide-text': '#010B13',
        'vscode-folder': '#569cd6',
        'vscode-file': '#ce9178',
      },
    },
  },
  plugins: [],
};
