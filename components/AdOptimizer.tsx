import React from 'react';
import { ArrowLeftIcon, ClockIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface AdOptimizerProps {
  onBack: () => void;
}

const AdOptimizer: React.FC<AdOptimizerProps> = ({ onBack }) => {
  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <AdjustmentsHorizontalIcon className="h-10 w-10 text-lime-400" />
            Otimizador de Anúncios
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-slate-400 sm:text-lg bg-slate-800/50 border border-sky-500/20 rounded-lg p-4 flex items-center justify-center gap-3">
            <ClockIcon className="h-6 w-6 text-sky-400" />
            <span>Esta ferramenta está em desenvolvimento e estará disponível em breve.</span>
        </p>
      </div>
    </div>
  );
};

export default AdOptimizer;