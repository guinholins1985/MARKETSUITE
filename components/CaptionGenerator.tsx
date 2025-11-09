import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ArrowLeftIcon, SparklesIcon, PencilSquareIcon, ClipboardDocumentIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CaptionGeneratorProps {
  onBack: () => void;
}

const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ onBack }) => {
  const [postDescription, setPostDescription] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Engajado');
  const [numCaptions, setNumCaptions] = useState('3');

  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!postDescription.trim()) {
      setError('Por favor, descreva sobre o que é o seu post.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const prompt = `Aja como um especialista em mídias sociais. Crie ${numCaptions} opções de legendas para um post na plataforma "${platform}".
O tom da legenda deve ser "${tone}".
O post é sobre: "${postDescription}".
As legendas devem ser criativas, incluir emojis relevantes e hashtags populares relacionadas ao conteúdo. Formate a saída em Markdown, com cada legenda numerada e separada por uma linha horizontal (---).`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });
      
      setGeneratedContent(response.text);

    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao gerar as legendas. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    const plainText = generatedContent
      .replace(/###\s\d+\.\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/---/g, '\n\n')
      .replace(/#/g, '');
    navigator.clipboard.writeText(plainText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDisabled = !postDescription.trim() || isLoading;

  const platforms = ["Instagram", "Facebook", "LinkedIn", "TikTok", "Twitter/X"];
  const tones = ["Engajado", "Profissional", "Divertido", "Inspirador", "Vendas"];

  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <PencilSquareIcon className="h-10 w-10 text-amber-400" />
            Gerador de Legendas
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Descreva seu post e deixe a IA criar legendas perfeitas para suas redes sociais.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Column */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-100">1. Detalhes do Post</h3>

          <div>
            <label htmlFor="post-description" className="block text-sm font-medium text-slate-300 mb-2">Sobre o que é o seu post?</label>
            <textarea id="post-description" value={postDescription} onChange={e => setPostDescription(e.target.value)} placeholder="Ex: Lançamento de um novo tênis de corrida, feito com material reciclado e super leve." rows={5} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-2">Plataforma</label>
              <select id="platform" value={platform} onChange={e => setPlatform(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">Tom da Mensagem</label>
              <select id="tone" value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="num-captions" className="block text-sm font-medium text-slate-300 mb-2">Número de Opções</label>
            <input type="range" id="num-captions" min="1" max="5" value={numCaptions} onChange={e => setNumCaptions(e.target.value)} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
            <div className="text-center text-slate-400 text-sm mt-1">{numCaptions} {parseInt(numCaptions) > 1 ? 'opções' : 'opção'}</div>
          </div>


          <button
            onClick={handleGenerate}
            disabled={isDisabled}
            className="w-full mt-2 flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Gerando...
                </>
            ) : (
                <>
                  <SparklesIcon className="h-6 w-6" />
                  Gerar Legendas
                </>
            )}
          </button>
           {error && (
               <div className="text-center text-red-400 p-2 bg-red-900/20 rounded-lg mt-2">
                  <p className="text-sm">{error}</p>
                </div>
            )}
        </div>

        {/* Output Column */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
           <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold text-slate-100">2. Legendas Geradas</h3>
             <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-slate-700 hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!generatedContent || isLoading}>
                {copied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
             </button>
           </div>
           <div className="relative w-full h-[30rem] bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-center text-slate-400">
                <div>
                    <svg className="animate-spin mx-auto h-12 w-12 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="mt-2 animate-pulse">A IA está buscando a inspiração...</p>
                </div>
              </div>
            ) : error ? (
               <div className="flex items-center justify-center h-full text-center text-red-400 p-4">
                  <div>
                      <XCircleIcon className="mx-auto h-12 w-12" />
                      <p className="mt-2 font-semibold">Oops! Algo deu errado.</p>
                      <p className="text-sm">{error}</p>
                  </div>
                </div>
            ) : generatedContent ? (
                <div className="prose prose-invert prose-sm max-w-none h-full overflow-y-auto" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{ __html: generatedContent.replace(/---/g, '<hr class="border-slate-700 my-4">') }}>
                </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-slate-500">
                  <div>
                    <PencilSquareIcon className="mx-auto h-12 w-12" />
                    <p className="mt-2">Suas legendas aparecerão aqui</p>
                  </div>
              </div>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CaptionGenerator;
