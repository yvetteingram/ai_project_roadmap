
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-12 text-center">
      <div className="inline-block px-4 py-1.5 mb-5 text-[10px] font-black tracking-[0.3em] text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
        ACTION OVER OVERTHINKING
      </div>
      <h1 className="text-5xl font-black tracking-tighter text-gray-900 sm:text-7xl leading-[0.9] uppercase mb-4">
        AI PROJECT<br/><span className="text-indigo-600">ROADMAP</span>
      </h1>
      <p className="max-w-md mx-auto text-lg text-gray-500 font-medium leading-relaxed">
        Stop spinning your wheels. Get a clear, 10-step path from idea to action in seconds.
      </p>
    </header>
  );
};

export default Header;
