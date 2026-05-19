import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { deletePost, getAllPosts, getMyPosts } from '../api/postsApi';

export default function PostsPage() {
  const [allPosts, setAllPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [rankFilter, setRankFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadPosts = async () => {
    try {
      setError('');

      const [allPostsData, myPostsData] = await Promise.all([
        getAllPosts(),
        getMyPosts(),
      ]);

      setAllPosts(allPostsData);
      setMyPosts(myPostsData);
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const query = searchTerm.trim().toLowerCase();

      const searchableText = [
        post.title,
        post.description,
        post.queue_type,
        post.preferred_role,
        post.rank_tier,
        post.region,
        post.status,
        post.user?.name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = query === '' || searchableText.includes(query);
      const matchesRole = roleFilter === '' || post.preferred_role === roleFilter;
      const matchesRank = rankFilter === '' || post.rank_tier === rankFilter;
      const matchesRegion = regionFilter === '' || post.region === regionFilter;
      const matchesStatus = statusFilter === '' || post.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesRank &&
        matchesRegion &&
        matchesStatus
      );
    });
  }, [allPosts, searchTerm, roleFilter, rankFilter, regionFilter, statusFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('');
    setRankFilter('');
    setRegionFilter('');
    setStatusFilter('');
  };

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccessMessage('');

      await deletePost(postId);

      setAllPosts(allPosts.filter((post) => post.id !== postId));
      setMyPosts(myPosts.filter((post) => post.id !== postId));

      setSuccessMessage('Post deleted successfully.');
    } catch (err) {
      setError('Failed to delete post.');
    }
  };

  return (
    <div className="page">
      <Navbar />

      <header className="page-header">
        <h1>Posts</h1>
        <p>
          Browse matchmaking posts, filter opportunities, and manage your own
          posts from one place.
        </p>

        <div className="page-actions">
          <Link to="/create-post">
            <button type="button">Create New Post</button>
          </Link>
        </div>
      </header>

      {error && <p className="message-error">{error}</p>}
      {successMessage && <p className="message-success">{successMessage}</p>}

      <section className="filter-panel">
        <h2>Browse Posts</h2>

        <label>
          Search
          <input
            type="text"
            placeholder="Search by title, description, queue, author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <div className="filter-grid">
          <label>
            Role
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Any role</option>
              <option value="Top">Top</option>
              <option value="Jungle">Jungle</option>
              <option value="Mid">Mid</option>
              <option value="ADC">ADC</option>
              <option value="Support">Support</option>
            </select>
          </label>

          <label>
            Rank
            <select
              value={rankFilter}
              onChange={(e) => setRankFilter(e.target.value)}
            >
              <option value="">Any rank</option>
              <option value="Iron">Iron</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="Emerald">Emerald</option>
              <option value="Diamond">Diamond</option>
              <option value="Master">Master</option>
              <option value="Grandmaster">Grandmaster</option>
              <option value="Challenger">Challenger</option>
            </select>
          </label>

          <label>
            Region
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="">Any region</option>
              <option value="EUW">EUW</option>
              <option value="EUNE">EUNE</option>
              <option value="NA">NA</option>
              <option value="KR">KR</option>
              <option value="BR">BR</option>
              <option value="LAN">LAN</option>
              <option value="LAS">LAS</option>
            </select>
          </label>

          <label>
            Status
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Any status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </label>
        </div>

        <div className="page-actions">
          <button
            type="button"
            onClick={clearFilters}
            className="button-secondary"
          >
            Clear Filters
          </button>
        </div>
      </section>

      {loading && <p>Loading posts...</p>}

      {!loading && (
        <>
          <p className="result-count">
            Showing {filteredPosts.length} of {allPosts.length} posts.
          </p>

          {filteredPosts.length === 0 && (
            <div className="empty-state">
              No posts match your filters.
            </div>
          )}

          <div className="card-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="card">
                <h2 className="card-title">{post.title}</h2>
                <p className="card-description">{post.description}</p>

                <div className="card-meta">
                  <p><strong>Queue:</strong> {post.queue_type}</p>
                  <p><strong>Role needed:</strong> {post.preferred_role}</p>
                  <p><strong>Rank:</strong> {post.rank_tier}</p>
                  <p><strong>Region:</strong> {post.region}</p>
                  <p><strong>Mic required:</strong> {post.mic_required ? 'Yes' : 'No'}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`status-pill status-pill-${post.status}`}>
                      {post.status}
                    </span>
                  </p>

                  {post.user && (
                    <p><strong>Author:</strong> {post.user.name}</p>
                  )}
                </div>
              </article>
            ))}
          </div>

          <section className="section-title">
            <h2>My Posts</h2>
            <p className="muted">
              Manage the posts you have created.
            </p>

            {myPosts.length === 0 && (
              <div className="empty-state">
                You have not created any posts yet.
              </div>
            )}

            <div className="card-grid">
              {myPosts.map((post) => (
                <article key={post.id} className="card">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-description">{post.description}</p>

                  <div className="card-meta">
                    <p><strong>Queue:</strong> {post.queue_type}</p>
                    <p><strong>Role needed:</strong> {post.preferred_role}</p>
                    <p><strong>Rank:</strong> {post.rank_tier}</p>
                    <p><strong>Region:</strong> {post.region}</p>
                    <p><strong>Mic required:</strong> {post.mic_required ? 'Yes' : 'No'}</p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`status-pill status-pill-${post.status}`}>
                        {post.status}
                      </span>
                    </p>
                  </div>

                  <div className="button-row">
                    <Link to={`/edit-post/${post.id}`}>
                      <button type="button">Edit</button>
                    </Link>

                    <button
                      type="button"
                      className="button-danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
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