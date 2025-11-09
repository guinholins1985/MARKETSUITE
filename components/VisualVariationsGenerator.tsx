import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { ArrowLeftIcon, SparklesIcon, CloudArrowUpIcon, ArrowDownTrayIcon, XCircleIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

interface VisualVariationsGeneratorProps {
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

const VisualVariationsGenerator: React.FC<VisualVariationsGeneratorProps> = ({ onBack }) => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      setOriginalImagePreview(URL.createObjectURL(file));
      setResultImage(null);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       setOriginalImageFile(file);
       setOriginalImagePreview(URL.createObjectURL(file));
       setResultImage(null);
       setError(null);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => { event.preventDefault(); event.stopPropagation(); };

  const handleGenerate = async () => {
    if (!originalImageFile || !prompt.trim()) {
      setError('Por favor, envie uma imagem e descreva a alteração desejada.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = await blobToBase64(originalImageFile);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: originalImageFile.type,
              },
            },
            {
              text: prompt,
            },
          ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      if (part?.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
        setResultImage(imageUrl);
      } else {
        throw new Error('Não foi possível gerar a variação da imagem. Tente novamente.');
      }
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao gerar a variação. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isButtonDisabled = !originalImageFile || !prompt.trim() || isLoading;

  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <PaintBrushIcon className="h-10 w-10 text-purple-400" />
            Gerador de Variações Visuais com IA
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Envie uma imagem, descreva a alteração e deixe a IA criar algo novo para você.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Area */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-100">1. Envie sua Imagem</h3>
           <div 
             className="relative flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-sky-500 hover:bg-slate-800 transition-colors"
             onClick={triggerFileSelect}
             onDrop={handleDrop}
             onDragOver={handleDragOver}
           >
              {originalImagePreview ? (
                <img src={originalImagePreview} alt="Original" className="max-h-full max-w-full object-contain rounded-lg"/>
              ) : (
                <div className="text-center text-slate-400">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">Arraste e solte uma imagem aqui</p>
                  <p className="text-sm">ou</p>
                  <p className="font-semibold text-sky-400">clique para selecionar</p>
                </div>
              )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" />

          <div>
            <label htmlFor="prompt-input" className="block text-sm font-medium text-slate-300 mb-2">2. Descreva a Alteração</label>
            <textarea
                id="prompt-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Adicione um chapéu de sol na pessoa. Mude a cor do carro para vermelho. Transforme o cenário em um dia de neve."
                rows={3}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isButtonDisabled}
            className="w-full flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Gerando...
                </>
            ) : (
                <>
                  <SparklesIcon className="h-6 w-6" />
                  Gerar Variação
                </>
            )}
          </button>
           {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>

        {/* Output Area */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
           <h3 className="text-xl font-bold text-slate-100">3. Resultado</h3>
           <div className="flex items-center justify-center w-full h-80 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
            {isLoading && (
              <div className="text-center text-slate-400">
                <svg className="animate-spin mx-auto h-12 w-12 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="mt-2 animate-pulse">A IA está reimaginando sua foto...</p>
              </div>
            )}
            {error && (
               <div className="text-center text-red-400 p-4">
                  <XCircleIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-semibold">Oops! Algo deu errado.</p>
                  <p className="text-sm">{error}</p>
                </div>
            )}
            {!isLoading && !error && resultImage && (
              <img src={resultImage} alt="Result" className="max-h-full max-w-full object-contain"/>
            )}
            {!isLoading && !error && !resultImage && (
              <div className="text-center text-slate-500">
                  <PaintBrushIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">Sua variação visual aparecerá aqui</p>
                </div>
            )}
           </div>
            <a
              href={resultImage ?? '#'}
              download="variacao-ia.png"
              className={`w-full flex items-center justify-center gap-3 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-600 focus:outline-none ${!resultImage || isLoading ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={(e) => !resultImage && e.preventDefault()}
            >
              <ArrowDownTrayIcon className="h-6 w-6" />
              Baixar Imagem
            </a>
        </div>
      </div>
    </div>
  );
};

export default VisualVariationsGenerator;
