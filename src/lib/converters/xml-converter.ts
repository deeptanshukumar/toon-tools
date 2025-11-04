import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { encode, decode } from '@toon-format/toon'
import type { ConversionResult } from './toon-converter'

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseAttributeValue: true,
  parseTagValue: true,
}

const builderOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  format: true,
  indentBy: '  ',
}

export function xmlToToon(xmlString: string): ConversionResult {
  try {
    const parser = new XMLParser(parserOptions)
    const data = parser.parse(xmlString)
    const toonOutput = encode(data)
    
    return {
      success: true,
      output: toonOutput,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'XML conversion failed',
    }
  }
}

export function toonToXml(toonString: string): ConversionResult {
  try {
    const data = decode(toonString)
    const builder = new XMLBuilder(builderOptions)
    const xmlOutput = builder.build(data)
    
    return {
      success: true,
      output: xmlOutput,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'TOON to XML conversion failed',
    }
  }
}
