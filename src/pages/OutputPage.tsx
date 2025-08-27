// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Copy, Check, Download, FileText, Key, BookOpen, Sparkles, Share2 } from 'lucide-react';

// interface ExamData {
//   questions: string[];
//   answers: string[];
// }

// interface LocationState {
//   examData: ExamData;
//   topic: string;
//   count: number;
//   includeAnswers: boolean;
// }

// const OutputPage: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);
//   const [showAnswers, setShowAnswers] = useState(true);

//   const state = location.state as LocationState;

//   useEffect(() => {
//     if (!state?.examData) {
//       navigate('/');
//     }
//   }, [state, navigate]);

//   if (!state?.examData) {
//     return null;
//   }

//   const { examData, topic, count, includeAnswers } = state;

//   const copyToClipboard = async () => {
//     const questionsText = examData.questions.join('\n\n');
//     const answersText = examData.answers.length > 0 && showAnswers 
//       ? '\n\n--- ANSWER KEY ---\n\n' + examData.answers.join('\n\n') 
//       : '';
//     const fullText = `MATH EXAM - ${topic.toUpperCase()}\n\n${questionsText}${answersText}`;

//     try {
//       await navigator.clipboard.writeText(fullText);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy to clipboard:', err);
      
//       // Fallback for older browsers
//       const textArea = document.createElement('textarea');
//       textArea.value = fullText;
//       document.body.appendChild(textArea);
//       textArea.select();
//       document.execCommand('copy');
//       document.body.removeChild(textArea);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50 print:hidden">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 text-blue-600">
//                 <BookOpen className="w-8 h-8" />
//                 <Sparkles className="w-6 h-6" />
//               </div>
//               <div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                   Generated Exam
//                 </h1>
//                 <p className="text-sm text-gray-600 hidden sm:block">
//                   {topic} • {count} question{count !== 1 ? 's' : ''}
//                   {includeAnswers && ' • With answer key'}
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span className="hidden sm:inline">Back to Generator</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Action Bar */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-8 print:hidden">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-4 text-sm text-gray-600">
//               <div className="flex items-center gap-2">
//                 <FileText className="w-4 h-4" />
//                 <span>{examData.questions.length} Questions</span>
//               </div>
//               {examData.answers.length > 0 && (
//                 <div className="flex items-center gap-2">
//                   <Key className="w-4 h-4" />
//                   <span>Answer Key Included</span>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center gap-3">
//               {examData.answers.length > 0 && (
//                 <button
//                   onClick={() => setShowAnswers(!showAnswers)}
//                   className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium"
//                 >
//                   <Key className="w-4 h-4" />
//                   {showAnswers ? 'Hide' : 'Show'} Answers
//                 </button>
//               )}

//               <button
//                 onClick={handlePrint}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium"
//               >
//                 <Download className="w-4 h-4" />
//                 Print
//               </button>

//               <button
//                 onClick={copyToClipboard}
//                 className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm font-medium"
//               >
//                 {copied ? (
//                   <>
//                     <Check className="w-4 h-4" />
//                     Copied!
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="w-4 h-4" />
//                     Copy All
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Exam Content */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 print:shadow-none print:border-none">
//           {/* Exam Header */}
//           <div className="p-6 sm:p-8 border-b border-gray-200 print:border-gray-400">
//             <div className="text-center">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                 Math Exam
//               </h2>
//               <div className="text-gray-600 space-y-1">
//                 <p className="text-lg font-medium">{topic}</p>
//                 <p className="text-sm">
//                   Total Questions: {examData.questions.length}
//                 </p>
//                 <div className="flex justify-center gap-8 mt-4 text-sm">
//                   <div>
//                     <span className="font-medium">Name: </span>
//                     <span className="border-b border-gray-400 inline-block w-32"></span>
//                   </div>
//                   <div>
//                     <span className="font-medium">Date: </span>
//                     <span className="border-b border-gray-400 inline-block w-24"></span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Questions Section */}
//           <div className="p-6 sm:p-8">
//             <div className="space-y-6">
//               {examData.questions.map((question, index) => (
//                 <div
//                   key={index}
//                   className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 print:bg-white print:border-gray-300"
//                 >
//                   <div className="prose prose-gray max-w-none">
//                     <p className="text-gray-800 leading-relaxed font-medium text-base sm:text-lg">
//                       {question}
//                     </p>
//                   </div>
                  
//                   {/* Answer space for students */}
//                   <div className="mt-4 print:mt-6">
//                     <div className="border-b border-gray-300 h-8 print:h-12"></div>
//                     <div className="border-b border-gray-300 h-8 print:h-12 mt-2"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Answer Key Section */}
//           {examData.answers.length > 0 && showAnswers && (
//             <div className="border-t border-gray-200 print:border-gray-400 print:page-break-before-always">
//               <div className="p-6 sm:p-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <Key className="w-6 h-6 text-green-600" />
//                   <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                     Answer Key
//                   </h3>
//                 </div>
                
