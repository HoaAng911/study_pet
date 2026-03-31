import React, { useState, useEffect } from 'react';
import { PenTool, Info, MessageSquare, AlertCircle } from 'lucide-react';

const WritingForm = ({ part, answer, onAnswer, isSubmitted }) => {
  const [wordCount, setWordCount] = useState(0);
  
  // Tính word count
  useEffect(() => {
    if (answer) {
      const words = answer.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [answer]);

  // Khuyến nghị word count (bài tập B1 PET thường yêu cầu khoảng 100 words)
  const targetWords = 100;
  const isTooShort = wordCount > 0 && wordCount < 80;
  const isGoodLength = wordCount >= 80 && wordCount <= 130;
  const isTooLong = wordCount > 130;

  const getWordCountColor = () => {
    if (wordCount === 0) return 'text-slate-400';
    if (isGoodLength) return 'text-emerald-600 font-bold';
    if (isTooShort) return 'text-amber-500 font-bold';
    return 'text-red-500 font-bold'; // Quá dài
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="p-6 bg-slate-50 border-b border-slate-200 sticky top-0 z-10 flex flex-col gap-4">
        {/* Hướng dẫn đề bài */}
        <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <Info className="text-blue-500 shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-sm font-black uppercase text-blue-900 tracking-wider mb-1">
              Instructions
            </h3>
            <p className="text-blue-800 text-lg leading-relaxed font-medium">
              {part.instruction}
            </p>
          </div>
        </div>

        {/* Nội dung đề bài: Email */}
        {part.type === 'email-writing' && part.email && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 p-4 border-b border-slate-200 grid grid-cols-[80px_1fr] gap-2 items-center text-sm">
              <span className="font-semibold text-slate-500 text-right uppercase text-xs tracking-wider">From:</span>
              <span className="font-semibold text-slate-900">{part.email.from}</span>
              <span className="font-semibold text-slate-500 text-right uppercase text-xs tracking-wider">Subject:</span>
              <span className="font-bold text-slate-900">{part.email.subject}</span>
            </div>
            <div className="p-6 space-y-4 font-serif text-lg leading-relaxed text-slate-800">
              {part.email.contentBlocks.map((block, idx) => (
                <div key={idx} className="relative group">
                  <span>{block.text}</span>
                  {block.note && (
                    <div className="mt-2 md:absolute md:-right-4 md:top-1/2 md:-translate-y-1/2 md:translate-x-full min-w-[120px]">
                      <div className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-amber-300 shadow-sm inline-flex items-center gap-2 transform transition-transform group-hover:scale-105">
                        <MessageSquare size={14} />
                        {block.note}
                      </div>
                      {/* Line connector for larger screens */}
                      <div className="hidden md:block absolute top-1/2 -left-6 w-5 h-0.5 bg-amber-300 -translate-y-1/2"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nội dung đề bài: Story */}
        {part.type === 'story-writing' && part.promptSentence && (
          <div className="p-6 bg-slate-100 rounded-xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Begin your story with:</h4>
            <div className="text-2xl font-serif italic text-slate-900 font-medium">
              "{part.promptSentence}"
            </div>
          </div>
        )}
      </div>

      {/* Khu vực soạn thảo (Text area) */}
      <div className="flex-1 p-6 flex flex-col relative bg-slate-50/50">
        <label htmlFor={`textarea-${part.id}`} className="flex items-center gap-2 text-slate-700 font-bold mb-3 uppercase tracking-widest text-sm">
          <PenTool size={18} />
          Your Response
        </label>
        
        <textarea
          id={`textarea-${part.id}`}
          value={answer || ''}
          onChange={(e) => onAnswer(e.target.value)}
          disabled={isSubmitted}
          placeholder="Start typing your answer here..."
          className={`flex-1 w-full p-6 text-lg bg-white rounded-2xl resize-none outline-none transition-all ${
            isSubmitted 
              ? 'border-slate-200 text-slate-600 bg-slate-100 cursor-not-allowed'
              : 'border-2 border-slate-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
          }`}
        />

        {/* Status Bar */}
        <div className={`flex items-center justify-between mt-4 px-4 py-3 rounded-xl border ${
          isSubmitted ? 'bg-slate-100 border-slate-200' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <span className="text-slate-500 uppercase tracking-widest text-xs">Word Count:</span>
            <span className={`text-xl font-black ${getWordCountColor()}`}>
              {wordCount}
            </span>
            <span className="text-slate-400">/ ~{targetWords} words</span>
          </div>
          
          {wordCount > 0 && !isSubmitted && (
            <div className="hidden sm:flex items-center gap-2">
              {isTooShort && (
                <span className="text-amber-500 flex items-center gap-1.5 text-sm font-medium">
                  <AlertCircle size={16} /> A bit too short
                </span>
              )}
              {isGoodLength && (
                <span className="text-emerald-500 flex items-center gap-1.5 text-sm font-medium">
                  <AlertCircle size={16} /> Good length!
                </span>
              )}
              {isTooLong && (
                <span className="text-red-500 flex items-center gap-1.5 text-sm font-medium">
                  <AlertCircle size={16} /> Might be too long
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingForm;
