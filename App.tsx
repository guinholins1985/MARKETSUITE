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
    if (activeTool === 'professional-background-remover') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ProfessionalBackgroundRemover onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'marketing-content-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <MarketingContentGenerator onBack={handleBack} />
        </main>
      );
    }
    
    if (activeTool === 'notification-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <NotificationGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'pix-receipt-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <PixReceiptGenerator onBack={handleBack} />
        </main>
      );
    }
    
    if (activeTool === '3d-mockup-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ThreeDMockupGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'visual-variations-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <VisualVariationsGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'caption-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <CaptionGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'coupon-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <CouponGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'post-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <PostGenerator onBack={handleBack} toolKey={activeTool} />
        </main>
      );
    }

    if (activeTool === 'faq-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <PostGenerator onBack={handleBack} toolKey={activeTool} />
        </main>
      );
    }

    if (activeTool === 'banner-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <BannerGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'ppc-ad-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <PpcAdGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'remarketing-campaign-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <RemarketingCampaignGenerator onBack={handleBack} />
        </main>
      );
    }
    
    if (activeTool === 'translator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Translator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'stories-image-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <StoriesImageGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'ad-optimizer') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AdOptimizer onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'mental-triggers-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <MentalTriggersGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'product-bundle-generator') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ProductBundleGenerator onBack={handleBack} />
        </main>
      );
    }

    if (activeTool === 'ai-voice-cloner') {
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AiVoiceCloner onBack={handleBack} />
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
  }

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