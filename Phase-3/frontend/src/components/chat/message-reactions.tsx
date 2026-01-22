"use client";

import { ThumbsUp, ThumbsDown, Copy, Share2 } from "lucide-react";

interface MessageReactionsProps {
  messageId: string | number;
}

export function MessageReactions({ messageId }: MessageReactionsProps) {
  const handleReaction = (reaction: string) => {
    console.log(`Reaction ${reaction} on message ${messageId}`);
  };

  return (
    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
      <button
        onClick={() => handleReaction("like")}
        className="rounded p-1.5 text-secondary-500 hover:bg-secondary-100 hover:text-green-600 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-green-400"
      >
        <ThumbsUp className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleReaction("dislike")}
        className="rounded p-1.5 text-secondary-500 hover:bg-secondary-100 hover:text-red-600 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-red-400"
      >
        <ThumbsDown className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleReaction("copy")}
        className="rounded p-1.5 text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-300"
      >
        <Copy className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleReaction("share")}
        className="rounded p-1.5 text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-300"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
