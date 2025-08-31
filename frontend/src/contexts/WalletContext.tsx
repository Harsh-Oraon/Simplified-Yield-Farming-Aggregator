import React, { createContext, useContext, ReactNode } from 'react';
import { useWallet } from '../hooks/useWallet';

interface WalletContextType {
  account: string | null;
  provider: any;
  signer: any;
  isConnecting: boolean;
  error: string | null;
  isWalletInstalled: boolean;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  getBalance: () => Promise<string | null>;
  signMessage: (message: string) => Promise<string | null>;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

export { useWalletContext, WalletProvider };
export default WalletProvider;
