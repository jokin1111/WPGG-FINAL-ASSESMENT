import api from './axios';

export const getFriendRequests = async () => {
  const response = await api.get('/friend-requests');
  return response.data;
};

export const sendFriendRequest = async (receiverId) => {
  const response = await api.post('/friend-requests', {
    receiver_id: receiverId,
  });

  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await api.patch(`/friend-requests/${requestId}/accept`);
  return response.data;
};

export const rejectFriendRequest = async (requestId) => {
  const response = await api.patch(`/friend-requests/${requestId}/reject`);
  return response.data;
};

export const cancelFriendRequest = async (requestId) => {
  const response = await api.delete(`/friend-requests/${requestId}`);
  return response.data;
};

export const getFriends = async () => {
  const response = await api.get('/friends');
  return response.data;
};

export const deleteFriend = async (friendRecordId) => {
  const response = await api.delete(`/friends/${friendRecordId}`);
  return response.data;
};