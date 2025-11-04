'use client';

import { Card } from '@/components/ui/card';

export function MonacoSkeleton({ height = '400px' }: { height?: string }) {
  return (
    <Card className="border-border vercel-border overflow-hidden" style={{ height }}>
      <div className="h-full w-full bg-muted animate-pulse relative">
        {/* Editor chrome */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-background/50 border-b border-border flex items-center gap-2 px-3">
          <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
          <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
          <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
        </div>
        
        {/* Line numbers */}
        <div className="absolute top-8 left-0 bottom-0 w-12 bg-background/30 border-r border-border">
          <div className="space-y-3 pt-3 pr-2 text-right">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-4 w-6 ml-auto bg-muted-foreground/10 rounded" />
            ))}
          </div>
        </div>

        {/* Code lines */}
        <div className="absolute top-8 left-12 right-0 bottom-0 p-3 space-y-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex gap-2">
              <div 
                className="h-4 bg-muted-foreground/20 rounded" 
                style={{ width: `${Math.random() * 40 + 40}%` }}
              />
            </div>
          ))}
        </div>

        {/* Loading text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
            <p className="text-sm text-muted-foreground">Loading editor...</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
