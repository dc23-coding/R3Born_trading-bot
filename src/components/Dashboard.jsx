import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from '@/components/Chart';
import WalletPanel from '@/components/WalletPanel';
import TradingControls from '@/components/TradingControls';
import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';
import { useTradingContext } from '@/contexts/TradingContext';

const Dashboard = () => {
  const { marketData, tradingBot, priceHistory, startTradingBot, stopTradingBot } = useTradingContext();
  
  const [priceChanges, setPriceChanges] = useState({
    sol_change: 2.45,
    btc_change: -1.23
  });

  useEffect(() => {
    if (priceHistory.length >= 2) {
      const current = priceHistory[priceHistory.length - 1];
      const previous = priceHistory[priceHistory.length - 2];
      
      const solChange = ((current.sol_price - previous.sol_price) / previous.sol_price) * 100;
      const btcChange = ((current.btc_price - previous.btc_price) / previous.btc_price) * 100;
      
      setPriceChanges({
        sol_change: solChange,
        btc_change: btcChange
      });
    }
  }, [priceHistory]);

  const handleTradingAction = () => {
    if (tradingBot.isActive) {
      stopTradingBot();
    } else {
      startTradingBot();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Trading Dashboard</h1>
          <p className="text-gray-400">SOL ↔ BTC Automated Trading Bot</p>
        </div>
        <motion.button
          onClick={handleTradingAction}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all ${
            tradingBot.isActive 
              ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
              : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
          } text-white`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Activity className="w-5 h-5" />
          <span>{tradingBot.isActive ? 'Stop Trading' : 'Start Trading'}</span>
        </motion.button>
      </div>

      {/* Live Price Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="trading-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 sol-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SOL</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Solana</h3>
                <p className="text-gray-400">SOL/USD</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white price-pulse">
                ${marketData.sol_price.toFixed(2)}
              </div>
              <div className={`flex items-center space-x-1 ${priceChanges.sol_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChanges.sol_change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{priceChanges.sol_change >= 0 ? '+' : ''}{priceChanges.sol_change.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="trading-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 btc-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Bitcoin</h3>
                <p className="text-gray-400">BTC/USD</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white price-pulse">
                ${marketData.btc_price.toLocaleString()}
              </div>
              <div className={`flex items-center space-x-1 ${priceChanges.btc_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChanges.btc_change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{priceChanges.btc_change >= 0 ? '+' : ''}{priceChanges.btc_change.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trading Chart */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Chart />
          <TradingControls />
        </motion.div>

        {/* Wallet Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <WalletPanel marketData={marketData} />
        </motion.div>
      </div>

      {/* Trading Logic Summary */}
      <motion.div
        className="trading-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Trading Logic Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-teal-400">Buy Conditions</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• RSI below 30 (oversold)</li>
              <li>• Price crosses above MA(20)</li>
              <li>• Volume spike detected</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-400">Sell Conditions</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• RSI above 70 (overbought)</li>
              <li>• 5% profit target reached</li>
              <li>• Stop loss at -2%</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-400">Risk Management</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Max 10% portfolio per trade</li>
              <li>• Daily loss limit: 5%</li>
              <li>• Auto-rebalancing enabled</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;