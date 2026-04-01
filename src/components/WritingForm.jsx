import React, { useState, useEffect } from 'react';
import { PenTool, Info, MessageSquare, AlertCircle, Sparkles, Terminal } from 'lucide-react';

const WritingForm = ({ part, answer, onAnswer, isSubmitted }) => {
  const [wordCount, setWordCount] = useState(0);
  
  useEffect(() => {
    if (answer) {
      const words = answer.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [answer]);

  const targetWords = 100;
  const isGoodLength = wordCount >= 80 && wordCount <= 130;
  const isTooShort = wordCount > 0 && wordCount < 80;

  const getWordCountColor = () => {
    if (wordCount === 0) return 'text-slate-800';
    if (isGoodLength) return 'text-emerald-500 font-black drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    if (isTooShort) return 'text-amber-500 font-black';
    return 'text-rose-500 font-black';
  };

  return (
    <div className="flex flex-col h-full bg-transparent p-4 sm:p-10 max-w-4xl w-full mx-auto animate-glow-in relative">
      <div className="bg-slate-900 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col h-full ring-1 ring-emerald-500/5 group hover:border-emerald-500/10 transition-all duration-700">
        <div className="p-8 pb-0 bg-slate-950/20 border-b border-white/5 flex flex-col gap-6">
          <div className="flex items-start gap-4 p-6 bg-slate-950/40 rounded-[32px] border border-white/5 relative group/inst overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 bg-emerald-500 w-16 h-16 rounded-full blur-xl group-hover/inst:opacity-20 transition-all" />
            <div className="w-12 h-12 bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Info size={22} />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase text-emerald-600/60 tracking-[0.3em] mb-2">
                Mission.Briefing
              </h3>
              <p className="text-slate-100 text-lg sm:text-2xl font-bold leading-relaxed font-jakarta">
                {part.instruction}
              </p>
            </div>
          </div>

          {part.type === 'email-writing' && part.email && (
            <div className="bg-slate-950 rounded-[28px] shadow-2xl border border-white/5 mb-6 group/email hover:border-emerald-500/10 transition-all relative">
              <div className="bg-slate-900/50 p-4 px-8 border-b border-white/5 grid grid-cols-[80px_1fr] gap-2 items-center text-xs">
                <span className="font-black text-slate-700 uppercase tracking-widest text-[9px]">Source</span>
                <span className="font-bold text-slate-400 font-mono tracking-tight">{part.email.from}</span>
                <span className="font-black text-slate-700 uppercase tracking-widest text-[9px]">Protocol</span>
                <span className="font-black text-emerald-500 uppercase tracking-widest">{part.email.subject}</span>
              </div>
              <div className="p-9 space-y-4 font-serif text-[20px] leading-[1.8] text-slate-300 relative group-hover/email:text-white transition-colors duration-500">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Sparkles size={120} className="text-emerald-500" />
                </div>
                {part.email.contentBlocks.map((block, idx) => (
                  <div key={idx} className="relative group/note pr-4">
                    <span>{block.text}</span>
                    {block.note && (
                      <div className="mt-4 lg:absolute lg:-right-4 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-full min-w-[160px] z-[130] transition-transform hover:scale-110 duration-300">
                        <div className="bg-emerald-950/80 backdrop-blur-md text-emerald-100 text-[10px] font-black px-5 py-2.5 rounded-2xl border-2 border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.3)] inline-flex items-center gap-2 uppercase tracking-widest leading-none">
                          <MessageSquare size={14} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                          {block.note}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-8 flex flex-col relative bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-3 text-emerald-500/60 font-black uppercase tracking-[0.3em] text-[9px]">
              <PenTool size={16} />
              Module.Terminal_Input
            </label>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all duration-500 ${
                isGoodLength ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-950 text-slate-700 border-white/5'
            }`}>
                {isGoodLength ? 'Core Validated' : 'Processing...'}
            </div>
          </div>
          
          <textarea
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            disabled={isSubmitted}
            placeholder="Awaiting creative input.v2.0.25..."
            className={`flex-1 w-full p-10 text-xl font-bold font-mono leading-relaxed bg-slate-950/40 rounded-[32px] resize-none outline-none transition-all duration-700 border-2 ${
              isSubmitted 
                ? 'text-slate-700 bg-slate-950 grayscale border-transparent'
                : 'border-transparent hover:border-white/5 focus:border-emerald-500/20 focus:bg-slate-950 focus:shadow-[0_0_50px_rgba(16,185,129,0.1)] focus:text-emerald-50 placeholder:text-slate-800'
            }`}
          />

          <div className={`flex flex-col sm:flex-row sm:items-center justify-between mt-10 p-6 sm:p-8 rounded-[40px] border-2 transition-all duration-700 gap-6 ${
            isSubmitted ? 'bg-slate-950 border-white/5 opacity-50' : 'bg-slate-950 border-white/5 group-hover:border-emerald-500/10 shadow-2xl hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]'
          }`}>
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-slate-700 uppercase tracking-widest text-[10px] font-black mb-2 opacity-60">Module.Load</span>
                <div className="flex items-center gap-3">
                  <span className={`text-5xl font-black font-mono transition-all duration-500 ${getWordCountColor()}`}>
                    {wordCount}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-slate-700 font-black text-xs uppercase tracking-widest">Words</span>
                    <span className="text-slate-800 font-bold text-[10px]">/ 100 Opt</span>
                  </div>
                </div>
              </div>
              <div className="w-[1px] h-12 bg-white/5 mx-2" />
              <div className="flex flex-col">
                <span className="text-slate-700 uppercase tracking-widest text-[10px] font-black mb-2 opacity-60">Status</span>
                <div className="flex items-center gap-2">
                   <Terminal size={14} className="text-emerald-500" />
                   <span className="text-white font-black text-lg tracking-widest">MASTER</span>
                </div>
              </div>
            </div>
            
            {wordCount > 0 && !isSubmitted && (
              <div className="flex items-center gap-4 bg-slate-900 p-5 pr-8 rounded-[40px] border border-white/5 shadow-inner">
                <div className={`p-4 rounded-[20px] ${isGoodLength ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-500'}`}>
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h5 className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Stability Check</h5>
                    <p className={`text-base font-black tracking-tight ${isGoodLength ? 'text-emerald-400' : 'text-amber-500'}`}>
                        {isGoodLength ? 'Operational Stability' : isTooShort ? 'Critically Low Detail' : 'Payload Overflow'}
                    </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingForm;
