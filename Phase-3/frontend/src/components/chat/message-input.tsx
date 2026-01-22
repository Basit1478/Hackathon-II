"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-secondary-200 bg-white/70 backdrop-blur-xl dark:border-secondary-700 dark:bg-secondary-900/70">
      <div className="container mx-auto p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to do today?"
            disabled={disabled}
            className="flex-1 rounded-2xl border border-secondary-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-secondary-500 dark:text-secondary-400">
          TaskMaster AI understands natural language - just type what you want to do!
        </p>
      </div>
    </div>
  );
}
