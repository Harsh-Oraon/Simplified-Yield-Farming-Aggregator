# YieldWeaver - Simplified Yield Farming Aggregator

A comprehensive DeFi yield farming platform that combines wallet integration with real-time APY monitoring and smart contract automation.

## 🚀 Features

### 🔗 Wallet Integration
- **Coinbase Wallet Support**: Seamless connection with Coinbase Wallet
- **Balance Display**: Real-time ETH balance monitoring
- **Address Management**: Copy wallet addresses with one click
- **Secure Connection**: Built-in security features and error handling

### 📊 Real-Time APY Dashboard
- **Live Data**: Real-time APY rates from major DeFi protocols
- **Multi-Protocol Support**: Aave and Compound integration
- **The Graph Integration**: Direct data fetching from blockchain APIs
- **Sepolia Testnet**: Safe testing environment

### 🏗️ Smart Contract Infrastructure
- **YieldAggregator Contract**: Automated yield optimization
- **Pool Management**: Add and manage yield farming pools
- **Risk Assessment**: Built-in risk level categorization
- **Emergency Features**: Emergency withdrawal capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** for component library
- **React Router** for navigation
- **TanStack Query** for data fetching

### Blockchain
- **Solidity** smart contracts
- **Hardhat** development environment
- **OpenZeppelin** security libraries
- **Ethers.js** for Ethereum interaction

### APIs & Data
- **The Graph Protocol** for blockchain data
- **Aave Protocol** integration
- **Compound Protocol** integration

## 📁 Project Structure

```
Simplified-Yield-Farming-Aggregator/
├── contracts/                 # Smart contracts
│   ├── YieldAggregator.sol   # Main yield aggregator contract
│   ├── MockUSDC.sol          # Mock USDC for testing
│   └── scripts/
│       └── deploy.js          # Deployment scripts
├── frontend/                  # Main React application
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── ui/           # Shadcn/ui components
│   │   │   ├── Header.tsx    # Navigation header
│   │   │   ├── Hero.tsx      # Landing page hero
│   │   │   ├── WalletInfo.tsx # Wallet connection UI
│   │   │   └── YieldGrid.tsx # Yield farming grid
│   │   ├── contexts/         # React contexts
│   │   │   └── WalletContext.tsx # Wallet state management
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   │   ├── Index.tsx     # Home page
│   │   │   └── NotFound.tsx  # 404 page
│   │   ├── APYDashboard.tsx  # Real-time APY dashboard
│   │   └── App.tsx           # Main app component
│   └── package.json          # Frontend dependencies
├── services/                  # Backend services
│   └── defiApi.js            # DeFi API integration
├── server.js                  # Express server
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Coinbase Wallet extension
- MetaMask or other Web3 wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Simplified-Yield-Farming-Aggregator
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install contract dependencies
   cd ../contracts
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**
   ```bash
   # Start frontend (from root directory)
   npm run dev:frontend
   
   # Start backend (from root directory)
   npm run dev:backend
   
   # Or use the provided batch files on Windows
   start-frontend.bat
   start_backend.bat
   ```

### Smart Contract Deployment

1. **Configure Hardhat**
   ```bash
   cd contracts
   # Edit hardhat.config.js with your network settings
   ```

2. **Deploy contracts**
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## 🎯 Usage

### Connecting Your Wallet
1. Open the application in your browser
2. Click "Connect Wallet" in the header
3. Approve the connection in your Coinbase Wallet
4. View your wallet information and balance

### Viewing APY Dashboard
1. Navigate to the APY Dashboard from the header
2. View real-time APY rates from Aave and Compound
3. Monitor protocol performance and trends

### Yield Farming (Coming Soon)
1. Connect your wallet
2. Select a yield farming pool
3. Deposit your stablecoins
4. Monitor your earnings in real-time

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Smart Contract Development
```bash
cd contracts
npx hardhat compile  # Compile contracts
npx hardhat test     # Run tests
npx hardhat node     # Start local node
```

### Adding New Protocols
1. Update the APY dashboard with new Graph queries
2. Add protocol-specific components
3. Update the smart contract with new pool addresses
4. Test thoroughly on testnet

## 🔒 Security Features

- **Reentrancy Protection**: Built-in guards against reentrancy attacks
- **Access Control**: Owner-only functions for critical operations
- **Emergency Withdrawal**: Quick exit mechanism for users
- **Input Validation**: Comprehensive parameter checking
- **Safe Math**: Overflow protection for all calculations

## 🌐 Networks Supported

- **Sepolia Testnet**: Primary development and testing network
- **Ethereum Mainnet**: Production deployment (configured but not deployed)

## 📊 API Endpoints

### The Graph Queries
- **Aave Protocol**: `https://api.thegraph.com/subgraphs/name/aave/protocol-v3-sepolia`
- **Compound Protocol**: `https://api.thegraph.com/subgraphs/name/messari/compound-v3-sepolia`

### Custom API Endpoints
- `/api/apy` - Get aggregated APY data
- `/api/pools` - Get available yield farming pools
- `/api/user/:address` - Get user-specific data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `SMART_CONTRACTS_OVERVIEW.md` for detailed contract documentation
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions

## 🔮 Roadmap

- [ ] Multi-chain support (Polygon, BSC)
- [ ] Advanced yield optimization algorithms
- [ ] Mobile app development
- [ ] Governance token implementation
- [ ] Cross-protocol yield farming strategies
- [ ] Real-time notifications
- [ ] Portfolio analytics dashboard

---

**Built with ❤️ for the DeFi community**
