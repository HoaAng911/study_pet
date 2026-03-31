import React, { useState, useEffect } from 'react';
import { allTests } from './data';
import Header from './components/Header';
import SidebarNavigation from './components/SidebarNavigation';
import ReadingPassage from './components/ReadingPassage';
import QuestionCard from './components/QuestionCard';
import WritingForm from './components/WritingForm';
import ResultSummary from './components/ResultSummary';

const App = () => {
  // Multiple Test Management
  const [activeTestId, setActiveTestId] = useState('test1-1');
  const testData = allTests[activeTestId];

  // Exam Progress State
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeLeft, setTimeLeft] = useState(testData.totalTimeInSeconds);
  const [currentPartId, setCurrentPartId] = useState(testData.parts[0].id);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Reset state when switching tests
  const handleTestChange = (testId) => {
    const nextTest = allTests[testId];
    setActiveTestId(testId);
    setAnswers({});
    setMarkedForReview([]);
    setTimeLeft(nextTest.totalTimeInSeconds);
    setCurrentPartId(nextTest.parts[0].id);
    setIsSubmitted(false);
    setShowResult(false);
    setScore(0);
  };

  // Timer logic
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isSubmitted, activeTestId]); // Add activeTestId to re-sync timer if needed

  const handleAnswer = (questionId, selection) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selection
    }));
  };

  const toggleMarkForReview = (questionId) => {
    if (isSubmitted) return;
    setMarkedForReview((prev) => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    
    // Calculate score
    let currentScore = 0;
    testData.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          const userAnswer = answers[q.id];
          if (userAnswer && q.correctAnswer && userAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
            currentScore++;
          }
        });
      }
    });

    setScore(currentScore);
    setIsSubmitted(true);
    setShowResult(true);
  };

  const currentPart = testData.parts.find(p => p.id === currentPartId);
  const totalQuestions = testData.parts.reduce((acc, part) => acc + (part.questions ? part.questions.length : 1), 0);

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header 
          timeLeft={timeLeft} 
          isSubmitted={isSubmitted} 
          onSubmit={handleSubmit}
          activeTestId={activeTestId}
          onTestChange={handleTestChange}
        />
        <ResultSummary 
          score={score} 
          total={totalQuestions} 
          onReview={() => setShowResult(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header 
        timeLeft={timeLeft} 
        isSubmitted={isSubmitted} 
        onSubmit={handleSubmit} 
        activeTestId={activeTestId}
        onTestChange={handleTestChange}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <SidebarNavigation 
          parts={testData.parts}
          currentPartId={currentPartId}
          setCurrentPartId={setCurrentPartId}
          answers={answers}
          markedForReview={markedForReview}
          isSubmitted={isSubmitted}
        />

        <main className="flex-1 flex overflow-hidden">
          {/* Left Column: Passage */}
          {currentPart.type !== 'email-writing' && currentPart.type !== 'story-writing' && (
            <ReadingPassage part={currentPart} />
          )}

          {/* Right Column: Questions or WritingForm */}
          <div className={`h-full overflow-y-auto p-8 bg-white border-l border-slate-100 scroll-smooth flex flex-col ${
            (currentPart.type === 'email-writing' || currentPart.type === 'story-writing') 
              ? 'flex-1 items-center bg-slate-50 relative' 
              : 'w-[500px]'
          }`}>
            <div className={`space-y-12 pb-20 w-full flex flex-col h-full ${
              (currentPart.type === 'email-writing' || currentPart.type === 'story-writing') ? 'max-w-6xl' : ''
            }`}>
              <div className="border-b border-slate-100 pb-8 shrink-0">
                <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                  {currentPart.title}
                </h2>
                {currentPart.description && (
                  <p className="text-slate-500 text-lg font-medium">
                    {currentPart.description}
                  </p>
                )}
              </div>

              {currentPart.type === 'email-writing' || currentPart.type === 'story-writing' ? (
                <div className="flex-1 flex flex-col h-full">
                  <WritingForm
                    part={currentPart}
                    answer={answers[currentPart.id]}
                    onAnswer={(text) => handleAnswer(currentPart.id, text)}
                    isSubmitted={isSubmitted}
                  />
                </div>
              ) : (
                currentPart.questions && currentPart.questions.map((q, idx) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    index={idx}
                    answer={answers[q.id]}
                    onAnswer={handleAnswer}
                    isMarked={markedForReview.includes(q.id)}
                    onToggleMark={() => toggleMarkForReview(q.id)}
                    isSubmitted={isSubmitted}
                  />
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
