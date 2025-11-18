import React, { useState } from 'react';
import { tools } from './constants';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Única fonte de verdade para ferramentas implementadas
  const implementedTools: string[] = [];

  const handleToolSelect = (toolKey: string) => {
    if (implementedTools.includes(toolKey)) {
      setActiveTool(toolKey);
    }
  };

  const handleBack = () => {
    setActiveTool(null);
  };
  
  const renderContent = () => {
    const activeToolData = tools.find(t => t.key === activeTool);

    if (activeToolData) {
      const ToolComponent = activeToolData.component;
      return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ToolComponent onBack={handleBack} tool={activeToolData} />
        </main>
      );
    }

    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Hero />
        <ToolsGrid tools={tools} onToolSelect={handleToolSelect} implementedTools={implementedTools} />
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