import React from 'react';
import { Trophy, ArrowRight, Activity, Cpu, ShieldCheck, HelpCircle } from 'lucide-react';

const ResultSummary = ({ score, total, onReview }) => {
  const percentage = Math.round((score / total) * 100);
  
  const getFeedback = (pct) => {
    if (pct >= 80) return { 
        title: "CORE.OPTIMIZED", 
        color: "from-emerald-600 to-teal-400", 
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        message: "System integrity at 100%. Master level proficiency detected. B1 Preliminary Cleared.",
        icon: <Trophy size={64} className="text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" /> 
    };
    if (pct >= 60) return { 
        title: "STABLE.OUTPUT", 
        color: "from-emerald-800 to-emerald-600", 
        text: "text-emerald-600",
        bg: "bg-emerald-800/10",
        message: "Operational efficiency confirmed. Most nodes validated. Minor recalibration required.",
        icon: <Activity size={64} className="text-emerald-600 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" /> 
    };
    return { 
        title: "CALIBRATION.NEEDED", 
        color: "from-amber-600 to-orange-500", 
        text: "text-amber-500",
        bg: "bg-amber-500/10",
        message: "Input data insufficient for mastery. Recommend repeated execution of core modules.",
        icon: <HelpCircle size={64} className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" /> 
    };
  };

  const feedback = getFeedback(percentage);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-12 bg-slate-950 relative overflow-hidden animate-glow-in">
      {/* Decorative Matrix-like background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-3xl rounded-full -ml-44 -mt-44 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 blur-3xl rounded-full -mr-44 -mb-44 pointer-events-none" />
      
      <div className="max-w-4xl w-full flex flex-col gap-12 z-10">
        <div className="bg-slate-900 rounded-[56px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] p-8 sm:p-20 text-center border border-white/5 relative overflow-hidden group">
          <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${feedback.color} shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000`} />
          
          <div className={`mb-12 w-32 h-32 ${feedback.bg} mx-auto rounded-[40px] flex items-center justify-center border border-white/5 shadow-inner transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6`}>
              {feedback.icon}
          </div>
          
          <div className="mb-4">
             <span className="text-[10px] font-black uppercase text-emerald-500/50 tracking-[0.4em] mb-2 block">Performance Protocol</span>
             <h2 className={`text-4xl sm:text-7xl font-black mb-6 font-outfit tracking-tighter text-white uppercase`}>{feedback.title}</h2>
          </div>
          
          <p className={`text-lg sm:text-2xl font-bold mb-16 max-w-lg mx-auto ${feedback.text} opacity-80 font-mono italic leading-relaxed`}>
             "{feedback.message}"
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-950/60 rounded-[32px] p-10 border border-white/5 transition-all hover:bg-slate-950 hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
              <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">NODE.LOAD</div>
              <div className="text-4xl sm:text-6xl font-black text-white font-outfit">{score}<span className="text-slate-700 text-2xl font-medium">/{total}</span></div>
            </div>
            <div className="bg-slate-950/60 rounded-[32px] p-10 border border-white/5 transition-all hover:bg-slate-950 hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
              <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">ACCURACY.RATIO</div>
              <div className="text-4xl sm:text-6xl font-black text-emerald-400 font-outfit">{percentage}%</div>
            </div>
            <div className="bg-slate-950/60 rounded-[32px] p-10 border border-white/5 transition-all hover:bg-slate-950 hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]">
              <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">CORE.STATUS</div>
              <div className={`text-2xl sm:text-3xl font-black font-outfit tracking-widest ${percentage >= 60 ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`}>
                  {percentage >= 60 ? 'VALID' : 'RETRY'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center px-10">
            <button 
              onClick={onReview}
              className="btn-premium px-14 py-6 text-2xl flex items-center justify-center gap-4 w-full sm:w-auto overflow-hidden group/btn !rounded-[24px]"
            >
              Review Insights
              <ArrowRight size={28} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="pt-20 opacity-20 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3 text-xs font-black text-emerald-500 uppercase tracking-[0.2em]">
               <ShieldCheck size={20} />
               Protocol Verified
           </div>
           <div className="flex items-center gap-3 text-xs font-black text-emerald-500 uppercase tracking-[0.2em]">
               <Cpu size={20} />
               System ID: 0xFF-B1-PET
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
