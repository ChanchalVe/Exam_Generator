
import axios from 'axios';


const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const buildPrompt = (topic, count, includeAnswers) => {
  return `

  
Generate a math exam with ${count} questions 
on the topic of ${topic}. 

Formatting rules:
- Use Markdown formatting.
- Nothing should be bold. 
- Each question should be  (e.g., 1.) followed by the question text.
- Leave **one blank line** between questions.
- If the question has sub-parts, format them as a), b), c) on separate lines with indentation.
- After all questions, add a section titled **Answer Key**.
- In the Answer Key, repeat the numbering with concise answers.
- Leave a blank line between answers for readability.

Ensure the final output is clean, well-spaced, and easy to read.

Make sure the questions are:
- Age-appropriate for students.
- Clear and easy to understand
- Progressively challenging but not too difficult
- Varied in format (word problems, calculations, etc.)

${includeAnswers ? "After the questions, also provide an 'Answer Key' section with concise answers for each question." : ""}

Please format your response clearly with proper numbering and spacing.
  `;
};

export const generateExamQuestions = async (topic, count, includeAnswers) => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }

  try {
    const prompt = buildPrompt(topic, count, includeAnswers);
    
  

const requestBody = {
    contents: [
      {
        parts: [
          {
            text:prompt 
          }
        ]
      }
    ]
  };



const response = await axios.post(
  `${GEMINI_API_URL}?key=${apiKey}`,
  requestBody,
  {
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000
  }
);

// Gemini 2.0 Flash response
if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
  throw new Error('Invalid response format from Gemini API');
}

const generatedText = response.data.candidates[0].content.parts[0].text;






    // Parse the response into questions + answers
    const parseResponse = (text) => {
      const lines = text.split('\n').filter(line => line.trim());
      const questions = [];
      const answers = [];
      let isAnswerSection = false;

      for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.toLowerCase().includes('answer key')) {
          isAnswerSection = true;
          continue;
        }

        if (/^\d+\./.test(trimmedLine)) {
          if (isAnswerSection) {
            answers.push(trimmedLine);
          } else {
            questions.push(trimmedLine);
          }
        }
      }

      return { questions, answers };
    };

    const parsed = parseResponse(generatedText);

    return {
      questions: parsed.questions.length > 0 ? parsed.questions : [generatedText],
      answers: includeAnswers ? parsed.answers : []
    };

  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw error;
  }
};





   