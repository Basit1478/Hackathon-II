"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api/task";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, Clock, ListTodo, TrendingUp, Sparkles, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt?: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadTaskStats();
    }
  }, [user]);

  const loadTaskStats = async () => {
    try {
      if (!user) return;

      const userId = user.id;
      const tasks = await getTasks(userId);

      const total = tasks.length;
      const completed = tasks.filter(task => task.status === 'completed').length;
      const pending = total - completed;
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

      setStats({
        total,
        completed,
        pending,
        completionRate: rate,
      });

      // Get 5 most recent tasks
      setRecentTasks(tasks.slice(0, 5));
      setError(null);
    } catch (error) {
      console.error("Failed to load stats:", error);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name || 'User'}! Here's your task summary.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Tasks Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all hover:shadow-xl hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <ListTodo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</h3>
                </div>
                {loading ? (
                  <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                ) : (
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {stats.total}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all hover:shadow-xl hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</h3>
                </div>
                {loading ? (
                  <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                ) : (
                  <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.completed}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pending Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all hover:shadow-xl hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</h3>
                </div>
                {loading ? (
                  <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                ) : (
                  <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                    {stats.pending}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Completion Rate Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all hover:shadow-xl hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-16 -mt-16" />
            <div className="relative flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</h3>
                </div>
                {loading ? (
                  <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                ) : (
                  <div className="space-y-2">
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.completionRate}%
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${stats.completionRate}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
            <Link href="/dashboard/tasks">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
              ))}
            </div>
          ) : recentTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    No tasks yet!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    Start your productivity journey by creating your first task in the chat. 💬✨
                  </p>
                </div>
                <Link href="/chat">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Go to Chat
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  ) : task.status === "in-progress" ? (
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                    
                    {task.dueDate && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
