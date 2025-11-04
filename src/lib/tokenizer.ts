import { encode as encodeGPT } from 'gpt-tokenizer'

export type TokenizerType = 'o200k_base' | 'cl100k_base' | 'p50k_base'

export interface TokenCount {
  tokens: number
  characters: number
}

export function countTokens(text: string, tokenizer: TokenizerType = 'o200k_base'): TokenCount {
  // Using gpt-tokenizer which defaults to o200k_base (GPT-4, GPT-4o)
  const tokens = encodeGPT(text)
  
  return {
    tokens: tokens.length,
    characters: text.length,
  }
}

export function estimateCost(tokens: number, provider: string = 'openai'): number {
  // Cost per million tokens in USD (Input pricing as of November 2025)
  // Source: https://openai.com/api/pricing/
  const costs: Record<string, number> = {
    'openai-gpt5': 1.25,          // GPT-5 input
    'openai-gpt5-mini': 0.25,      // GPT-5 mini input
    'openai-gpt5-nano': 0.05,      // GPT-5 nano input
    'openai-gpt4.1': 3.00,         // GPT-4.1 input
    'openai-gpt4.1-mini': 0.80,    // GPT-4.1 mini input
    'anthropic-claude3.5': 3.00,   // Claude 3.5 Sonnet input
    'anthropic-claude3-haiku': 0.25, // Claude 3 Haiku input
    'google-gemini-flash': 0.075,  // Gemini 2.0 Flash input
    // Legacy/default
    'openai': 1.25,                // Default to GPT-5
  }
  
  return (tokens / 1_000_000) * (costs[provider] || 1.25)
}

export function compareTokenCounts(json: string, toon: string) {
  const jsonCount = countTokens(json)
  const toonCount = countTokens(toon)
  
  const tokensSaved = jsonCount.tokens - toonCount.tokens
  const reductionPercentage = ((tokensSaved / jsonCount.tokens) * 100)
  const costSavings = estimateCost(tokensSaved, 'openai-gpt5') // Using GPT-5 pricing
  
  return {
    jsonTokens: jsonCount.tokens,
    toonTokens: toonCount.tokens,
    tokensSaved,
    reductionPercentage,
    costSavings,
  }
}
