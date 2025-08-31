import React, { useState, useEffect } from 'react';

const APYDashboard = () => {
  const [aaveAPY, setAaveAPY] = useState(null);
  const [compoundAPY, setCompoundAPY] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // These are public endpoints for The Graph's hosted service on Sepolia
  const aaveEndpoint = 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-sepolia';
  const compoundEndpoint = 'https://api.thegraph.com/subgraphs/name/messari/compound-v3-sepolia';

  useEffect(() => {
    const fetchApyData = async () => {
      try {
        // Fetch Aave APY
        const aaveResponse = await fetch(aaveEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetAaveAPY {
                reserves(where: { symbol: "USDC" }) {
                  supplyAPY
                }
              }
            `,
          }),
        });
        const aaveData = await aaveResponse.json();
        const apyFromWei = aaveData.data.reserves[0].supplyAPY / 1e27;
        setAaveAPY((apyFromWei * 100).toFixed(2));
        
        // Fetch Compound APY
        const compoundResponse = await fetch(compoundEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetCompoundAPY {
                markets(where: { name: "Compound USDC" }) {
                  supplyRate
                }
              }
            `,
          }),
        });
        const compoundData = await compoundResponse.json();
        const compoundRate = compoundData.data.markets[0].supplyRate;
        setCompoundAPY((compoundRate * 100).toFixed(2));
        
      } catch (err) {
        setError("Failed to fetch APY data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApyData();
  }, []); // The empty array ensures this runs only once

  if (loading) {
    return <div>Loading real-time APYs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function App() {
  return (
    <div>
      {/* Your other page content goes here */}
      <APYDashboard />
    </div>
  );
}
};

export default APYDashboard;