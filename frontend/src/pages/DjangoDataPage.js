import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProtectedData } from '../api/backend';

function DjangoDataPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const response = await getProtectedData(token);
                    if (response.ok) {
                        const result = await response.json();
                        setData(JSON.stringify(result, null, 2));
                    } else {
                        setError('Failed to fetch protected data from Django.');
                    }
                } catch (err) {
                    setError('An error occurred while fetching data.');
                }
            }
        };

        fetchData();
    }, [token]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!data) {
        return <p>Loading data from Django...</p>;
    }

    return (
        <div>
            <h2>Protected Data from Django</h2>
            <pre style={{ textAlign: 'left', backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '5px', color: '#333' }}>
                <code>{data}</code>
            </pre>
        </div>
    );
}

export default DjangoDataPage;