
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WalletPanel = ({ marketData }) => {
  const totalValue = (marketData.sol_balance * marketData.sol_price) + 
                    (marketData.btc_balance * marketData.btc_price);

  const handleWalletAction = (action) => {
    toast({
      title: "🚧 Wallet Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  const walletItems = [
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: marketData.sol_balance,
      price: marketData.sol_price,
      value: marketData.sol_balance * marketData.sol_price,
      gradient: 'sol-gradient',
      textColor: 'text-teal-400'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: marketData.btc_balance,
      price: marketData.btc_price,
      value: marketData.btc_balance * marketData.btc_price,
      gradient: 'btc-gradient',
      textColor: 'text-orange-400'
    },
    {
      symbol: 'R3BORN',
      name: 'R3BORN Token',
      balance: marketData.r3born_balance,
      price: 0,
      value: 0,
      gradient: 'r3born-gradient',
      textColor: 'text-purple-400',
      comingSoon: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <motion.div
        className="trading-card rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Portfolio</h3>
              <p className="text-gray-400">Total Balance</p>
            </div>
          </div>
          
          <motion.button
            onClick={() => handleWalletAction('add')}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="text-3xl font-bold text-white mb-2">
          ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        <div className="flex items-center space-x-1 text-green-400">
          <ArrowUpRight className="w-4 h-4" />
          <span className="text-sm">+12.5% (24h)</span>
        </div>
      </motion.div>

      {/* Wallet Balances */}
      <div className="space-y-4">
        {walletItems.map((item, index) => (
          <motion.div
            key={item.symbol}
            className="trading-card rounded-xl p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${item.gradient} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">
                    {item.symbol === 'BTC' ? '₿' : item.symbol === 'R3BORN' ? 'R3' : item.symbol}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-white">{item.symbol}</h4>
                    {item.comingSoon && (
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{item.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-white">
                  {item.balance.toFixed(item.symbol === 'BTC' ? 4 : 2)} {item.symbol}
                </div>
                <div className={`text-sm ${item.textColor}`}>
                  {item.comingSoon ? 'Coming Soon' : `$${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="trading-card rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="font-semibold text-white mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            onClick={() => handleWalletAction('buy')}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Buy</span>
          </motion.button>
          
          <motion.button
            onClick={() => handleWalletAction('sell')}
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Sell</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default WalletPanel;
