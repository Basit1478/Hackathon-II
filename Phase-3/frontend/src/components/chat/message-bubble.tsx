"use client";

import { Bot, User } from "lucide-react";
import { MarkdownContent } from "./markdown-content";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isUser = role === "user";
  
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div
        className={`max-w-[85%] rounded-2xl ${
          isUser
            ? "ml-auto rounded-br-md bg-primary-500 text-white dark:bg-primary-600"
            : "rounded-tl-md bg-secondary-100 dark:bg-secondary-800"
        }`}
      >
        <div className="px-4 py-3">
          <MarkdownContent content={content} />
        </div>
        {timestamp && (
          <div
            className={`px-4 pb-2 text-xs ${
              isUser ? "text-primary-200" : "text-secondary-500 dark:text-secondary-400"
            }`}
          >
            {timestamp}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}
