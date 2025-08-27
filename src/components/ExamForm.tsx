import React, { useState } from 'react';
import { BookOpen, Settings, Loader2, AlertCircle } from 'lucide-react';

interface ExamFormProps {
  onGenerate: (topic: string, count: number, includeAnswers: boolean) => void;
  loading: boolean;
}

const ExamForm: React.FC<ExamFormProps> = ({ onGenerate, loading }) => {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState<number>(5);
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [errors, setErrors] = useState<{ topic?: string; count?: string }>({});
  const [touched, setTouched] = useState<{ topic?: boolean; count?: boolean }>({});

  const validateForm = () => {
    const newErrors: { topic?: string; count?: string } = {};

    if (!topic.trim()) {
      newErrors.topic = 'Please enter a math topic';
    } else if (topic.trim().length < 2) {
      newErrors.topic = 'Topic must be at least 2 characters long';
    } else if (topic.trim().length > 100) {
      newErrors.topic = 'Topic must be less than 100 characters';
    }

    if (!count || count < 1) {
      newErrors.count = 'Please enter a number between 1 and 50';
    } else if (count > 50) {
      newErrors.count = 'Maximum 50 questions allowed';
    } else if (!Number.isInteger(count)) {
      newErrors.count = 'Please enter a whole number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({ topic: true, count: true });
    
    if (validateForm()) {
      onGenerate(topic.trim(), count, includeAnswers);
    }
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTopic(value);
    
    if (touched.topic) {
      const newErrors = { ...errors };
      if (!value.trim()) {
        newErrors.topic = 'Please enter a math topic';
      } else if (value.trim().length < 2) {
        newErrors.topic = 'Topic must be at least 2 characters long';
      } else if (value.trim().length > 100) {
        newErrors.topic = 'Topic must be less than 100 characters';
      } else {
        delete newErrors.topic;
      }
      setErrors(newErrors);
    }
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : parseInt(value);
    
    // Only allow numeric input
    if (value === '' || /^\d+$/.test(value)) {
      setCount(numValue);
      
      if (touched.count) {
        const newErrors = { ...errors };
        if (!numValue || numValue < 1) {
          newErrors.count = 'Please enter a number between 1 and 50';
        } else if (numValue > 50) {
          newErrors.count = 'Maximum 50 questions allowed';
        } else {
          delete newErrors.count;
        }
        setErrors(newErrors);
      }
    }
  };

  const handleTopicBlur = () => {
    setTouched(prev => ({ ...prev, topic: true }));
    validateForm();
  };

  const handleCountBlur = () => {
    setTouched(prev => ({ ...prev, count: true }));
    validateForm();
  };

  const predefinedTopics = [
    'Addition', 'Subtraction', 'Multiplication', 'Division',
    'Fractions', 'Decimals', 'Geometry', 'Time and Money',
    'Word Problems', 'Patterns', 'Measurement', 'Algebra Basics'
  ];

  const isFormValid = !errors.topic && !errors.count && topic.trim() && count >= 1 && count <= 50;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Topic Input */}
      <div className="space-y-2">
        <label htmlFor="topic" className="block text-sm font-semibold text-gray-700">
          Math Topic *
        </label>
        <div className="relative">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={handleTopicChange}
            onBlur={handleTopicBlur}
            placeholder="e.g., Fractions, Addition, Geometry..."
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 ${
              errors.topic && touched.topic
                ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                : topic.trim() && !errors.topic
                ? 'border-green-300 bg-green-50 focus:ring-green-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            disabled={loading}
            maxLength={100}
          />
          {errors.topic && touched.topic && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
        
        {errors.topic && touched.topic && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.topic}
          </p>
        )}
        
        {/* Quick Topic Suggestions */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Quick select popular topics:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedTopics.map((suggestedTopic) => (
              <button
                key={suggestedTopic}
                type="button"
                onClick={() => {
                  setTopic(suggestedTopic);
                  if (touched.topic) {
                    const newErrors = { ...errors };
                    delete newErrors.topic;
                    setErrors(newErrors);
                  }
                }}
                className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all font-medium"
                disabled={loading}
              >
                {suggestedTopic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Question Count */}
      <div className="space-y-2">
        <label htmlFor="count" className="block text-sm font-semibold text-gray-700">
          Number of Questions *
        </label>
        <div className="relative">
          <input
            type="text"
            id="count"
            value={count || ''}
            onChange={handleCountChange}
            onBlur={handleCountBlur}
            placeholder="5"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 ${
              errors.count && touched.count
                ? 'border-red-300 bg-red-50 focus:ring-red-500'
                : count >= 1 && count <= 50 && !errors.count
                ? 'border-green-300 bg-green-50 focus:ring-green-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            disabled={loading}
          />
          {errors.count && touched.count && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
        
        {errors.count && touched.count && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.count}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Choose between 1 and 50 questions</span>
          <span className={count > 50 ? 'text-red-500' : count >= 1 ? 'text-green-600' : ''}>
            {count || 0}/50
          </span>
        </div>
      </div>

      {/* Answer Key Toggle */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <input
              type="checkbox"
              id="includeAnswers"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all"
              disabled={loading}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="includeAnswers" className="text-sm font-semibold text-gray-800 cursor-pointer flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Include Answer Key
            </label>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Generate a complete answer key alongside the questions for easy grading and reference.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all transform ${
          loading || !isFormValid
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Your Exam...
          </>
        ) : (
          <>
            <BookOpen className="w-5 h-5" />
            Generate Exam Paper
          </>
        )}
      </button>

      {/* Form Status */}
      {!isFormValid && (touched.topic || touched.count) && (
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Please fill in all required fields correctly to generate your exam.
          </p>
        </div>
      )}
    </form>
  );
};

export default ExamForm;