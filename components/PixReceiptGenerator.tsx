import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { ArrowLeftIcon, DocumentCheckIcon, SparklesIcon, ArrowDownTrayIcon, XCircleIcon } from '@heroicons/react/24/outline';

// html2canvas is loaded from a script tag in index.html
declare const html2canvas: any;

interface ReceiptData {
  institution: string;
  dateTime: string;
  transactionId: string;
  value: string;
  senderName: string;
  senderCpf: string;
  senderInstitution: string;
  senderAgency: string;
  senderAccount: string;
  receiverName: string;
  receiverCpf: string;
  receiverInstitution: string;
}

const PixReceiptGenerator: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
  const [formData, setFormData] = useState<ReceiptData>({
    institution: 'Banco Exemplo S.A.',
    dateTime: new Date().toLocaleString('pt-BR'),
    transactionId: 'E12345678202401011200ABCDEF12345',
    value: '199,90',
    senderName: 'João da Silva',
    senderCpf: '***.123.456-**',
    senderInstitution: 'Instituição Exemplo Pagamentos',
    senderAgency: '0001',
    senderAccount: '12345-6',
    receiverName: 'Maria Oliveira',
    receiverCpf: '***.789.012-**',
    receiverInstitution: 'Banco Exemplo S.A.',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateRandomData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const responseSchema = {
        type: Type.OBJECT,
        properties: {
            institution: { type: Type.STRING, description: 'Nome de um banco digital brasileiro conhecido.' },
            transactionId: { type: Type.STRING, description: 'Um ID de transação PIX realista e alfanumérico.' },
            value: { type: Type.STRING, description: 'Um valor monetário entre 50,00 e 500,00, formatado como 123,45' },
            senderName: { type: Type.STRING, description: 'Nome completo de uma pessoa brasileira.' },
            senderCpf: { type: Type.STRING, description: 'CPF formatado realisticamente, como ***.123.456-**' },
            senderInstitution: { type: Type.STRING, description: 'Nome de um banco ou fintech brasileiro para o remetente.' },
            senderAgency: { type: Type.STRING, description: 'Número de agência com 4 dígitos.' },
            senderAccount: { type: Type.STRING, description: 'Número de conta no formato 12345-6.' },
            receiverName: { type: Type.STRING, description: 'Nome completo de outra pessoa brasileira.' },
            receiverCpf: { type: Type.STRING, description: 'CPF formatado realisticamente para o destinatário, como ***.789.012-**' },
            receiverInstitution: { type: Type.STRING, description: 'Nome de um banco brasileiro para o destinatário.' },
        },
        required: ["institution", "transactionId", "value", "senderName", "senderCpf", "senderInstitution", "senderAgency", "senderAccount", "receiverName", "receiverCpf", "receiverInstitution"],
      };
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Gere dados aleatórios e realistas para um comprovante de transação PIX no Brasil, seguindo o schema fornecido.",
        config: {
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      const jsonData = JSON.parse(response.text.trim());
      setFormData({
        ...jsonData,
        dateTime: new Date().toLocaleString('pt-BR'),
      });

    } catch (e) {
      console.error(e);
      setError('Falha ao gerar dados com a IA. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current, {
        backgroundColor: '#1e293b', // bg-slate-800
        scale: 2,
      }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = 'comprovante-pix.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
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
          <h3 className="text-xl font-bold text-slate-100 mb-2">1. Dados da Transação</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {Object.keys(formData).map((key) => {
                  const labels: Record<string, string> = {
                      institution: 'Instituição', dateTime: 'Data/Hora', transactionId: 'ID da Transação', value: 'Valor (R$)', senderName: 'Nome Remetente', senderCpf: 'CPF Remetente', senderInstitution: 'Instituição Remetente', senderAgency: 'Agência Remetente', senderAccount: 'Conta Remetente', receiverName: 'Nome Destinatário', receiverCpf: 'CPF Destinatário', receiverInstitution: 'Instituição Destinatário',
                  };
                  return (
                      <div key={key} className={['transactionId'].includes(key) ? 'sm:col-span-2' : ''}>
                          <label htmlFor={key} className="block text-sm font-medium text-slate-300 mb-1">{labels[key]}</label>
                          <input id={key} name={key} type="text" value={formData[key as keyof ReceiptData]} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                      </div>
                  )
              })}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button onClick={handleGenerateRandomData} disabled={isLoading} className="w-full flex items-center justify-center gap-3 rounded-lg bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100">
               {isLoading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <SparklesIcon className="h-6 w-6" />}
              {isLoading ? 'Gerando...' : 'Gerar com IA'}
            </button>
            <button onClick={handleDownload} className="w-full flex items-center justify-center gap-3 rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-600 focus:outline-none">
              <ArrowDownTrayIcon className="h-6 w-6" />
              Baixar Comprovante
            </button>
          </div>
          {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
        </div>

        {/* Output Column */}
        <div className="p-4 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-100 mb-4 text-center">2. Visualização</h3>
          <div ref={receiptRef} className="bg-slate-800 p-6 rounded-lg text-white max-w-md mx-auto font-mono">
            <div className="text-center mb-6">
              <h4 className="font-bold text-lg">{formData.institution}</h4>
              <p className="text-sm text-slate-400">Comprovante de Pagamento PIX</p>
            </div>
            <div className="border-t border-b border-dashed border-slate-600 py-4 mb-4">
              <p className="text-sm text-slate-400">Data e Hora</p>
              <p className="font-bold">{formData.dateTime}</p>
              <p className="text-sm text-slate-400 mt-2">ID da Transação</p>
              <p className="font-bold text-xs break-words">{formData.transactionId}</p>
            </div>
            <div className="text-center bg-slate-700/50 py-4 px-2 rounded-lg mb-6">
              <p className="text-slate-300">Valor Pago</p>
              <p className="text-3xl font-extrabold text-green-400">R$ {formData.value}</p>
            </div>
            <div className="space-y-4 text-sm">
              <div className="bg-slate-900/50 p-3 rounded">
                <p className="text-slate-400 font-semibold mb-1">Para</p>
                <p className="font-bold">{formData.receiverName}</p>
                <p>CPF: {formData.receiverCpf}</p>
                <p>Instituição: {formData.receiverInstitution}</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded">
                <p className="text-slate-400 font-semibold mb-1">De</p>
                <p className="font-bold">{formData.senderName}</p>
                <p>CPF: {formData.senderCpf}</p>
                <p>Instituição: {formData.senderInstitution}</p>
                <p>Ag: {formData.senderAgency} | CC: {formData.senderAccount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixReceiptGenerator;