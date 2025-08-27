import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// POST /api/mcq/generate - Generate MCQs from PDF
router.post('/generate', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'PDF file is required'
      });
    }

    // Mock response - replace with actual PDF processing logic later
    const mockMCQs = {
      success: true,
      message: 'MCQs generated successfully',
      data: {
        filename: req.file.originalname,
        fileSize: req.file.size,
        questions: [
          {
            id: 1,
            question: "What is the main topic discussed in the document?",
            options: [
              "Option A: Topic 1",
              "Option B: Topic 2", 
              "Option C: Topic 3",
              "Option D: Topic 4"
            ],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "Which concept is emphasized in chapter 2?",
            options: [
              "Option A: Concept A",
              "Option B: Concept B",
              "Option C: Concept C", 
              "Option D: Concept D"
            ],
            correctAnswer: 2
          },
          {
            id: 3,
            question: "What is the conclusion of the document?",
            options: [
              "Option A: Conclusion 1",
              "Option B: Conclusion 2",
              "Option C: Conclusion 3",
              "Option D: Conclusion 4"
            ],
            correctAnswer: 0
          }
        ],
        totalQuestions: 3,
        generatedAt: new Date().toISOString()
      }
    };

    res.json(mockMCQs);

  } catch (error) {
    console.error('Error generating MCQs:', error);
    
    if (error.message === 'Only PDF files are allowed') {
      return res.status(400).json({
        error: 'Invalid file type. Only PDF files are allowed.'
      });
    }

    res.status(500).json({
      error: 'Failed to generate MCQs from PDF',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;