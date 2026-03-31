import React from 'react';
import { Trophy, CheckCircle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

const ResultSummary = ({ score, total, questions, answers, onReview }) => {
  const percentage = Math.round((score / total) * 100);
  
  const getFeedback = (pct) => {
    if (pct >= 80) return { title: "Excellent Work!", color: "text-emerald-600", bg: "bg-emerald-50", icon: <Trophy size={48} className="text-emerald-500" /> };
    if (pct >= 60) return { title: "Good Job!", color: "text-primary-600", bg: "bg-primary-50", icon: <Trophy size={48} className="text-primary-400" /> };
    return { title: "Keep Practicing!", color: "text-amber-600", bg: "bg-amber-50", icon: <HelpCircle size={48} className="text-amber-500" /> };
  };

  const feedback = getFeedback(percentage);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl w-full card shadow-2xl p-12 text-center animate-in zoom-in duration-500">
        <div className="mb-8 flex justify-center">{feedback.icon}</div>
        
        <h2 className={`text-4xl font-black mb-2 ${feedback.color}`}>{feedback.title}</h2>
        <p className="text-slate-500 text-lg mb-10 font-medium italic">PET (B1) Preliminary Reading Results</p>
        
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 ring-1 ring-white">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Score</div>
            <div className="text-4xl font-black text-slate-800">{score}<span className="text-slate-300 text-2xl font-medium">/{total}</span></div>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 ring-1 ring-white">
            <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Accuracy</div>
            <div className="text-4xl font-black text-emerald-700">{percentage}%</div>
          </div>
          <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 ring-1 ring-white">
            <div className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">Time spent</div>
            <div className="text-4xl font-black text-primary-700">45:00</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onReview}
            className="btn btn-primary px-10 py-5 text-xl rounded-2xl flex items-center justify-center gap-3 shadow-primary-200"
          >
            Review my answers
            <ArrowRight size={24} />
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-secondary px-10 py-5 text-xl rounded-2xl border-2 border-slate-200 hover:border-slate-300 inline-flex items-center justify-center"
          >
            Retake Test
          </button>
        </div>

        <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-2 gap-8">
           <div className="flex items-center gap-4 text-left p-4 rounded-xl border border-emerald-50 bg-emerald-50/30">
             <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
               <CheckCircle size={24} />
             </div>
             <div>
               <div className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Correct</div>
               <div className="text-2xl font-black text-emerald-800">{score} questions</div>
             </div>
           </div>
           
           <div className="flex items-center gap-4 text-left p-4 rounded-xl border border-red-50 bg-red-50/30">
             <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
               <XCircle size={24} />
             </div>
             <div>
               <div className="text-sm font-bold text-red-700 uppercase tracking-wider">Mistakes</div>
               <div className="text-2xl font-black text-red-800">{total - score} questions</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
