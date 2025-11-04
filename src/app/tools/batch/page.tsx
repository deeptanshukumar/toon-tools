'use client'

import { useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileJson,
  FileText,
  X,
  FolderDown
} from 'lucide-react'
import { encode } from '@toon-format/toon'
import { countTokens } from '@/lib/tokenizer'

interface FileResult {
  name: string
  status: 'pending' | 'processing' | 'success' | 'error'
  error?: string
  originalSize: number
  convertedSize?: number
  originalTokens: number
  convertedTokens?: number
  output?: string
}

export default function BatchConverterPage() {
  const [files, setFiles] = useState<FileResult[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const processFile = async (file: File): Promise<FileResult> => {
    const text = await file.text()
    const originalTokens = countTokens(text).tokens
    
    try {
      // Try to parse as JSON
      const jsonObj = JSON.parse(text)
      const toonOutput = encode(jsonObj)
      const convertedTokens = countTokens(toonOutput).tokens
      
      return {
        name: file.name,
        status: 'success',
        originalSize: text.length,
        convertedSize: toonOutput.length,
        originalTokens,
        convertedTokens,
        output: toonOutput
      }
    } catch (err: any) {
      return {
        name: file.name,
        status: 'error',
        error: err.message || 'Failed to convert',
        originalSize: text.length,
        originalTokens
      }
    }
  }

  const handleFiles = async (fileList: FileList) => {
    const fileArray = Array.from(fileList).filter(f => 
      f.name.endsWith('.json') || f.name.endsWith('.txt')
    )

    if (fileArray.length === 0) return

    // Initialize files with pending status
    const newFiles: FileResult[] = fileArray.map(f => ({
      name: f.name,
      status: 'pending',
      originalSize: f.size,
      originalTokens: 0
    }))
    
    setFiles(newFiles)
    setIsProcessing(true)

    // Process files one by one
    for (let i = 0; i < fileArray.length; i++) {
      setFiles(prev => {
        const updated = [...prev]
        updated[i].status = 'processing'
        return updated
      })

      const result = await processFile(fileArray[i])
      
      setFiles(prev => {
        const updated = [...prev]
        updated[i] = result
        return updated
      })
    }

    setIsProcessing(false)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const downloadFile = (file: FileResult) => {
    if (!file.output) return
    
    const blob = new Blob([file.output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name.replace(/\.(json|txt)$/, '.toon')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAll = () => {
    files.filter(f => f.status === 'success').forEach(file => {
      setTimeout(() => downloadFile(file), 100)
    })
  }

  const clearFiles = () => {
    setFiles([])
  }

  const successCount = files.filter(f => f.status === 'success').length
  const errorCount = files.filter(f => f.status === 'error').length
  const totalTokensSaved = files
    .filter(f => f.status === 'success')
    .reduce((sum, f) => sum + (f.originalTokens - (f.convertedTokens || 0)), 0)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            Batch Converter
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Convert multiple JSON files to TOON format at once
          </p>
          
          {/* Privacy Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium mb-1">
                100% Client-Side Processing
              </p>
              <p className="text-sm text-muted-foreground">
                All file conversions happen in your browser. Your files are never uploaded to our servers 
                and remain completely private on your machine.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="max-w-5xl mx-auto">
        {files.length === 0 && (
          <Card
            className={`p-12 border-2 border-dashed ${
              isDragging ? 'border-green-500 bg-green-500/5' : 'border-border bg-background'
            } transition-all`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Drop JSON files here
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                or click to browse your computer
              </p>
              <input
                type="file"
                multiple
                accept=".json,.txt"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer">
                  Select Files
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Supports .json and .txt files
              </p>
            </div>
          </Card>
        )}

        {/* Files List */}
        {files.length > 0 && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Files</p>
                <p className="text-2xl font-bold text-foreground">{files.length}</p>
              </Card>
              <Card className="p-4 bg-green-500/5 border-green-500/20">
                <p className="text-xs text-muted-foreground mb-1">Successful</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{successCount}</p>
              </Card>
              <Card className="p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Tokens Saved</p>
                <p className="text-2xl font-bold text-foreground">{totalTokensSaved.toLocaleString()}</p>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <input
                type="file"
                multiple
                accept=".json,.txt"
                onChange={handleFileInput}
                className="hidden"
                id="add-more-files"
                disabled={isProcessing}
              />
              <label htmlFor="add-more-files">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer"
                  disabled={isProcessing}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Add More Files
                </Button>
              </label>
              {successCount > 0 && (
                <Button
                  onClick={downloadAll}
                  variant="outline"
                >
                  <FolderDown className="h-4 w-4 mr-2" />
                  Download All ({successCount})
                </Button>
              )}
              <Button
                onClick={clearFiles}
                variant="ghost"
                className="ml-auto"
                disabled={isProcessing}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            {/* File List */}
            <div className="space-y-2">
              {files.map((file, index) => (
                <Card key={index} className="p-4 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {file.status === 'processing' && (
                        <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                      )}
                      {file.status === 'success' && (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                      {file.status === 'pending' && (
                        <FileJson className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      {file.status === 'error' && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{file.error}</p>
                      )}
                      {file.status === 'success' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {file.originalTokens} → {file.convertedTokens} tokens 
                          ({((1 - (file.convertedTokens! / file.originalTokens)) * 100).toFixed(1)}% reduction)
                        </p>
                      )}
                    </div>

                    {file.status === 'success' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => downloadFile(file)}
                        className="flex-shrink-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        </div>

        {/* Info Section */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Bulk</div>
            <div className="text-sm text-muted-foreground">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Fast</div>
            <div className="text-sm text-muted-foreground">Conversion</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Private</div>
          </div>
        </div>
      </div>
    </div>
  )
}
