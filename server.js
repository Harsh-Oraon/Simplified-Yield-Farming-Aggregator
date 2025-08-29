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

// Example APY data route
app.get('/api/apy/protocols', async (req, res) => {
  try {
    // Example: Fetch APY data from a protocol API
    // You'll need to replace this with actual protocol API endpoints
    const mockProtocols = [
      {
        name: 'Compound',
        apy: '4.25',
        tvl: '1000000',
        protocol: 'compound'
      },
      {
        name: 'Aave',
        apy: '3.89',
        tvl: '2500000',
        protocol: 'aave'
      },
      {
        name: 'Yearn Finance',
        apy: '5.12',
        tvl: '750000',
        protocol: 'yearn'
      }
    ];
    
    res.json({
      success: true,
      protocols: mockProtocols,
      timestamp: new Date().toISOString()
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
