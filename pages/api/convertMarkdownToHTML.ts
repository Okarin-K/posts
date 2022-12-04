import { marked } from "marked";

export const convertMarkdownToHTML = (markdownText: string): string => {
    return marked(markdownText);
};
