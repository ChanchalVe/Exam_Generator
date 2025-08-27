import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OutputPage from './pages/OutputPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/output" element={<OutputPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;