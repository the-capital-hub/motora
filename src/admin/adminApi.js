const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const adminGet = (endpoint) => request(endpoint);
export const adminPost = (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) });
export const adminPatch = (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) });
export const adminDelete = (endpoint) => request(endpoint, { method: 'DELETE' });
