"use client";

import { Bot, Menu, Settings } from "lucide-react";

export function ChatHeader() {
  return (
    <header className="border-b border-secondary-200 bg-white/70 backdrop-blur-xl dark:border-secondary-700 dark:bg-secondary-900/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800">
            <Menu className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-secondary-900 dark:text-white">
                TaskMaster AI
              </h1>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                Your AI task assistant
              </p>
            </div>
          </div>
        </div>
        <button className="rounded-lg p-2 transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800">
          <Settings className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
        </button>
      </div>
    </header>
  );
}
