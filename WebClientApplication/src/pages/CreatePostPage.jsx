import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createPost } from '../api/postsApi';

export default function CreatePostPage() {
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

  const [error, setError] = useState('');

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
      await createPost(form);
      navigate('/my-posts');
    } catch (err) {
      setError('Failed to create post. Please check the form.');
    }
  };

  return (
    <div className="page">
      <Navbar />

      <h1>Create Post</h1>
      <p>Create a matchmaking post to find other players.</p>

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
          Create Post
        </button>
      </form>
    </div>
  );
}