import api from './axios';

export const getPlayers = async () => {
  const response = await api.get('/players');
  return response.data;
};