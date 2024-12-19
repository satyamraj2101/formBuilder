import axios from 'axios';
import { Form, FormResponse, RespondentInfo } from '../types/form';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Auth token handling
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Form APIs
export const getForms = async (): Promise<Form[]> => {
  const response = await api.get('/forms');
  return response.data;
};

export const getForm = async (id: string): Promise<Form> => {
  const response = await api.get(`/forms/${id}`);
  return response.data;
};

export const createForm = async (form: Omit<Form, 'id'>): Promise<Form> => {
  const response = await api.post('/forms', form);
  return response.data.form;
};

export const updateForm = async (id: string, form: Partial<Form>): Promise<Form> => {
  const response = await api.put(`/forms/${id}`, form);
  return response.data.form;
};

export const deleteForm = async (id: string): Promise<void> => {
  await api.delete(`/forms/${id}`);
};

export const toggleFormPublish = async (id: string): Promise<{ isPublished: boolean }> => {
  const response = await api.put(`/forms/${id}/publish`);
  return response.data;
};

// Form Response APIs
export const submitFormResponse = async (
  formId: string,
  responses: FormResponse[],
  respondentInfo: RespondentInfo
): Promise<void> => {
  await api.post(`/forms/${formId}/responses`, { responses, respondentInfo });
};

export const getFormResponses = async (formId: string): Promise<any[]> => {
  const response = await api.get(`/forms/${formId}/responses`);
  return response.data;
};

// File Upload API
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/forms/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.fileId;
};

// Auth API
export const loginOrRegister = async (email: string) => {
  const response = await api.post('/users/register-login', { email });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return user;
};