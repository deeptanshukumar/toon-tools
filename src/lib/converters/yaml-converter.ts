import yaml from 'js-yaml'
import { encode, decode } from '@toon-format/toon'
import type { ConversionResult } from './toon-converter'

export function yamlToToon(yamlString: string): ConversionResult {
  try {
    const data = yaml.load(yamlString)
    const toonOutput = encode(data)
    
    return {
      success: true,
      output: toonOutput,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'YAML conversion failed',
    }
  }
}

export function toonToYaml(toonString: string): ConversionResult {
  try {
    const data = decode(toonString)
    const yamlOutput = yaml.dump(data, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
    })
    
    return {
      success: true,
      output: yamlOutput,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'TOON to YAML conversion failed',
    }
  }
}
