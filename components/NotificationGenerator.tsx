import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ArrowLeftIcon, SparklesIcon, BellIcon, ClipboardDocumentIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface NotificationGeneratorProps {
  onBack: () => void;
}

const NotificationGenerator: React.FC<NotificationGeneratorProps> = ({ onBack }) => {
  const [notificationType, setNotificationType] = useState('Venda Aprovada');
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [value, setValue] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [tone, setTone] = useState('Profissional');
  
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!customerName || !productName || !value) {
      setError('Por favor, preencha os campos obrigatórios: Nome do Cliente, Nome do Produto e Valor.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const prompt = `Crie uma notificação de transação do tipo "${notificationType}" para o cliente "${customerName}".
O produto é "${productName}" no valor de R$${value}.
O tom da mensagem deve ser "${tone}".
${additionalInfo ? `Informações adicionais a serem incluídas: "${additionalInfo}".` : ''}
A notificação deve ser concisa, clara e objetiva, adequada para ser enviada por WhatsApp ou SMS. Não inclua saudações genéricas como "Olá," no início, comece direto com o nome do cliente se necessário ou a informação principal.`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt
      });
      
      setGeneratedContent(response.text);

    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao gerar a notificação. Verifique o console para mais detalhes.');
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

  const isDisabled = !customerName || !productName || !value || isLoading;

  const notificationTypes = ["Venda Aprovada", "Pix Recebido", "Boleto Gerado", "Produto Enviado", "Entrega Realizada", "Reembolso Solicitado"];
  const tones = ["Profissional", "Amigável", "Entusiasmado", "Urgente"];

  return (
    <div className="py-12 md:py-20 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group">
        <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <BellIcon className="h-10 w-10 text-yellow-400" />
            Gerador de Notificações
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-slate-400 sm:text-lg">
          Crie e personalize alertas de transações com um design profissional e tom de voz customizado.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Column */}
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-100">1. Detalhes da Notificação</h3>

          <div>
            <label htmlFor="notification-type" className="block text-sm font-medium text-slate-300 mb-2">Tipo de Notificação</label>
            <select id="notification-type" value={notificationType} onChange={e => setNotificationType(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
              {notificationTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="customer-name" className="block text-sm font-medium text-slate-300 mb-2">Nome do Cliente</label>
            <input id="customer-name" type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Ex: João da Silva" className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
          </div>
          
          <div>
            <label htmlFor="product-name" className="block text-sm font-medium text-slate-300 mb-2">Nome do Produto</label>
            <input id="product-name" type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Ex: Tênis de Corrida XYZ" className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium text-slate-300 mb-2">Valor (R$)</label>
            <input id="value" type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Ex: 199,90" className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
          </div>

          <div>
            <label htmlFor="additional-info" className="block text-sm font-medium text-slate-300 mb-2">Informações Adicionais (Opcional)</label>
            <textarea id="additional-info" value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} placeholder="Ex: Cód. de Rastreio: BR123XYZ" rows={3} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">Tom da Mensagem</label>
            <select id="tone" value={tone} onChange={e => setTone(e.target.value)} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
              {tones.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isDisabled}
            className="w-full mt-2 flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gerando...
                </>
            ) : (
                <>
                  <SparklesIcon className="h-6 w-6" />
                  Gerar Notificação
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
             <h3 className="text-xl font-bold text-slate-100">2. Notificação Gerada</h3>
             <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-slate-700 hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!generatedContent || isLoading}>
                {copied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
             </button>
           </div>
           <div className="relative w-full min-h-[20rem] bg-slate-900/50 rounded-lg border border-slate-700 p-4 flex items-center justify-center">
            {isLoading ? (
              <div className="text-center text-slate-400">
                <svg className="animate-spin mx-auto h-12 w-12 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 animate-pulse">A IA está criando a notificação...</p>
              </div>
            ) : error ? (
               <div className="text-center text-red-400 p-4">
                  <XCircleIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-semibold">Oops! Algo deu errado.</p>
                  <p className="text-sm">{error}</p>
                </div>
            ) : generatedContent ? (
                <div className="text-slate-200 text-left w-full h-full overflow-y-auto" style={{whiteSpace: 'pre-wrap'}}>
                  {generatedContent}
                </div>
            ) : (
              <div className="text-center text-slate-500">
                  <BellIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">Sua notificação aparecerá aqui</p>
              </div>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationGenerator;