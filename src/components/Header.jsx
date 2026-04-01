import React from 'react';
import { Timer, Send, LayoutList, Menu, ChevronRight, Zap } from 'lucide-react';
import { testList } from '../data';

const Header = ({ timeLeft, isSubmitted, onSubmit, activeTestId, onTestChange, onToggleSidebar, totalQuestions, answeredCount }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-2xl z-[100] border-b border-emerald-500/10 px-4 sm:px-8 flex flex-col justify-center transition-all duration-500 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={onToggleSidebar}
            className="p-2.5 text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-xl lg:hidden transition-all"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3 group/logo cursor-pointer px-4 py-2 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] transform group-hover/logo:rotate-12 transition-transform">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-black text-white tracking-tight leading-none">ELITE</h1>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em] mt-1">PET Mastery</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-white/5 rounded-2xl px-4 py-2 hover:bg-slate-800 transition-all group max-w-[200px] lg:max-w-none shadow-xl">
            <LayoutList size={16} className="text-emerald-500" />
            <select 
              value={activeTestId}
              onChange={(e) => onTestChange(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-bold text-slate-300 cursor-pointer w-full focus:text-emerald-400"
            >
              {testList.map((categoryGroup) => (
                <optgroup key={categoryGroup.category} label={categoryGroup.category} className="bg-slate-900 text-slate-400">
                  {categoryGroup.tests.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {!isSubmitted && (
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-mono text-base sm:text-xl font-black border transition-all duration-500 shadow-sm ${
              isLowTime ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse' : 'bg-slate-900 text-emerald-400 border-emerald-500/10'
            }`}>
              <Timer size={18} className={isLowTime ? 'text-red-500' : 'text-emerald-500'} />
              {formatTime(timeLeft)}
            </div>
          )}

          <button
            onClick={onSubmit}
            disabled={isSubmitted}
            className={`btn-premium flex items-center gap-2 px-6 sm:px-8 !py-3 ${
              isSubmitted ? 'opacity-50 grayscale !bg-slate-800' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
            }`}
          >
            {isSubmitted ? 'View Detail' : (
              <>
                <span className="hidden sm:inline">Submit Test</span>
                <Send size={16} className="sm:hidden" />
                <ChevronRight size={18} className="hidden sm:block" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modern Progress Bar - Emerald Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
};

export default Header;
