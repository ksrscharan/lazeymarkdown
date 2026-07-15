
import html2pdf from 'html2pdf.js';

export const exportToPdf = (title: string) => {
    const element = document.querySelector('.markdown-body') as HTMLElement;
    if (!element) {
        console.error("Could not find the markdown element");
        return;
    }
    const opt = {
        margin: 1,
        filename: `${title}-${Date.now()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
    };
    html2pdf().set(opt).from(element).save();
};


export const exportToHtml = (title: string | undefined) => {
    const content = document.querySelector('.markdown-body')?.innerHTML;

    if (!content) return;

    const fullHtml = `
<!DOCTYPE html>
<head>
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
    <style>
        body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px; }
        @media (max-width: 767px) { .markdown-body { padding: 15px; } }
    </style>
</head>
<body class="markdown-body">
    ${content}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}-${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(url);
}

export const exportToMd = (title: string) => {
    const content = document.querySelector('.text-area')?.innerHTML as string;
    console.log(content)
    console.log(title)
    const blob = new Blob([content], { type: 'text' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
}