import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [authMessage, setAuthMessage] = useState("Loading from Auth API...");
  const [backendMessage, setBackendMessage] = useState("Loading from Backend API...");

  useEffect(() => {
    fetch('/api/auth')
      .then(response => response.json())
      .then(data => setAuthMessage(data.message))
      .catch(error => setAuthMessage(`Error: ${error}`));

    fetch('/api/backend')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(error => setBackendMessage(`Error: ${error}`));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: '#61DAFB' }}>
          Message from Auth API: <strong>{authMessage}</strong>
        </p>
        <p style={{ color: '#41B883' }}>
          Message from Backend API: <strong>{backendMessage}</strong>
        </p>
      </header>
    </div>
  );
}

export default App;