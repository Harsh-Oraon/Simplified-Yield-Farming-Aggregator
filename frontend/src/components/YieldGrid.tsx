import YieldCard from "./YieldCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SortDesc, RefreshCw, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

interface YieldData {
  protocol: string;
  pool: string;
  apy: string;
  tvl: string;
  risk: "Low" | "Medium" | "High";
  logo: string;
  chain: string;
  lastUpdate: string;
  source: string;
}

const YieldGrid = () => {
  const [yields, setYields] = useState<YieldData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [sortBy, setSortBy] = useState("apy");
  const [filterChain, setFilterChain] = useState("all");

  const fetchYieldData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/apy/protocols');
      const data = await response.json();
      
      if (data.success) {
        // Transform API data to match our interface
        const transformedData: YieldData[] = data.protocols.map((protocol: any) => ({
          protocol: protocol.protocol,
          pool: protocol.pool,
          apy: protocol.apy,
          tvl: protocol.tvl,
          risk: protocol.risk,
          logo: protocol.logo,
          chain: protocol.chain,
          lastUpdate: protocol.lastUpdate,
          source: protocol.source
        }));
        
        setYields(transformedData);
        setLastUpdate(data.timestamp);
        setError(null);
      } else {
        setError('Failed to fetch yield data');
      }
    } catch (err) {
      setError('Network error - please check if backend is running');
      console.error('Error fetching yield data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYieldData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchYieldData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedYields = [...yields];
    
    switch (value) {
      case "apy":
        sortedYields.sort((a, b) => parseFloat(b.apy) - parseFloat(a.apy));
        break;
      case "tvl":
        sortedYields.sort((a, b) => {
          const aTvl = parseFloat(a.tvl.replace(/[$,]/g, ''));
          const bTvl = parseFloat(b.tvl.replace(/[$,]/g, ''));
          return bTvl - aTvl;
        });
        break;
      case "risk":
        const riskOrder = { "Low": 1, "Medium": 2, "High": 3 };
        sortedYields.sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);
        break;
    }
    
    setYields(sortedYields);
  };

  const handleFilter = (value: string) => {
    setFilterChain(value);
  };

  const filteredYields = filterChain === "all" 
    ? yields 
    : yields.filter(yieldItem => yieldItem.chain.toLowerCase() === filterChain.toLowerCase());

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - updateTime.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  if (loading && yields.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading live yield data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 max-w-md mx-auto">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchYieldData} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-foreground">Top Yield Opportunities</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Showing {filteredYields.length} protocols with live APY data
              {lastUpdate && (
                <span className="text-xs text-muted-foreground">
                  • Last updated {formatTimeAgo(lastUpdate)}
                </span>
              )}
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Select value={sortBy} onValueChange={handleSort}>
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
            
            <Select value={filterChain} onValueChange={handleFilter}>
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
          {filteredYields.map((yieldData, index) => (
            <YieldCard key={index} {...yieldData} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button onClick={fetchYieldData} variant="outline" size="lg" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default YieldGrid;