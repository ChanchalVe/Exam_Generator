

// examRoutes.js
import express from 'express';
import { generateExamQuestions } from '../geminiService.js';

const router = express.Router();

// POST /api/generate-exam
router.post('/generate-exam', async (req, res) => {
  try {
    const { topic, count, includeAnswers } = req.body;

    // Input validation
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ error: 'Topic is required' });
    }
    if (!count || typeof count !== 'number' || count < 1 || count > 50) {
      return res.status(400).json({ error: 'Count must be 1-50' });
    }
    if (typeof includeAnswers !== 'boolean') {
      return res.status(400).json({ error: 'includeAnswers must be boolean' });
    }

    const result = await generateExamQuestions(topic.trim(), count, includeAnswers);
    res.json(result);

  } catch (error) {
    console.error('Error generating exam:', error);
    res.status(500).json({ error: 'Failed to generate exam questions' });
  }
});

export default router;


