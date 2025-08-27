import express from 'express';

const router = express.Router();

// GET /api/flashcards - Get all flashcards
router.get('/', async (req, res) => {
  try {
    // Mock flashcards data - replace with database logic later
    const mockFlashcards = {
      success: true,
      message: 'Flashcards retrieved successfully',
      data: {
        flashcards: [
          {
            id: 1,
            front: "What is React?",
            back: "A JavaScript library for building user interfaces, particularly web applications with interactive UIs.",
            category: "Frontend Development",
            difficulty: "Beginner",
            createdAt: "2024-01-15T10:30:00Z",
            lastReviewed: "2024-01-20T14:45:00Z"
          },
          {
            id: 2,
            front: "What is Express.js?",
            back: "A minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.",
            category: "Backend Development", 
            difficulty: "Beginner",
            createdAt: "2024-01-16T09:15:00Z",
            lastReviewed: "2024-01-21T16:20:00Z"
          },
          {
            id: 3,
            front: "What is the difference between let and const?",
            back: "let allows reassignment of values, while const creates immutable bindings. Both are block-scoped.",
            category: "JavaScript",
            difficulty: "Intermediate",
            createdAt: "2024-01-17T11:00:00Z",
            lastReviewed: null
          },
          {
            id: 4,
            front: "What is API?",
            back: "Application Programming Interface - a set of protocols and tools for building software applications that specify how components should interact.",
            category: "General Programming",
            difficulty: "Beginner", 
            createdAt: "2024-01-18T13:25:00Z",
            lastReviewed: "2024-01-22T10:10:00Z"
          },
          {
            id: 5,
            front: "What is MongoDB?",
            back: "A NoSQL document database that stores data in flexible, JSON-like documents instead of traditional table-based relational database structure.",
            category: "Database",
            difficulty: "Intermediate",
            createdAt: "2024-01-19T15:40:00Z",
            lastReviewed: "2024-01-23T12:30:00Z"
          }
        ],
        totalCount: 5,
        categories: ["Frontend Development", "Backend Development", "JavaScript", "General Programming", "Database"],
        retrievedAt: new Date().toISOString()
      }
    };

    res.json(mockFlashcards);

  } catch (error) {
    console.error('Error retrieving flashcards:', error);
    res.status(500).json({
      error: 'Failed to retrieve flashcards',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/flashcards/:id - Get specific flashcard
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock single flashcard - replace with database logic later
    const mockFlashcard = {
      success: true,
      message: 'Flashcard retrieved successfully',
      data: {
        id: parseInt(id),
        front: "What is React?",
        back: "A JavaScript library for building user interfaces, particularly web applications with interactive UIs.",
        category: "Frontend Development",
        difficulty: "Beginner",
        createdAt: "2024-01-15T10:30:00Z",
        lastReviewed: "2024-01-20T14:45:00Z"
      }
    };

    res.json(mockFlashcard);

  } catch (error) {
    console.error('Error retrieving flashcard:', error);
    res.status(500).json({
      error: 'Failed to retrieve flashcard',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;