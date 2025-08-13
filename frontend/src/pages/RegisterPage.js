import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // To display success/error messages

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the browser from reloading the page

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`User registered successfully! User ID: ${data.id}`);
      } else {
        // Handle server-side errors (e.g., username already exists)
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('Registration failed: Could not connect to the server.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Register</button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default RegisterPage;