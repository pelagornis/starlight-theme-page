/**
 * Doc-based chat handler (built into page theme).
 * Called with apiKeys from the site .env.
 */
import { chatWithContext, type Provider } from './llm.js';
import { retrieveRelevant, formatContext, type DocChunk } from './retrieve.js';
import { z } from 'zod';

const ChatBody = z.object({
  message: z.string().min(1),
  provider: z.enum(['openai', 'claude', 'gemini']).optional().default('openai'),
  locale: z.string().optional().default('en'),
  model: z.string().min(1).optional(),
});

export type HandleChatBody = z.infer<typeof ChatBody>;

export type HandleChatApiKeys = {
  openai?: string;
  anthropic?: string;
  google?: string;
};

export type HandleChatOptions = {
  docs: DocChunk[];
  apiKeys: HandleChatApiKeys;
  /** Server-side provider (takes precedence). e.g. PUBLIC_DOC_CHAT_PROVIDER in docs/.env */
  defaultProvider?: Provider;
};

export type HandleChatResult = {
  answer: string;
  sources: { title: string; path: string }[];
};

export async function handleChat(
  body: unknown,
  options: HandleChatOptions
): Promise<HandleChatResult> {
  const result = ChatBody.safeParse(body);
  if (!result.success) {
    throw new Error(`Invalid body: ${JSON.stringify(result.error.flatten())}`);
  }
  const { message, locale, model } = result.data;
  const { docs, apiKeys, defaultProvider } = options;
  /** Provider from request body (user choice) first, then env default */
  const provider = (result.data.provider ?? defaultProvider ?? 'openai') as Provider;

  const relevant = retrieveRelevant(docs, message, locale);
  const context = formatContext(relevant);

  const answer = await chatWithContext(provider, message, context, apiKeys, { model });

  return {
    answer,
    sources: relevant.map((c) => ({ title: c.title, path: c.path })),
  };
}

export type CreateChatApiHandlerOptions = {
  loadDocs: () => DocChunk[] | Promise<DocChunk[]>;
  getApiKeys: () => HandleChatApiKeys;
  getDefaultProvider?: () => Provider | undefined;
};

/**
 * Creates a POST handler for use in Astro etc. HTTP checks and error formatting are handled by page;
 * the site only needs to pass loadDocs, getApiKeys, and optionally getDefaultProvider.
 */
const json = (obj: object, status: number) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

export function createChatApiHandler(options: CreateChatApiHandlerOptions) {
  const { loadDocs, getApiKeys, getDefaultProvider } = options;
  return async function POST({ request }: { request: Request }): Promise<Response> {
    try {
      if (request.headers.get('content-type')?.includes('application/json') === false) {
        return json({ error: 'Content-Type: application/json required' }, 400);
      }
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json({ error: 'Invalid JSON' }, 400);
      }
      const docs = await Promise.resolve(loadDocs());
      const apiKeys = getApiKeys();
      const defaultProvider = getDefaultProvider?.();
      try {
        const result = await handleChat(body, { docs, apiKeys, defaultProvider });
        return json(result, 200);
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));
        const status = err.message.startsWith('Invalid body') ? 400 : 500;
        const message =
          err.message ||
          (typeof (e as { message?: string }).message === 'string' ? (e as { message: string }).message : String(e));
        console.error('[doc-chat]', message);
        return json({ error: message }, status);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error('[doc-chat]', message);
      return json({ error: message || 'Internal Server Error' }, 500);
    }
  };
}
