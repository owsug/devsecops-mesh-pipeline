const API_BASE_URL = '/api/backend';

export const getProtectedData = async (token) => {
    const response = await fetch(`${API_BASE_URL}/protected/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
};