import React, { useState } from 'react';
import { tools } from './constants';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import Footer from './components/Footer';
import ProfessionalBackgroundRemover from './components/ProfessionalBackgroundRemover';
import { Tool } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleToolSelect = (toolKey: string) => {
    if (toolKey === 'professional-background-remover') {
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