import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { themeUtils } from './utils/themeUtils';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize theme on app load
    themeUtils.initializeTheme();
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;