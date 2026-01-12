'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
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
}

export function TaskCard({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={hoverLift}
      layout
      className="w-full"
    >
      <Card
        className={`backdrop-blur-md bg-white/10 border-white/20 p-4 transition-all duration-200 ${
          completed ? 'opacity-60 border-success/30' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="mt-1 border-white/40 data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`text-white font-medium transition-all duration-200 ${
                completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {title}
            </h3>
            {description && (
              <p
                className={`text-sm mt-1 transition-all duration-200 ${
                  completed ? 'text-gray-500 line-through' : 'text-gray-300'
                }`}
              >
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-danger hover:bg-danger/20"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
