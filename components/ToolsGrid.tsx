
import React from 'react';
import { Tool } from '../types';

interface ToolsGridProps {
  tools: Tool[];
}

const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-slate-800/80 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-slate-700/80 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/10">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 rounded-lg bg-slate-700 p-3 border border-slate-600 group-hover:border-sky-500 transition-colors">
          {tool.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">{tool.title}</h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">{tool.category}</span>
        </div>
      </div>
      <p className="mt-4 text-slate-400 text-sm leading-relaxed">
        {tool.description}
      </p>
       <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-all duration-300 [background:radial-gradient(400px_at_50%_50%,_rgba(56,189,248,0.2),_transparent_80%)] group-hover:opacity-100"></div>
    </div>
  );
};

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools }) => {
  return (
    <section id="tools" className="py-12 md:py-20">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">Um Ecossistema Completo de Ferramentas</h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Do design à estratégia, tudo que você precisa para se destacar.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default ToolsGrid;
