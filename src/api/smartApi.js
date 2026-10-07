import { TOKEN_KEY, LEGACY_TOKEN_KEY } from './client';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  }
  if (!response.ok) throw new Error(data.message || 'Smart feature request failed');
  return data;
};

export const smartSearch = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== '') query.set(key, value); });
  return request(`/smart/search?${query.toString()}`);
};

export const recommendCars = (preferences) => request('/smart/recommend', { method: 'POST', body: JSON.stringify(preferences) });
export const compareCars = (ids) => request('/smart/compare', { method: 'POST', body: JSON.stringify({ ids }) });
export const askCarAssistant = (message) => request('/smart/assistant', { method: 'POST', body: JSON.stringify({ message }) });
