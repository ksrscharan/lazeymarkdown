import { useState } from 'react';
import { deleteDoc, fetchList, updateDocTitle } from '../operations/basics'

type Props = {
    activeId: number | undefined;
    setActiveId: (id: number | undefined) => void;
}

function Tabs({ activeId, setActiveId }: Props) {
    const [clicked, setClicked] = useState<boolean>(false)

    const docsList = fetchList()
    return (
        <div className="tabs">
            {docsList && docsList.map(doc =>
                doc.id === activeId ?
                    <div
                        key={doc.id}
                        className="active-tab"
                        onClick={() => setActiveId(doc.id)}
                    >
                        {(clicked && doc.id === activeId) ? <input onChange={(e) => updateDocTitle(doc.id, e.target.value)} value={doc.title} /> : doc.title}
                        <button
                            className="active-delete-button"
                            onClick={async (e) => {
                                e.stopPropagation();
                                const nextId = await deleteDoc(doc.id);
                                setActiveId(nextId);
                            }}
                        >
                            🗑️
                        </button>
                        <button
                            className="rename-title"
                            onClick={() => setClicked(!clicked)}
                        >
                            {clicked ? "✔️" : "✏️"}
                        </button>
                    </div> :
                    <div
                        key={doc.id}
                        className="tab"
                        onClick={() => {
                            setActiveId(doc.id)
                        }}
                    >
                        {doc.title}
                        <button
                            className="delete-button"
                            onClick={() => {
                                deleteDoc(doc.id)
                                setActiveId(docsList[0].id)
                            }}
                        >
                            🗑️
                        </button>
                    </div>

            )
            }

        </div>
    )
}

export default Tabs