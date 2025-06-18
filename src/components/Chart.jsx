import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { useTradingContext } from '@/contexts/TradingContext';

const Chart = () => {
  const { priceHistory, tradingBot } = useTradingContext();
  const [timeframe, setTimeframe] = useState('1H');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (priceHistory.length > 0) {
      setChartData(priceHistory.map((entry, index) => ({
        time: index,
        price: entry.sol_price,
        volume: entry.volume,
        timestamp: entry.timestamp
      })));
    }
  }, [priceHistory]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // In a real app, this would filter the data based on timeframe
  };

  const maxPrice = Math.max(...chartData.map(d => d.price));
  const minPrice = Math.min(...chartData.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="trading-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Trade History</h3>
            <p className="text-gray-400">SOL/USD Price Movement</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['1H', '4H', '1D', '1W'].map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                timeframe === tf
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 chart-grid rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {/* Price Line */}
          <motion.path
            d={`M ${chartData.map((point, index) => 
              `${(index / (chartData.length - 1)) * 100}% ${
                ((maxPrice - point.price) / priceRange) * 100
              }%`
            ).join(' L ')}`}
            fill="none"
            stroke="url(#priceGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14f195" />
              <stop offset="100%" stopColor="#9945ff" />
            </linearGradient>
          </defs>
          
          {/* Data Points */}
          {chartData.map((point, index) => (
            <motion.circle
              key={index}
              cx={`${(index / (chartData.length - 1)) * 100}%`}
              cy={`${((maxPrice - point.price) / priceRange) * 100}%`}
              r="3"
              fill="#14f195"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </svg>
        
        {/* Price Labels */}
        <div className="absolute left-2 top-2 text-sm text-gray-400">
          ${maxPrice.toFixed(2)}
        </div>
        <div className="absolute left-2 bottom-2 text-sm text-gray-400">
          ${minPrice.toFixed(2)}
        </div>
      </div>

      {/* Trading Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Profitable Trades</span>
          </div>
          <div className="text-xl font-bold text-white">
            {tradingBot.totalTrades > 0 ? ((tradingBot.profitableTrades / tradingBot.totalTrades) * 100).toFixed(1) : '0'}%
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-blue-400 mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Total Trades</span>
          </div>
          <div className="text-xl font-bold text-white">{tradingBot.totalTrades}</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-purple-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Total P&L</span>
          </div>
          <div className={`text-xl font-bold ${tradingBot.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {tradingBot.totalProfit >= 0 ? '+' : ''}${tradingBot.totalProfit.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;