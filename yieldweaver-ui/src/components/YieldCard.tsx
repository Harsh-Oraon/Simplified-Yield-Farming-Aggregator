import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, ExternalLink } from "lucide-react";

interface YieldCardProps {
  project: string;
  apy: number;
  tvl: string;
  risk: "Low" | "Medium" | "High";
  logo: string;
  chain: string;
}

function YieldCard({ project, apy, tvl, risk, logo, chain }: YieldCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-yield-low";
      case "Medium": return "text-yield-medium";
      case "High": return "text-yield-high";
      default: return "text-muted-foreground";
    }
  };

  const getAPYColor = (apy: number) => {
    if (apy > 20) return "text-yield-high";
    if (apy > 10) return "text-yield-medium";
    return "text-yield-low";
  };

  return (
    <Card className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-protocol-bg rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">{logo}</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{project}</h3>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {chain}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">APY</p>
            <p className={`text-2xl font-bold ${getAPYColor(apy)}`}>
              {apy.toFixed(2)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">TVL</p>
            <p className="text-lg font-semibold text-foreground">{tvl}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Risk:</span>
            <span className={`text-sm font-medium ${getRiskColor(risk)}`}>
              {risk}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-primary">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+12.3% (24h)</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1" size="sm">
            Deposit
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default YieldCard;