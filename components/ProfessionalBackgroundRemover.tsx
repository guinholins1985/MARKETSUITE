import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { ArrowLeftIcon, PhotoIcon, SparklesIcon, CloudArrowUpIcon, ArrowDownTrayIcon, XCircleIcon, ScissorsIcon } from '@heroicons/react/24/outline';

interface ProfessionalBackgroundRemoverProps {
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

const ProfessionalBackgroundRemover: React.FC<ProfessionalBackgroundRemoverProps> = ({ onBack }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      setOriginalImage(URL.createObjectURL(file));
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
       setOriginalImage(URL.createObjectURL(file));
       setResultImage(null);
       setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();

  const removeBackground = async () => {
    if (!originalImageFile) return;

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
              text: 'remove the background of this image. The new background should be transparent.',
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
        throw new Error('Não foi possível gerar a imagem. Tente novamente.');
      }
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao remover o fundo. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <ScissorsIcon className="h-10 w-10 text-teal-400" />
            Removedor de Fundo Profissional
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Com a tecnologia do Gemini AI, remova fundos de imagens com um clique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Area */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-100">1. Envie sua Imagem</h3>
           <div 
             className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-sky-500 hover:bg-slate-800 transition-colors"
             onClick={triggerFileSelect}
             onDrop={handleDrop}
             onDragOver={handleDragOver}
           >
              {originalImage ? (
                <img src={originalImage} alt="Original" className="max-h-full max-w-full object-contain rounded-lg"/>
              ) : (
                <div className="text-center text-slate-400">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">Arraste e solte uma imagem aqui</p>
                  <p className="text-sm">ou</p>
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
          
          <button
            onClick={removeBackground}
            disabled={!originalImage || isLoading}
            className="w-full flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
            ) : (
                <>
                  <SparklesIcon className="h-6 w-6" />
                  Remover Fundo
                </>
            )}
          </button>
        </div>

        {/* Output Area */}
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
           <h3 className="text-xl font-bold text-slate-100">2. Resultado</h3>
           <div className="flex items-center justify-center w-full h-64 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
            {isLoading && (
              <div className="text-center text-slate-400">
                <svg className="animate-spin mx-auto h-12 w-12 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 animate-pulse">A mágica está acontecendo...</p>
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
                  <PhotoIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">Seu resultado aparecerá aqui</p>
                </div>
            )}
           </div>
            <a
              href={resultImage ?? '#'}
              download="image-sem-fundo.png"
              className={`w-full flex items-center justify-center gap-3 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${!resultImage || isLoading ? 'opacity-50 pointer-events-none' : ''}`}
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

export default ProfessionalBackgroundRemover;