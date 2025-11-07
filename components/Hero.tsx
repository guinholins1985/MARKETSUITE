
import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

const Hero: React.FC = () => {
  return (
    <header className="py-20 md:py-28 lg:py-32 text-center">
      <div className="flex items-center justify-center mb-6">
        <SparklesIcon className="h-8 w-8 text-sky-400 mr-3" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
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
