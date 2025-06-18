
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Target, Shield, TrendingUp, BarChart3 } from 'lucide-react';
import { useTradingContext } from '@/contexts/TradingContext';
import { toast } from '@/components/ui/use-toast';

const TradingControls = () => {
  const { tradingBot, setTradingBot, tradeHistory } = useTradingContext();
  const [showSettings, setShowSettings] = useState(false);

  const updateBotSettings = (setting, value) => {
    setTradingBot(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "⚙️ Settings Updated",
      description: `${setting} has been updated to ${value}`,
      duration: 2000,
    });
  };

  const strategies = [
    { id: 'momentum', name: 'Momentum Trading', description: 'Follow price trends' },
    { id: 'mean_reversion', name: 'Mean Reversion', description: 'Buy low, sell high' },
    { id: 'arbitrage', name: 'Arbitrage', description: 'Exploit price differences' }
  ];

  const riskLevels = [
    { id: 'low', name: 'Conservative', color: 'text-green-400' },
    { id: 'medium', name: 'Balanced', color: 'text-yellow-400' },
    { id: 'high', name: 'Aggressive', color: 'text-red-400' }
  ];

  const recentTrades = tradeHistory.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Trading Performance */}
      <motion.div
        className="trading-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Trading Performance</h3>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            tradingBot.isActive ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
          }`}>
            {tradingBot.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{tradingBot.totalTrades}</div>
            <div className="text-gray-400 text-sm">Total Trades</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {((tradingBot.profitableTrades / tradingBot.totalTrades) * 100).toFixed(1)}%
            </div>
            <div className="text-gray-400 text-sm">Win Rate</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${tradingBot.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${tradingBot.totalProfit.toFixed(2)}
            </div>
            <div className="text-gray-400 text-sm">Total P&L</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {tradingBot.totalTrades > 0 ? (tradingBot.totalProfit / tradingBot.totalTrades).toFixed(2) : '0.00'}
            </div>
            <div className="text-gray-400 text-sm">Avg P&L</div>
          </div>
        </div>
      </motion.div>

      {/* Bot Settings */}
      <motion.div
        className="trading-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Bot Configuration</h3>
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strategy */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Strategy</label>
            <select
              value={tradingBot.strategy}
              onChange={(e) => updateBotSettings('strategy', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {strategies.map(strategy => (
                <option key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Risk Level</label>
            <select
              value={tradingBot.riskLevel}
              onChange={(e) => updateBotSettings('riskLevel', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {riskLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          {/* Profit Target */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Profit Target (%)</label>
            <input
              type="number"
              value={tradingBot.profitTarget}
              onChange={(e) => updateBotSettings('profitTarget', parseFloat(e.target.value))}
              min="1"
              max="20"
              step="0.5"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {showSettings && (
          <motion.div
            className="mt-6 pt-6 border-t border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stop Loss (%)</label>
                <input
                  type="number"
                  value={tradingBot.stopLoss}
                  onChange={(e) => updateBotSettings('stopLoss', parseFloat(e.target.value))}
                  min="0.5"
                  max="10"
                  step="0.5"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Position Size (%)</label>
                <input
                  type="number"
                  value="10"
                  readOnly
                  className="w-full bg-gray-600 border border-gray-600 rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Recent Trades */}
      {recentTrades.length > 0 && (
        <motion.div
          className="trading-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Recent Trades</h3>
          </div>

          <div className="space-y-3">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    trade.type === 'buy' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    <span className="text-white text-xs font-bold">
                      {trade.type === 'buy' ? '↗' : '↘'}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {trade.type.toUpperCase()} {trade.amount.toFixed(4)} {trade.toAsset}
                    </div>
                    <div className="text-gray-400 text-sm">
                      ${trade.price.toFixed(2)} • {new Date(trade.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className={`text-right ${trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="font-medium">
                    {trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}
                  </div>
                  <div className="text-xs">
                    {((trade.profit / trade.value) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TradingControls;
