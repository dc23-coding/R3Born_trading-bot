
import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Users, Vote, TrendingUp, Shield, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DAO = () => {
  const handleDAOAction = (action) => {
    toast({
      title: "🚧 DAO Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  const treasuryStats = [
    {
      label: 'Total Treasury Value',
      value: '$2,847,392',
      change: '+15.2%',
      icon: Coins,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      label: 'Active Members',
      value: '1,247',
      change: '+8.7%',
      icon: Users,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      label: 'Governance Power',
      value: '94.3%',
      change: '+2.1%',
      icon: Vote,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      label: 'Yield Generated',
      value: '$47,832',
      change: '+23.4%',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const proposals = [
    {
      id: 1,
      title: 'Increase SOL Trading Allocation',
      description: 'Proposal to increase SOL trading allocation from 40% to 55%',
      status: 'Active',
      votes: { for: 847, against: 123 },
      timeLeft: '2 days'
    },
    {
      id: 2,
      title: 'R3BORN Token Integration',
      description: 'Add R3BORN token to the trading bot portfolio',
      status: 'Pending',
      votes: { for: 0, against: 0 },
      timeLeft: '5 days'
    },
    {
      id: 3,
      title: 'Risk Management Update',
      description: 'Update stop-loss parameters for better risk management',
      status: 'Passed',
      votes: { for: 1203, against: 87 },
      timeLeft: 'Completed'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">DAO Treasury</h1>
          <p className="text-gray-400">Decentralized governance and treasury management</p>
        </div>
        <motion.button
          onClick={() => handleDAOAction('propose')}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-purple-600 hover:to-pink-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Vote className="w-5 h-5" />
          <span>New Proposal</span>
        </motion.button>
      </div>

      {/* Treasury Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {treasuryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="trading-card rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-green-400 text-sm font-medium">
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Governance Proposals */}
        <motion.div
          className="lg:col-span-2 trading-card rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Active Proposals</h3>
          </div>

          <div className="space-y-4">
            {proposals.map((proposal) => (
              <motion.div
                key={proposal.id}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{proposal.title}</h4>
                    <p className="text-gray-400 text-sm">{proposal.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    proposal.status === 'Active' ? 'bg-green-600 text-white' :
                    proposal.status === 'Pending' ? 'bg-yellow-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {proposal.status}
                  </span>
                </div>

                {proposal.status !== 'Pending' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-green-400 font-medium">{proposal.votes.for}</span>
                        <span className="text-gray-400"> for</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-red-400 font-medium">{proposal.votes.against}</span>
                        <span className="text-gray-400"> against</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {proposal.timeLeft}
                    </div>
                  </div>
                )}

                {proposal.status === 'Active' && (
                  <div className="flex space-x-3 mt-4">
                    <motion.button
                      onClick={() => handleDAOAction('vote-for')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Vote For
                    </motion.button>
                    <motion.button
                      onClick={() => handleDAOAction('vote-against')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Vote Against
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Treasury Management */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Treasury Allocation */}
          <div className="trading-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Treasury Allocation</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">SOL Trading</span>
                <span className="text-teal-400 font-semibold">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">BTC Trading</span>
                <span className="text-orange-400 font-semibold">35%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Reserve Fund</span>
                <span className="text-blue-400 font-semibold">15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">R3BORN (Future)</span>
                <span className="text-purple-400 font-semibold">5%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>

          {/* Yield Farming */}
          <div className="trading-card rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Yield Farming</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">APY</span>
                <span className="text-green-400 font-semibold">12.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Daily Yield</span>
                <span className="text-green-400 font-semibold">$1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Staked Amount</span>
                <span className="text-white font-semibold">$847,392</span>
              </div>
            </div>

            <motion.button
              onClick={() => handleDAOAction('stake')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 rounded-lg font-semibold mt-4 hover:from-yellow-600 hover:to-orange-700 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Manage Staking
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DAO;
