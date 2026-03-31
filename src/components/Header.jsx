import React from 'react';
import { Timer, Send, LayoutList } from 'lucide-react';
import { testList } from '../data';

const Header = ({ timeLeft, isSubmitted, onSubmit, activeTestId, onTestChange }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300; // Less than 5 minutes

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold transform hover:rotate-12 transition-transform cursor-pointer">
            PET
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-black text-slate-800 leading-tight uppercase tracking-tight">PET Practice</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">B1 Preliminary</p>
          </div>
        </div>

        {/* Test Selector */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-white hover:shadow-md transition-all group">
          <LayoutList size={18} className="text-slate-400 group-hover:text-primary-600" />
          <select 
            value={activeTestId}
            onChange={(e) => onTestChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 cursor-pointer pr-2"
          >
            {testList.map((categoryGroup) => (
              <optgroup key={categoryGroup.category} label={categoryGroup.category}>
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

      <div className="flex items-center gap-6">
        {!isSubmitted && (
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-lg font-bold border transition-all duration-500 shadow-sm ${
            isLowTime ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-slate-200'
          }`}>
            <Timer size={20} className={isLowTime ? 'text-red-500' : 'text-slate-400'} />
            {formatTime(timeLeft)}
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={isSubmitted}
          className={`btn flex items-center gap-2 font-black uppercase tracking-widest text-xs px-6 py-2.5 rounded-xl transition-all ${
            isSubmitted ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50' : 'btn-primary shadow-lg shadow-primary-200 active:scale-95'
          }`}
        >
          {isSubmitted ? 'Completed' : (
            <>
              <Send size={16} />
              Submit Test
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
