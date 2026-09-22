import OpenAI from "openai";

let _openai: OpenAI | null = null;
function getOpenAIClient(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build",
    });
  }
  return _openai;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

export function prepareTextForEmbedding(item: {
  title: string;
  description?: string | null;
  body?: string | null;
  tags?: string[] | null;
  type: string;
}): string {
  return [item.title, item.description, item.body, item.tags?.join(" ")]
    .filter(Boolean)
    .join("\n");
}
