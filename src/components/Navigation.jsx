
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Coins, Zap, TrendingUp } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'dao',
      label: 'DAO Treasury',
      icon: Coins,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'r3born',
      label: 'R3BORN',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-600',
      comingSoon: true
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Trading Bot</h1>
            <p className="text-sm text-gray-400">SOL ↔ BTC</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{item.label}</span>
                {item.comingSoon && (
                  <span className="ml-auto text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                    Soon
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
