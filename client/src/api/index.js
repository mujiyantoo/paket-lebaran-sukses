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

export const getAnggota = () => api('/anggota');
export const createAnggota = (data) => api('/anggota', { method: 'POST', body: JSON.stringify(data) });
export const updateAnggota = (id, data) => api(`/anggota/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAnggota = (id) => api(`/anggota/${id}`, { method: 'DELETE' });

export const getPaket = () => api('/paket');
export const createPaket = (data) => api('/paket', { method: 'POST', body: JSON.stringify(data) });
export const updatePaket = (id, data) => api(`/paket/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deletePaket = (id) => api(`/paket/${id}`, { method: 'DELETE' });

export const getPembayaran = () => api('/pembayaran');
export const createPembayaran = (data) => api('/pembayaran', { method: 'POST', body: JSON.stringify(data) });
export const deletePembayaran = (id) => api(`/pembayaran/${id}`, { method: 'DELETE' });

export const getTabunganBebas = () => api('/tabunganbebas');
export const createTabunganBebas = (data) => api('/tabunganbebas', { method: 'POST', body: JSON.stringify(data) });
export const deleteTabunganBebas = (id) => api(`/tabunganbebas/${id}`, { method: 'DELETE' });