/**
 * Doc retrieval: finds document chunks similar to the query via keyword matching.
 */
export interface DocChunk {
  path: string;
  locale: string;
  title: string;
  description?: string;
  /** Section heading when chunk is from a subsection (crawler chunk-by-heading). */
  section?: string;
  content: string;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, ' ')
    .split(/\s+/)
    .filter((s) => s.length > 1);
}

function scoreChunk(chunk: DocChunk, queryTokens: string[]): number {
  const content = `${chunk.title} ${chunk.section ?? ''} ${chunk.description ?? ''} ${chunk.content}`.toLowerCase();
  let score = 0;
  for (const t of queryTokens) {
    if (content.includes(t)) score += 1;
  }
  return score;
}

const MAX_CHUNKS = 8;
const MAX_CONTEXT_CHARS = 12000;

export function retrieveRelevant(
  chunks: DocChunk[],
  query: string,
  locale: string = 'en'
): DocChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return chunks.filter((c) => c.locale === locale).slice(0, MAX_CHUNKS);
  }
  const scored = chunks.map((c) => ({ chunk: c, score: scoreChunk(c, queryTokens) }));
  scored.sort((a, b) => b.score - a.score);
  const selected: DocChunk[] = [];
  let totalLen = 0;
  for (const { chunk } of scored) {
    if (selected.length >= MAX_CHUNKS || totalLen + chunk.content.length > MAX_CONTEXT_CHARS) break;
    selected.push(chunk);
    totalLen += chunk.content.length;
  }
  if (selected.length === 0) return chunks.filter((c) => c.locale === locale).slice(0, MAX_CHUNKS);
  return selected;
}

export function formatContext(chunks: DocChunk[]): string {
  return chunks
    .map((c) => {
      const heading = c.section ? `${c.title} – ${c.section}` : c.title;
      return `## ${heading} (${c.path})\n${c.description ? c.description + '\n\n' : ''}${c.content}`;
    })
    .join('\n\n---\n\n');
}
