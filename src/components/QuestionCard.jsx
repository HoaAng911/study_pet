import React from 'react';
import { Bookmark, BookmarkCheck, CheckCircle, XCircle, HelpCircle, Terminal } from 'lucide-react';

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
  
  return (
    <div className={`card-premium relative group animate-glow-in ${
      isCorrect ? 'ring-2 ring-emerald-500 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.1)]' :
      isWrong ? 'ring-2 ring-red-500 bg-red-500/5 shadow-[0_0_40px_rgba(239,68,68,0.1)]' :
      isMarked ? 'bg-amber-500/5 border-amber-500/20 ring-1 ring-amber-500/10' : ''
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm tracking-tight transition-all duration-300 ${
              isCorrect ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.8)]' :
              isWrong ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.8)]' :
              'bg-white text-slate-900 shadow-xl'
            }`}>
              {index + 1}
            </span>
            <div className="w-1 h-8 bg-slate-800 rounded-full" />
          </div>
          <div className="pt-1">
            <h3 className="font-outfit font-bold text-white text-lg sm:text-2xl leading-[1.4] pr-8">
              {question.text}
            </h3>
          </div>
        </div>
        
        {!isSubmitted && (
          <button 
            onClick={onToggleMark}
            className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isMarked ? 'text-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'text-slate-600 hover:bg-white/5 hover:text-slate-400'
            }`}
          >
            {isMarked ? <BookmarkCheck fill="currentColor" size={22} /> : <Bookmark size={22} />}
          </button>
        )}
      </div>

      <div className="space-y-4 mt-2">
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
                className={`w-full group/opt flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 relative ${
                  isSelected 
                    ? isSubmitted 
                      ? isCorrectOption ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500 bg-red-500/10'
                      : 'border-emerald-500 bg-emerald-500/10 ring-4 ring-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : isCorrectOption 
                      ? 'border-emerald-500 bg-emerald-500/20 ring-4 ring-emerald-500/5' 
                      : 'border-white/5 bg-slate-950/40 hover:border-emerald-500/30 hover:bg-slate-900 transition-all'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-[15px] flex items-center justify-center font-black text-base border-2 transition-transform duration-300 group-hover/opt:scale-110 ${
                    isSelected 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                      : isCorrectOption 
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-800 text-slate-500 bg-slate-900 group-hover/opt:border-emerald-500/40'
                  }`}>
                    {option.id}
                  </span>
                  <span className={`text-base sm:text-xl font-bold transition-colors duration-300 ${isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover/opt:text-slate-200'}`}>
                    {option.text}
                  </span>
                </div>
                
                <div className="transition-all duration-500 transform scale-0 group-data-[selected=true]:scale-100">
                  {isCorrectOption && <CheckCircle className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" size={26} />}
                  {isWrongOption && <XCircle className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" size={26} />}
                </div>
              </button>
            );
          })
        ) : (
          <div className="mt-4 group/input bg-slate-950 rounded-[28px] overflow-hidden border-2 border-white/5 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all">
            <input
              type="text"
              value={answer || ''}
              disabled={isSubmitted}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              placeholder="System Input..."
              className={`w-full p-6 bg-transparent text-xl font-bold font-mono outline-none transition-all duration-300 ${
                isSubmitted 
                  ? isCorrect ? 'text-emerald-500' : 'text-red-500'
                  : 'text-emerald-400 placeholder:text-slate-800'
              }`}
            />
            {isSubmitted && !isCorrect && (
              <div className="p-4 bg-emerald-500/5 text-emerald-400 font-bold flex items-center gap-2 border-t border-emerald-500/20">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-50">Mastery Data:</span>
                <span className="uppercase text-xl ml-1">{question.correctAnswer}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {isSubmitted && question.explanation && (
        <div className="mt-8 p-6 bg-slate-950/80 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 blur-2xl bg-emerald-500 w-24 h-24 rounded-full" />
          <div className="flex items-center gap-3 text-emerald-500 font-black mb-3 uppercase tracking-[0.25em] text-[9px]">
            <Terminal size={14} />
            Execution.Analysis
          </div>
          <p className="text-slate-400 leading-relaxed font-bold text-base sm:text-lg italic opacity-80">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
