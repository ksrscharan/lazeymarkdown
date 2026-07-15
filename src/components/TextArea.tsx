import { useEffect, useState } from 'react'
import { fetchFileContentById, updateContent } from '../operations/basics'

type Props = {
    activeId: number | undefined
}

function TextArea({ activeId }: Props) {
    const file = fetchFileContentById(activeId);
    const [textContent, setTextContent] = useState<string>('');

    useEffect(() => {
        if (file && file.content !== textContent) {
            setTextContent(file.content);
        }
    }, [file?.metadata?.id]);

    useEffect(() => {
        if (activeId && file?.metadata?.id === activeId) {
            updateContent(activeId, textContent);
        }
    }, [textContent, activeId, file?.metadata?.id]);

    return (
        <textarea
            className='text-area'
            onChange={(e) => setTextContent(e.target.value)}
            value={textContent}
        />
    );
}

export default TextArea