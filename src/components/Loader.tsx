import React from 'react';
import { Loader2, BookOpen, Sparkles } from 'lucide-react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
  showIcon?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  color = 'text-blue-600',
  message,
  showIcon = false
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const containerSizeClasses = {
    small: 'gap-2',
    medium: 'gap-3',
    large: 'gap-4',
  };

  if (showIcon && size === 'large') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <BookOpen className="w-8 h-8 animate-pulse" />
            <Sparkles className="w-6 h-6 animate-bounce" />
          </div>
          <Loader2 className={`animate-spin ${sizeClasses[size]} ${color} mx-auto`} />
        </div>
        {message && (
          <div className="text-center">
            <p className="text-gray-700 font-medium">{message}</p>
            <p className="text-sm text-gray-500 mt-1">This may take a few moments...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${containerSizeClasses[size]}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]} ${color}`} />
      {message && (
        <span className="text-gray-600 text-sm font-medium">{message}</span>
      )}
    </div>
  );
};

export default Loader;