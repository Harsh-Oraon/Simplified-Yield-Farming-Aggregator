import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">Y</span>
            </div>
            <span className="text-xl font-bold text-foreground">YieldMax</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search protocols..."
              className="pl-10 w-64 bg-muted/50 border-border"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;