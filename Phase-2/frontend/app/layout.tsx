import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskMaster Pro",
  description: "A modern task management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
