import { useEffect } from 'react';
import './App.css'
import TextArea from './components/TextArea'
import { useLocalStorage } from './operations/activeIdHook';
import { createNewFile, fetchFileContentById, initDB } from './operations/basics';
import Tabs from './components/Tabs';
import PreviewArea from './components/PreviewArea';
import { exportToHtml, exportToMd, exportToPdf } from './operations/export';




function App() {
  const [activeId, setActiveId] = useLocalStorage<number | undefined>('active-doc', undefined);
  const title = fetchFileContentById(activeId)?.metadata?.title
  useEffect(() => {
    initDB()
  }, [])


  return (
    <>
      {!activeId === undefined && <div>Loading Your Documents</div>}

      <>
        <div className="navbar">
          <div className="logo">LazeyMarkdown</div>
          <div className="action-buttons">
            <button className="new-file-button" onClick={createNewFile}>Create File</button>
            <button className="export-button" onClick={() => exportToHtml(title)}>Export HTML</button>
            <button className="export-button" onClick={() => exportToPdf(title as string)}>Export PDF</button>
            <button className="export-button" onClick={() => exportToMd(title as string)}>Export MD</button>
          </div>
        </div>
        <Tabs activeId={activeId} setActiveId={setActiveId} />
        <div className='markdown-container'>
          <div className='text-area-block'>

            <TextArea activeId={activeId} />
          </div>
          <div className='preview-area-block'>
            <PreviewArea activeId={activeId} />
          </div>
        </div>
      </>



    </>
  )
}

export default App
