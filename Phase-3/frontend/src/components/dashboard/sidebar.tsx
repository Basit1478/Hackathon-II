"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, MessageSquare, ListTodo, LayoutDashboard, Settings, ChevronLeft, ChevronRight, Sparkles, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: ListTodo, label: "Tasks", href: "/dashboard/tasks" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={cn("flex h-screen flex-col border-r border-secondary-200/50 bg-white/70 backdrop-blur-xl transition-all", collapsed ? "w-20" : "w-64")}>
      <div className="flex h-16 items-center justify-between border-b border-secondary-200/50 px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600"><Bot className="h-6 w-6 text-white" /></div>
          {!collapsed && <span className="text-lg font-bold">TaskMaster<span className="text-primary-500">AI</span></span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="flex h-8 w-8 items-center justify-center rounded-lg">{collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}</button>
      </div>
      <div className="p-4"><div className={cn("flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary-50 to-emerald-50 p-3", collapsed && "justify-center")}><Sparkles className="h-5 w-5 text-primary-500" />{!collapsed && <div><p className="text-sm font-medium">AI Ready</p><p className="text-xs text-secondary-500">Gemini 2.0</p></div>}</div></div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium", isActive ? "bg-primary-100 text-primary-700" : "text-secondary-600 hover:bg-secondary-100", collapsed && "justify-center px-2")}><item.icon className="h-5 w-5" />{!collapsed && <span>{item.label}</span>}</Link>;
        })}
      </nav>
      <div className="border-t border-secondary-200/50 p-4"><div className={cn("flex items-center gap-3 rounded-xl bg-secondary-50 p-3", collapsed && "justify-center")}><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white">U</div>{!collapsed && <div><p className="text-sm font-medium">Guest User</p></div>}</div></div>
    </aside>
  );
}
