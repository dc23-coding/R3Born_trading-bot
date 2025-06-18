
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const TradingContext = createContext();

export const useTradingContext = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
};

export const TradingProvider = ({ children }) => {
  const [marketData, setMarketData] = useState({
    sol_price: 144.12,
    btc_price: 71245.33,
    sol_balance: 12.04,
    btc_balance: 0.0281,
    r3born_balance: 0.0,
    usd_balance: 5000.00
  });

  const [tradingBot, setTradingBot] = useState({
    isActive: false,
    strategy: 'momentum',
    riskLevel: 'medium',
    profitTarget: 5.0,
    stopLoss: 2.0,
    totalTrades: 247,
    profitableTrades: 180,
    totalProfit: 2847.32
  });

  const [tradeHistory, setTradeHistory] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [proposals, setProposals] = useState([]);

  // Initialize data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('tradingBotData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setMarketData(prev => ({ ...prev, ...parsed.marketData }));
      setTradingBot(prev => ({ ...prev, ...parsed.tradingBot }));
      setTradeHistory(parsed.tradeHistory || []);
      setProposals(parsed.proposals || getDefaultProposals());
    } else {
      setProposals(getDefaultProposals());
    }

    // Initialize price history
    const initialPriceHistory = generateInitialPriceHistory();
    setPriceHistory(initialPriceHistory);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const dataToSave = {
      marketData,
      tradingBot,
      tradeHistory,
      proposals
    };
    localStorage.setItem('tradingBotData', JSON.stringify(dataToSave));
  }, [marketData, tradingBot, tradeHistory, proposals]);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const solChange = (Math.random() - 0.5) * 4;
        const btcChange = (Math.random() - 0.5) * 200;
        
        const newSolPrice = Math.max(prev.sol_price + solChange, 50);
        const newBtcPrice = Math.max(prev.btc_price + btcChange, 30000);

        // Add to price history
        setPriceHistory(prevHistory => {
          const newEntry = {
            timestamp: Date.now(),
            sol_price: newSolPrice,
            btc_price: newBtcPrice,
            volume: Math.random() * 1000000
          };
          return [...prevHistory.slice(-49), newEntry];
        });

        return {
          ...prev,
          sol_price: newSolPrice,
          btc_price: newBtcPrice
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Trading bot logic
  useEffect(() => {
    if (!tradingBot.isActive) return;

    const tradingInterval = setInterval(() => {
      executeTradingLogic();
    }, 10000); // Execute every 10 seconds when active

    return () => clearInterval(tradingInterval);
  }, [tradingBot.isActive, marketData]);

  const generateInitialPriceHistory = () => {
    const history = [];
    let solPrice = 144.12;
    let btcPrice = 71245.33;
    
    for (let i = 0; i < 50; i++) {
      solPrice += (Math.random() - 0.5) * 3;
      btcPrice += (Math.random() - 0.5) * 150;
      
      history.push({
        timestamp: Date.now() - (50 - i) * 60000,
        sol_price: Math.max(solPrice, 50),
        btc_price: Math.max(btcPrice, 30000),
        volume: Math.random() * 1000000
      });
    }
    
    return history;
  };

  const getDefaultProposals = () => [
    {
      id: 1,
      title: 'Increase SOL Trading Allocation',
      description: 'Proposal to increase SOL trading allocation from 40% to 55%',
      status: 'Active',
      votes: { for: 847, against: 123 },
      timeLeft: '2 days',
      createdAt: Date.now() - 86400000,
      votingPower: 1000
    },
    {
      id: 2,
      title: 'R3BORN Token Integration',
      description: 'Add R3BORN token to the trading bot portfolio',
      status: 'Pending',
      votes: { for: 0, against: 0 },
      timeLeft: '5 days',
      createdAt: Date.now(),
      votingPower: 1000
    },
    {
      id: 3,
      title: 'Risk Management Update',
      description: 'Update stop-loss parameters for better risk management',
      status: 'Passed',
      votes: { for: 1203, against: 87 },
      timeLeft: 'Completed',
      createdAt: Date.now() - 172800000,
      votingPower: 1000
    }
  ];

  const executeTradingLogic = () => {
    if (priceHistory.length < 2) return;

    const currentPrice = priceHistory[priceHistory.length - 1];
    const previousPrice = priceHistory[priceHistory.length - 2];
    
    const solPriceChange = ((currentPrice.sol_price - previousPrice.sol_price) / previousPrice.sol_price) * 100;
    const btcPriceChange = ((currentPrice.btc_price - previousPrice.btc_price) / previousPrice.btc_price) * 100;

    // Simple momentum strategy
    if (Math.abs(solPriceChange) > 1.5 || Math.abs(btcPriceChange) > 1.5) {
      const shouldTrade = Math.random() > 0.7; // 30% chance to execute trade
      
      if (shouldTrade) {
        executeTrade(solPriceChange, btcPriceChange);
      }
    }
  };

  const executeTrade = (solChange, btcChange) => {
    const tradeAmount = Math.min(marketData.usd_balance * 0.1, 500); // Max 10% or $500
    
    if (tradeAmount < 10) return; // Minimum trade amount

    let tradeType, fromAsset, toAsset, amount, price;

    if (Math.abs(solChange) > Math.abs(btcChange)) {
      // Trade SOL
      if (solChange > 0 && marketData.usd_balance >= tradeAmount) {
        // Buy SOL
        tradeType = 'buy';
        fromAsset = 'USD';
        toAsset = 'SOL';
        amount = tradeAmount / marketData.sol_price;
        price = marketData.sol_price;
        
        setMarketData(prev => ({
          ...prev,
          sol_balance: prev.sol_balance + amount,
          usd_balance: prev.usd_balance - tradeAmount
        }));
      } else if (solChange < 0 && marketData.sol_balance > 0.1) {
        // Sell SOL
        tradeType = 'sell';
        fromAsset = 'SOL';
        toAsset = 'USD';
        amount = Math.min(marketData.sol_balance * 0.2, tradeAmount / marketData.sol_price);
        price = marketData.sol_price;
        
        setMarketData(prev => ({
          ...prev,
          sol_balance: prev.sol_balance - amount,
          usd_balance: prev.usd_balance + (amount * price)
        }));
      }
    } else {
      // Trade BTC
      if (btcChange > 0 && marketData.usd_balance >= tradeAmount) {
        // Buy BTC
        tradeType = 'buy';
        fromAsset = 'USD';
        toAsset = 'BTC';
        amount = tradeAmount / marketData.btc_price;
        price = marketData.btc_price;
        
        setMarketData(prev => ({
          ...prev,
          btc_balance: prev.btc_balance + amount,
          usd_balance: prev.usd_balance - tradeAmount
        }));
      } else if (btcChange < 0 && marketData.btc_balance > 0.001) {
        // Sell BTC
        tradeType = 'sell';
        fromAsset = 'BTC';
        toAsset = 'USD';
        amount = Math.min(marketData.btc_balance * 0.2, tradeAmount / marketData.btc_price);
        price = marketData.btc_price;
        
        setMarketData(prev => ({
          ...prev,
          btc_balance: prev.btc_balance - amount,
          usd_balance: prev.usd_balance + (amount * price)
        }));
      }
    }

    if (tradeType) {
      const newTrade = {
        id: Date.now(),
        type: tradeType,
        fromAsset,
        toAsset,
        amount,
        price,
        value: amount * price,
        timestamp: Date.now(),
        profit: (Math.random() - 0.4) * (amount * price * 0.1) // Simulate profit/loss
      };

      setTradeHistory(prev => [newTrade, ...prev.slice(0, 99)]); // Keep last 100 trades
      
      setTradingBot(prev => ({
        ...prev,
        totalTrades: prev.totalTrades + 1,
        profitableTrades: newTrade.profit > 0 ? prev.profitableTrades + 1 : prev.profitableTrades,
        totalProfit: prev.totalProfit + newTrade.profit
      }));

      toast({
        title: `🤖 Trade Executed`,
        description: `${tradeType.toUpperCase()} ${amount.toFixed(4)} ${toAsset} at $${price.toFixed(2)}`,
        duration: 3000,
      });
    }
  };

  const startTradingBot = () => {
    setTradingBot(prev => ({ ...prev, isActive: true }));
    toast({
      title: "🚀 Trading Bot Started",
      description: "Automated trading is now active!",
      duration: 3000,
    });
  };

  const stopTradingBot = () => {
    setTradingBot(prev => ({ ...prev, isActive: false }));
    toast({
      title: "⏹️ Trading Bot Stopped",
      description: "Automated trading has been paused.",
      duration: 3000,
    });
  };

  const createProposal = (proposalData) => {
    const newProposal = {
      id: Date.now(),
      ...proposalData,
      status: 'Pending',
      votes: { for: 0, against: 0 },
      timeLeft: '7 days',
      createdAt: Date.now(),
      votingPower: 1000
    };

    setProposals(prev => [newProposal, ...prev]);
    
    toast({
      title: "📝 Proposal Created",
      description: `"${proposalData.title}" has been submitted for voting.`,
      duration: 3000,
    });
  };

  const voteOnProposal = (proposalId, voteType) => {
    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId && proposal.status === 'Active') {
        const updatedVotes = {
          ...proposal.votes,
          [voteType]: proposal.votes[voteType] + 1
        };
        
        return {
          ...proposal,
          votes: updatedVotes,
          status: updatedVotes.for + updatedVotes.against > 100 ? 'Passed' : 'Active'
        };
      }
      return proposal;
    }));

    toast({
      title: "🗳️ Vote Recorded",
      description: `Your ${voteType} vote has been recorded!`,
      duration: 3000,
    });
  };

  const value = {
    marketData,
    setMarketData,
    tradingBot,
    setTradingBot,
    tradeHistory,
    priceHistory,
    proposals,
    startTradingBot,
    stopTradingBot,
    createProposal,
    voteOnProposal,
    executeTrade
  };

  return (
    <TradingContext.Provider value={value}>
      {children}
    </TradingContext.Provider>
  );
};
