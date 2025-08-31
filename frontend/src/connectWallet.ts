import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { ethers } from 'ethers';

const APP_NAME = 'YieldMax';
const APP_LOGO_URL = 'https://example.com/logo.png';
const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/75237055932f40cd93ed8004eacf611c';
const CHAIN_ID = 1;

interface WalletConnection {
  provider: ethers.BrowserProvider;
  account: string;
  signer: ethers.JsonRpcSigner;
}

let coinbaseWallet: CoinbaseWalletSDK | null = null;

export const connectCoinbaseWallet = async (): Promise<WalletConnection | null> => {
  try {
    console.log('Attempting to connect to Coinbase Wallet...');
    
    // Initialize Coinbase Wallet SDK if not already done
    if (!coinbaseWallet) {
      console.log('Initializing Coinbase Wallet SDK...');
      coinbaseWallet = new CoinbaseWalletSDK({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
        darkMode: false,
        overrideIsMetaMask: false,
      });
    }

    // Make Web3 provider
    console.log('Creating Web3 provider...');
    const provider = coinbaseWallet.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID);
    
    // Create ethers provider
    const ethersProvider = new ethers.BrowserProvider(provider);
    
    // Get signer and account
    console.log('Getting signer...');
    const signer = await ethersProvider.getSigner();
    console.log('Getting account address...');
    const account = await signer.getAddress();

    console.log('Connected to Coinbase Wallet:', account);
    
    return {
      provider: ethersProvider,
      account: account,
      signer: signer,
    };
  } catch (error) {
    console.error('Failed to connect to Coinbase Wallet:', error);
    return null;
  }
};

export const disconnectCoinbaseWallet = (): void => {
  try {
    if (coinbaseWallet) {
      coinbaseWallet.disconnect();
      coinbaseWallet = null;
    }
    console.log('Disconnected from Coinbase Wallet');
  } catch (error) {
    console.error('Error disconnecting from Coinbase Wallet:', error);
  }
};

export const getCoinbaseWalletSDK = (): CoinbaseWalletSDK | null => {
  return coinbaseWallet;
};

export const isCoinbaseWalletInstalled = (): boolean => {
  // Check for Coinbase Wallet specifically
  if (typeof window !== 'undefined') {
    console.log('Checking wallet installation...');
    console.log('window.ethereum:', !!window.ethereum);
    console.log('window.ethereum.isCoinbaseWallet:', window.ethereum?.isCoinbaseWallet);
    console.log('window.CoinbaseWalletSDK:', !!window.CoinbaseWalletSDK);
    
    // Check for Coinbase Wallet extension
    if (window.ethereum && window.ethereum.isCoinbaseWallet) {
      console.log('Coinbase Wallet extension detected');
      return true;
    }
    // Check for Coinbase Wallet SDK
    if (window.CoinbaseWalletSDK) {
      console.log('Coinbase Wallet SDK detected');
      return true;
    }
    // Check for any ethereum provider (fallback)
    if (window.ethereum) {
      console.log('Generic ethereum provider detected');
      return true;
    }
    
    console.log('No wallet detected');
  }
  return false;
};