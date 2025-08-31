import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { connectCoinbaseWallet } from '../utils/connectWallet';
import { Wallet } from 'lucide-react';

const Header = () => {
  // This is the correct place for your state and handler
  const [account, setAccount] = useState<string | null>(null);

  const handleConnect = async () => {
    const connection = await connectCoinbaseWallet();
    if (connection) {
      setAccount(connection.account);
    }
  };

  return (
    <header>
      {/* Other components and UI for your header would go here */}

      {account ? (
        <Button variant="outline" size="sm">
          <Wallet className="mr-2 h-4 w-4" />
          Connected: {`${account.substring(0, 6)}...${account.substring(38)}`}
        </Button>
      ) : (
        <Button variant="outline" size="sm" onClick={handleConnect}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}

    </header>
  );
};

export default Header;


