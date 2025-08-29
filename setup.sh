#!/bin/bash

echo "🚀 Setting up Yield Farming Aggregator Backend"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Installing Node.js..."
    
    # For Arch Linux (which you appear to be using)
    if command -v pacman &> /dev/null; then
        echo "📦 Installing Node.js via pacman..."
        sudo pacman -S nodejs npm --noconfirm
    elif command -v yay &> /dev/null; then
        echo "📦 Installing Node.js via yay..."
        yay -S nodejs npm --noconfirm
    else
        echo "❌ Please install Node.js manually:"
        echo "   Arch: sudo pacman -S nodejs npm"
        echo "   Or visit: https://nodejs.org/"
        exit 1
    fi
else
    echo "✅ Node.js is already installed"
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm separately."
    exit 1
fi

echo "✅ Node.js and npm are ready!"

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "To start the server:"
echo "  npm start"
echo ""
echo "To start in development mode:"
echo "  npm run dev"
echo ""
echo "Don't forget to:"
echo "  1. Copy env.example to .env"
echo "  2. Update .env with your API keys"
echo "  3. Configure your blockchain RPC URLs"
