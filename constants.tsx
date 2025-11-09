import React from 'react';
import { Tool } from './types';
import { CubeTransparentIcon, BeakerIcon, SparklesIcon, PhotoIcon, PencilSquareIcon, AdjustmentsHorizontalIcon, CurrencyDollarIcon, PresentationChartLineIcon, ChatBubbleBottomCenterTextIcon, DocumentTextIcon, TicketIcon, FilmIcon, LightBulbIcon, HeartIcon, HashtagIcon, DocumentDuplicateIcon, DevicePhoneMobileIcon, ShoppingCartIcon, CpuChipIcon, BoltIcon, ScissorsIcon, PaintBrushIcon, SpeakerWaveIcon, BellIcon, DocumentCheckIcon, ArrowPathRoundedSquareIcon, LanguageIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

export const tools: Tool[] = [
  {
    key: "3d-mockup-generator",
    icon: <CubeTransparentIcon className="h-8 w-8 text-sky-400" />,
    title: "Gerador de Mockups 3D",
    description: "Transforme imagens 2D em visualizações 3D ou 360° imersivas e profissionais.",
    category: "Visual & Imagem"
  },
    {
    key: "professional-background-remover",
    icon: <ScissorsIcon className="h-8 w-8 text-teal-400" />,
    title: "Removedor de Fundo Profissional",
    description: "Com a tecnologia do Gemini AI, remova fundos de imagens com um clique.",
    category: "Visual & Imagem"
  },
  {
    key: "profitability-calculator",
    icon: <CurrencyDollarIcon className="h-8 w-8 text-emerald-400" />,
    title: "Calculadora de Lucratividade",
    description: "Simule cenários, compare marketplaces e otimize suas vendas no Brasil.",
    category: "Estratégia & Análise"
  },
  {
    key: "faq-generator",
    icon: <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-violet-400" />,
    title: "Gerador de FAQ",
    description: "Faça upload da imagem de um produto e crie 40 perguntas e respostas frequentes.",
    category: "Conteúdo & Copy"
  },
  {
    key: "caption-generator",
    icon: <PencilSquareIcon className="h-8 w-8 text-amber-400" />,
    title: "Gerador de Legendas",
    description: "Descreva seu post e deixe a IA criar legendas perfeitas para suas redes sociais.",
    category: "Conteúdo & Copy"
  },
  {
    key: "watermark-remover",
    icon: <SparklesIcon className="h-8 w-8 text-rose-400" />,
    title: "Removedor de Marcas D'água",
    description: "Limpe suas imagens com o poder da inteligência artificial para um look profissional.",
    category: "Visual & Imagem"
  },
  {
    key: "policy-generator",
    icon: <DocumentTextIcon className="h-8 w-8 text-cyan-400" />,
    title: "Gerador de Políticas",
    description: "Crie políticas de troca e devolução profissionais para sua loja em segundos.",
    category: "Estratégia & Análise"
  },
  {
    key: "banner-generator",
    icon: <PhotoIcon className="h-8 w-8 text-indigo-400" />,
    title: "Gerador de Banners",
    description: "Crie banners promocionais de alta conversão para marketplaces em segundos.",
    category: "Visual & Imagem"
  },
  {
    key: "marketing-content-generator",
    icon: <CpuChipIcon className="h-8 w-8 text-fuchsia-400" />,
    title: "Gerador de Conteúdo de Marketing",
    description: "Envie uma imagem ou link e a IA criará textos de alta conversão para suas necessidades.",
    category: "Conteúdo & Copy"
  },
  {
    key: "ad-optimizer",
    icon: <AdjustmentsHorizontalIcon className="h-8 w-8 text-lime-400" />,
    title: "Otimizador de Anúncios",
    description: "Cole a URL do seu produto e deixe a IA analisar e criar um anúncio perfeito.",
    category: "Conteúdo & Copy"
  },
  {
    key: "ppc-ad-generator",
    icon: <PresentationChartLineIcon className="h-8 w-8 text-orange-400" />,
    title: "Gerador de Anúncios (PPC)",
    description: "Crie textos de anúncios de alta conversão para Google Ads e Meta Ads.",
    category: "Conteúdo & Copy"
  },
  {
    key: "name-slogan-generator",
    icon: <LightBulbIcon className="h-8 w-8 text-yellow-400" />,
    title: "Gerador de Nomes e Slogans",
    description: "Crie nomes criativos e slogans memoráveis para seus produtos e marcas.",
    category: "Estratégia & Análise"
  },
  {
    key: "post-generator",
    icon: <HashtagIcon className="h-8 w-8 text-teal-400" />,
    title: "Gerador de Posts (Blog/Social)",
    description: "Produza artigos e posts otimizados para SEO e engajamento em múltiplas plataformas.",
    category: "Conteúdo & Copy"
  },
  {
    key: "livestream-script-generator",
    icon: <FilmIcon className="h-8 w-8 text-red-400" />,
    title: "Gerador de Roteiros para Lives",
    description: "Crie scripts detalhados e interativos para suas lives de vendas e lançamentos.",
    category: "Estratégia & Análise"
  },
  {
    key: "meme-generator",
    icon: <HeartIcon className="h-8 w-8 text-pink-400" />,
    title: "Gerador de Memes",
    description: "Transforme imagens em conteúdo viral com humor e criatividade gerados por IA.",
    category: "Visual & Imagem"
  },
  {
    key: "stories-image-generator",
    icon: <DevicePhoneMobileIcon className="h-8 w-8 text-blue-400" />,
    title: "Gerador de Imagens para Stories",
    description: "Crie visuais incríveis para seus stories. Descreva um cenário e deixe a IA fazer a mágica.",
    category: "Visual & Imagem"
  },
  {
    key: "pricing-strategy-generator",
    icon: <BeakerIcon className="h-8 w-8 text-green-400" />,
    title: "Gerador de Estratégias de Preço",
    description: "Simule preços ideais com base em custos, concorrência e demanda sazonal.",
    category: "Estratégia & Análise"
  },
   {
    key: "file-converters",
    icon: <DocumentDuplicateIcon className="h-8 w-8 text-gray-400" />,
    title: "Conversores de Arquivos",
    description: "Converta imagens e arquivos PDF para diversos formatos com facilidade.",
    category: "Utilitários"
  },
   {
    key: "coupon-generator",
    icon: <TicketIcon className="h-8 w-8 text-purple-400" />,
    title: "Gerador de Cupons",
    description: "Crie, gerencie e valide cupons de desconto para suas campanhas de marketing.",
    category: "Utilitários"
  },
  {
    key: "translator",
    icon: <LanguageIcon className="h-8 w-8 text-cyan-400" />,
    title: "Tradutor",
    description: "Traduza textos para diversos idiomas com precisão, com o poder da IA.",
    category: "Utilitários"
  },
  {
    key: "google-shopping-ads",
    icon: <ShoppingCartIcon className="h-8 w-8 text-red-500" />,
    title: "Anúncios Google Shopping",
    description: "Gere e otimize seus anúncios para a plataforma Google Shopping automaticamente.",
    category: "Conteúdo & Copy"
  },
  {
    key: "mental-triggers-generator",
    icon: <BoltIcon className="h-8 w-8 text-yellow-400" />,
    title: "Gerador de Gatilhos Mentais",
    description: "Crie copys persuasivas com o poder da IA. Selecione um gatilho, informe seu produto e veja a mágica acontecer.",
    category: "Conteúdo & Copy"
  },
  {
    key: "visual-variations-generator",
    icon: <PaintBrushIcon className="h-8 w-8 text-purple-400" />,
    title: "Gerador de Variações Visuais com IA",
    description: "Envie uma imagem, descreva a alteração e deixe a IA criar algo novo para você.",
    category: "Visual & Imagem"
  },
  {
    key: "ai-voice-cloner",
    icon: <SpeakerWaveIcon className="h-8 w-8 text-blue-400" />,
    title: "Clonador de Voz AI",
    description: "Forneça um áudio para clonar o estilo da voz e narrar seu texto.",
    category: "Utilitários"
  },
  {
    key: "notification-generator",
    icon: <BellIcon className="h-8 w-8 text-yellow-400" />,
    title: "Gerador de Notificações",
    description: "Crie e personalize alertas de transações com um design profissional.",
    category: "Utilitários"
  },
  {
    key: "pix-receipt-generator",
    icon: <DocumentCheckIcon className="h-8 w-8 text-green-400" />,
    title: "Gerador de Comprovante PIX",
    description: "Preencha os campos manualmente ou use a IA para gerar dados aleatórios e visualizar um modelo de comprovante.",
    category: "Utilitários"
  },
  {
    key: "remarketing-campaign-generator",
    icon: <ArrowPathRoundedSquareIcon className="h-8 w-8 text-blue-400" />,
    title: "Gerador de Campanhas de Remarketing",
    description: "Crie e otimize campanhas de remarketing para reconectar com seu público-alvo e aumentar as conversões.",
    category: "Estratégia & Análise"
  },
  {
    key: "product-bundle-generator",
    icon: <ArchiveBoxIcon className="h-8 w-8 text-cyan-400" />,
    title: "Gerador de Pacotes de Produtos (IA)",
    description: "Crie pacotes e combos de produtos atraentes com a IA para aumentar o ticket médio.",
    category: "Estratégia & Análise"
  }
];