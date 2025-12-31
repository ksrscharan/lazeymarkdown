import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";



export const createNewFile = async () => {
    return await db.transaction('rw', db.metadata, db.contents, async () => {
        const newId = await db.metadata.add({
            title: "Untitled Document",
            updatedAt: Date.now(),
        });

        await db.contents.add({
            id: newId as number,
            content: ''
        });

        return newId;
    });
};
export const initDB = async () => {
    const count = await db.metadata.count();
    if (count === 0) {
        await createNewFile()
    }
};

export const fetchList = () => {
    return useLiveQuery(() => db.metadata.toArray())
}

export const fetchFileContentById = (docId: number | undefined) => {
    return useLiveQuery(async () => {
        if (docId === undefined) return { metadata: null, content: '' };
        const metadata = await db.metadata.get(docId);
        const contentObj = await db.contents.get(docId);
        return {
            metadata,
            content: contentObj?.content || ''
        };
    }, [docId]);
}

export const updateDocTitle = (docId: number | undefined, title: string) => {
    return db.metadata.update(docId, {
        title: title
    })
}

export const updateContent = (docId: number | undefined, content: string) => {
    if (docId === undefined) return;
    db.contents.update(docId, {
        content: content
    })
}

export const deleteDoc = async (docId: number | undefined) => {
    if (docId === undefined) return;

    return await db.transaction('rw', db.metadata, db.contents, async () => {
        const count = await db.metadata.count();
        let nextId: number | undefined;

        if (count <= 1) {
            // If it's the last one, create the replacement first
            nextId = await db.metadata.add({
                title: "Untitled Document",
                updatedAt: Date.now(),
            });
            await db.contents.add({ id: nextId as number, content: '' });
        } else {
            // If others exist, find the first one that isn't the one being deleted
            const all = await db.metadata.toArray();
            const fallback = all.find(d => d.id !== docId);
            nextId = fallback?.id;
        }

        await db.metadata.delete(docId);
        await db.contents.delete(docId);

        return nextId; // Return the ID the UI should switch to
    });
};




/*
1. Init DB 🔥
2. Create new Doc 🔥
3. Fetch Docs 🔥
    3.1. Fetch One Item in Doc 🔥
4. Update Doc
    4.1. Update Title 🔥
    4.2. Update Content 🔥
    4.3. Update Open Status ❌ (changed to localStorage based storage to store currentOpen)
5. Delete Doc
    5.1. Change opened Doc when present opened one is Deleted ❌ (not here)
*/
