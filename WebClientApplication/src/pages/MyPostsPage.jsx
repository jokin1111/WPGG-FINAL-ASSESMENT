import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { deletePost, getMyPosts } from '../api/postsApi';
import { Link } from 'react-router-dom';

export default function MyPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loadMyPosts = async () => {
        try {
            const data = await getMyPosts();
            setPosts(data);
        } catch (err) {
            setError('Failed to load your posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMyPosts();
    }, []);

    const handleDelete = async (postId) => {
        const confirmed = window.confirm('Are you sure you want to delete this post?');

        if (!confirmed) {
            return;
        }

        try {
            await deletePost(postId);
            setPosts(posts.filter((post) => post.id !== postId));
            setSuccessMessage('Post deleted successfully.');
        } catch (err) {
            setError('Failed to delete post.');
        }
    };

    return (
        <div className="page">
            <Navbar />

            <h1>My Posts</h1>
            <p>Manage the posts you have created.</p>

            {loading && <p>Loading your posts...</p>}

            {error && <p className="message-error">{error}</p>}
            {successMessage && <p className="message-success">{successMessage}</p>}

            {!loading && posts.length === 0 && (
                <p>You have not created any posts yet.</p>
            )}

            <div className="card-grid">
                {posts.map((post) => (
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
                        </div>

                        <div className="button-row">
                            <Link to={`/edit-post/${post.id}`}>
                                <button type="button">Edit</button>
                            </Link>

                            <button
                                type="button"
                                onClick={() => handleDelete(post.id)}
                                className="button-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}