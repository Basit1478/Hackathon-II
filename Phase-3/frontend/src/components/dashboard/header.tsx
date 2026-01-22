"use client";

import { useState } from "react";
import { Search, Bell, Moon, Sun, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header({ title = "Dashboard", subtitle }: { title?: string; subtitle?: string }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => { setIsDark(!isDark); document.documentElement.classList.toggle("dark"); };

  return (
    <header className="flex h-16 items-center justify-between border-b border-secondary-200/50 bg-white/70 px-6 backdrop-blur-xl dark:border-secondary-700/50 dark:bg-secondary-900/70">
      <div><h1 className="text-xl font-semibold text-secondary-900 dark:text-white">{title}</h1></div>
      <div className="flex items-center gap-4">
        <Button size="sm" className="gap-2"><Plus className="h-4 w-4" />Add Task</Button>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-secondary-200 bg-white"><Bell className="h-5 w-5" /></button>
        <button onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center rounded-xl border border-secondary-200 bg-white">{isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
      </div>
    </header>
  );
}
