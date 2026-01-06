
import React, { useState } from 'react';
import { ChecklistResponse } from '../types';

interface ChecklistResultProps {
  data: ChecklistResponse;
}

const ChecklistResult: React.FC<ChecklistResultProps> = ({ data }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / data.steps.length) * 100;
  const isFinished = completedSteps.size === data.steps.length;

  // Detect if this is the FREE version (no descriptions or actions)
  const isFreeVersion = data.steps.every(
    (s) => (!s.whatItIs || s.whatItIs.trim() === "") && (!s.whereToStart || s.whereToStart.trim() === "")
  );

  return (
    <div className="roadmap-container w-full max-w-xl mx-auto mt-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden pb-12 transition-all">
      {/* Dynamic Progress Header */}
      <div className="px-10 pt-12 pb-8 bg-indigo-600 text-center relative overflow-hidden">
        {isFinished && (
          <div className="absolute inset-0 bg-green-500 transition-colors duration-1000 animate-pulse opacity-20"></div>
        )}
        
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">{data.title}</h2>
          
          <div className="mt-6 space-y-3 no-print">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-black text-indigo-100 uppercase tracking-[0.2em]">
                {isFinished ? 'Mission Accomplished' : 'Current Progress'}
              </span>
              <span className="text-xs font-black text-white bg-indigo-500/50 px-2 py-0.5 rounded-md">
                {completedSteps.size} / {data.steps.length}
              </span>
            </div>
            <div className="w-full h-1.5 bg-indigo-800/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-indigo-100 text-[9px] mt-4 font-black uppercase tracking-[0.2em] opacity-60">
            Frictionless Momentum Path
          </p>
        </div>
      </div>

      <div className="relative px-8 pt-10">
        <div className="absolute left-[3.75rem] top-10 bottom-12 w-0.5 bg-gray-100"></div>
        <div 
          className="absolute left-[3.75rem] top-10 w-0.5 bg-indigo-400 transition-all duration-700 ease-in-out no-print"
          style={{ height: `calc(${progress}% - 2rem)` }}
        ></div>

        <div className="space-y-4">
          {data.steps.map((item, index) => {
            const isDone = completedSteps.has(index);
            const stepNum = index + 1;
            const hasDetails = item.whatItIs && item.whatItIs.trim().length > 0;
            const hasAction = item.whereToStart && item.whereToStart.trim().length > 0;
            
            return (
              <div 
                key={index}
                className={`relative w-full flex items-start text-left gap-8 p-6 rounded-[2rem] transition-all duration-500 ${
                  isDone ? 'opacity-25 grayscale scale-[0.98]' : 'hover:bg-gray-50/50'
                }`}
              >
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <button 
                    onClick={() => toggleStep(index)}
                    className={`no-print w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-base transition-all duration-300 transform ${
                      isDone 
                      ? 'bg-green-500 border-green-500 text-white rotate-[360deg]' 
                      : 'bg-white border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-600 active:scale-90'
                    }`}
                  >
                    {isDone ? (
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </button>
                  <div className="hidden print:flex w-10 h-10 rounded-full border-2 border-indigo-600 items-center justify-center font-black text-indigo-600 bg-white">
                    {stepNum}
                  </div>
                </div>
                
                <div className="flex-grow pt-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black tracking-tight text-gray-900 leading-snug">
                      {item.step}
                    </h3>
                    {isDone && (
                      <span className="no-print text-[8px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded tracking-widest animate-pulse">
                        Done
                      </span>
                    )}
                  </div>
                  
                  {(hasDetails || hasAction) && (
                    <div className="mt-3 space-y-4 animate-in fade-in slide-in-from-top-1 duration-500">
                      {hasDetails && (
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">What this step is:</span>
                          <p className="text-[14px] leading-relaxed text-gray-600 font-medium">
                            {item.whatItIs}
                          </p>
                        </div>
                      )}

                      {hasAction && (
                        <div className="group cursor-pointer" onClick={() => !isDone && toggleStep(index)}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">
                              Where to start:
                            </span>
                          </div>
                          <p className={`text-[15px] leading-relaxed p-5 rounded-2xl border transition-all ${
                            isDone 
                            ? 'bg-gray-50 border-gray-100 text-gray-400' 
                            : 'text-gray-900 bg-green-50/20 border-green-100 font-bold shadow-sm group-hover:bg-green-50 group-hover:border-green-300'
                          }`}>
                            {item.whereToStart}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* FREE Version mandatory CTA line */}
        {isFreeVersion && (
          <div className="mt-12 mb-4 px-6 text-center animate-in fade-in duration-1000">
            <p className="text-gray-400 font-bold text-sm italic leading-relaxed max-w-xs mx-auto">
              To understand what each step means and where to start, unlock the full detailed roadmap.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 px-10 text-center no-print">
        {isFinished ? (
          <div className="p-6 bg-green-50 rounded-3xl border border-green-100 animate-in fade-in zoom-in duration-500">
            <p className="text-green-800 font-black uppercase tracking-widest text-xs mb-1">Momentum Achieved</p>
            <p className="text-green-600 font-bold text-sm">Every marathon begins with single steps. You just took ten.</p>
          </div>
        ) : (
          <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-[9px]">
            Calm progress leads to massive results
          </p>
        )}
      </div>
    </div>
  );
};

export default ChecklistResult;
