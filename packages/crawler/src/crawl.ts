/**
 * Doc crawler: reads all MDX files under a docs content directory,
 * extracts title, path, and text (optionally split by headings), and writes docs.json.
 *
 * Paths:
 * - Default: resolved relative to this package (repo/docs when in monorepo).
 * - Override: set env CRAWL_DOCS_ROOT and/or CRAWL_OUT_FILE to absolute or cwd-relative paths.
 *
 * Chunking:
 * - CRAWL_CHUNK_BY_HEADINGS=0 to disable heading-based split (one chunk per file).
 * - When enabled, splits by ## / ### / #### and sub-splits any section longer than
 *   CRAWL_MAX_CHUNK_CHARS (default 800) by paragraphs for finer retrieval.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '../..');

const DEFAULT_DOCS_ROOT = path.join(REPO_ROOT, 'docs', 'src', 'content', 'docs');
const DEFAULT_OUT_FILE = path.join(REPO_ROOT, 'docs', 'data', 'docs.json');

const DOCS_ROOT = process.env.CRAWL_DOCS_ROOT
  ? path.resolve(process.cwd(), process.env.CRAWL_DOCS_ROOT)
  : DEFAULT_DOCS_ROOT;
const OUT_FILE = process.env.CRAWL_OUT_FILE
  ? path.resolve(process.cwd(), process.env.CRAWL_OUT_FILE)
  : DEFAULT_OUT_FILE;

/** When true, split each file into chunks by ## / ### / #### headings for finer retrieval. */
const CHUNK_BY_HEADINGS = process.env.CRAWL_CHUNK_BY_HEADINGS !== '0';

/** Max chars per chunk; longer sections are split by paragraphs to improve retrieval precision. */
const MAX_CHUNK_CHARS = Number(process.env.CRAWL_MAX_CHUNK_CHARS) || 800;

export interface DocChunk {
  path: string;
  locale: string;
  title: string;
  description?: string;
  /** Section title when chunked by heading (e.g. "Basic Usage"). */
  section?: string;
  content: string;
  /** Extra search terms so queries like "다운받아" match; filled by crawler for install/getting-started chunks. */
  keywords?: string;
}

const CODE_PLACEHOLDER = '___CRAWL_CODE_BLOCK___';

function stripImportsAndComponents(raw: string): string {
  const codeBlocks: string[] = [];
  let s = raw.replace(/```[\s\S]*?```/g, (m) => {
    codeBlocks.push(m);
    return CODE_PLACEHOLDER;
  });
  s = s
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
    .replace(/<[A-Z][a-zA-Z0-9]*\s[^>]*\/\s*>/g, ' ')
    .trim();
  let prev = '';
  while (prev !== s) {
    prev = s;
    s = s.replace(/<([A-Z][a-zA-Z0-9]*)\s[^>]*>([\s\S]*?)<\/\1>/g, '$2');
  }
  s = s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  let i = 0;
  return s.replace(new RegExp(CODE_PLACEHOLDER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), () => codeBlocks[i++] ?? '');
}

