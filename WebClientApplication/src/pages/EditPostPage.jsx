import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getPost, updatePost } from '../api/postsApi';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    queue_type: 'Ranked Duo',
    preferred_role: 'ADC',
    rank_tier: 'Gold',
    region: 'EUW',
    mic_required: false,
    status: 'active',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await getPost(id);

        setForm({
          title: data.title || '',
          description: data.description || '',
          queue_type: data.queue_type || 'Ranked Duo',
          preferred_role: data.preferred_role || 'ADC',
          rank_tier: data.rank_tier || 'Gold',
          region: data.region || 'EUW',
          mic_required: Boolean(data.mic_required),
          status: data.status || 'active',
        });
      } catch (err) {
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updatePost(id, form);
      navigate('/my-posts');
    } catch (err) {
      setError('Failed to update post. Make sure this post belongs to you.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Navbar />
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />

      <h1>Edit Post</h1>
      <p>Update your matchmaking post.</p>

      {error && <p className="message-error">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="form-card form-wide"
      >
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Queue Type
          <select
            name="queue_type"
            value={form.queue_type}
            onChange={handleChange}
          >
            <option value="Ranked Duo">Ranked Duo</option>
            <option value="Normal Draft">Normal Draft</option>
            <option value="Flex Queue">Flex Queue</option>
            <option value="Clash">Clash</option>
          </select>
        </label>

        <label>
          Preferred Role
          <select
            name="preferred_role"
            value={form.preferred_role}
            onChange={handleChange}
          >
            <option value="Top">Top</option>
            <option value="Jungle">Jungle</option>
            <option value="Mid">Mid</option>
            <option value="ADC">ADC</option>
            <option value="Support">Support</option>
          </select>
        </label>

        <label>
          Rank Tier
          <select
            name="rank_tier"
            value={form.rank_tier}
            onChange={handleChange}
          >
            <option value="Iron">Iron</option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Emerald">Emerald</option>
            <option value="Diamond">Diamond</option>
            <option value="Master">Master</option>
          </select>
        </label>

        <label>
          Region
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
          >
            <option value="EUW">EUW</option>
            <option value="EUNE">EUNE</option>
            <option value="NA">NA</option>
            <option value="KR">KR</option>
          </select>
        </label>

        <label className="form-checkbox">
          <input
            type="checkbox"
            name="mic_required"
            checked={form.mic_required}
            onChange={handleChange}
          />
          Mic required
        </label>

        <label>
          Status
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </label>

        <button type="submit">
          Update Post
        </button>
      </form>
    </div>
  );
}