import YieldCard from "./YieldCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SortDesc } from "lucide-react";

const mockYields = [
  {
    protocol: "Aave",
    pool: "USDC",
    apy: 8.45,
    tvl: "$2.1B",
    risk: "Low" as const,
    logo: "A",
    chain: "Ethereum"
  },
  {
    protocol: "Compound",
    pool: "ETH",
    apy: 15.2,
    tvl: "$890M",
    risk: "Medium" as const,
    logo: "C",
    chain: "Ethereum"
  },
  {
    protocol: "Yearn",
    pool: "USDC Vault",
    apy: 22.8,
    tvl: "$450M",
    risk: "Medium" as const,
    logo: "Y",
    chain: "Ethereum"
  },
  {
    protocol: "Curve",
    pool: "3Pool",
    apy: 12.6,
    tvl: "$1.8B",
    risk: "Low" as const,
    logo: "🌀",
    chain: "Ethereum"
  },
  {
    protocol: "Uniswap V3",
    pool: "ETH/USDC",
    apy: 35.4,
    tvl: "$650M",
    risk: "High" as const,
    logo: "🦄",
    chain: "Ethereum"
  },
  {
    protocol: "PancakeSwap",
    pool: "CAKE-BNB",
    apy: 28.9,
    tvl: "$320M",
    risk: "High" as const,
    logo: "🥞",
    chain: "BSC"
  }
];

const YieldGrid = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-foreground">Top Yield Opportunities</h2>
            <p className="text-muted-foreground">
              Showing {mockYields.length} protocols with live APY data
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Select defaultValue="apy">
              <SelectTrigger className="w-40">
                <SortDesc className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apy">Sort by APY</SelectItem>
                <SelectItem value="tvl">Sort by TVL</SelectItem>
                <SelectItem value="risk">Sort by Risk</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chains</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="bsc">BSC</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockYields.map((yieldData, index) => (
            <YieldCard key={index} {...yieldData} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Protocols
          </Button>
        </div>
      </div>
    </section>
  );
};

export default YieldGrid;