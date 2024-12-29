import axios from 'axios';
import { Scheme, User, AIModel, Document } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/admin';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const schemes = {
  getAll: async () => {
    const response = await api.get<Scheme[]>('/schemes');
    return response.data;
  },
  getCount: async () => {
    const response = await api.get<{ count: number }>('/schemes/count');
    return response.data.count;
  },
  create: async (scheme: Omit<Scheme, 'id'>) => {
    const response = await api.post<Scheme>('/schemes', scheme);
    return response.data;
  },
  update: async ({ id, ...scheme }: Scheme) => {
    const response = await api.put<Scheme>(`/schemes/${id}`, scheme);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/schemes/${id}`);
  },
};

export const users = {
  getAll: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  getCount: async () => {
    const response = await api.get<{ count: number }>('/users/count');
    return response.data.count;
  },
  getById: async (id: string) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
  update: async ({ id, ...user }: User) => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  },
};

export const documents = {
  getAll: async () => {
    const response = await api.get<Document[]>('/documents');
    return response.data;
  },
  getCount: async () => {
    const response = await api.get<{ count: number }>('/documents/count');
    return response.data.count;
  },
  verify: async (id: string, status: 'verified' | 'rejected', comments?: string) => {
    const response = await api.post<Document>(`/documents/${id}/verify`, {
      status,
      comments,
    });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/documents/${id}`);
  },
};

export const aiModels = {
  getAll: async () => {
    const response = await api.get<AIModel[]>('/ai-models');
    return response.data;
  },
  update: async ({ id, config }: { id: string; config: any }) => {
    const response = await api.put<AIModel>(`/ai-models/${id}`, config);
    return response.data;
  },
  train: async (modelId: string) => {
    const response = await api.post<AIModel>(`/ai-models/${modelId}/train`);
    return response.data;
  },
};

export default api; 