import React, { useEffect } from 'react';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface TranslatorProps {
  onBack: () => void;
}

const Translator: React.FC<TranslatorProps> = ({ onBack }) => {
  useEffect(() => {
    const redirectUrl = 'https://tradutor-nine.vercel.app/';
    window.open(redirectUrl, '_blank');
    onBack();
  }, [onBack]);

  return (
    <div className="py-12 md:py-20 animate-fade-in flex items-center justify-center min-h-[300px]">
        <div className="text-center">
            <svg className="animate-spin mx-auto h-12 w-12 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center justify-center gap-3 mt-4">
                <LanguageIcon className="h-8 w-8 text-cyan-400" />
                Redirecionando
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
                Abrindo o Tradutor em uma nova aba...
            </p>
        </div>
    </div>
  );
};

export default Translator;