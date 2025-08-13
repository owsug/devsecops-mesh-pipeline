import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DjangoDataPage from './pages/DjangoDataPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '1rem', backgroundColor: '#282c34', width: '100%' }}>
          <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" style={{ color: 'white', marginRight: '1rem' }}>Profile</Link>
              <Link to="/django-data" style={{ color: 'white', marginRight: '1rem' }}>Django Data</Link>
              <button onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, fontSize: '1em' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</Link>
              <Link to="/register" style={{ color: 'white' }}>Register</Link>
            </>
          )}
        </nav>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/profile"
              element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
            />
            <Route
              path="/django-data"
              element={<ProtectedRoute><DjangoDataPage /></ProtectedRoute>}
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;