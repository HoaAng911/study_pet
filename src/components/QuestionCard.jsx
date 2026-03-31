import React from 'react';
import { Bookmark, BookmarkCheck, CheckCircle, XCircle, Info } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  index, 
  answer, 
  onAnswer, 
  isMarked, 
  onToggleMark, 
  isSubmitted 
}) => {
  const isCorrect = isSubmitted && answer === question.correctAnswer;
  const isWrong = isSubmitted && answer && answer !== question.correctAnswer;
  const isUnanswered = isSubmitted && !answer;

  return (
    <div className={`card transition-all duration-300 relative group overflow-hidden ${
      isCorrect ? 'ring-2 ring-emerald-500 border-emerald-500' :
      isWrong ? 'ring-2 ring-red-500 border-red-500' :
      isMarked ? 'bg-amber-50 border-amber-200 shadow-md' : 'hover:shadow-lg'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
            {index + 1}
          </span>
          <h3 className="font-semibold text-slate-800 text-lg leading-snug">{question.text}</h3>
        </div>
        
        {!isSubmitted && (
          <button 
            onClick={onToggleMark}
            className={`p-2 rounded-full transition-colors ${
              isMarked ? 'text-amber-500 hover:bg-amber-100' : 'text-slate-300 hover:bg-slate-100'
            }`}
          >
            {isMarked ? <BookmarkCheck fill="currentColor" /> : <Bookmark />}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {question.options ? (
          question.options.map((option) => {
            const isSelected = answer === option.id;
            const isCorrectOption = isSubmitted && option.id === question.correctAnswer;
            const isWrongOption = isSubmitted && isSelected && !isCorrectOption;

            return (
              <button
                key={option.id}
                disabled={isSubmitted}
                onClick={() => onAnswer(question.id, option.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all relative ${
                  isSelected 
                    ? isSubmitted 
                      ? isCorrectOption ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'
                      : 'border-primary-500 bg-primary-50 ring-2 ring-primary-100 font-semibold'
                    : isCorrectOption 
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100' 
                      : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border-2 ${
                    isSelected 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : isCorrectOption 
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-200 text-slate-500 bg-slate-50'
                  }`}>
                    {option.id}
                  </span>
                  <span className={`text-lg ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                    {option.text}
                  </span>
                </div>
                
                {isCorrectOption && <CheckCircle className="text-emerald-500 shrink-0" size={24} />}
                {isWrongOption && <XCircle className="text-red-500 shrink-0" size={24} />}
              </button>
            );
          })
        ) : (
          /* For Part 6: Open Cloze (One word) */
          <div className="mt-4">
            <input
              type="text"
              value={answer || ''}
              disabled={isSubmitted}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              placeholder="Type your answer here..."
              className={`w-full p-5 rounded-2xl border-2 text-xl font-medium outline-none transition-all ${
                isSubmitted 
                  ? isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-red-500 bg-red-50 text-red-900'
                  : 'border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
              }`}
            />
            {isSubmitted && !isCorrect && (
              <div className="mt-3 text-emerald-600 font-bold flex items-center gap-2 px-2">
                <CheckCircle size={18} />
                Correct Answer: {question.correctAnswer}
              </div>
            )}
          </div>
        )}
      </div>

      {isSubmitted && question.explanation && (
        <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-700">
          <div className="flex items-center gap-3 text-blue-700 font-bold mb-3 uppercase tracking-widest text-xs">
            <Info size={16} />
            Explanation
          </div>
          <p className="text-blue-800 leading-relaxed text-lg italic">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
