
import React, { useState } from 'react';
import Header from './components/Header';
import IdeaInput from './components/IdeaInput';
import ChecklistResult from './components/ChecklistResult';
import { generateChecklist, RoadmapMode } from './services/geminiService';
import { ChecklistResponse, AppStatus } from './types';

declare var html2pdf: any;

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<ChecklistResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentMode, setCurrentMode] = useState<RoadmapMode>('FREE');
  const [lastInput, setLastInput] = useState<string>('');
  
  // Persistent check for free credit usage
  const [hasUsedFreeCredit, setHasUsedFreeCredit] = useState<boolean>(() => {
    return localStorage.getItem('roadmap_credit_used') === 'true';
  });

  const handleGenerate = async (input: string, mode: RoadmapMode = 'FREE') => {
    try {
      setStatus(AppStatus.LOADING);
      setError(null);
      setLastInput(input);
      setCurrentMode(mode);
      
      const data = await generateChecklist(input, mode);
      setResult(data);
      
      if (mode === 'FREE') {
        setHasUsedFreeCredit(true);
        localStorage.setItem('roadmap_credit_used', 'true');
      }
      
      setStatus(AppStatus.SUCCESS);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error("Failed to generate roadmap:", err);
      setError("Something went wrong. Try simplifying your description.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleUpgrade = () => {
    if (lastInput) {
      handleGenerate(lastInput, 'PAID');
    }
  };

  const handleDownloadPDF = async () => {
    if (!result) return;
    
    setIsDownloading(true);
    const element = document.getElementById('roadmap-to-export');
    
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `AI_PROJECT_ROADMAP_${result.title.replace(/\s+/g, '_').toUpperCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Export failed:", err);
      alert("PDF export failed. Try again or check browser permissions.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-gray-900 pb-32">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="no-print">
          <Header />
        </div>
        
        <main className="space-y-8">
          {/* Credit Status Label */}
          {!hasUsedFreeCredit && status === AppStatus.IDLE && (
            <div className="flex justify-center animate-bounce">
              <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-indigo-100">
                1 Free AI Roadmap Remaining
              </span>
            </div>
          )}

          {/* Logic: Refactored to avoid TypeScript narrowing errors by checking LOADING status first */}
          {status === AppStatus.LOADING ? (
            <div className="no-print w-full text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Architecting your path...</p>
            </div>
          ) : !hasUsedFreeCredit ? (
            <div className="no-print">
              <IdeaInput onSubmit={(val) => handleGenerate(val, 'FREE')} isLoading={false} />
            </div>
          ) : (
            <div className="no-print w-full max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className={`bg-white border-2 p-8 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden transition-all duration-500 ${currentMode === 'PAID' ? 'border-yellow-400' : 'border-indigo-600'}`}>
                <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-60 ${currentMode === 'PAID' ? 'bg-yellow-50' : 'bg-indigo-50'}`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 rotate-3 shadow-xl ${currentMode === 'PAID' ? 'bg-yellow-400 shadow-yellow-100' : 'bg-indigo-600 shadow-indigo-100'}`}>
                    {currentMode === 'PAID' ? (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-black mb-3 uppercase tracking-tight text-gray-900 leading-tight">
                    {currentMode === 'PAID' ? 'Pro Roadmap Ready.' : 'Clarity Achieved.'}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                    {currentMode === 'PAID' 
                      ? "Full engine unlocked. You now have the detailed strategy and immediate starting point for all 10 steps of your project." 
                      : "You've generated your free roadmap skeleton. Unlock the Pro version to get the detailed strategy and immediate actions for every single step."
                    }
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className={`group w-full py-4 text-white font-black rounded-2xl transition-all shadow-xl active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-3
                        ${isDownloading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'}`}
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Exporting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>{currentMode === 'PAID' ? 'Download Pro PDF' : 'Download Free PDF'}</span>
                        </>
                      )}
                    </button>
                    
                    {currentMode === 'FREE' && (
                      <button 
                        onClick={handleUpgrade}
                        className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2 group"
                      >
                        <span className="transition-transform group-hover:scale-105">Unlock Pro Engine</span>
                        <svg className="w-4 h-4 text-yellow-400 fill-current animate-pulse" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    )}
                    
                    <button 
                      onClick={() => {
                        localStorage.removeItem('roadmap_credit_used');
                        window.location.reload();
                      }}
                      className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mt-2 hover:text-gray-500 transition-colors"
                    >
                      Reset Credit (Dev Only)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === AppStatus.ERROR && (
            <div className="no-print p-6 bg-red-50 border border-red-100 rounded-[2rem] text-red-800 text-center text-sm font-bold">
              {error}
            </div>
          )}

          <div id="results-section">
            {result && (
              <div id="roadmap-to-export">
                <ChecklistResult data={result} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
