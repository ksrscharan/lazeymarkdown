import { deleteDoc, fetchList } from '../operations/basics'

type Props = {
    activeId: number | undefined;
    setActiveId: (id: number | undefined) => void;
}

function Tabs({ activeId, setActiveId }: Props) {

    const docsList = fetchList()
    return (
        <div className="tabs">
            {docsList && docsList.map(doc =>
                doc.id === activeId ?
                    <div
                        key={doc.id}
                        className="active-tab"
                        onClick={() => setActiveId(doc.id)}>
                        {doc.title} - {doc.id}
                        <button
                            className="active-delete-button"
                            onClick={async (e) => {
                                e.stopPropagation();
                                const nextId = await deleteDoc(doc.id);
                                setActiveId(nextId);
                            }}
                        >
                            Delete
                        </button>
                    </div> :
                    <div
                        key={doc.id}
                        className="tab"
                        onClick={() => setActiveId(doc.id)}
                    >
                        {doc.title} - {doc.id}
                        <button
                            className="delete-button"
                            onClick={() => {
                                deleteDoc(doc.id)
                                setActiveId(docsList[0].id)
                            }}
                        >
                            Delete
                        </button>
                    </div>

            )
            }

        </div>
    )
}

export default Tabs