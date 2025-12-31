import { fetchFileContentById } from '../operations/basics';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';


type Props = {
    activeId: number | undefined
}




function PreviewArea({ activeId }: Props) {
    const file = fetchFileContentById(activeId);

    if (!activeId || !file) return <div className="preview-area">Select a file to preview</div>;

    return (
        <div className="preview-area markdown-body">
            <Markdown

                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    table: ({ node, ...props }) => (
                        <table style={{ border: '1px solid #ddd' }} {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a target="_blank" rel="noopener noreferrer" {...props} />
                    )
                }}
            >
                {file.content}
            </Markdown>
        </div>
    );
}

export default PreviewArea;


