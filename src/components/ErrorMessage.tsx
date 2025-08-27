import React from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss, onRetry }) => {
  const getErrorType = (message: string) => {
    if (message.toLowerCase().includes('network') || message.toLowerCase().includes('fetch')) {
      return 'network';
    }
    if (message.toLowerCase().includes('api') || message.toLowerCase().includes('key')) {
      return 'api';
    }
    return 'general';
  };

  const errorType = getErrorType(message);

  const getErrorIcon = () => {
    switch (errorType) {
      case 'network':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'api':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getErrorTitle = () => {
    switch (errorType) {
      case 'network':
        return 'Connection Error';
      case 'api':
        return 'Service Error';
      default:
        return 'Error Generating Exam';
    }
  };

  const getErrorSuggestion = () => {
    switch (errorType) {
      case 'network':
        return 'Please check your internet connection and try again.';
      case 'api':
        return 'There seems to be an issue with the AI service. Please try again in a moment.';
      default:
        return 'Please try again or contact support if the problem persists.';
    }
  };

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getErrorIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-red-800 mb-1">
            {getErrorTitle()}
          </h4>
          <p className="text-sm text-red-700 leading-relaxed mb-2">
            {message}
          </p>
          <p className="text-xs text-red-600 leading-relaxed">
            {getErrorSuggestion()}
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                <RefreshCw className="w-3 h-3" />
                Try Again
              </button>
            )}
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-red-400 hover:text-red-600 p-1 -m-1 transition-colors rounded focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;