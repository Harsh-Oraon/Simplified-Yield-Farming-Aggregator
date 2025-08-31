import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, Wallet } from "lucide-react";
import { useWalletContext } from "../contexts/WalletContext";

const Header = () => {
  const { isConnected, connect, disconnect, error, isConnecting } = useWalletContext();

  const handleWalletAction = async () => {
    try {
      console.log('Header wallet button clicked, isConnected:', isConnected);
      
      if (isConnected) {
        console.log('Disconnecting wallet...');
        disconnect();
      } else {
        console.log('Connecting wallet...');
        const result = await connect();
        console.log('Connect result:', result);
      }
    } catch (err) {
      console.error('Header wallet action error:', err);
    }
  };

  const handleTestClick = () => {
    console.log('Test button clicked!');
    alert('Header test button works!');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YM</span>
              </div>
              <span className="text-xl font-bold">YieldMax</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              APY Dashboard
            </Link>
            
            {/* Test Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTestClick}
              className="cursor-pointer bg-yellow-500 hover:bg-yellow-600"
            >
              Test
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleWalletAction}
              disabled={isConnecting}
              className="cursor-pointer"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect Wallet'}
            </Button>
            {error && (
              <span className="text-xs text-red-500 max-w-32 truncate" title={error}>
                {error}
              </span>
            )}
          </nav>

          <div className="md:hidden">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;