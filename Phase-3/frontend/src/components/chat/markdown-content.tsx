"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const processedContent = useMemo(() => {
    // Replace task list markers with checkboxes
    let processed = content.replace(/\[ \]/g, "☐ ");
    processed = processed.replace(/\[x\]/g, "☑ ");
    
    return processed;
  }, [content]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => <p {...props} className="mb-2" />,
        ul: ({ node, ...props }) => <ul {...props} className="mb-2 ml-5 list-disc space-y-1" />,
        ol: ({ node, ...props }) => <ol {...props} className="mb-2 ml-5 list-decimal space-y-1" />,
        li: ({ node, ...props }) => <li {...props} className="leading-relaxed" />,
        strong: ({ node, ...props }) => (
          <strong {...props} className="font-semibold text-secondary-900 dark:text-white" />
        ),
        em: ({ node, ...props }) => (
          <em {...props} className="italic text-secondary-700 dark:text-secondary-300" />
        ),
        code: ({ node, ...props }) => (
          <code
            {...props}
            className="rounded bg-secondary-100 px-1 py-0.5 text-sm font-medium text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300"
          />
        ),
        pre: ({ node, ...props }) => (
          <pre
            {...props}
            className="overflow-x-auto rounded-lg bg-secondary-100 p-3 text-sm dark:bg-secondary-800"
          />
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
