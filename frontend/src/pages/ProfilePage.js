import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../api/auth';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await getCurrentUser(token);
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        setError('Failed to fetch user data. Please log in again.');
                    }
                } catch (err) {
                    setError('An error occurred while fetching user data.');
                }
            }
        };

        fetchUser();
    }, [token]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
        </div>
    );
}

export default ProfilePage;