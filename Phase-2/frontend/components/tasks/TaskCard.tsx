'use client';

import { motion } from 'framer-motion';
import { Trash2, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fadeInUp, hoverLift } from '@/lib/animations';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, title: string, description: string | null) => void;
}

export function TaskCard({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TaskCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={hoverLift}
      layout
      className="w-full"
    >
      <Card
        className={`backdrop-blur-md bg-white/10 dark:bg-white/10 bg-gray-100/80 border-gray-300/60 dark:border-white/20 p-4 transition-all duration-200 ${
          completed ? 'opacity-60 border-success/30' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="mt-1 border-gray-400 dark:border-white/40 data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`text-gray-900 dark:text-white font-medium transition-all duration-200 ${
                completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}
            >
              {title}
            </h3>
            {description && (
              <p
                className={`text-sm mt-1 transition-all duration-200 ${
                  completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {description}
              </p>
            )}
          </div>
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(id, title, description)}
                className="text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/20"
                aria-label="Edit task"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
              className="text-gray-600 dark:text-gray-400 hover:text-danger hover:bg-danger/20"
              aria-label="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
