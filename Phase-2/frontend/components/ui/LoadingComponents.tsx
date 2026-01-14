'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  show: boolean;
  message?: string;
  theme?: 'modern' | 'classic';
  children?: React.ReactNode;
}

export const LoadingOverlay = ({
  show,
  message = 'Loading...',
  theme = 'modern',
  children
}: LoadingOverlayProps) => {
  if (!show) return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      theme === 'modern'
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800'
        : 'bg-white'
    )}>
      <div className="flex flex-col items-center">
        <div className={cn(
          'rounded-full mb-4',
          theme === 'modern'
            ? 'animate-spin h-12 w-12 border-4 border-white/30 border-t-white'
            : 'animate-spin h-10 w-10 border-4 border-gray-300 border-t-gray-600'
        )}></div>
        <p className={cn(
          'text-lg font-medium',
          theme === 'modern' ? 'text-white' : 'text-gray-800'
        )}>
          {message}
        </p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  count?: number;
  theme?: 'modern' | 'classic';
}

export const Skeleton = ({
  className,
  count = 1,
  theme = 'modern'
}: SkeletonProps) => {
  const themeClasses = theme === 'modern'
    ? 'bg-white/10 rounded-lg animate-pulse'
    : 'bg-gray-200 rounded animate-pulse';

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(themeClasses, className)}
        />
      ))}
    </>
  );
};

interface ProgressBarProps {
  progress: number;
  show: boolean;
  theme?: 'modern' | 'classic';
}

export const ProgressBar = ({
  progress,
  show,
  theme = 'modern'
}: ProgressBarProps) => {
  if (!show) return null;

  const themeClasses = theme === 'modern'
    ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
    : 'bg-gray-800';

  return (
    <div className={cn(
      'fixed top-0 left-0 h-1 w-full z-50',
      theme === 'modern' ? 'bg-gray-700' : 'bg-gray-200'
    )}>
      <div
        className={cn(themeClasses, 'h-full transition-all duration-300 ease-out')}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};