import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap } from "lucide-react";
const Hero = () => {
  return <section className="bg-gradient-hero py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Maximize Your DeFi Returns</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover the highest yield opportunities across all major DeFi protocols. 
          Compare APYs, analyze risks, and optimize your farming strategy.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="shadow-glow-primary">
            <TrendingUp className="mr-2 h-5 w-5" />
            Explore Yields
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Best Yields</h3>
            <p className="text-muted-foreground">Find the highest APY opportunities across 50+ protocols</p>
          </div>
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Risk Analysis</h3>
            <p className="text-muted-foreground">Smart contract audits and risk scoring for every pool</p>
          </div>
          <div className="text-center">
            <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Auto-Compound</h3>
            <p className="text-muted-foreground">Automated strategies to maximize your returns</p>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;