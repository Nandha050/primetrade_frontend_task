import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth requests
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    return api.put('/auth/profile', data, isFormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : undefined);
  },
};

// Recipe requests
export const recipeAPI = {
  createRecipe: (data) => {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    return api.post('/recipes', data, isFormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : undefined);
  },
  getRecipes: (params) => api.get('/recipes', { params }),
  getRecipeById: (id) => api.get(`/recipes/${id}`),
  updateRecipe: (id, data) => {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    return api.put(`/recipes/${id}`, data, isFormData ? {
      headers: { 'Content-Type': 'multipart/form-data' }
    } : undefined);
  },
  deleteRecipe: (id) => api.delete(`/recipes/${id}`),
};

export default api;
