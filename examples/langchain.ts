// LangChain integration — validate prompts before sending to LLM
// Install: npm install pcp-engine langchain @langchain/core

import { validate } from 'pcp-engine/validate';
import type { ValidateResult } from 'pcp-engine/validate';

/**
 * PCPPromptGuard — validates prompt quality before LLM execution.
 * Wraps any prompt string and throws if quality is below threshold.
 *
 * Usage with LangChain:
 *   const guard = new PCPPromptGuard(60);
 *   const validated = guard.check(prompt.format({ topic: 'AI safety' }));
 *   const response = await llm.invoke(validated);
 */
export class PCPPromptGuard {
  private threshold: number;
  private lastResult: ValidateResult | null = null;

  constructor(threshold: number = 60) {
    this.threshold = threshold;
  }

  /**
   * Validate a prompt string. Returns the prompt if it passes.
   * Throws if quality is below threshold.
   */
  check(prompt: string): string {
    const result = validate(prompt, { threshold: this.threshold });
    this.lastResult = result;

    if (!result.pass) {
      const issues = result.issues.map(i => `${i.rule}: ${i.message}`).join('; ');
      throw new Error(
        `Prompt quality below threshold (${result.score}/${this.threshold}): ${issues}`
      );
    }

    return prompt;
  }

  /**
   * Validate without throwing. Returns the result for inspection.
   */
  inspect(prompt: string): ValidateResult {
    const result = validate(prompt, { threshold: this.threshold });
    this.lastResult = result;
    return result;
  }

  /** Get the last validation result */
  getLastResult(): ValidateResult | null {
    return this.lastResult;
  }
}

// Example usage:
// const guard = new PCPPromptGuard(60);
// const chain = prompt.pipe(guard.check.bind(guard)).pipe(llm);
