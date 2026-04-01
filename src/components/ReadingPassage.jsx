import React from 'react';
import { BookOpen, Command, Cpu } from 'lucide-react';

const ReadingPassage = ({ part }) => {
  if (!part.passage && part.type !== 'short-messages') return null;

  return (
    <div className="w-full lg:flex-1 h-auto lg:h-[calc(100vh-5rem)] bg-slate-950/20 overflow-y-auto p-4 sm:p-10 scroll-smooth custom-scrollbar relative">
      {/* Decorative Matrix-like background elements */}
      <div className="absolute top-0 right-0 p-20 opacity-5 blur-3xl bg-emerald-500 w-64 h-64 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-20 opacity-5 blur-3xl bg-emerald-500 w-64 h-64 rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex items-center gap-3 text-emerald-500/60 mb-8 font-black uppercase tracking-[0.4em] text-[10px] animate-fade-in group">
          <BookOpen size={16} className="group-hover:rotate-12 transition-transform" />
          Data.Archive / {part.id.replace('-', '.')}
          <div className="h-0.5 flex-1 bg-emerald-500/10 ml-4 rounded-full" />
        </div>
        
        <div className="bg-slate-900 rounded-[32px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/5 p-8 sm:p-14 relative overflow-hidden group/card hover:border-emerald-500/10 transition-all duration-700">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -mr-24 -mt-24 group-hover/card:bg-emerald-500/10 transition-all" />
          
          {part.title && (
            <div className="relative mb-14">
              <div className="flex items-center gap-2 mb-2">
                 <Cpu size={14} className="text-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-black text-emerald-600/50 uppercase tracking-widest leading-none">Resource Title</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight font-outfit uppercase tracking-tight">
                {part.title}
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>
          )}
          
          <div className="whitespace-pre-wrap text-[19px] sm:text-[21px] leading-[1.8] text-slate-300 font-serif selection:bg-emerald-500/20 selection:text-emerald-100 first-letter:text-6xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-4 first-letter:float-left first-letter:drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            {part.passage || "System: Refer to the specific queries for snippet-based analysis."}
          </div>
          
          {part.type === 'short-messages' && (
            <div className="mt-14 space-y-8">
              {part.questions.map((q, idx) => (
                <div key={idx} className="bg-slate-950 border border-white/5 p-8 rounded-[32px] italic text-emerald-50/70 shadow-2xl hover:border-emerald-500/20 transition-all duration-500 relative group/snippet">
                  <div className="absolute -left-2 top-10 w-1 h-12 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)] opacity-40 group-hover/snippet:opacity-100 transition-opacity" />
                  <span className="not-italic font-black text-emerald-800 mb-2 block uppercase text-[9px] tracking-[0.3em]">Module.Snippet {idx + 1}</span>
                  <div className="text-xl leading-relaxed font-mono tracking-tight">
                    {q.content || q.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 flex items-center justify-center gap-4 py-8 border-t border-white/5 opacity-10 hover:opacity-50 transition-all duration-700">
           <Command size={20} className="text-emerald-500" />
           <span className="text-xs font-black text-emerald-500 tracking-[0.3em] uppercase italic">Secure Testing Environment.v2025</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingPassage;