//                 <div className="space-y-4">
//                   {examData.answers.map((answer, index) => (
//                     <div
//                       key={index}
//                       className="p-4 sm:p-5 bg-green-50 rounded-lg border border-green-200 print:bg-gray-50 print:border-gray-300"
//                     >
//                       <p className="text-green-800 print:text-gray-800 leading-relaxed font-medium">
//                         {answer}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Footer */}
//           <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-200 print:bg-white print:border-gray-400">
//             <p className="text-xs text-gray-500 text-center">
//               Generated by AI Exam Paper Generator • Review questions before distributing to students
//             </p>
//           </div>
//         </div>

//         {/* Back Button (Mobile) */}
//         <div className="mt-8 text-center print:hidden">
//           <button
//             onClick={() => navigate('/')}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Generate Another Exam
//           </button>
//         </div>
//       </main>

//       {/* Print Styles */}
//       <style jsx>{`
//         @media print {
//           body {
//             background: white !important;
//           }
//           .print\\:page-break-before-always {
//             page-break-before: always;
//           }
//           .print\\:shadow-none {
//             box-shadow: none !important;
//           }
//           .print\\:border-none {
//             border: none !important;
//           }
//           .print\\:hidden {
//             display: none !important;
//           }
//           .print\\:bg-white {
//             background-color: white !important;
//           }
//           .print\\:bg-gray-50 {
//             background-color: #f9fafb !important;
//           }
//           .print\\:border-gray-300 {
//             border-color: #d1d5db !important;
//           }
//           .print\\:border-gray-400 {
//             border-color: #9ca3af !important;
//           }
//           .print\\:text-gray-800 {
//             color: #1f2937 !important;
//           }
//           .print\\:h-12 {
//             height: 3rem !important;
//           }
//           .print\\:mt-6 {
//             margin-top: 1.5rem !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default OutputPage;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  Download,
  FileText,
  Key,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface ExamData {
  questions: string[];
  answers: string[];
}

interface LocationState {
  examData: ExamData;
  topic: string;
  count: number;
  includeAnswers: boolean;
}

const OutputPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.examData) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state?.examData) {
    return null;
  }

  const { examData, topic, count, includeAnswers } = state;

  // copy logic
  const copyToClipboard = async () => {
    const questionsText = examData.questions
      .map(
        (q, i) =>
          `${i + 1}. ${q}${showAnswers && examData.answers[i] ? `\nAnswer: ${examData.answers[i]}` : ''}`
      )
      .join('\n\n');

    const fullText = `MATH EXAM - ${topic.toUpperCase()}\n\n${questionsText}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);

      // Fallback
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-blue-600">
                <BookOpen className="w-8 h-8" />
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Generated Exam
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  {topic} • {count} question{count !== 1 ? 's' : ''}
                  {includeAnswers && ' • With answer key'}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Generator</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-8 print:hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{examData.questions.length} Questions</span>
              </div>
              {examData.answers.length > 0 && (
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  <span>Answer Key Available</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {examData.answers.length > 0 && (
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium"
                >
                  <Key className="w-4 h-4" />
                  {showAnswers ? 'Hide' : 'Show'} Answers
                </button>
              )}

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Print
              </button>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm font-medium"
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
        </div>

        {/* Exam Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 print:border-none">
          {/* Exam Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 print:border-gray-400">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Math Exam
              </h2>
              <div className="text-gray-600 space-y-1">
                <p className="text-lg font-medium">{topic}</p>
                <p className="text-sm">
                  Total Questions: {examData.questions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Questions in Cards */}
          <div className="p-6 sm:p-8">
            <div className="grid gap-6">
              {examData.questions.map((question, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm print:bg-white print:border-gray-300"
                >
                  {/* Question Text */}
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 leading-relaxed font-medium text-base sm:text-lg whitespace-pre-wrap">
                      {question}
                    </p>
                  </div>

                  {/* Space for student answer */}
                  <div className="mt-4 space-y-3">
                    <div className="border-b border-gray-300 h-8 print:h-12"></div>
                    <div className="border-b border-gray-300 h-8 print:h-12"></div>
                  </div>

                  {/* Answer (conditional) */}
                  {showAnswers && examData.answers[index] && (
                    <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200 print:bg-gray-50 print:border-gray-300">
                      <span className="text-sm font-semibold text-green-800">
                        Answer:
                      </span>{' '}
                      <span className="text-green-700 print:text-gray-800">
                        {examData.answers[index]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-200 print:bg-white print:border-gray-400">
            <p className="text-xs text-gray-500 text-center">
              Generated by AI Exam Paper Generator • Review questions before distributing to students
            </p>
          </div>
        </div>

        {/* Back Button (Mobile) */}
        <div className="mt-8 text-center print:hidden">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Generate Another Exam
          </button>
        </div>
      </main>
    </>
  );
};

export default OutputPage;
