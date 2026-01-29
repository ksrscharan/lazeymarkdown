# LazeyMarkdown 📝

A lightweight, fast, and intuitive **markdown editor** with live preview built with React and TypeScript. Write markdown on the left, see the rendered preview on the right. Export your documents in multiple formats (PDF, HTML, Markdown).

## Features ✨

- **Live Preview**: See your markdown rendered in real-time as you type
- **Multiple Documents**: Create, manage, and switch between multiple markdown documents
- **Tab Management**: Organize documents in tabs with easy switching
- **Inline Editing**: Rename documents directly from the tab interface
- **Export Formats**: Export your documents as:
  - **PDF**: Full document with styling
  - **HTML**: Standalone HTML file with GitHub Markdown CSS styling
  - **Markdown**: Original markdown format
- **Local Storage**: All documents are stored locally in IndexedDB (persistent storage)
- **GitHub Flavored Markdown**: Full support for tables, strikethrough, task lists, etc.
- **Syntax Highlighting**: Code blocks with automatic syntax highlighting using `rehype-highlight`
- **Responsive Design**: Works on desktop and tablets (split view on large screens, stacked on smaller screens)
- **Clean UI**: Modern, GitHub-inspired interface

## Technology Stack 🛠️

- **Frontend**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: CSS with CSS variables for theming
- **Database**: Dexie.js (IndexedDB wrapper) for local data persistence
- **Markdown Rendering**: react-markdown with plugins:
  - `remark-gfm`: GitHub Flavored Markdown support
  - `rehype-highlight`: Syntax highlighting for code blocks
- **Export**: html2pdf.js for PDF generation
- **Code Quality**: ESLint with React and TypeScript support

## Project Structure 📁

```
src/
├── components/
│   ├── TextArea.tsx          # Left panel - markdown input
│   ├── PreviewArea.tsx       # Right panel - rendered preview
│   └── Tabs.tsx              # Tab bar for document management
├── operations/
│   ├── basics.ts             # Core database operations (CRUD)
│   ├── activeIdHook.tsx      # Custom React hook for localStorage
│   └── export.ts             # Export functionality (PDF, HTML, MD)
├── App.tsx                   # Main app component with layout
├── db.ts                     # Dexie database schema
├── main.tsx                  # React entry point
└── App.css                   # Global styling
```

## Getting Started 🚀

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lazeymarkdown.git
cd lazeymarkdown
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default).

## Available Scripts 📋

- **`npm run dev`**: Start development server with hot module reloading
- **`npm run build`**: Build for production (TypeScript compilation + Vite bundling)
- **`npm run lint`**: Run ESLint to check code quality
- **`npm run preview`**: Preview production build locally

## How It Works 🔍

### Document Management
1. **Create**: Click "Create File" button to add a new document
2. **Edit**: Type markdown in the text area on the left
3. **Switch**: Click tabs to switch between documents
4. **Rename**: Click the pencil icon on active tab to rename
5. **Delete**: Click trash icon to delete a document

### Export
- **HTML**: Exports with full styling, ready to share
- **PDF**: Download as PDF with formatting preserved
- **Markdown**: Export raw markdown text

### Data Persistence
Documents are automatically saved to IndexedDB (browser's local database). This means:
- Your documents persist across browser sessions
- No server required
- Works offline
- Data stays on your device

## Architecture 🏗️

### Database Schema
Two tables in IndexedDB:

**metadata table**: Stores document metadata
```typescript
{
  id: number (auto-increment),
  title: string,
  updatedAt: number (timestamp)
}
```

**contents table**: Stores document content
```typescript
{
  id: number (primary key, matches metadata.id),
  content: string (markdown text)
}
```

### Key Components

**App.tsx** (Main Layout)
- Navbar with action buttons
- Tab bar for document management
- Split container with TextArea and PreviewArea

**TextArea.tsx** (Editor)
- Live updates to database as you type
- Syncs with active document ID
- Monospace font for better code readability

**PreviewArea.tsx** (Preview)
- Renders markdown with GitHub styling
- Auto-opens links in new tabs
- Syntax highlighting for code blocks

**Tabs.tsx** (Navigation)
- Shows all documents
- Highlights active document
- Inline rename and delete functionality

### Core Operations (basics.ts)
- `createNewFile()`: Add new document
- `fetchList()`: Get all documents
- `fetchFileContentById()`: Get specific document
- `updateDocTitle()`: Rename document
- `updateContent()`: Save content changes
- `deleteDoc()`: Remove document and handle active tab switching

## Styling 🎨

Uses CSS variables for easy theming:
- **Background**: Clean white with light gray sidebar
- **Accent**: GitHub blue (#0969da)
- **Typography**: System fonts for performance
- **Responsive**: Adapts layout on screens smaller than 768px

## Browser Compatibility ✅

Works on all modern browsers that support:
- IndexedDB
- ES2020 JavaScript
- CSS Grid and Flexbox

## Future Enhancements 🔮

Potential improvements:
- Markdown syntax themes/presets
- Dark mode support
- Document sharing/collaboration
- Search functionality
- Document tags/categories
- Auto-save with timestamps
- Undo/redo functionality

## License 📄

This project is open source and available under the MIT License.

## Contributing 🤝

Contributions are welcome! Feel free to submit issues and pull requests.

---

Made with ❤️ for markdown lovers