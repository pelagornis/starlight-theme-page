/**
 * LLM integration: API keys are passed only from the caller (site .env).
 */
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export type Provider = 'openai' | 'claude' | 'gemini';

const SYSTEM_PROMPT = `You are a helpful assistant that answers questions based ONLY on the provided documentation. 
If the answer is not in the documentation, say so clearly. 
Use the document structure (titles, paths) to cite sources when relevant. 
Respond in the same language as the user's question.`;

export async function chatWithInferenceUrl(
  inferenceUrl: string,
  userMessage: string,
  context: string,
  options: { model?: string; apiKey?: string }
): Promise<string> {
  const model = options.model ?? 'gpt-4o-mini';
  const fullContext = context
    ? `Documentation:\n\n${context}\n\n---\n\nUser question: ${userMessage}`
    : userMessage;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {}),
  };
  const res = await fetch(inferenceUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: fullContext },
      ],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Inference API ${res.status}: ${errBody}`);
  }
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}

export async function chatWithContext(
  provider: Provider,
  userMessage: string,
  context: string,
  apiKeys: {
    openai?: string;
    anthropic?: string;
    google?: string;
  },
  options?: { model?: string }
): Promise<string> {
  const fullContext = context
    ? `Documentation:\n\n${context}\n\n---\n\nUser question: ${userMessage}`
    : userMessage;
  const model = options?.model;
  if (!model) throw new Error('Doc chat model is required. Set PUBLIC_DOC_CHAT_MODEL in your .env.');

  switch (provider) {
    case 'openai': {
      const key = apiKeys.openai;
      if (!key) throw new Error('apiKeys.openai is required');
      const openai = new OpenAI({ apiKey: key });
      const res = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: fullContext },
        ],
        max_tokens: 1024,
      });
      return res.choices[0]?.message?.content?.trim() ?? '';
    }
    case 'claude': {
      const key = apiKeys.anthropic;
      if (!key) throw new Error('apiKeys.anthropic is required');
      const anthropic = new Anthropic({ apiKey: key });
      const res = await anthropic.messages.create({
        model,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: fullContext }],
      });
      const block = res.content.find((b) => b.type === 'text');
      return block && 'text' in block ? block.text.trim() : '';
    }
    case 'gemini': {
      const key = apiKeys.google;
      if (!key) throw new Error('Gemini requires GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY in docs/.env');
      const genAI = new GoogleGenerativeAI(key);
      const runGemini = async (modelId: string) => {
        const m = genAI.getGenerativeModel({ model: modelId });
        const result = await m.generateContent({
          contents: [
            { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\n${fullContext}` }] },
          ],
        });
        const response = result.response;
        const text = response.candidates?.[0]?.content?.parts?.[0];
        return text && 'text' in text ? (text as { text: string }).text.trim() : '';
      };
      try {
        return await runGemini(model);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (/503|high demand|Service Unavailable/i.test(msg)) {
          await new Promise((r) => setTimeout(r, 800));
          return await runGemini(model);
        }
        if (/429|quota exceeded|Too Many Requests/i.test(msg)) {
          throw new Error(
            'Gemini API quota exceeded. Please try again later or check your plan.'
          );
        }
        if (/400|API key expired|API_KEY_INVALID|invalid.*api.*key/i.test(msg)) {
          throw new Error('Gemini API key has expired or is invalid. Please check GOOGLE_GENERATIVE_AI_API_KEY in .env.');
        }
        throw e;
      }
    }
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
