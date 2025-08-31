import React, { useState, useEffect } from 'react';
import YieldCard from "./YieldCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as lucideReact from "lucide-react";

const YieldGrid = () => {
  // State variables to manage API data, loading status, and errors
  const [yields, setYields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yields.llama.fi/pools');
        
        if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        
        setYields(responseData.data); 
        setError(null);

      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // <-- This empty array is crucial

  // Conditional rendering based on the component's state
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <p>Error: {error}</p>
        <p>Please check your network connection or API URL.</p>
      </div>
    );
  }

  // Render the grid with the fetched data
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Yield Opportunities</h2>
            <p className="text-muted-foreground">
              Showing {yields.length} protocols with live APY data
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Select defaultValue="apy">
              <SelectTrigger className="w-40">
                <lucideReact.SortDesc className="mr-2 h-4 w-4" />
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
                <lucideReact.Filter className="mr-2 h-4 w-4" />
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
        {yields && Array.isArray(yields) && yields.length > 0 ? (
         yields.slice(0, 15).map((yieldData, index) => (
        <YieldCard key={index} {...yieldData} />
          ))
        ) : (
          <p>No yield data available.</p>
        )}
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