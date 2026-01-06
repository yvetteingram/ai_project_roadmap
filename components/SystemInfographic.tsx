
import React from 'react';

export const SystemInfographic: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Newsletter Automation Architecture</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          This model visualizes how the Ketorah AI system integrates human creativity with 
          machine intelligence to scale high-quality digital academy newsletters.
        </p>
      </div>

      <div className="relative">
        {/* Connection Lines (Vertical and Horizontal) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/10 via-blue-500 to-blue-500/10 -translate-y-1/2 z-0"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
          
          {/* Step 1: Planning */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10 hover:border-blue-500 transition-all group">
              <span className="text-3xl group-hover:scale-110 transition-transform">📅</span>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-blue-400 mb-2">1. Strategy</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Select **Monthly Theme** and **Issue Type** (Deep Dive, Blueprint, etc.) in the dashboard.
              </p>
              <div className="mt-4 inline-flex items-center px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[9px] text-slate-500">
                User Defined
              </div>
            </div>
          </div>

          {/* Step 2: Generation */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-blue-600 border-2 border-blue-400 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/30 hover:scale-105 transition-all group">
              <span className="text-3xl group-hover:animate-pulse">✨</span>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-white mb-2">2. AI Synthesis</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                **Gemini 3 Pro** processes strategic prompts to generate long-form educational drafts.
              </p>
              <div className="mt-4 inline-flex items-center px-2 py-1 rounded bg-blue-500/20 border border-blue-500/30 text-[9px] text-blue-400">
                Gemini 3 Pro
              </div>
            </div>
          </div>

          {/* Step 3: Review */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-emerald-500/50 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10 hover:border-emerald-500 transition-all group">
              <span className="text-3xl group-hover:rotate-12 transition-transform">👤</span>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-emerald-400 mb-2">3. Human Filter</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Critical review phase. The expert refines tone, corrects AI hallucinations, and finalize copy.
              </p>
              <div className="mt-4 inline-flex items-center px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400">
                Human-in-the-Loop
              </div>
            </div>
          </div>

          {/* Step 4: Expansion */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-purple-500/50 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/10 hover:border-purple-500 transition-all group">
              <span className="text-3xl group-hover:scale-110 transition-transform">🎨</span>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-purple-400 mb-2">4. Asset Suite</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                **Gemini Flash** generates subject lines, social posts, and video scripts from the final text.
              </p>
              <div className="mt-4 inline-flex items-center px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] text-purple-400">
                Gemini Flash + Image
              </div>
            </div>
          </div>

          {/* Step 5: Distribution */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-orange-600 border-2 border-orange-400 flex items-center justify-center mb-6 shadow-xl shadow-orange-500/30 hover:scale-105 transition-all group">
              <span className="text-3xl group-hover:translate-x-1 transition-transform">🚀</span>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-white mb-2">5. Deployment</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                **Make.com** pushes content to Substack drafts, Google Sheets logs, and Docs archives.
              </p>
              <div className="mt-4 inline-flex items-center px-2 py-1 rounded bg-orange-500/20 border border-orange-500/30 text-[9px] text-orange-400 font-bold">
                Make.com Webhook
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
          <h4 className="text-lg font-bold mb-4 flex items-center">
             <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 text-sm">LLM</span>
             Model Specificity
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-200 block mb-1">Gemini 3 Pro</strong>
                Used for complex reasoning and long-form writing where depth and nuance are required.
              </p>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-200 block mb-1">Gemini 3 Flash</strong>
                Used for high-speed pattern recognition and social asset extraction from core texts.
              </p>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
          <h4 className="text-lg font-bold mb-4 flex items-center">
             <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mr-3 text-sm">API</span>
             Infrastructure Layer
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400"></div>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-200 block mb-1">Make.com Orchestration</strong>
                Acts as the central nervous system, moving data between the AI Engine, Google Stack, and Substack.
              </p>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400"></div>
              <p className="text-xs text-slate-400">
                <strong className="text-slate-200 block mb-1">Webhooks & Listeners</strong>
                The system waits for manual "Approval" triggers before executing final publication logic.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
