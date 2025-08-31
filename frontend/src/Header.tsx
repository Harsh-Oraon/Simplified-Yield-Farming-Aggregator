import React from 'react';
import { Button } from "@/components/ui/button";
import { useWallet } from '../hooks/useWallet';
import { Wallet, LogOut, AlertCircle } from 'lucide-react';

const Header = () => {
  const {
    account,
    isConnecting,
    error,
    isWalletInstalled,
    connect,
    disconnect,
  } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="w-full bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">YieldWeaver</h1>
        </div>

        <div className="flex items-center space-x-4">
          {error && (
            <div className="flex items-center space-x-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {account ? (
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" disabled>
                <Wallet className="mr-2 h-4 w-4" />
                {formatAddress(account)}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={disconnect}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={connect}
              disabled={isConnecting || !isWalletInstalled}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}

          {!isWalletInstalled && (
            <div className="text-xs text-muted-foreground">
              Install Coinbase Wallet
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


