"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatHeader } from "@/components/chat/chat-header";
import { MessageList } from "@/components/chat/message-list";
import { MessageInput } from "@/components/chat/message-input";
import { sendMessage, getMessages } from "@/lib/api/chat";
import type { Message } from "@/types/chat";

const USER_ID = "demo-user-001";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      localStorage.removeItem("conversationId");
      setConversationId(null);
    }
  };

  const handleSend = useCallback(async (content: string) => {
    setError(null);
    setIsLoading(true);

    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      const response = await sendMessage(USER_ID, conversationId, content);
      if (!conversationId) {
        setConversationId(response.conversation_id);
        localStorage.setItem("conversationId", String(response.conversation_id));
      }
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.response,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-secondary-50 via-white to-primary-50/30 dark:from-secondary-950 dark:via-secondary-900 dark:to-primary-950/30">
      <ChatHeader />
      {error && (
        <div className="mx-4 mt-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          Error: {error}
        </div>
      )}
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
