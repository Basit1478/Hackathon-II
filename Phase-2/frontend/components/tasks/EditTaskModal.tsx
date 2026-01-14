'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createTaskSchema, CreateTaskInput } from '@/lib/validations';
import { scaleIn } from '@/lib/animations';

interface EditTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  initialTitle: string;
  initialDescription: string | null;
  onSubmit: (taskId: string, data: CreateTaskInput) => Promise<void>;
}

export function EditTaskModal({
  open,
  onOpenChange,
  taskId,
  initialTitle,
  initialDescription,
  onSubmit,
}: EditTaskModalProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: initialTitle,
      description: initialDescription || undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: initialTitle,
        description: initialDescription || undefined,
      });
      setError(null);
    }
  }, [open, initialTitle, initialDescription, reset]);

  const handleFormSubmit = async (data: CreateTaskInput) => {
    try {
      setError(null);
      await onSubmit(taskId, data);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent className="backdrop-blur-md bg-white/95 dark:bg-slate-900/90 border-gray-300 dark:border-white/20 sm:max-w-md">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={scaleIn}
            >
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">Edit Task</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Update your task details
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
                {error && (
                  <div className="p-3 rounded-lg bg-danger/20 border border-danger/50 text-danger text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="edit-title" className="text-gray-700 dark:text-gray-200">Title</Label>
                  <Input
                    id="edit-title"
                    placeholder="What needs to be done?"
                    className="bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-danger text-sm">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-gray-700 dark:text-gray-200">
                    Description (optional)
                  </Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Add some details..."
                    className="bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[100px]"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-danger text-sm">{errors.description.message}</p>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onOpenChange(false)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Task'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
