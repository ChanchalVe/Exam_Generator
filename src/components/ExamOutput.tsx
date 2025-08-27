import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Key } from 'lucide-react';
import Loader from './Loader';

interface ExamData {
  questions: string[];
  answers: string[];
}

interface ExamOutputProps {
  examData: ExamData | null;
  loading: boolean;
}

const formatOutput = (text: string) => {
  return text
    // spacing between numbered questions
    .replace(/(\d+\..*?)(?=\d+\.)/gs, "$1\n\n")
    // spacing before "Answer Key"
    .replace(/Answer Key/i, "\n\n**Answer Key**\n\n")
    // spacing between answers
    .replace(/(\d+\..*?)(?=\d+\.)/gs, "$1\n\n");
};


const ExamOutput: React.FC<ExamOutputProps> = ({ examData, loading }) => {
  const [copied, setCopied] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);

  const copyToClipboard = async () => {
    if (!examData) return;

    const questionsText = examData.questions.join('\n\n');
    const answersText = examData.answers.length > 0 ? '\n\n--- ANSWER KEY ---\n\n' + examData.answers.join('\n') : '';
    const fullText = questionsText + answersText;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center">
          <Loader size="large" />
          <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            Generating Your Exam...
          </h3>
          <p className="text-gray-600">
            Our AI is creating customized math questions for your students.
          </p>
        </div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready to Generate
          </h3>
          <p className="text-gray-600">
            Fill out the form on the left to create your first AI-powered math exam.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Generated Exam</h3>
              <p className="text-sm text-gray-600">
                {examData.questions.length} question{examData.questions.length !== 1 ? 's' : ''}
                {examData.answers.length > 0 && ' with answer key'}
              </p>
            </div>
          </div>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm font-medium"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy All
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Questions Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">Questions</h4>
          </div>
          
          <div className="space-y-4">
            {examData.questions.map((question, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <p className="text-gray-800 leading-relaxed">{question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Key Section */}
        {examData.answers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">Answer Key</h4>
              </div>
              
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {showAnswers ? 'Hide' : 'Show'} Answers
              </button>
            </div>
            
            {showAnswers && (
              <div className="space-y-3">
                {examData.answers.map((answer, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <p className="text-green-800 leading-relaxed">{answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Generated by AI • Review questions before distributing to students
        </p>
      </div>
    </div>
  );
};


export default ExamOutput;

