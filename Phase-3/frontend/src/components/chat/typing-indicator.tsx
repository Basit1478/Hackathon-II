"use client";

import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-700">
        <Bot className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-secondary-100 px-4 py-3 dark:bg-secondary-700">
        <span className="sr-only">TaskMaster AI is typing</span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-secondary-400 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-secondary-400 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-secondary-400" />
      </div>
    </div>
  );
}
