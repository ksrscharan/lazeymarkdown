import { createNewFile, deleteDoc, fetchList } from '../operations/basics';

type Props = {
    activeId: number | undefined;
    setActiveId: (id: number | undefined) => void;
    isOpen: boolean;
}

function Sidebar({ activeId, setActiveId, isOpen }: Props) {
    const docsList = fetchList();

    const handleCreateNew = async () => {
        const newId = await createNewFile();
        setActiveId(newId);
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">LazeyMarkdown</div>
            </div>
            
            <button className="new-btn" onClick={handleCreateNew}>
                + New Document
            </button>

            <div className="doc-list">
                {docsList && docsList.map(doc => (
                    <div
                        key={doc.id}
                        className={`doc-item ${doc.id === activeId ? 'active' : ''}`}
                        onClick={() => setActiveId(doc.id)}
                    >
                        <span className="doc-title">{doc.title}</span>
                        <button
                            className="delete-btn-sm"
                            style={{ 
                                background: 'transparent', 
                                border: 'none', 
                                color: 'inherit',
                                opacity: 0.5,
                                cursor: 'pointer'
                            }}
                            onClick={async (e) => {
                                e.stopPropagation();
                                const nextId = await deleteDoc(doc.id);
                                setActiveId(nextId);
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
