/**
 * doc-chat API: provider is specified in the URL path. /api/chat/openai, /api/chat/claude, /api/chat/gemini
 */
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { createChatApiHandler } from '../lib/doc-chat/handler.js';

export const prerender = false;

const PROVIDERS = ['openai', 'claude', 'gemini'] as const;

function ensureEnv() {
  const cwd = process.cwd();
  loadEnv({ path: path.join(cwd, '.env') });
  const docsEnv = path.join(cwd, 'docs', '.env');
  if (fs.existsSync(docsEnv)) loadEnv({ path: docsEnv, override: true });
}

function loadDocs(): { path: string; locale: string; title: string; description?: string; content: string }[] {
  try {
    const cwd = process.cwd();
    const candidates = [
      path.resolve(cwd, 'data/docs.json'),
      path.resolve(cwd, '../docs/data/docs.json'),
      path.resolve(cwd, 'docs/data/docs.json'), // Netlify build runs from repo root
    ];
    const dataPath = candidates.find((p) => fs.existsSync(p));
    if (!dataPath) return [];
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch {
    return [];
  }
}

const handler = createChatApiHandler({
  loadDocs,
  getApiKeys: () => {
    ensureEnv();
    return {
      openai: process.env.OPENAI_API_KEY,
      anthropic: process.env.ANTHROPIC_API_KEY,
      google: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY,
    };
  },
  getDefaultProvider: () => undefined,
});

export const POST: APIRoute = async (ctx) => {
  const provider = ctx.params?.provider;
  if (!provider || !PROVIDERS.includes(provider as (typeof PROVIDERS)[number])) {
    return new Response(JSON.stringify({ error: 'Invalid provider. Use /api/chat/openai, /api/chat/claude, or /api/chat/gemini' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  let body: unknown;
  try {
    body = await ctx.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const bodyWithProvider = typeof body === 'object' && body !== null ? { ...body, provider } : { ...(body as object), provider };
  const newRequest = new Request(ctx.request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyWithProvider),
  });
  return handler({ request: newRequest });
};
