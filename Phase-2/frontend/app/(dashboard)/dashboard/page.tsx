'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, CheckCircle2, ListTodo } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TaskCard } from '@/components/tasks/TaskCard';
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal';
import { useAuthStore } from '@/store/authStore';
import { tasksAPI } from '@/lib/api';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { CreateTaskInput } from '@/lib/validations';
import { LoadingOverlay, Skeleton, ProgressBar } from '@/components/ui/LoadingComponents';
import { ThemeToggle } from '@/components/ThemeToggle';

interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, initialize } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taskLoadingStates, setTaskLoadingStates] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
      return;
    }

    if (user) {
      loadTasks();
    }
  }, [isAuthenticated, user, router]);

  const loadTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      setProgress(0);
      setShowProgressBar(true);

      // Simulate progress for better UX
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      const response = await tasksAPI.getTasks(user.id);
      setTasks(response.tasks);

      // Complete progress
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setShowProgressBar(false);
          setProgress(0);
        }, 300);
      }, 200);
    } catch (err: any) {
      setError('Failed to load tasks');
      console.error(err);
      setShowProgressBar(false);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: CreateTaskInput) => {
    if (!user) return;

    // Show progress bar during task creation
    setProgress(0);
    setShowProgressBar(true);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 15;
      });
    }, 100);

    try {
      await tasksAPI.createTask(user.id, data);
      await loadTasks(); // Reload tasks after creation

      // Complete progress
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setShowProgressBar(false);
          setProgress(0);
        }, 300);
      }, 200);
    } catch (err) {
      console.error('Error creating task:', err);
      setShowProgressBar(false);
      setProgress(0);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    if (!user) return;

    // Set loading state for this specific task
    setTaskLoadingStates(prev => ({ ...prev, [taskId]: true }));

    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await tasksAPI.toggleComplete(user.id, taskId);
    } catch (err) {
      // Revert on error
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } finally {
      // Remove loading state after a delay for better UX
      setTimeout(() => {
        setTaskLoadingStates(prev => {
          const newState = { ...prev };
          delete newState[taskId];
          return newState;
        });
      }, 500);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;

    // Set loading state for this specific task
    setTaskLoadingStates(prev => ({ ...prev, [taskId]: true }));

    // Optimistic update
    const previousTasks = tasks;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    try {
      await tasksAPI.deleteTask(user.id, taskId);
    } catch (err) {
      // Revert on error
      setTasks(previousTasks);
    } finally {
      // Remove loading state after a delay for better UX
      setTimeout(() => {
        setTaskLoadingStates(prev => {
          const newState = { ...prev };
          delete newState[taskId];
          return newState;
        });
      }, 500);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-900 dark:text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <LoadingOverlay show={loading && tasks.length === 0} message="Loading your tasks..." />
      <ProgressBar progress={progress} show={showProgressBar} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.name}!
            </h1>
            <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <ListTodo className="h-4 w-4" />
                {pendingCount} pending
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {completedCount} completed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              disabled={loading}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 mb-4 rounded-lg bg-danger/20 border border-danger/50 text-danger">
            {error}
          </div>
        )}

        {/* Task List */}
        {loading && tasks.length > 0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-20 rounded-lg bg-gray-200 dark:bg-white/5"
                theme="modern"
              />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            className="text-center py-16"
          >
            <ListTodo className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-2">No tasks yet</h2>
            <p className="text-gray-500 dark:text-gray-500">
              Click the + button to create your first task
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`${taskLoadingStates[task.id] ? 'opacity-70 pointer-events-none' : ''} transition-opacity`
                >
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    completed={task.completed}
                    onToggle={handleToggleComplete}
                    onDelete={handleDeleteTask}
                  />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Create Task FAB */}
        <CreateTaskModal onSubmit={handleCreateTask} />
      </motion.div>
    </div>
  );
}
