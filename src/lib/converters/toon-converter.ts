import { encode, decode } from '@toon-format/toon'
import type { EncodeOptions, DecodeOptions } from '@toon-format/toon'

export interface ConversionResult {
  success: boolean
  output?: string
  error?: string
  originalTokens?: number
  convertedTokens?: number
  savings?: {
    tokens: number
    percentage: number
  }
}

export function jsonToToon(
  jsonString: string,
  options?: EncodeOptions
): ConversionResult {
  try {
    const data = JSON.parse(jsonString)
    const toonOutput = encode(data, options)
    
    return {
      success: true,
      output: toonOutput,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed',
    }
  }
}

export function toonToJson(
  toonString: string,
  options?: DecodeOptions
): ConversionResult {
  try {
    const data = decode(toonString, options)
    const jsonOutput = JSON.stringify(data, null, 2)
    
    return {
      success: true,
      output: jsonOutput,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed',
    }
  }
}

export function validateJson(jsonString: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(jsonString)
    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    }
  }
}

export function validateToon(toonString: string): { valid: boolean; error?: string } {
  try {
    decode(toonString)
    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid TOON',
    }
  }
}
