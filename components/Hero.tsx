import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="py-20 md:py-28 lg:py-32 text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* Modern Abstract Logo */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            <div className="absolute w-6 h-full bg-gradient-to-b from-sky-400 to-indigo-600 rounded-lg transform -skew-x-12"></div>
            <div className="absolute w-6 h-full bg-gradient-to-t from-sky-400 to-cyan-400 rounded-lg transform skew-x-12 opacity-90 mix-blend-lighten"></div>
        </div>

        {/* Updated Text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
          Market Suite
        </h1>
      </div>
      <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-slate-300">
        Sua central de marketing com Inteligência Artificial. Todas as ferramentas que você precisa para criar anúncios perfeitos e dominar os marketplaces.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="#tools"
          className="inline-block rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Explore as Ferramentas
        </a>
      </div>
    </header>
  );
};

export default Hero;