import React, { useState } from 'react';
import { loginUser } from '../api/auth'; // Import from the new API file

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        try {
            const response = await loginUser(username, password); // Use the new function
            if (response.ok) {
                const data = await response.json();
                setMessage(`Login Successful!`);
                alert(`Your Token: ${data.access_token}`);
            } else {
                setMessage('Login failed: Incorrect username or password.');
            }
        } catch (error) {
            setMessage('Login failed: Could not connect to the server.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                <button type="submit" style={{ marginTop: '20px' }}>Login</button>
            </form>
            {message && <p style={{ marginTop: '20px' }}>{message}</p>}
        </div>
    );
}

export default LoginPage;