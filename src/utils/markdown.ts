export function stripMarkdown(markdown: string): string {
    return markdown
        // Remove headers (## Header)
        .replace(/^#{1,6}\s+/gm, '')
        // Remove bold (**text** or __text__)
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/__(.+?)__/g, '$1')
        // Remove italic (*text* or _text_)
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        // Remove horizontal rules (--- or ***)
        .replace(/^[-*]{3,}\s*$/gm, '')
        // Remove list markers (- item or * item)
        .replace(/^[\s]*[-*]\s+/gm, '• ')
        // Remove numbered list markers (1. item)
        .replace(/^[\s]*\d+\.\s+/gm, '')
        // Remove extra blank lines
        .replace(/\n{3,}/g, '\n\n')
        // Trim whitespace
        .trim();
}
