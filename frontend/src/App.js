import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '1rem', backgroundColor: '#282c34', width: '100%' }}>
          <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
          <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
          <Link to="/register" style={{ color: 'white' }}>Register</Link>
        </nav>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;