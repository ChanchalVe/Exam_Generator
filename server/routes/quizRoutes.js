import express from 'express';

const router = express.Router();

// POST /api/quiz/submit - Submit quiz answers and get score
router.post('/submit', async (req, res) => {
  try {
    const { answers, quizId, timeSpent } = req.body;

    // Input validation
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: 'Answers array is required'
      });
    }

    if (!quizId) {
      return res.status(400).json({
        error: 'Quiz ID is required'
      });
    }

    // Mock correct answers - replace with database logic later
    const correctAnswers = [
      { questionId: 1, correctAnswer: 1 },
      { questionId: 2, correctAnswer: 2 },
      { questionId: 3, correctAnswer: 0 },
      { questionId: 4, correctAnswer: 3 },
      { questionId: 5, correctAnswer: 1 }
    ];

    // Calculate score
    let correctCount = 0;
    const results = answers.map((userAnswer, index) => {
      const correct = correctAnswers[index];
      const isCorrect = userAnswer.selectedAnswer === correct.correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      }

      return {
        questionId: userAnswer.questionId || index + 1,
        userAnswer: userAnswer.selectedAnswer,
        correctAnswer: correct.correctAnswer,
        isCorrect: isCorrect
      };
    });

    const totalQuestions = answers.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // Determine grade based on score
    let grade = 'F';
    if (scorePercentage >= 90) grade = 'A';
    else if (scorePercentage >= 80) grade = 'B';
    else if (scorePercentage >= 70) grade = 'C';
    else if (scorePercentage >= 60) grade = 'D';

    const mockQuizResult = {
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        quizId: quizId,
        score: {
          correct: correctCount,
          total: totalQuestions,
          percentage: scorePercentage,
          grade: grade
        },
        results: results,
        timeSpent: timeSpent || null,
        submittedAt: new Date().toISOString(),
        feedback: {
          message: scorePercentage >= 70 
            ? "Great job! You have a good understanding of the material." 
            : scorePercentage >= 50 
            ? "Good effort! Consider reviewing the topics you missed."
            : "Keep studying! Review the material and try again.",
          strengths: correctCount > totalQuestions / 2 
            ? ["Good grasp of basic concepts", "Consistent performance"]
            : [],
          improvements: correctCount < totalQuestions / 2 
            ? ["Review fundamental concepts", "Practice more questions"]
            : []
        }
      }
    };

    res.json(mockQuizResult);

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      error: 'Failed to submit quiz',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/quiz/:id - Get quiz questions (bonus endpoint)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock quiz data - replace with database logic later
    const mockQuiz = {
      success: true,
      message: 'Quiz retrieved successfully',
      data: {
        quizId: id,
        title: "JavaScript Fundamentals Quiz",
        description: "Test your knowledge of JavaScript basics",
        questions: [
          {
            id: 1,
            question: "What is the correct way to declare a variable in JavaScript?",
            options: [
              "variable x = 5;",
              "let x = 5;",
              "declare x = 5;",
              "x := 5;"
            ]
          },
          {
            id: 2,
            question: "Which method is used to add an element to the end of an array?",
            options: [
              "append()",
              "add()",
              "push()",
              "insert()"
            ]
          },
          {
            id: 3,
            question: "What does '===' operator do in JavaScript?",
            options: [
              "Strict equality comparison",
              "Assignment",
              "Loose equality comparison", 
              "Not equal comparison"
            ]
          }
        ],
        timeLimit: 600, // 10 minutes in seconds
        totalQuestions: 3,
        createdAt: "2024-01-15T10:00:00Z"
      }
    };

    res.json(mockQuiz);

  } catch (error) {
    console.error('Error retrieving quiz:', error);
    res.status(500).json({
      error: 'Failed to retrieve quiz',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;