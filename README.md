# Simplified-Yield-Farming-Aggregator

A simple dashboard that shows real-time APYs from 2–3 protocols and lets users deposit a stablecoin. Your smart contract allocates funds to the highest-yielding pool.

## 🚀 Backend API

This project includes a Node.js backend that provides:
- Real-time APY data from various DeFi protocols
- Blockchain interaction via ethers.js
- RESTful API endpoints
- CORS support for frontend integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Access to blockchain RPC endpoints (Alchemy, Infura, etc.)

## 🛠️ Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

1. **Install Node.js** (if not already installed):
   ```bash
   # For Arch Linux
   sudo pacman -S nodejs npm
   
   # Or download from https://nodejs.org/
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your actual API keys and RPC URLs
   nano .env
   ```

## 🚀 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 3001 (or the port specified in your `.env` file).

## 📡 API Endpoints

### Base URL
```
http://localhost:3001
```

### Available Endpoints

- `GET /` - API status and information
- `GET /health` - Health check endpoint
- `GET /api/blockchain/status` - Current blockchain status
- `GET /api/apy/protocols` - APY data from various protocols

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Blockchain Configuration
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_RPC_URL=https://polygon-rpc.com
BSC_RPC_URL=https://bsc-dataseed.binance.org

# API Keys
ALCHEMY_API_KEY=your_alchemy_api_key_here
INFURA_API_KEY=your_infura_api_key_here

# Protocol API Endpoints
COMPOUND_API_URL=https://api.compound.finance/api/v2
AAVE_API_URL=https://api.aave.com
YEARN_API_URL=https://api.yearn.finance
```

### Getting API Keys

1. **Alchemy**: Visit [alchemy.com](https://alchemy.com) to get a free API key
2. **Infura**: Visit [infura.io](https://infura.io) to get a free API key
3. **Protocol APIs**: Check each protocol's documentation for API access

## 📁 Project Structure

```
Simplified-Yield-Farming-Aggregator/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── env.example            # Environment variables template
├── .gitignore            # Git ignore rules
├── setup.sh              # Automated setup script
└── README.md             # This file
```

## 🧪 Testing the API

Once the server is running, you can test the endpoints:

```bash
# Test the base endpoint
curl http://localhost:3001/

# Test health check
curl http://localhost:3001/health

# Test blockchain status
curl http://localhost:3001/api/blockchain/status

# Test APY data
curl http://localhost:3001/api/apy/protocols
```

## 🔮 Next Steps

- [ ] Implement real protocol API integrations
- [ ] Add database for storing historical APY data
- [ ] Create smart contract integration
- [ ] Add authentication and user management
- [ ] Implement rate limiting and caching
- [ ] Add comprehensive error handling
- [ ] Create frontend dashboard

## 🐛 Troubleshooting

### Port Already in Use
If port 3001 is already in use, change the `PORT` in your `.env` file.

### Blockchain Connection Issues
- Verify your RPC URL is correct
- Check if you have sufficient API quota
- Ensure your network allows the connection

### Missing Dependencies
If you encounter module not found errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the error logs in your terminal
3. Ensure all environment variables are properly set
4. Verify Node.js version compatibility
