# 🎓 AI Exam Paper Generator

A modern full-stack web application that helps primary school math teachers generate customized exam papers using Google Gemini AI. Built with React, Node.js, Express, and Tailwind CSS.

## ✨ Demo video: https://youtu.be/dhPKMZzLjRI

## ✨ Features

- **🤖 AI-Powered Generation**: Uses Google Gemini API to create contextually appropriate math questions
- **📚 Topic Flexibility**: Generate questions for any math topic (fractions, addition, geometry, etc.)
- **🔢 Customizable Quantity**: Create 1-50 questions per exam
- **✅ Answer Key Option**: Toggle to include/exclude answer keys
- **📋 Copy to Clipboard**: One-click copying of generated exams
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **⚡ Real-time Validation**: Form validation with helpful error messages
- **🎨 Modern UI**: Clean, professional interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-exam-generator

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### 3. Start the Application

**Terminal 1 - Start Backend Server:**

```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**

```bash
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🏗️ Project Structure

```
ai-exam-generator/
├── src/                          # React frontend
│   ├── components/
│   │   ├── ExamForm.tsx         # Main form component
│   │   ├── ExamOutput.tsx       # Results display component
│   │   ├── Loader.tsx           # Loading spinner component
│   │   └── ErrorMessage.tsx     # Error handling component
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # App entry point
├── server/                      # Node.js backend
│   ├── routes/
│   │   └── examRoutes.js        # API route handlers
│   ├── geminiService.js         # Gemini API integration
│   ├── index.js                 # Express server setup
│   └── .env                     # Environment variables
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## 🔧 API Reference

### Generate Exam

**Endpoint**: `POST /api/generate-exam`

**Request Body**:

```json
{
  "topic": "Fractions",
  "count": 5,
  "includeAnswers": true
}
```

**Response**:

```json
{
  "questions": [
    "1. What is 1/2 + 1/4?",
    "2. Simplify the fraction 6/8.",
    "..."
  ],
  "answers": ["1. 3/4", "2. 3/4", "..."]
}
```

## 🎨 Design System

The application uses a carefully crafted design system:

- **Primary**: Blue (#3B82F6) for main actions
- **Success**: Green (#10B981) for positive states
- **Error**: Red (#EF4444) for error states
- **Neutral**: Gray scale for text and backgrounds
- **Typography**: Responsive font sizing with proper hierarchy
- **Spacing**: 8px grid system for consistent layouts

## 🛠️ Development

### Available Scripts

**Frontend**:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

**Backend**:

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

### Key Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Axios
- **AI**: Google Gemini Pro API
- **Icons**: Lucide React

## 🔐 Security Considerations

- API keys are stored server-side only
- Input validation on both frontend and backend
- CORS properly configured
- Rate limiting considerations for API calls
- Error messages don't expose sensitive information

## 📝 Usage Tips

1. **Topic Examples**: Try topics like "Addition", "Fractions", "Word Problems", "Geometry"
2. **Question Counts**: Start with 5-10 questions for testing
3. **Answer Keys**: Enable for teacher reference, disable for student copies
4. **Copying**: Use the copy button to easily paste into documents or print

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

**Common Issues**:

1. **"GEMINI_API_KEY not configured"**

   - Ensure your `.env` file is in the `server` directory
   - Verify your API key is correct and active

2. **CORS Errors**

   - Check that frontend URL matches `FRONTEND_URL` in `.env`
   - Ensure both servers are running

3. **"Failed to generate exam"**

   - Check your internet connection
   - Verify API key permissions
   - Try with a simpler topic first

4. **Questions not parsing correctly**
   - The AI sometimes formats responses differently
   - The app handles most variations automatically

## 🌟 Future Enhancements

- [ ] Support for different grade levels
- [ ] Multiple subject areas beyond math
- [ ] Question difficulty selection
- [ ] Export to PDF functionality
- [ ] Teacher accounts and saved exams
- [ ] Question bank and favorites
- [ ] Batch generation for multiple topics

---

**Happy Teaching! 📚✨**

For questions or support, please open an issue in the repository.
