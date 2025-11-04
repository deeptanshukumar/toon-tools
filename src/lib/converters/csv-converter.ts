import Papa from 'papaparse'
import { encode, decode } from '@toon-format/toon'
import type { ConversionResult } from './toon-converter'

export function csvToToon(csvString: string): ConversionResult {
  try {
    const parsed = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    })
    
    if (parsed.errors.length > 0) {
      return {
        success: false,
        error: parsed.errors[0].message,
      }
    }
    
    const toonOutput = encode({ data: parsed.data })
    
    return {
      success: true,
      output: toonOutput,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CSV conversion failed',
    }
  }
}

export function toonToCsv(toonString: string): ConversionResult {
  try {
    const data = decode(toonString)
    
    // Extract array data
    let arrayData: any[] = []
    if (Array.isArray(data)) {
      arrayData = data
    } else if (typeof data === 'object' && data !== null) {
      // Find first array property
      const firstArrayKey = Object.keys(data).find(key => 
        Array.isArray((data as any)[key])
      )
      if (firstArrayKey) {
        arrayData = (data as any)[firstArrayKey]
      }
    }
    
    if (arrayData.length === 0) {
      return {
        success: false,
        error: 'No array data found to convert to CSV',
      }
    }
    
    const csv = Papa.unparse(arrayData)
    
    return {
      success: true,
      output: csv,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'TOON to CSV conversion failed',
    }
  }
}
