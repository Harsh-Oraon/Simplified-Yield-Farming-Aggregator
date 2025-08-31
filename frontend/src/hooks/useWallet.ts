import { useState, useEffect, useCallback } from 'react';
import { connectCoinbaseWallet, disconnectCoinbaseWallet, isCoinbaseWalletInstalled } from '../connectWallet';
import { ethers } from 'ethers';

interface WalletConnection {
  provider: ethers.BrowserProvider;
  account: string;
  signer: ethers.JsonRpcSigner;
}

export const useWallet = () => {
  const [connection, setConnection] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  useEffect(() => {
    // Check if Coinbase Wallet is installed
    const installed = isCoinbaseWalletInstalled();
    console.log('useWallet: Wallet installation check result:', installed);
    setIsWalletInstalled(installed);
  }, []);

  const connect = useCallback(async () => {
    console.log('useWallet: Connect function called, isWalletInstalled:', isWalletInstalled);
    
    if (!isWalletInstalled) {
      console.log('useWallet: Wallet not installed, showing error');
      setError('Coinbase Wallet is not installed. Please install it first.');
      return false;
    }

    setIsConnecting(true);
    setError(null);
    console.log('useWallet: Starting wallet connection...');

    try {
      const walletConnection = await connectCoinbaseWallet();
      console.log('useWallet: Wallet connection result:', walletConnection);
      
      if (walletConnection) {
        setConnection(walletConnection);
        console.log('Wallet connected successfully:', walletConnection.account);
        return true;
      } else {
        console.log('useWallet: Wallet connection returned null');
        setError('Failed to connect wallet. Please try again.');
        return false;
      }
    } catch (err) {
      console.error('useWallet: Wallet connection error:', err);
      setError('Connection failed. Please check your wallet and try again.');
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, [isWalletInstalled]);

  const disconnect = useCallback(() => {
    console.log('useWallet: Disconnect function called');
    try {
      disconnectCoinbaseWallet();
      setConnection(null);
      setError(null);
      console.log('Wallet disconnected successfully');
    } catch (err) {
      console.error('Wallet disconnection error:', err);
    }
  }, []);

  const getBalance = useCallback(async () => {
    if (!connection?.provider) return null;
    
    try {
      const balance = await connection.provider.getBalance(connection.account);
      return ethers.formatEther(balance);
    } catch (err) {
      console.error('Error getting balance:', err);
      return null;
    }
  }, [connection]);

  const signMessage = useCallback(async (message: string) => {
    if (!connection?.signer) return null;
    
    try {
      const signature = await connection.signer.signMessage(message);
      return signature;
    } catch (err) {
      console.error('Error signing message:', err);
      return null;
    }
  }, [connection]);

  const walletState = {
    connection,
    account: connection?.account || null,
    provider: connection?.provider || null,
    signer: connection?.signer || null,
    isConnecting,
    error,
    isWalletInstalled,
    connect,
    disconnect,
    getBalance,
    signMessage,
    isConnected: !!connection,
  };

  console.log('useWallet: Current state:', walletState);
  return walletState;
};
