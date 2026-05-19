import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { getMyPosts } from '../api/postsApi';
import { getFriends, getFriendRequests } from '../api/friendsApi';
import { getPlayers } from '../api/playersApi';

export default function DashboardPage() {
  const { user } = useAuth();

  const [myPosts, setMyPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState({
    received: [],
    sent: [],
  });
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const profile = user?.player_profile;

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [postsData, friendsData, requestsData, playersData] =
          await Promise.all([
            getMyPosts(),
            getFriends(),
            getFriendRequests(),
            getPlayers(),
          ]);

        setMyPosts(postsData);
        setFriends(friendsData);
        setFriendRequests(requestsData);
        setPlayers(playersData);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const profileCompletion = useMemo(() => {
    if (!profile) {
      return 0;
    }

    const fields = [
      profile.summoner_name,
      profile.riot_region,
      profile.preferred_role,
      profile.secondary_role,
      profile.rank_tier,
      profile.bio,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round((completed / fields.length) * 100);
  }, [profile]);

  const pendingReceivedCount = friendRequests.received?.length || 0;
  const recommendedPlayersCount = players.filter(
    (player) => !player.is_friend && !player.pending_request
  ).length;

  const recentPosts = myPosts.slice(0, 3);

  return (
    <div className="page">
      <Navbar />

      <header className="page-header">
        <h1>Dashboard</h1>
        <p>
          Welcome back, {user?.name}. Manage your profile, posts and player
          connections from one place.
        </p>
      </header>

      {error && <p className="message-error">{error}</p>}
      {loading && <p>Loading dashboard...</p>}

      {!loading && (
        <>
          <section className="two-column-layout">
            <article className="card">
              <h2>Your Player Profile</h2>

              <div className="card-meta">
                <p>
                  <strong>Summoner:</strong>{' '}
                  {profile?.summoner_name || 'Not set'}
                </p>
                <p>
                  <strong>Region:</strong> {profile?.riot_region || 'Not set'}
                </p>
                <p>
                  <strong>Main role:</strong>{' '}
                  {profile?.preferred_role || 'Not set'}
                </p>
                <p>
                  <strong>Rank:</strong> {profile?.rank_tier || 'Not set'}
                </p>
                <p>
                  <strong>Profile completion:</strong> {profileCompletion}%
                </p>
              </div>

              <div className="button-row">
                <Link to="/profile">
                  <button type="button">Edit Profile</button>
                </Link>
              </div>
            </article>

            <article className="card">
              <h2>Quick Actions</h2>
              <p className="muted">
                Jump directly to the most important areas of the application.
              </p>

              <div className="button-row">
                <Link to="/players">
                  <button type="button">Find Players</button>
                </Link>

                <Link to="/create-post">
                  <button type="button">Create Post</button>
                </Link>

                <Link to="/friend-requests">
                  <button type="button" className="button-secondary">
                    Friend Requests
                  </button>
                </Link>
              </div>
            </article>
          </section>

          <section className="card-grid">
            <div className="card">
              <h3>My Posts</h3>
              <p className="result-count">{myPosts.length}</p>
            </div>

            <div className="card">
              <h3>Friends</h3>
              <p className="result-count">{friends.length}</p>
            </div>

            <div className="card">
              <h3>Pending Requests</h3>
              <p className="result-count">{pendingReceivedCount}</p>
            </div>

            <div className="card">
              <h3>Recommended Players</h3>
              <p className="result-count">{recommendedPlayersCount}</p>
            </div>
          </section>

          <section className="section-title">
            <h2>Recent Posts</h2>

            {recentPosts.length === 0 && (
              <div className="empty-state">
                You have not created any posts yet.
              </div>
            )}

            <div className="card-grid">
              {recentPosts.map((post) => (
                <article key={post.id} className="card">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-description">{post.description}</p>

                  <div className="card-meta">
                    <p>
                      <strong>Queue:</strong> {post.queue_type}
                    </p>
                    <p>
                      <strong>Role:</strong> {post.preferred_role}
                    </p>
                    <p>
                      <strong>Rank:</strong> {post.rank_tier}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`status-pill status-pill-${post.status}`}>
                        {post.status}
                      </span>
                    </p>
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