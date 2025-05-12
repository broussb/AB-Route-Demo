const { useState } = React;

function RouteSelector() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeHistory, setRouteHistory] = useState([]);
  const [stats, setStats] = useState({});
  const [weights, setWeights] = useState({
    IVA: 95,
    Sierra: 5
  });
  const [showSettings, setShowSettings] = useState(false);

  function getRoute() {
    const paths = weights;
    
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

  const handleWeightChange = (route, value) => {
    const newWeights = { ...weights };
    newWeights[route] = parseInt(value);
    setWeights(newWeights);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
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

  // Calculate distribution percentages
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  const distributionPercentages = {};
  Object.keys(weights).forEach(route => {
    distributionPercentages[route] = Math.round((weights[route] / totalWeight) * 100);
  });

  return (
    <div className="container">
      <h2>Route Selection Demo</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <button 
          onClick={handleGetRoute}
          className="btn-primary"
        >
          Get Random Route
        </button>
        
        <button 
          onClick={clearResults}
          className="btn-secondary"
          style={{ marginRight: "10px" }}
        >
          Clear Results
        </button>
        
        <button 
          onClick={toggleSettings}
          className="btn-secondary"
        >
          {showSettings ? "Hide Settings" : "Show Settings"}
        </button>
      </div>
      
      {showSettings && (
        <div className="settings-panel">
          <h3>Distribution Settings</h3>
          <div className="stats-grid">
            {Object.keys(weights).map(route => (
              <div key={route} className="stats-card">
                <div style={{ fontWeight: "bold" }}>{route}: {distributionPercentages[route]}%</div>
                <input 
                  type="range" 
                  min="1" 
                  max="99" 
                  value={weights[route]} 
                  onChange={(e) => handleWeightChange(route, e.target.value)}
                  style={{ width: "100%", marginTop: "10px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Weight: {weights[route]}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
            Note: The relative weights determine the probability distribution.
          </p>
        </div>
      )}
      
      {selectedRoute && (
        <div className="current-selection">
          <h3>Current Selection:</h3>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1d4ed8" }}>{selectedRoute}</div>
        </div>
      )}
      
      {routeHistory.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Statistics:</h3>
          <div className="stats-grid">
            {Object.keys(stats).map(route => (
              <div key={route} className="stats-card">
                <div style={{ fontWeight: "bold" }}>{route}</div>
                <div style={{ fontSize: "14px" }}>
                  Count: {stats[route]} ({percentages[route]}%)
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${percentages[route]}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {routeHistory.length > 0 && (
        <div>
          <h3>History ({routeHistory.length} selections):</h3>
          <div className="history-container">
            {routeHistory.map((route, index) => (
              <span 
                key={index} 
                className={route === 'IVA' ? 'route-iva' : 'route-sierra'}
              >
                {route}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<RouteSelector />, document.getElementById('root'));
