import React, { useState } from 'react';
import { tools } from './constants';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import Footer from './components/Footer';
import ProfessionalBackgroundRemover from './components/ProfessionalBackgroundRemover';
import MarketingContentGenerator from './components/MarketingContentGenerator';
import NotificationGenerator from './components/NotificationGenerator';
import PixReceiptGenerator from './components/PixReceiptGenerator';
import ThreeDMockupGenerator from './components/3dMockupGenerator';
import VisualVariationsGenerator from './components/VisualVariationsGenerator';
import CaptionGenerator from './components/CaptionGenerator';
import CouponGenerator from './components/CouponGenerator';
import PostGenerator from './components/PostGenerator';
import BannerGenerator from './components/BannerGenerator';
import PpcAdGenerator from './components/PpcAdGenerator';
import RemarketingCampaignGenerator from './components/RemarketingCampaignGenerator';
import Translator from './components/Translator';
import StoriesImageGenerator from './components/StoriesImageGenerator';
import AdOptimizer from './components/AdOptimizer';
import MentalTriggersGenerator from './components/MentalTriggersGenerator';
import ProductBundleGenerator from './components/ProductBundleGenerator';
import AiVoiceCloner from './components/AiVoiceCloner';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const implementedTools = [
    'professional-background-remover', 
    'marketing-content-generator', 
    'notification-generator', 
    'pix-receipt-generator',
    '3d-mockup-generator',
    'visual-variations-generator',
    'caption-generator',
    'coupon-generator',
    'post-generator',
    'faq-generator',
    'banner-generator',
    'ppc-ad-generator',
    'remarketing-campaign-generator',
    'translator',
    'stories-image-generator',
    'ad-optimizer',
    'mental-triggers-generator',
    'product-bundle-generator',
    'ai-voice-cloner'
  ];

  const handleToolSelect = (toolKey: string) => {
    if (implementedTools.includes(toolKey)) {
      setActiveTool(toolKey);
    }
  };

  const handleBack = () => {
    setActiveTool(null);
  };
  
  const renderContent = () => {
    const toolComponents: { [key: string]: React.ReactNode } = {
      'professional-background-remover': <ProfessionalBackgroundRemover onBack={handleBack} />,
      'marketing-content-generator': <MarketingContentGenerator onBack={handleBack} />,
      'notification-generator': <NotificationGenerator onBack={handleBack} />,
      'pix-receipt-generator': <PixReceiptGenerator onBack={handleBack} />,
      '3d-mockup-generator': <ThreeDMockupGenerator onBack={handleBack} />,
      'visual-variations-generator': <VisualVariationsGenerator onBack={handleBack} />,
      'caption-generator': <CaptionGenerator onBack={handleBack} />,
      'coupon-generator': <CouponGenerator onBack={handleBack} />,
      'post-generator': <PostGenerator onBack={handleBack} toolKey="post-generator" />,
      'faq-generator': <PostGenerator onBack={handleBack} toolKey="faq-generator" />,
      'banner-generator': <BannerGenerator onBack={handleBack} />,
      'ppc-ad-generator': <PpcAdGenerator onBack={handleBack} />,
      'remarketing-campaign-generator': <RemarketingCampaignGenerator onBack={handleBack} />,
      'translator': <Translator onBack={handleBack} />,
      'stories-image-generator': <StoriesImageGenerator onBack={handleBack} />,
      'ad-optimizer': <AdOptimizer onBack={handleBack} />,
      'mental-triggers-generator': <MentalTriggersGenerator onBack={handleBack} />,
      'product-bundle-generator': <ProductBundleGenerator onBack={handleBack} />,
      'ai-voice-cloner': <AiVoiceCloner onBack={handleBack} />,
    };

    if (activeTool && toolComponents[activeTool]) {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {toolComponents[activeTool]}
        </main>
      );
    }

    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Hero />
        <ToolsGrid tools={tools} onToolSelect={handleToolSelect} />
        <Footer />
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-sky-500/[0.05] -z-1">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent"></div>
      </div>
      {renderContent()}
    </div>
  );
};

export default App;
