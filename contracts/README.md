# 🚀 Yield Farming Aggregator Smart Contracts

This directory contains the smart contracts for the Yield Farming Aggregator, which automatically allocates user funds to the highest-yielding DeFi pools.

## 📋 Contract Overview

### **YieldAggregator.sol**
The main contract that:
- Manages yield farming pools
- Automatically allocates funds to highest APY pools
- Handles user deposits and withdrawals
- Tracks protocol statistics

### **MockUSDC.sol**
A mock USDC token for testing purposes.

## 🛠️ Setup & Installation

### **1. Install Dependencies**
```bash
cd contracts
npm install
```

### **2. Compile Contracts**
```bash
npm run compile
```

### **3. Start Local Hardhat Node**
```bash
npm run node
```

### **4. Deploy Contracts**
```bash
# Deploy to local network
npm run deploy:local

# Deploy to testnet (Sepolia)
npm run deploy:testnet

# Deploy to mainnet
npm run deploy:mainnet
```

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the contracts directory:

```bash
# Network RPC URLs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_API_KEY

# Private key for deployment
PRIVATE_KEY=your_private_key_here

# Etherscan API key for verification
ETHERSCAN_API_KEY=your_etherscan_api_key

# Gas reporting
REPORT_GAS=true
```

## 📊 Contract Functions

### **Pool Management**
- `addPool()` - Add new yield farming pool
- `updatePoolData()` - Update pool APY and TVL
- `togglePool()` - Enable/disable pool

### **User Operations**
- `deposit()` - Deposit stablecoins
- `withdraw()` - Withdraw deposits
- `emergencyWithdraw()` - Emergency withdrawal

### **View Functions**
- `getActivePools()` - Get all active pools
- `findBestPool()` - Find highest-yielding pool
- `getContractStats()` - Get contract statistics

## 🧪 Testing

### **Run Tests**
```bash
npm test
```

### **Test Coverage**
```bash
npm run coverage
```

## 📈 Integration with Backend

The smart contracts integrate with the backend API to:

1. **Real-time Updates**: Backend fetches live APY data and updates contract pools
2. **User Deposits**: Frontend connects to contracts for deposit/withdrawal
3. **Pool Management**: Admin can add/remove pools via contract functions

## 🔒 Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Access control for admin functions
- **SafeMath**: Safe mathematical operations
- **Emergency Withdrawal**: Users can withdraw funds in emergencies

## 🚀 Deployment Steps

### **Local Development**
1. Start Hardhat node: `npm run node`
2. Deploy contracts: `npm run deploy:local`
3. Copy contract addresses to backend `.env`

### **Testnet Deployment**
1. Fund your wallet with Sepolia ETH
2. Set environment variables
3. Deploy: `npm run deploy:testnet`
4. Verify contracts on Etherscan

### **Mainnet Deployment**
1. **⚠️ WARNING**: Only deploy after thorough testing
2. Set mainnet environment variables
3. Deploy: `npm run deploy:mainnet`
4. Verify and audit contracts

## 📱 Frontend Integration

The frontend connects to contracts via:

```typescript
// Example contract interaction
const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  signer
);

// Deposit funds
await contract.deposit(amount);
```

## 🔄 Real-time Data Flow

1. **DeFi APIs** → Backend fetches live APY data
2. **Backend** → Updates smart contract pool data
3. **Smart Contract** → Automatically allocates funds
4. **Frontend** → Displays real-time contract data

## 🐛 Troubleshooting

### **Common Issues**
- **Compilation Errors**: Check Solidity version compatibility
- **Deployment Failures**: Verify RPC URL and private key
- **Gas Issues**: Adjust gas limits in hardhat config

### **Debug Commands**
```bash
# Clean build artifacts
npm run clean

# Check contract size
npx hardhat size-contracts

# Verify on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

## 📚 Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Ethereum Development](https://ethereum.org/developers/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.
