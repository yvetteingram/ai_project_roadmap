
import React, { useState } from 'react';

interface IdeaInputProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

const IdeaInput: React.FC<IdeaInputProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="idea" className="block text-sm font-bold text-gray-800 ml-1 uppercase tracking-wider">
            Describe your AI project idea in one or two sentences.
          </label>
          <div className="text-[13px] text-gray-400 font-medium ml-1 leading-relaxed italic">
            It can be messy or unclear — that’s okay.
          </div>
          <textarea
            id="idea"
            rows={4}
            className="block w-full rounded-2xl border border-gray-200 bg-white py-5 px-6 text-gray-900 shadow-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 sm:text-lg transition-all placeholder:text-gray-200"
            placeholder="e.g. I want to build a tool that helps lawyers summarize long contracts using AI but I don't know where to start..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`w-full py-5 px-6 text-lg font-black rounded-2xl shadow-sm text-white transition-all transform uppercase tracking-widest
            ${isLoading || !input.trim() 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-indigo-200 shadow-lg'}`}
        >
          {isLoading ? 'Building Your Roadmap...' : 'Get 10-Step Roadmap'}
        </button>
      </form>
    </div>
  );
};

export default IdeaInput;
