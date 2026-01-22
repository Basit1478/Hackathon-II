"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatHeader } from "@/components/chat/chat-header";
import { MessageList } from "@/components/chat/message-list";
import { MessageInput } from "@/components/chat/message-input";
import { sendMessage, getMessages } from "@/lib/api/chat";
import type { Message } from "@/types/chat";

// For demo purposes, using a hardcoded user ID
// In production, this would come from authentication
const USER_ID = "demo-user-001";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load conversation history on mount
  useEffect(() => {
    const savedConversationId = localStorage.getItem("conversationId");
    if (savedConversationId) {
      const id = parseInt(savedConversationId, 10);
      setConversationId(id);
      loadMessages(id);
    }
  }, []);

  const loadMessages = async (convId: number) => {
    try {
      const loadedMessages = await getMessages(USER_ID, convId);
      setMessages(loadedMessages);
    } catch (err) {
      console.error("Failed to load messages:", err);
      // If conversation not found, start fresh
      localStorage.removeItem("conversationId");
      setConversationId(null);
    }
  };

  const handleSend = useCallback(async (content: string) => {
    setError(null);
    setIsLoading(true);

    // Optimistically add user message
    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const response = await sendMessage(USER_ID, conversationId, content);

      // Save conversation ID
      if (!conversationId) {
        setConversationId(response.conversation_id);
        localStorage.setItem("conversationId", String(response.conversation_id));
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.response,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-secondary-50 via-white to-primary-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-primary-950/30">
      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-800/20" />
        <div className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-800/20" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-800/15" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <ChatHeader />

        {error && (
          <div className="mx-4 mt-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-900/50 dark:text-rose-300">
            <div className="flex items-center gap-2">
              <span className="font-medium">Error:</span>
              {error}
            </div>
          </div>
        )}

        <MessageList messages={messages} isLoading={isLoading} />

        <MessageInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
