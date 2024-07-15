import { StreamingTextResponse, Message } from 'ai';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { BytesOutputParser } from '@langchain/core/output_parsers';
import authMiddleware from '@/middleware/auth';
import { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apply the authentication middleware
  await new Promise((resolve, reject) => {
    authMiddleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });

  if (req.method === 'POST') {
    const { messages, selectedModel } = await req.body;

    const model = new ChatOllama({
      baseUrl: process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434',
      model: selectedModel,
    });

    const parser = new BytesOutputParser();

    const stream = await model
      .pipe(parser)
      .stream(
        (messages as Message[]).map((m) =>
          m.role == 'user'
            ? new HumanMessage(m.content)
            : new AIMessage(m.content)
        )
      );

    return new StreamingTextResponse(stream);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
