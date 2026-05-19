import api from './axios';

export const getAllPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getMyPosts = async () => {
  const response = await api.get('/my-posts');
  return response.data;
};

export const getPost = async (postId) => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const response = await api.put(`/posts/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};