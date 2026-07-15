import { useState, useEffect } from 'react';
import './App.css'
import TextArea from './components/TextArea'
import { useLocalStorage } from './operations/activeIdHook';
import { fetchFileContentById, initDB, updateDocTitle } from './operations/basics';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import { exportToHtml, exportToMd, exportToPdf } from './operations/export';

type ViewMode = 'split' | 'edit' | 'preview';

function App() {
  const [activeId, setActiveId] = useLocalStorage<number | undefined>('active-doc', undefined);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [viewMode, setViewMode] = useState<ViewMode>(window.innerWidth > 768 ? 'split' : 'edit');
  const [isRenaming, setIsRenaming] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const docData = fetchFileContentById(activeId);
  const title = docData?.metadata?.title;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && viewMode === 'split') {
        setViewMode('edit');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const handleSelectDoc = (id: number | undefined) => {
    setActiveId(id);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (activeId === undefined) {
      initDB().then(() => {
        // initDB sets localStorage, but we might need to trigger a state update if it was empty
      });
    }
  }, [activeId]);

  const handleExport = (type: 'html' | 'pdf' | 'md') => {
    if (!title) return;
    if (type === 'html') exportToHtml(title);
    if (type === 'pdf') exportToPdf(title);
    if (type === 'md') exportToMd(title);
    setShowExportModal(false);
  };

  return (
    <>
      <Sidebar activeId={activeId} setActiveId={handleSelectDoc} isOpen={isSidebarOpen} />
      <div 
        className={`sidebar-overlay ${isSidebarOpen && window.innerWidth <= 768 ? 'active' : ''}`} 
        onClick={() => setSidebarOpen(false)} 
      />

      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="export-modal" onClick={e => e.stopPropagation()}>
            <h2>Export Document</h2>
            <div className="export-option-list">
              <button className="export-opt-btn" onClick={() => handleExport('md')}>
                📄 Markdown (.md)
              </button>
              <button className="export-opt-btn" onClick={() => handleExport('html')}>
                🌐 HTML (.html)
              </button>
              <button className="export-opt-btn" onClick={() => handleExport('pdf')}>
                📕 PDF (.pdf)
              </button>
            </div>
            <button className="modal-close-btn" onClick={() => setShowExportModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      
      <main className="main-content">
        <header className="navbar">
          <div className="nav-left">
            <button 
              className="toggle-sidebar"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              {isSidebarOpen ? '⇠' : '⇢'}
            </button>
            {isRenaming ? (
              <input 
                className="rename-input"
                autoFocus
                value={title || ''} 
                onChange={(e) => updateDocTitle(activeId, e.target.value)}
                onBlur={() => setIsRenaming(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsRenaming(false)}
                style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)' }}
              />
            ) : (
              <h1 className="current-title" onClick={() => setIsRenaming(true)} style={{ cursor: 'pointer' }}>
                {title || 'Select a document'}
              </h1>
            )}
          </div>

          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'edit' ? 'active' : ''}`} 
              onClick={() => setViewMode('edit')}
            >
              Edit
            </button>
            <button 
              className={`view-btn ${viewMode === 'split' ? 'active' : ''}`} 
              onClick={() => setViewMode('split')}
            >
              Split
            </button>
            <button 
              className={`view-btn ${viewMode === 'preview' ? 'active' : ''}`} 
              onClick={() => setViewMode('preview')}
            >
              Preview
            </button>
          </div>

          <div className="nav-right">
             <button className="export-btn-sm" onClick={() => setShowExportModal(true)}>
               {window.innerWidth <= 768 ? '📤' : 'Export ▾'}
             </button>
          </div>
        </header>

        <div className="workspace">
          {(viewMode === 'edit' || viewMode === 'split') && (
            <section className="editor-pane">
              <TextArea activeId={activeId} />
            </section>
          )}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <section className="preview-pane">
              <PreviewArea activeId={activeId} />
            </section>
          )}
        </div>
      </main>
    </>
  )
}

export default App
