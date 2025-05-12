import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

const RouteSelector = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeHistory, setRouteHistory] = useState([]);
  const [stats, setStats] = useState({});

  function getRoute() {
    const paths = {
      IVA: 95,
      Sierra: 5,
    };
    
    const array = [];
    for (const item in paths) {
      for (let i = 0; i < paths[item]; i++) {
        array.push(item);
      }
    }
    
    return array[Math.floor(Math.random() * array.length)];
  }

  const handleGetRoute = () => {
    const newRoute = getRoute();
    setSelectedRoute(newRoute);
    
    // Add to history
    const newHistory = [...routeHistory, newRoute];
    setRouteHistory(newHistory);
    
    // Update stats
    const newStats = {...stats};
    newStats[newRoute] = (newStats[newRoute] || 0) + 1;
    setStats(newStats);
  };

  const clearResults = () => {
    setSelectedRoute(null);
    setRouteHistory([]);
    setStats({});
  };

  // Calculate percentages for stats
  const total = routeHistory.length;
  const percentages = {};
  Object.keys(stats).forEach(route => {
    percentages[route] = Math.round((stats[route] / total) * 100);
  });

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Route Selection Demo</h2>
      
      <div className="mb-6">
        <button 
          onClick={handleGetRoute}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Get Random Route
        </button>
        
        <button 
          onClick={clearResults}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Clear Results
        </button>
      </div>
      
      {selectedRoute && (
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <h3 className="font-bold mb-2">Current Selection:</h3>
          <div className="text-2xl font-bold text-blue-700">{selectedRoute}</div>
        </div>
      )}
      
      {routeHistory.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold mb-2">Statistics:</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(stats).map(route => (
              <div key={route} className="p-3 border rounded">
                <div className="font-bold">{route}</div>
                <div className="text-sm">
                  Count: {stats[route]} ({percentages[route]}%)
                </div>
                <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{width: `${percentages[route]}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {routeHistory.length > 0 && (
        <div>
          <h3 className="font-bold mb-2">History ({routeHistory.length} selections):</h3>
          <div className="flex flex-wrap gap-2 p-2 border rounded max-h-32 overflow-y-auto">
            {routeHistory.map((route, index) => (
              <span 
                key={index} 
                className={`inline-block px-2 py-1 rounded text-white ${route === 'IVA' ? 'bg-blue-500' : 'bg-green-500'}`}
              >
                {route}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Create a root and render the component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouteSelector />);

// We keep this export for module compatibility, though it's not needed for the standalone version
export default RouteSelector;