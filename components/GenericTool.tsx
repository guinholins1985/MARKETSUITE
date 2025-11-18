import React from 'react';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Tool } from '../types';

interface GenericToolProps {
  onBack: () => void;
  tool: Tool;
}

const GenericTool: React.FC<GenericToolProps> = ({ onBack, tool }) => {
  let icon = null;
  if (tool && tool.icon) {
    const originalClassName = (tool.icon as React.ReactElement).props.className || '';
    // Robustly remove old size classes and add new ones
    const newClassName = originalClassName
      .split(' ')
      .filter((cls: string) => !cls.startsWith('h-') && !cls.startsWith('w-'))
      .concat(['h-10', 'w-10'])
      .join(' ');
    icon = React.cloneElement(tool.icon as React.ReactElement, { className: newClassName });
  }

  const title = tool ? tool.title : "Ferramenta";

  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            {icon}
            {title}
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-slate-400 sm:text-lg bg-slate-800/50 border border-sky-500/20 rounded-lg p-4 flex items-center justify-center gap-3">
            <ClockIcon className="h-6 w-6 text-sky-400" />
            <span>Esta ferramenta está em desenvolvimento e estará disponível em breve.</span>
        </p>
      </div>
    </div>
  );
};

export default GenericTool;