import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const storedAdmin = localStorage.getItem('gradevault_admin');
    if (storedAdmin) {
      try {
        const { token } = JSON.parse(storedAdmin);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        // Invalid stored data
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('gradevault_admin');
      if (window.location.pathname.startsWith('/admin/dashboard') ||
          window.location.pathname.startsWith('/admin/manage')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ========== Student APIs ==========
export const studentAPI = {
  getAll: (params) => api.get('/students', { params }),
  getByRoll: (rollNumber) => api.get(`/students/${rollNumber}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

// ========== Subject APIs ==========
export const subjectAPI = {
  getAll: () => api.get('/subjects'),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
};

// ========== Result APIs ==========
export const resultAPI = {
  getAll: (params) => api.get('/results', { params }),
  getById: (id) => api.get(`/results/${id}`),
  getByRollNumber: (rollNumber, params) =>
    api.get(`/results/student/${rollNumber}`, { params }),
  create: (data) => api.post('/results', data),
  update: (id, data) => api.put(`/results/${id}`, data),
  delete: (id) => api.delete(`/results/${id}`),
};

// ========== Admin APIs ==========
export const adminAPI = {
  login: (data) => api.post('/admin/login', data),
  register: (data) => api.post('/admin/register', data),
  getProfile: () => api.get('/admin/profile'),
  getStats: () => api.get('/admin/stats'),
};

export default api;
