import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getProfile, updateProfile } from '../api/profileApi';

export default function ProfilePage() {
    const [form, setForm] = useState({
        summoner_name: '',
        riot_region: 'EUW',
        preferred_role: 'Support',
        secondary_role: 'Mid',
        rank_tier: 'Gold',
        availability_text: '',
        bio: '',
        is_public: true,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile();
                const profile = data.profile || {};

                setForm({
                    summoner_name: profile.summoner_name || '',
                    riot_region: profile.riot_region || 'EUW',
                    preferred_role: profile.preferred_role || 'Support',
                    secondary_role: profile.secondary_role || 'Mid',
                    rank_tier: profile.rank_tier || 'Gold',
                    availability_text: profile.availability_text || '',
                    bio: profile.bio || '',
                    is_public: Boolean(profile.is_public ?? true),
                });
            } catch (err) {
                setError('Failed to load profile.');
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

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
        setSuccessMessage('');

        try {
            await updateProfile(form);
            setSuccessMessage('Profile updated successfully.');
        } catch (err) {
            setError('Failed to update profile. Please check the form.');
        }
    };

    if (loading) {
        return (
            <div className="page">
                <Navbar />
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="page">
            <Navbar />

            <h1>Player Profile</h1>
            <p>Update your League of Legends player information.</p>

            {error && <p className="message-error">{error}</p>}
            {successMessage && <p className="message-success">{successMessage}</p>}

            <form
                onSubmit={handleSubmit}
                className="form-card form-wide"
            >
                <label>
                    Summoner Name
                    <input
                        type="text"
                        name="summoner_name"
                        value={form.summoner_name}
                        onChange={handleChange}
                        placeholder="Your LoL summoner name"
                    />
                </label>

                <label>
                    Region
                    <select
                        name="riot_region"
                        value={form.riot_region}
                        onChange={handleChange}
                    >
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
                    Secondary Role
                    <select
                        name="secondary_role"
                        value={form.secondary_role}
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
                        <option value="Grandmaster">Grandmaster</option>
                        <option value="Challenger">Challenger</option>
                    </select>
                </label>

                <label>
                    Availability
                    <textarea
                        name="availability_text"
                        value={form.availability_text}
                        onChange={handleChange}
                        placeholder="Example: Weekday evenings, weekends..."
                    />
                </label>

                <label>
                    Bio
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Tell other players about your playstyle."
                    />
                </label>

                <label className="form-checkbox">
                    <input
                        type="checkbox"
                        name="is_public"
                        checked={form.is_public}
                        onChange={handleChange}
                    />
                    Public profile
                </label>

                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
}