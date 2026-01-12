'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2, X } from 'lucide-react';

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
  DialogTrigger,
} from '@/components/ui/dialog';
import { createTaskSchema, CreateTaskInput } from '@/lib/validations';
import { scaleIn } from '@/lib/animations';

interface CreateTaskModalProps {
  onSubmit: (data: CreateTaskInput) => Promise<void>;
}

export function CreateTaskModal({ onSubmit }: CreateTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  });

  const handleFormSubmit = async (data: CreateTaskInput) => {
    try {
      setError(null);
      await onSubmit(data);
      reset();
      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create task');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 animate-glow"
          size="icon"
          aria-label="Create new task"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {open && (
          <DialogContent className="backdrop-blur-md bg-slate-900/90 border-white/20 sm:max-w-md">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={scaleIn}
            >
              <DialogHeader>
                <DialogTitle className="text-white">Create New Task</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new task to your list
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
                {error && (
                  <div className="p-3 rounded-lg bg-danger/20 border border-danger/50 text-danger text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-200">Title</Label>
                  <Input
                    id="title"
                    placeholder="What needs to be done?"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-danger text-sm">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-200">
                    Description (optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Add some details..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
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
                    onClick={() => setOpen(false)}
                    className="text-gray-300 hover:text-white"
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
                        Creating...
                      </>
                    ) : (
                      'Create Task'
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
