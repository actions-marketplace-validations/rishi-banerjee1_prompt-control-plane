// OpenAI SDK integration — validate prompts before API calls
// Install: npm install pcp-engine openai

import { validate } from 'pcp-engine/validate';

/**
 * Wrap an OpenAI client to validate prompts before sending.
 * Logs warnings for low-quality prompts. Optionally blocks them.
 *
 * @param client - OpenAI client instance
 * @param options - threshold (default 60), block (default false)
 * @returns The same client with validation hooked in
 *
 * Usage:
 *   import OpenAI from 'openai';
 *   const client = wrapOpenAI(new OpenAI(), { threshold: 60 });
 *   // Now every chat.completions.create() call validates the prompt
 */
export function wrapOpenAI(
  client: any,
  options: { threshold?: number; block?: boolean } = {}
) {
  const threshold = options.threshold ?? 60;
  const block = options.block ?? false;

  const original = client.chat.completions.create.bind(client.chat.completions);

  client.chat.completions.create = async (params: any) => {
    // Extract the last user message for validation
    const messages = params.messages || [];
    const lastUser = [...messages].reverse().find((m: any) => m.role === 'user');

    if (lastUser?.content && typeof lastUser.content === 'string') {
      const result = validate(lastUser.content, { threshold });

      if (!result.pass) {
        const summary = `PCP: Prompt scored ${result.score}/${threshold} (${result.task_type}, risk: ${result.risk_level})`;

        if (block) {
          throw new Error(`${summary}. Set block: false to allow low-quality prompts.`);
        }

        console.warn(summary);
        result.issues.forEach(i =>
          console.warn(`  - ${i.rule}: ${i.message}`)
        );
      }
    }

    return original(params);
  };

  return client;
}

// Example usage:
// import OpenAI from 'openai';
// const client = wrapOpenAI(new OpenAI(), { threshold: 70, block: false });
// const response = await client.chat.completions.create({
//   model: 'gpt-4o',
//   messages: [{ role: 'user', content: 'Fix the bug' }],
// });
