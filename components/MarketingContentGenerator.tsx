import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ArrowLeftIcon, SparklesIcon, CloudArrowUpIcon, LinkIcon, ClipboardDocumentIcon, XCircleIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface MarketingContentGeneratorProps {
  onBack: () => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const MarketingContentGenerator: React.FC<MarketingContentGeneratorProps> = ({ onBack }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setUrlInput(''); // Clear other input
      setError(null);
    }
  };
  
  const handleUrlInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(event.target.value);
    if(event.target.value) {
        setImage(null);
        setImageUrl(null);
        setError(null);
    }
  }

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleGenerate = async () => {
    if (!image && !urlInput) {
      setError('Por favor, envie uma imagem ou insira um link.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-pro';

      const parts: ({ text: string } | { inlineData: { data: string, mimeType: string } })[] = [];
      const systemInstruction = 'Você é um copywriter especialista em marketing. Gere conteúdo de marketing persuasivo e de alta conversão. A saída deve ser em português do Brasil e formatada com Markdown (por exemplo, usando títulos, listas e negrito).';
      
      let userPrompt = `Gere um conteúdo de marketing com base na seguinte entrada.`;

      if (image) {
        const base64Data = await blobToBase64(image);
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: image.type,
          },
        });
        userPrompt += " Analise a imagem fornecida.";
      }

      if (urlInput) {
        userPrompt += ` Analise o conteúdo desta URL: ${urlInput}.`;
      }

      if (prompt) {
        userPrompt += `\n\nInstruções adicionais do usuário: "${prompt}"`;
      }
      
      parts.push({ text: userPrompt });

      const response = await ai.models.generateContent({
        model,
        contents: { parts },
        config: {
          systemInstruction,
        }
      });
      
      setGeneratedContent(response.text);

    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao gerar o conteúdo. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if(!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const isDisabled = (!image && !urlInput) || isLoading;

  const renderMarkdown = (text: string) => {
    if (!text) return '';
    const html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/gs, '')
        .replace(/\n/g, '<br />')
        .replace(/<br \s*\/?>\s*<li/g, '<li')
        .replace(/<\/li><br \s*\/?>/g, '</li>')
        .replace(/<\/ul><br \s*\/?>/g, '</ul>');
    return { __html: html };
  };

  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <CpuChipIcon className="h-10 w-10 text-fuchsia-400" />
            Gerador de Conteúdo de Marketing
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Envie uma imagem ou link e a IA criará textos de alta conversão para suas necessidades.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Column */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-100">1. Forneça o Contexto</h3>

          <div 
             className="relative flex flex-col items-center justify-center w-full min-h-[10rem] border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-sky-500 hover:bg-slate-800 transition-colors"
             onClick={triggerFileSelect}
           >
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="max-h-40 max-w-full object-contain rounded-lg"/>
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <CloudArrowUpIcon className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-sm">Arraste e solte uma imagem ou</p>
                  <p className="font-semibold text-sky-400">clique para selecionar</p>
                </div>
              )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          <div className="flex items-center gap-4 text-slate-500">
            <hr className="w-full border-slate-600" />
            <span>OU</span>
            <hr className="w-full border-slate-600" />
          </div>

          <div>
             <label htmlFor="url-input" className="block text-sm font-medium text-slate-300 mb-2">Cole a URL de um produto ou página</label>
             <div className="relative">
                <LinkIcon className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-3 h-5 w-5 text-slate-400" />
                <input
                    id="url-input"
                    type="url"
                    value={urlInput}
                    onChange={handleUrlInputChange}
                    placeholder="https://exemplo.com/produto"
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                 />
             </div>
          </div>

          <div>
            <label htmlFor="prompt-input" className="block text-sm font-medium text-slate-300 mb-2">Instruções Adicionais (Opcional)</label>
            <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Foque no público jovem, use um tom divertido, crie 3 opções de copy para Instagram..."
                rows={4}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isDisabled}
            className="w-full flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gerando Conteúdo...
                </>
            ) : (
                <>
                  <SparklesIcon className="h-6 w-6" />
                  Gerar Conteúdo
                </>
            )}
          </button>
           {error && (
               <div className="text-center text-red-400 p-2 bg-red-900/20 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
            )}
        </div>

        {/* Output Column */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
           <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold text-slate-100">2. Conteúdo Gerado</h3>
             <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-slate-700 hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!generatedContent || isLoading}>
                {copied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
             </button>
           </div>
           <div className="relative w-full h-[30rem] bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-center text-slate-400">
                <div>
                    <svg className="animate-spin mx-auto h-12 w-12 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-2 animate-pulse">A IA está criando algo incrível...</p>
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
                <div 
                  className="prose prose-invert prose-sm max-w-none h-full overflow-y-auto" 
                  dangerouslySetInnerHTML={renderMarkdown(generatedContent)}
                />
            ) : (
              <div className="flex items-center justify-center h-full text-center text-slate-500">
                  <div>
                    <CpuChipIcon className="mx-auto h-12 w-12" />
                    <p className="mt-2">Seu conteúdo de marketing aparecerá aqui</p>
                  </div>
              </div>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingContentGenerator;