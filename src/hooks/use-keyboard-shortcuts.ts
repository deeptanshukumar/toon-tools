'use client';

import { useEffect } from 'react';

interface KeyboardShortcuts {
  onConvert?: () => void;
  onCopy?: () => void;
  onClear?: () => void;
  onToggleMode?: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifierKey = isMac ? event.metaKey : event.ctrlKey;

      // Ctrl/Cmd + Enter: Convert/Submit
      if (modifierKey && event.key === 'Enter' && shortcuts.onConvert) {
        event.preventDefault();
        shortcuts.onConvert();
      }

      // Ctrl/Cmd + K: Copy output
      if (modifierKey && event.key === 'k' && shortcuts.onCopy) {
        event.preventDefault();
        shortcuts.onCopy();
      }

      // Ctrl/Cmd + L: Clear/Reset
      if (modifierKey && event.key === 'l' && shortcuts.onClear) {
        event.preventDefault();
        shortcuts.onClear();
      }

      // Ctrl/Cmd + M: Toggle mode
      if (modifierKey && event.key === 'm' && shortcuts.onToggleMode) {
        event.preventDefault();
        shortcuts.onToggleMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export function getShortcutText(key: string): string {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modifier = isMac ? '⌘' : 'Ctrl';
  return `${modifier}+${key}`;
}
