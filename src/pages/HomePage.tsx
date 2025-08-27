import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import ExamForm from '../components/ExamForm';
import ErrorMessage from '../components/ErrorMessage';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleGenerateExam = async (topic: string, count: number, includeAnswers: boolean) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/generate-exam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          count,
          includeAnswers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate exam');
      }

      const data = await response.json();
      
      // Navigate to output page with exam data
      navigate('/output', { 
        state: { 
          examData: data, 
          topic, 
          count, 
          includeAnswers 
        } 
      });
    } catch (err) {
      console.error('Error generating exam:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-blue-600">
              <BookOpen className="w-8 h-8" />
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                AI Exam Paper Generator
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Create customized math exams for primary school students
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Generate Perfect Math Exams
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create engaging, age-appropriate math questions tailored to your students' needs. 
              Powered by advanced AI to ensure quality and variety.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Create Your Exam
              </h3>
              <p className="text-gray-600 text-sm">
                Fill in the details below to generate a customized math exam paper.
              </p>
            </div>
            
            <ExamForm
              onGenerate={handleGenerateExam}
              loading={loading}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8">
              <ErrorMessage
                message={error}
                onDismiss={() => setError('')}
              />
            </div>
          )}

          {/* Features Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
              <p className="text-sm text-gray-600">
                Advanced AI creates contextually appropriate questions for any math topic.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customizable</h4>
              <p className="text-sm text-gray-600">
                Choose topics, question count, and whether to include answer keys.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ready to Use</h4>
              <p className="text-sm text-gray-600">
                Copy generated exams directly to your documents or print them out.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Google Gemini AI</span>
          </div>
          <p>Generate engaging math exams for primary school students</p>
        </footer>
      </main>
    </>
  );
};

export default HomePage;