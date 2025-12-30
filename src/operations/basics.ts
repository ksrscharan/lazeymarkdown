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

export const fetchFileContentById = (docId: number) => {
  return useLiveQuery(async () => {
    const metadata = await db.metadata.get(docId);
    const contentObj = await db.contents.get(docId);
    return { 
      metadata, 
      content: contentObj?.content || '' 
    };
  }, [docId]);
}

export const updateDocTitle = (docId: number, title: string) => {
    return db.metadata.update(docId, {
        title: title
    })
}

export const updateContent = (docId: number, content: string) => {
    db.contents.update(docId, {
        content: content
    })
}

export const deleteDoc = async (docId: number) => {
  return await db.transaction('rw', db.metadata, db.contents, () => {
    db.metadata.delete(docId);
    db.contents.delete(docId);
  });
}




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