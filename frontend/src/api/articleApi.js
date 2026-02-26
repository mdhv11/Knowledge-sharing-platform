import api from './client';

export const listArticlesApi = (params) => api.get('/articles', { params });
export const getArticleApi = (id) => api.get(`/articles/${id}`);
export const createArticleApi = (payload) => api.post('/articles', payload);
export const updateArticleApi = (id, payload) => api.put(`/articles/${id}`, payload);
export const deleteArticleApi = (id) => api.delete(`/articles/${id}`);
export const listMyArticlesApi = () => api.get('/articles/mine/list');
