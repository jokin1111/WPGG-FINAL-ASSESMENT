import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  rejectFriendRequest,
} from '../api/friendsApi';

export default function FriendRequestsPage() {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadRequests = async () => {
    try {
      setError('');
      const data = await getFriendRequests();

      setReceived(data.received || []);
      setSent(data.sent || []);
    } catch (err) {
      setError('Failed to load friend requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      setSuccessMessage('Friend request accepted.');
      await loadRequests();
    } catch (err) {
      setError('Failed to accept friend request.');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      setSuccessMessage('Friend request rejected.');
      await loadRequests();
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
      await cancelFriendRequest(requestId);
      setSuccessMessage('Friend request cancelled.');
      await loadRequests();
    } catch (err) {
      setError('Failed to cancel friend request.');
    }
  };

  return (
    <div className="page">
      <Navbar />

      <h1>Friend Requests</h1>
      <p>Manage received and sent friend requests.</p>

      {loading && <p>Loading friend requests...</p>}
      {error && <p className="message-error">{error}</p>}
      {successMessage && <p className="message-success">{successMessage}</p>}

      {!loading && (
        <>
          <section className="section-title">
            <h2>Received Requests</h2>

            {received.length === 0 && <p>No received requests.</p>}

            <div style={{ display: 'grid', gap: '1rem' }}>
              {received.map((request) => (
                <article
                  key={request.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '1rem',
                  }}
                >
                  <p>
                    <strong>From:</strong> {request.sender?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {request.sender?.email}
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>

                  {request.status === 'pending' && (
                    <div className="button-row">
                      <button onClick={() => handleAccept(request.id)}>Accept</button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="button-secondary"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="section-title">
            <h2>Sent Requests</h2>

            {sent.length === 0 && <p>No sent requests.</p>}

            <div className="card-grid">
              {sent.map((request) => (
                <article
                  key={request.id}
                  className="card"
                >
                  <p>
                    <strong>To:</strong> {request.receiver?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {request.receiver?.email}
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>

                  {request.status === 'pending' && (
                    <button onClick={() => handleCancel(request.id)}>
                      Cancel Request
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}