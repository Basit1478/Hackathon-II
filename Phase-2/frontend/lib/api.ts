import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

console.log('API_URL configured as:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('taskflow_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('taskflow_token');
        localStorage.removeItem('taskflow_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/api/auth/signup', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getTasks: async (userId: string) => {
    const response = await api.get(`/api/${userId}/tasks`);
    return response.data;
  },
  createTask: async (userId: string, data: { title: string; description?: string }) => {
    const response = await api.post(`/api/${userId}/tasks`, data);
    return response.data;
  },
  deleteTask: async (userId: string, taskId: string) => {
    await api.delete(`/api/${userId}/tasks/${taskId}`);
  },
  toggleComplete: async (userId: string, taskId: string) => {
    const response = await api.patch(`/api/${userId}/tasks/${taskId}/complete`);
    return response.data;
  },
};

export default api;
