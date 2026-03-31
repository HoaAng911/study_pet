import React from 'react';
import { BookOpen } from 'lucide-react';

const ReadingPassage = ({ part }) => {
  if (!part.passage && part.type !== 'short-messages') return null;

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] bg-slate-50 overflow-y-auto p-8 border-r border-slate-100">
      <div className="max-w-prose mx-auto">
        <div className="flex items-center gap-2 text-primary-600 mb-6 font-semibold uppercase tracking-wider text-sm">
          <BookOpen size={16} />
          Reading Passage
        </div>
        
        <div className="card prose prose-slate max-w-none shadow-xl border-0 p-10 ring-1 ring-slate-100">
          {part.title && (
            <h2 className="text-2xl font-bold text-slate-800 mb-6 leading-tight border-b border-slate-100 pb-4">
              {part.title}: {part.id.replace('-', ' ').toUpperCase()}
            </h2>
          )}
          
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-slate-700 font-serif">
            {part.passage || "Refer to the specific questions for short messages/notices."}
          </div>
          
          {part.type === 'short-messages' && (
            <div className="mt-8 grid gap-4">
              {part.questions.map((q, idx) => (
                <div key={idx} className="bg-amber-50 p-6 rounded-lg border-2 border-amber-100 italic text-slate-700 shadow-sm">
                  <span className="not-italic font-bold text-amber-800 mb-2 block uppercase text-xs tracking-widest">Notice {idx + 1}</span>
                  {q.content || q.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingPassage;
