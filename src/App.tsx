import { useEffect } from 'react';
import './App.css'
import TextArea from './components/TextArea'
import { useLocalStorage } from './operations/activeIdHook';
import { createNewFile, initDB } from './operations/basics';
import Tabs from './components/Tabs';
import PreviewArea from './components/PreviewArea';

function App() {
  const [activeId, setActiveId] = useLocalStorage<number | undefined>('active-doc', undefined);
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
            <button className="export-button">Export File</button>
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
