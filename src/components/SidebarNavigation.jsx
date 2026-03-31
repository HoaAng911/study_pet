import React from 'react';
import { CheckCircle2, Bookmark, Circle } from 'lucide-react';

const SidebarNavigation = ({ 
  parts, 
  currentPartId, 
  setCurrentPartId, 
  answers, 
  markedForReview, 
  isSubmitted 
}) => {
  
  const getPartStatus = (part) => {
    const partQuestions = part.questions ? part.questions.map(q => q.id) : [part.id];
    const answeredCount = partQuestions.filter(id => {
      // For writing tests, we check if the answer text length is meaningful (e.g. > 10 chars)
      const ans = answers[id];
      if (part.type === 'email-writing' || part.type === 'story-writing') {
        return ans && ans.trim().length > 10;
      }
      return !!ans;
    }).length;
    
    const isCompleted = answeredCount === partQuestions.length;
    const isMarked = partQuestions.some(id => markedForReview.includes(id));
    
    if (isSubmitted) return 'submitted';
    if (isMarked) return 'review';
    if (isCompleted) return 'completed';
    return 'pending';
  };

  return (
    <aside className="w-80 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 overflow-y-auto sticky top-16 shrink-0 flex flex-col p-4 gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 px-2">Exam Parts</h2>
        <nav className="flex flex-col gap-1">
          {parts.map((part) => {
            const status = getPartStatus(part);
            const isActive = currentPartId === part.id;
            
            return (
              <button
                key={part.id}
                onClick={() => setCurrentPartId(part.id)}
                className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all group ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-semibold border-primary-100 border shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent border'
                }`}
              >
                <div className="flex-1">
                  <div className="text-xs text-slate-400 font-medium group-hover:text-primary-400">
                    {part.id.replace('-', ' ').toUpperCase()}
                  </div>
                  <div className="text-sm truncate font-medium">{part.title}</div>
                </div>
                
                {status === 'completed' && <CheckCircle2 size={18} className="text-emerald-500" />}
                {status === 'review' && <Bookmark size={18} className="text-amber-500 fill-amber-500" />}
                {status === 'pending' && <Circle size={10} className="text-slate-300" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-100 pt-6 px-2">
        <div className="bg-slate-50 p-4 rounded-xl">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Questions Overview</h3>
          <div className="grid grid-cols-5 gap-2">
            {parts.flatMap(p => p.questions || [{ id: p.id, isWriting: true }]).map((q, idx) => {
              const ans = answers[q.id];
              const isAnswered = q.isWriting ? (ans && ans.trim().length > 10) : !!ans;
              const isMarked = markedForReview.includes(q.id);
              
              return (
                <div
                  key={q.id}
                  title={q.isWriting ? `Writing Part ${idx + 1}` : `Question ${idx + 1}`}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                    isSubmitted 
                      ? 'bg-slate-100 text-slate-400' 
                      : isMarked
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : isAnswered
                          ? 'bg-primary-100 text-primary-700 border-primary-200'
                          : 'bg-white text-slate-400 border-slate-200'
                  }`}
                >
                  {q.isWriting ? `W${idx + 1}` : idx + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;
