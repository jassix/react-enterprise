import Anthropic from "@anthropic-ai/sdk";
import { Err, Ok, type Result } from "@repo/std/result";
import type { Refiner, RefinerError, RefinerOutput } from "~/application/ports/refiner";
import { buildPrompt } from "~/application/refinement/build-prompt";
import { parseRefinerOutput } from "~/application/refinement/parse-refiner-output";
import type { RefinementContext } from "~/domain/refinement-context";

const DEFAULT_MODEL = "claude-opus-4-7";
const DEFAULT_MAX_TOKENS = 16000;

export interface AnthropicSdkRefinerOptions {
  readonly apiKey?: string;
  readonly model?: string;
  readonly maxTokens?: number;
}

export class AnthropicSdkRefiner implements Refiner {
  private readonly client: Anthropic;
  private readonly model: string;
  private readonly maxTokens: number;

  constructor(options: AnthropicSdkRefinerOptions = {}) {
    const key = options.apiKey ?? process.env.ANTHROPIC_API_KEY;
    if (!key) {
      throw new Error(
        "ANTHROPIC_API_KEY is not set — AnthropicSdkRefiner cannot be constructed",
      );
    }
    this.client = new Anthropic({ apiKey: key });
    this.model = options.model ?? DEFAULT_MODEL;
    this.maxTokens = options.maxTokens ?? DEFAULT_MAX_TOKENS;
  }

  async refine(context: RefinementContext): Promise<Result<RefinerOutput, RefinerError>> {
    const { system, user } = buildPrompt(context);

    let message;
    try {
      message = await this.client.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        system,
        messages: [{ role: "user", content: user }],
      });
    } catch (cause) {
      return Err({ kind: "transport", cause });
    }

    const text = message.content
      .filter((b): b is Extract<typeof b, { type: "text" }> => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    if (text.trim().length === 0) {
      return Err({
        kind: "invalid-output",
        messages: ["model returned no text content"],
      });
    }

    const parsed = parseRefinerOutput(text);
    if (parsed.isErr()) {
      return Err({ kind: "invalid-output", messages: parsed.unwrapErr().messages });
    }
    return Ok(parsed.unwrap());
  }
}
