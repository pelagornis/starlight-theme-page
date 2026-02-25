/**
 * Renders markdown to safe HTML for chat messages.
 * Sync API so callers don't need to be async. Uses marked (sync) + DOMPurify.
 */
import DOMPurify from "dompurify";
import { marked } from "marked";

let configured = false;
function configureMarked() {
  if (configured) return;
  marked.setOptions({ gfm: true, breaks: true });
  configured = true;
}

export function renderChatMarkdown(text: string): string {
  if (typeof text !== "string" || !text.trim()) return "";
  if (typeof window === "undefined") return text.replace(/\n/g, "<br>");
  configureMarked();
  const rawHtml = marked(text, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "code", "pre",
      "ul", "ol", "li", "a", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6",
      "hr", "table", "thead", "tbody", "tr", "th", "td", "span", "div",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });
}
