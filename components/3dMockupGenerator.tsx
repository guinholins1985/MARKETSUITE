import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ArrowLeftIcon, CubeTransparentIcon, SparklesIcon, CloudArrowUpIcon, ArrowDownTrayIcon, XCircleIcon, KeyIcon } from '@heroicons/react/24/outline';

// Add type declaration for aistudio to avoid TypeScript errors
// Fix: Replaced inline object type with a named interface `AIStudio` to resolve a global type declaration conflict.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}
declare global {
  interface Window {
    aistudio: AIStudio;
  }
}

interface ThreeDMockupGeneratorProps {
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

const loadingMessages = [
    "Inicializando o motor de renderização...",
    "Analisando a geometria da imagem 2D...",
    "Extrudando pixels para a terceira dimensão...",
    "Aplicando texturas e materiais fotorrealistas...",
    "Configurando a iluminação do estúdio virtual...",
    "Renderizando a rotação de 360 graus, quadro a quadro...",
    "Compilando os quadros em um vídeo de alta definição...",
    "Adicionando os toques finais de polimento...",
    "Quase pronto! Finalizando o seu mockup 3D...",
];

const ThreeDMockupGenerator: React.FC<ThreeDMockupGeneratorProps> = ({ onBack }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
        if(window.aistudio) {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            setApiKeySelected(hasKey);
        }
    };
    checkApiKey();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setLoadingMessage(loadingMessages[0]);
      let messageIndex = 1;
      loadingIntervalRef.current = window.setInterval(() => {
        setLoadingMessage(loadingMessages[messageIndex % loadingMessages.length]);
        messageIndex++;
      }, 4000);
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
    }
    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [isLoading]);

  const handleSelectApiKey = async () => {
      await window.aistudio.openSelectKey();
      // Assume success to avoid race condition and allow immediate use.
      setApiKeySelected(true);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setGeneratedVideoUrl(null);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       setImageFile(file);
       setImagePreview(URL.createObjectURL(file));
       setGeneratedVideoUrl(null);
       setError(null);
    }
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => { event.preventDefault(); event.stopPropagation(); };

  const handleGenerate = async () => {
    if (!imageFile) {
        setError("Por favor, envie uma imagem primeiro.");
        return;
    };

    setIsLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);

    try {
      // Create new instance to ensure the latest API key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = await blobToBase64(imageFile);
      
      const prompt = "Create a 360-degree, slow-spinning product video of the object in this image. The background should be a clean, neutral studio light gray (#f3f4f6). The object should be perfectly centered and well-lit from all angles, simulating a professional product photoshoot. The rotation should be smooth and continuous.";

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
            imageBytes: base64Data,
            mimeType: imageFile.type,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '1:1'
        }
      });

      // Polling for result
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        try {
            operation = await ai.operations.getVideosOperation({operation: operation});
        } catch(e: any) {
             if (e.message.includes("Requested entity was not found.")) {
                // This can indicate an API key issue.
                setApiKeySelected(false);
                throw new Error("Sua chave de API pode ter expirado ou é inválida. Por favor, selecione a chave novamente.");
             }
             throw e; // re-throw other errors
        }
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;

      if (videoUri) {
         const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
         if (!videoResponse.ok) {
            throw new Error(`Falha ao buscar o vídeo: ${videoResponse.statusText}`);
         }
         const videoBlob = await videoResponse.blob();
         setGeneratedVideoUrl(URL.createObjectURL(videoBlob));
      } else {
        throw new Error("A geração do vídeo não retornou um resultado válido.");
      }

    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Ocorreu um erro ao gerar o vídeo. Verifique o console.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (!apiKeySelected) {
        return (
             <div className="flex flex-col items-center justify-center h-96 p-8 text-center rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
                <KeyIcon className="w-16 h-16 text-sky-400 mb-4"/>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">Chave de API Necessária</h3>
                <p className="text-slate-400 max-w-md mb-6">Esta ferramenta utiliza um modelo de geração de vídeo avançado (Veo) que requer que você selecione uma chave de API para habilitar o faturamento.</p>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-sm text-sky-400 hover:underline mb-6">Saiba mais sobre o faturamento</a>
                <button 
                    onClick={handleSelectApiKey}
                    className="flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    <KeyIcon className="h-5 w-5"/>
                    Selecionar Chave de API
                </button>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Input Area */}
            <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100">1. Envie a Imagem do Produto</h3>
              <div 
                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-sky-500 hover:bg-slate-800 transition-colors"
                onClick={triggerFileSelect}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview do Produto" className="max-h-full max-w-full object-contain rounded-lg"/>
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
              
              <button onClick={handleGenerate} disabled={!imageFile || isLoading} className="w-full flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100">
                {isLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <SparklesIcon className="h-6 w-6" />}
                {isLoading ? 'Gerando Mockup...' : 'Gerar Mockup 3D'}
              </button>
            </div>

            {/* Output Area */}
            <div className="flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-slate-100">2. Resultado 360°</h3>
              <div className="flex items-center justify-center w-full aspect-square bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                {isLoading && (
                  <div className="text-center text-slate-400 p-4">
                    <svg className="animate-spin mx-auto h-12 w-12 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="mt-4 font-semibold">{loadingMessage}</p>
                    <p className="text-xs text-slate-500 mt-2">(Este processo pode levar alguns minutos)</p>
                  </div>
                )}
                {error && (
                  <div className="text-center text-red-400 p-4">
                      <XCircleIcon className="mx-auto h-12 w-12" />
                      <p className="mt-2 font-semibold">Oops! Algo deu errado.</p>
                      <p className="text-sm max-w-xs">{error}</p>
                    </div>
                )}
                {!isLoading && !error && generatedVideoUrl && (
                  <video src={generatedVideoUrl} controls autoPlay loop muted className="w-full h-full object-contain" />
                )}
                {!isLoading && !error && !generatedVideoUrl && (
                  <div className="text-center text-slate-500 p-4">
                      <CubeTransparentIcon className="mx-auto h-12 w-12" />
                      <p className="mt-2">Seu mockup 3D/360° aparecerá aqui</p>
                    </div>
                )}
              </div>
                <a href={generatedVideoUrl ?? '#'} download="mockup-3d.mp4" className={`w-full flex items-center justify-center gap-3 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-600 focus:outline-none ${!generatedVideoUrl || isLoading ? 'opacity-50 pointer-events-none' : ''}`} onClick={(e) => !generatedVideoUrl && e.preventDefault()}>
                  <ArrowDownTrayIcon className="h-6 w-6" />
                  Baixar Vídeo
                </a>
            </div>
        </div>
    );
  };
  
  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <CubeTransparentIcon className="h-10 w-10 text-sky-400" />
            Gerador de Mockups 3D
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Transforme imagens 2D em visualizações 3D ou 360° imersivas e profissionais.
        </p>
      </div>

      {renderContent()}

    </div>
  );
};

export default ThreeDMockupGenerator;