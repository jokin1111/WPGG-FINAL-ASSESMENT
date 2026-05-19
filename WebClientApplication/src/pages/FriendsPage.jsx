import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  deleteFriend,
  getFriendRequests,
  getFriends,
  rejectFriendRequest,
} from '../api/friendsApi';

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadSocialData = async () => {
    try {
      setError('');

      const [friendsData, requestsData] = await Promise.all([
        getFriends(),
        getFriendRequests(),
      ]);

      setFriends(friendsData);
      setReceivedRequests(requestsData.received || []);
      setSentRequests(requestsData.sent || []);
    } catch (err) {
      setError('Failed to load friends and requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSocialData();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      setError('');
      setSuccessMessage('');

      await acceptFriendRequest(requestId);

      setSuccessMessage('Friend request accepted.');
      await loadSocialData();
    } catch (err) {
      setError('Failed to accept friend request.');
    }
  };

  const handleReject = async (requestId) => {
    try {
      setError('');
      setSuccessMessage('');

      await rejectFriendRequest(requestId);

      setSuccessMessage('Friend request rejected.');
      await loadSocialData();
    } catch (err) {
      setError('Failed to reject friend request.');
    }
  };

  const handleCancel = async (requestId) => {
    const confirmed = window.confirm('Cancel this friend request?');

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccessMessage('');

      await cancelFriendRequest(requestId);

      setSuccessMessage('Friend request cancelled.');
      await loadSocialData();
    } catch (err) {
      setError('Failed to cancel friend request.');
    }
  };

  const handleDeleteFriend = async (friendRecordId) => {
    const confirmed = window.confirm('Remove this friend?');

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccessMessage('');

      await deleteFriend(friendRecordId);

      setSuccessMessage('Friend removed successfully.');
      await loadSocialData();
    } catch (err) {
      setError('Failed to remove friend.');
    }
  };

  return (
    <div className="page">
      <Navbar />

      <header className="page-header">
        <h1>Friends & Requests</h1>
        <p>
          Manage your accepted friends, incoming friend requests and outgoing
          requests from one place.
        </p>
      </header>

      {loading && <p>Loading friends and requests...</p>}
      {error && <p className="message-error">{error}</p>}
      {successMessage && <p className="message-success">{successMessage}</p>}

      {!loading && (
        <>
          <section className="section-title">
            <h2>My Friends</h2>

            {friends.length === 0 && (
              <div className="empty-state">
                You do not have any friends yet.
              </div>
            )}

            <div className="card-grid">
              {friends.map((friend) => (
                <article key={friend.id} className="card">
                  <h3 className="card-title">
                    {friend.friend_user?.name || 'Unknown user'}
                  </h3>

                  <div className="card-meta">
                    <p>
                      <strong>Email:</strong>{' '}
                      {friend.friend_user?.email || 'Not available'}
                    </p>
                  </div>

                  <div className="button-row">
                    <button
                      type="button"
                      className="button-danger"
                      onClick={() => handleDeleteFriend(friend.id)}
                    >
                      Remove Friend
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-title">
            <h2>Received Requests</h2>

            {receivedRequests.length === 0 && (
              <div className="empty-state">
                You have no pending received requests.
              </div>
            )}

            <div className="card-grid">
              {receivedRequests.map((request) => (
                <article key={request.id} className="card">
                  <h3 className="card-title">
                    {request.sender?.name || 'Unknown user'}
                  </h3>

                  <div className="card-meta">
                    <p>
                      <strong>Email:</strong>{' '}
                      {request.sender?.email || 'Not available'}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className="status-warning">
                        {request.status}
                      </span>
                    </p>
                  </div>

                  <div className="button-row">
                    <button
                      type="button"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-title">
            <h2>Sent Requests</h2>

            {sentRequests.length === 0 && (
              <div className="empty-state">
                You have no pending sent requests.
              </div>
            )}

            <div className="card-grid">
              {sentRequests.map((request) => (
                <article key={request.id} className="card">
                  <h3 className="card-title">
                    {request.receiver?.name || 'Unknown user'}
                  </h3>

                  <div className="card-meta">
                    <p>
                      <strong>Email:</strong>{' '}
                      {request.receiver?.email || 'Not available'}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className="status-warning">
                        {request.status}
                      </span>
                    </p>
                  </div>

                  <div className="button-row">
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => handleCancel(request.id)}
                    >
                      Cancel Request
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}