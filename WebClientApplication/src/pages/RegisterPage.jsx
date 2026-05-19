import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.password_confirmation
      );

      navigate('/');
    } catch (err) {
      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0][0];
        setError(firstError);
      } else {
        setError('Failed to create account. Please check the form.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="muted">
          Register to create posts, find players and manage friend requests.
        </p>

        {error && <p className="message-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="password_confirmation"
              placeholder="Repeat your password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Register</button>
        </form>

        <p className="muted">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}