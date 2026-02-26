import api from './client';

export const improveWithAiApi = (payload) => api.post('/ai/improve', payload);
export const summarizeWithAiApi = (payload) => api.post('/ai/summary', payload);
export const suggestTagsAiApi = (payload) => api.post('/ai/tags', payload);
