import React, { useState } from 'react';
import { ArrowLeftIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

interface PixReceiptGeneratorProps {
  onBack: () => void;
}

const PixReceiptGenerator: React.FC<PixReceiptGeneratorProps> = ({ onBack }) => {
  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <DocumentCheckIcon className="h-10 w-10 text-green-400" />
            Gerador de Comprovante PIX
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Preencha os campos manualmente ou use a IA para gerar dados aleatórios e visualizar um modelo de comprovante.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Column */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-100">1. Dados do Comprovante</h3>
          {/* Placeholder for form fields */}
          <div className="text-slate-400 p-8 text-center border-2 border-dashed border-slate-600 rounded-lg">
            <p>Em breve: Formulário para inserir os dados do PIX e botão para gerar dados com IA.</p>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
           <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold text-slate-100">2. Visualização do Comprovante</h3>
           </div>
           <div className="relative w-full min-h-[20rem] bg-slate-900/50 rounded-lg border border-slate-700 p-4 flex items-center justify-center">
             <div className="text-center text-slate-500">
                  <DocumentCheckIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">O comprovante gerado aparecerá aqui</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PixReceiptGenerator;
