import React from 'react';
import { CheckCircle2, Bookmark, Circle, X, LayoutGrid, Target } from 'lucide-react';

const SidebarNavigation = ({ 
  parts, 
  currentPartId, 
  setCurrentPartId, 
  answers, 
  markedForReview, 
  isSubmitted,
  isOpen,
  onClose
}) => {
  
  const getPartStatus = (part) => {
    const partQuestions = part.questions ? part.questions.map(q => q.id) : [part.id];
    const answeredCount = partQuestions.filter(id => {
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
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 z-[110] lg:hidden backdrop-blur-xl transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      <aside className={`fixed lg:sticky top-0 lg:top-0 left-0 h-screen lg:h-[calc(100vh-5rem)] w-72 sm:w-80 bg-slate-900 border-r border-white/5 lg:border-none overflow-y-auto z-[120] lg:z-40 shrink-0 flex flex-col p-6 gap-8 transition-all duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between lg:hidden mb-2">
          <div className="flex items-center gap-2 text-emerald-400 font-black tracking-tight uppercase">
            <LayoutGrid size={20} />
            Command Center
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:bg-white/5 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 px-2 flex items-center gap-2">
            <Target size={12} className="text-emerald-500" />
            Objectives
          </h2>
          <nav className="flex flex-col gap-2">
            {parts.map((part) => {
              const status = getPartStatus(part);
              const isActive = currentPartId === part.id;
              
              return (
                <button
                  key={part.id}
                  onClick={() => setCurrentPartId(part.id)}
                  className={`flex items-center gap-4 w-full p-4 rounded-2xl text-left transition-all duration-300 group relative ${
                    isActive 
                      ? 'bg-slate-800 shadow-[0_0_20px_rgba(16,185,129,0.1)] text-emerald-400 ring-1 ring-emerald-500/20' 
                      : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                  }`}
                >
                  <div className="flex-1">
                    <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${isActive ? 'text-emerald-500' : 'text-slate-500'}`}>
                      {part.id.replace('-', ' ')}
                    </div>
                    <div className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {part.title}
                    </div>
                  </div>
                  
                  <div className="shrink-0 scale-90">
                    {status === 'completed' && <CheckCircle2 size={18} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
                    {status === 'review' && <Bookmark size={18} className="text-amber-500 fill-amber-500/20" />}
                    {status === 'pending' && <Circle size={8} className="text-slate-700" />}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto">
          <div className="bg-slate-950 border border-emerald-500/10 p-6 rounded-3xl shadow-inner group/overview hover:border-emerald-500/30 transition-all">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4 flex items-center justify-between">
              Grid Status
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
            </h3>
            <div className="grid grid-cols-5 gap-2.5">
              {parts.flatMap(p => p.questions || [{ id: p.id, isWriting: true, type: p.type }]).map((q, idx) => {
                const ans = answers[q.id];
                const isAnswered = q.isWriting ? (ans && ans.trim().length > 10) : !!ans;
                const isMarked = markedForReview.includes(q.id);
                
                return (
                  <div
                    key={q.id}
                    title={q.isWriting ? `Writing Part ${idx + 1}` : `Question ${idx + 1}`}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all border-2 ${
                      isSubmitted 
                        ? 'bg-slate-800 text-slate-500 border-transparent' 
                        : isMarked
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                          : isAnswered
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                            : 'bg-slate-950 text-slate-600 border-slate-800 hover:border-emerald-500/30 hover:text-emerald-500'
                    }`}
                  >
                    {q.isWriting ? `W` : idx + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;
