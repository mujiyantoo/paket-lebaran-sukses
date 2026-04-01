const API_URL = process.env.REACT_APP_API_URL || '/api';

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'x-auth-token': token }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || 'Something went wrong');
  return data;
};

export const login = (email, password) => api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const register = (name, email, password) => api('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
export const getUser = () => api('/users/me');