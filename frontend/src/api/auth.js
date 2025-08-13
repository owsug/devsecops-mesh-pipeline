const API_BASE_URL = '/api/auth';

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

export const loginUser = async (username, password) => {
  const formBody = new URLSearchParams();
  formBody.append('username', username);
  formBody.append('password', password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody,
  });
  return response;
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response;
};