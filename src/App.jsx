import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import DAO from '@/components/DAO';
import { Toaster } from '@/components/ui/toaster';
import { TradingProvider } from '@/contexts/TradingContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'dao':
        return <DAO />;
      case 'r3born':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="r3born-gradient w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">R3</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">R3BORN Coming Soon</h2>
              <p className="text-gray-400 text-lg">Revolutionary features are being developed</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <TradingProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 ml-64">
            <div className="p-8">
              {renderContent()}
            </div>
          </main>
        </div>
        <Toaster />
      </div>
    </TradingProvider>
  );
}

export default App;