function headingToSlug(line: string): string {
  return line
    .replace(/^#+\s*/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

function extractTextFromMdx(filePath: string): DocChunk[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);
  const relativePath = path.relative(DOCS_ROOT, filePath);
  const parts = path.dirname(relativePath).split(path.sep);
  const locale = parts[0] && /^(en|ko|ja|zh)$/.test(parts[0]) ? parts[0] : 'en';
  const pageTitle = (frontmatter?.title as string) || path.basename(filePath, path.extname(filePath));
  const description = frontmatter?.description as string | undefined;
  const text = stripImportsAndComponents(content);
  const cleanText = text.replace(/\n{3,}/g, '\n\n').trim();
  if (!cleanText) return [];

  const slug = relativePath.replace(/\.(mdx|md)$/, '').replace(/\\/g, '/');
  const basePath = `/${slug}`;

  const isInstallPage =
    basePath.includes('getting-started') ||
    (typeof description === 'string' && /install|설치|다운로드|download/i.test(description));
  const searchKeywords = isInstallPage
    ? 'install download 설치 다운로드 다운받아 설치하기 getting started 시작'
    : undefined;

  const makeChunk = (opts: { path: string; locale: string; title: string; description?: string; content: string; section?: string }) => ({
    ...opts,
    keywords: searchKeywords,
  });

  const result: DocChunk[] = [];
  const emitChunks = (chunkOpts: { path: string; locale: string; title: string; description?: string; section?: string; content: string }[]) => {
    for (const opts of chunkOpts) {
      let content = opts.content;
      if (content.length <= MAX_CHUNK_CHARS) {
        result.push(makeChunk({ ...opts, content }));
        continue;
      }
      const paragraphs = content.split(/\n\n+/);
      let acc = '';
      let partIndex = 0;
      for (const p of paragraphs) {
        const next = acc ? acc + '\n\n' + p : p;
        if (next.length > MAX_CHUNK_CHARS && acc) {
          const sectionLabel = opts.section ? (partIndex > 0 ? `${opts.section} (continued)` : opts.section) : undefined;
          result.push(makeChunk({ ...opts, section: sectionLabel, content: acc }));
          partIndex += 1;
          acc = p;
        } else {
          acc = next;
        }
      }
      if (acc) {
        const sectionLabel = opts.section ? (partIndex > 0 ? `${opts.section} (continued)` : opts.section) : undefined;
        result.push(makeChunk({ ...opts, section: sectionLabel, content: acc }));
      }
    }
  };

  if (!CHUNK_BY_HEADINGS) {
    emitChunks([{ path: basePath, locale, title: pageTitle, description, content: cleanText }]);
    return result;
  }
  const sectionStart = /(?=^(?:##|###|####)\s+.+$)/gm;
  const sections = cleanText.split(sectionStart);
  let intro = '';
  const sectionBlocks: { headingTitle: string; sectionSlug: string; sectionContent: string }[] = [];
  for (let i = 0; i < sections.length; i++) {
    const block = sections[i].trim();
    if (!block) continue;
    const headingMatch = block.match(/^(##|###|####)\s+(.+)$/m);
    if (!headingMatch) {
      intro += (intro ? '\n\n' : '') + block;
      continue;
    }
    const headingTitle = headingMatch[2].trim();
    const sectionSlug = headingToSlug(headingTitle);
    let sectionContent = block.replace(/^(?:##|###|####)\s+.+$/m, '').trim();
    if (!sectionContent) sectionContent = headingTitle;
    sectionBlocks.push({ headingTitle, sectionSlug, sectionContent });
  }
  if (intro) {
    emitChunks([{ path: basePath, locale, title: pageTitle, description, content: intro }]);
  }
  for (const { headingTitle, sectionSlug, sectionContent } of sectionBlocks) {
    emitChunks([
      {
        path: sectionSlug ? `${basePath}#${sectionSlug}` : basePath,
        locale,
        title: pageTitle,
        description,
        section: headingTitle,
        content: sectionContent,
      },
    ]);
  }
  if (result.length === 0) {
    emitChunks([{ path: basePath, locale, title: pageTitle, description, content: cleanText }]);
  }
  return result;
}

function collectDocFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) collectDocFiles(full, acc);
    else if (name.endsWith('.mdx') || name.endsWith('.md')) acc.push(full);
  }
  return acc;
}

function run(): void {
  if (!fs.existsSync(DOCS_ROOT)) {
    console.error(`DOCS_ROOT not found: ${DOCS_ROOT}`);
    console.error('Set CRAWL_DOCS_ROOT to a valid path, or run from the repo that contains docs/.');
    process.exit(1);
  }
  const files = collectDocFiles(DOCS_ROOT);
  const chunks: DocChunk[] = [];
  for (const file of files) {
    try {
      chunks.push(...extractTextFromMdx(file));
    } catch (e) {
      console.error('Skip', file, e);
    }
  }
  const outDir = path.dirname(OUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(chunks, null, 2), 'utf-8');
  console.log(`Crawled ${chunks.length} chunks from ${files.length} files -> ${OUT_FILE}`);
}

run();
