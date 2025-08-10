import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL; 

if (!apiBaseUrl) {
  throw new Error('Variável de ambiente VITE_API_URL não encontrada!');
}

export const api = axios.create({ 
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // logout();
    }
    return Promise.reject(error);
  }
);