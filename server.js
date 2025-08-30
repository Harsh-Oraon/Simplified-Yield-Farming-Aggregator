const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ethers } = require('ethers');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Yield Farming Aggregator Backend API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Example blockchain route
app.get('/api/blockchain/status', async (req, res) => {
  try {
    const rpcUrl = process.env.ETHEREUM_RPC_URL;
    
    // Check if RPC URL is properly configured
    if (!rpcUrl || rpcUrl.includes('YOUR_API_KEY') || rpcUrl.includes('demo')) {
      return res.json({
        success: false,
        error: 'Blockchain RPC not configured',
        message: 'Please set ETHEREUM_RPC_URL in your .env file with a valid API key',
        configRequired: true
      });
    }
    
    // Connect to Ethereum mainnet
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const blockNumber = await provider.getBlockNumber();
    
    res.json({
      success: true,
      blockNumber: blockNumber.toString(),
      network: 'ethereum',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Blockchain status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blockchain status',
      message: error.message,
      configRequired: true
    });
  }
});

// Import DeFi API service
const DeFiApiService = require('./services/defiApi');
const defiService = new DeFiApiService();

// Real-time APY data route
app.get('/api/apy/protocols', async (req, res) => {
  try {
    // Check cache first
    const cachedData = defiService.getCachedData();
    if (cachedData) {
      console.log('Returning cached data:', cachedData.length, 'protocols');
      return res.json({
        success: true,
        protocols: cachedData,
        timestamp: new Date().toISOString(),
        source: 'cache'
      });
    }

    console.log('Fetching fresh data from DeFi service...');
    // Fetch fresh data from all protocols
    const protocols = await defiService.getAllProtocolData();
    console.log('Received protocols from service:', protocols ? protocols.length : 'null', 'protocols');
    
    res.json({
      success: true,
      protocols: protocols || [],
      timestamp: new Date().toISOString(),
      source: 'live-api',
      totalProtocols: protocols ? protocols.length : 0
    });
  } catch (error) {
    console.error('APY data error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch APY data',
      message: error.message
    });
  }
});

// Get specific protocol data
app.get('/api/apy/protocol/:protocol', async (req, res) => {
  try {
    const { protocol } = req.params;
    const allProtocols = await defiService.getAllProtocolData();
    const protocolData = allProtocols.filter(p => 
      p.protocol.toLowerCase() === protocol.toLowerCase()
    );
    
    res.json({
      success: true,
      protocol: protocol,
      data: protocolData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Protocol data error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch protocol data',
      message: error.message
    });
  }
});

// Get real-time contract data
app.get('/api/contract/stats', async (req, res) => {
  try {
    // This would integrate with the smart contract
    // For now, return mock data
    const contractStats = {
      totalTvl: '$5.24B',
      totalUsers: 1250,
      poolCount: 8,
      totalDeposits: '$3.8B',
      lastUpdate: new Date().toISOString()
    };
    
    res.json({
      success: true,
      stats: contractStats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Contract stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contract stats',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`⚠️  Note: Blockchain endpoints require proper RPC configuration in .env file`);
});

module.exports = app;
