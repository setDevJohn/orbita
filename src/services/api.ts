import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL; 

if (!apiBaseUrl) {
  throw new Error('Variável de ambiente VITE_API_URL não encontrada!');
}

export const api = axios.create({ baseURL: apiBaseUrl });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});