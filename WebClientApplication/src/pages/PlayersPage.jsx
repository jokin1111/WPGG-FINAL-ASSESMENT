import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { getPlayers } from '../api/playersApi';
import { sendFriendRequest } from '../api/friendsApi';

export default function PlayersPage() {
    const [players, setPlayers] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [rankFilter, setRankFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState('');
    const [friendshipFilter, setFriendshipFilter] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loadPlayers = async () => {
        try {
            setError('');
            const data = await getPlayers();
            setPlayers(data);
        } catch (err) {
            setError('Failed to load players.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlayers();
    }, []);

    const filteredPlayers = useMemo(() => {
        return players.filter((player) => {
            const profile = player.player_profile || {};
            const query = searchTerm.trim().toLowerCase();

            const searchableText = [
                player.name,
                player.email,
                profile.summoner_name,
                profile.riot_region,
                profile.preferred_role,
                profile.secondary_role,
                profile.rank_tier,
                profile.bio,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            const matchesSearch = query === '' || searchableText.includes(query);

            const matchesRole =
                roleFilter === '' ||
                profile.preferred_role === roleFilter ||
                profile.secondary_role === roleFilter;

            const matchesRank =
                rankFilter === '' || profile.rank_tier === rankFilter;

            const matchesRegion =
                regionFilter === '' || profile.riot_region === regionFilter;

            const matchesFriendship =
                friendshipFilter === '' ||
                (friendshipFilter === 'friends' && player.is_friend) ||
                (friendshipFilter === 'pending' && player.pending_request) ||
                (friendshipFilter === 'available' &&
                    !player.is_friend &&
                    !player.pending_request);

            return (
                matchesSearch &&
                matchesRole &&
                matchesRank &&
                matchesRegion &&
                matchesFriendship
            );
        });
    }, [
        players,
        searchTerm,
        roleFilter,
        rankFilter,
        regionFilter,
        friendshipFilter,
    ]);

    const clearFilters = () => {
        setSearchTerm('');
        setRoleFilter('');
        setRankFilter('');
        setRegionFilter('');
        setFriendshipFilter('');
    };

    const handleSendRequest = async (receiverId) => {
        try {
            setError('');
            setSuccessMessage('');

            await sendFriendRequest(receiverId);

            setSuccessMessage('Friend request sent successfully.');
            await loadPlayers();
        } catch (err) {
            const message =
                err.response?.data?.message || 'Failed to send friend request.';

            setError(message);
        }
    };

    const isFiltering =
        searchTerm.trim() !== '' ||
        roleFilter !== '' ||
        rankFilter !== '' ||
        regionFilter !== '' ||
        friendshipFilter !== '';

    return (
        <div className="page">
            <Navbar />

            <h1>Find Players</h1>
            <p>
                Discover recommended players or search by name, summoner name, role,
                rank, region, or friendship status.
            </p>

            <section className="filter-panel">
                <h2>Search and Filters</h2>

                <label>
                    Search players
                    <input
                        type="text"
                        placeholder="Search by name, summoner, role, rank or region..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '0.6rem',
                            marginTop: '0.4rem',
                            boxSizing: 'border-box',
                        }}
                    />
                </label>

                <div
                    style={{
                        display: 'grid',
                        gap: '1rem',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    }}
                >
                    <label>
                        Role
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.5rem',
                                boxSizing: 'border-box',
                            }}
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
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.5rem',
                                boxSizing: 'border-box',
                            }}
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
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.5rem',
                                boxSizing: 'border-box',
                            }}
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
                        Relationship
                        <select
                            value={friendshipFilter}
                            onChange={(e) => setFriendshipFilter(e.target.value)}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.5rem',
                                boxSizing: 'border-box',
                            }}
                        >
                            <option value="">Any</option>
                            <option value="available">Available to add</option>
                            <option value="pending">Pending request</option>
                            <option value="friends">Already friends</option>
                        </select>
                    </label>
                </div>

                <button type="button" onClick={clearFilters}>
                    Clear Filters
                </button>
            </section>

            {loading && <p>Loading players...</p>}
            {error && <p className="message-error">{error}</p>}
            {successMessage && <p className="message-success">{successMessage}</p>}

            {!loading && (
                <>
                    <h2 style={{ marginTop: '2rem' }}>
                        {isFiltering ? 'Search Results' : 'Recommended Players'}
                    </h2>

                    <p>
                        Showing {filteredPlayers.length} of {players.length} players.
                    </p>

                    {filteredPlayers.length === 0 && (
                        <p>
                            {isFiltering
                                ? 'No players match your search or filters.'
                                : 'No recommended players found.'}
                        </p>
                    )}

                    <div className="card-grid">
                        {filteredPlayers.map((player) => (
                            <article
                                key={player.id}
                                className="card"
                            >
                                <h3>{player.name}</h3>
                                <p>
                                    <strong>Email:</strong> {player.email}
                                </p>

                                {player.player_profile ? (
                                    <div>
                                        <p>
                                            <strong>Summoner:</strong>{' '}
                                            {player.player_profile.summoner_name || 'Not set'}
                                        </p>
                                        <p>
                                            <strong>Region:</strong>{' '}
                                            {player.player_profile.riot_region || 'Not set'}
                                        </p>
                                        <p>
                                            <strong>Main role:</strong>{' '}
                                            {player.player_profile.preferred_role || 'Not set'}
                                        </p>
                                        <p>
                                            <strong>Secondary role:</strong>{' '}
                                            {player.player_profile.secondary_role || 'Not set'}
                                        </p>
                                        <p>
                                            <strong>Rank:</strong>{' '}
                                            {player.player_profile.rank_tier || 'Not set'}
                                        </p>
                                        <p className="card-description">
                                            <strong>Bio:</strong> {player.player_profile.bio || 'No bio provided'}
                                        </p>
                                    </div>
                                ) : (
                                    <p>No player profile available.</p>
                                )}

                                {player.is_friend && (
                                    <p className="message-success">Already friends</p>
                                )}

                                {!player.is_friend && player.pending_request && (
                                    <p className="message-pending">Friend request pending</p>
                                )}

                                {!player.is_friend && !player.pending_request && (
                                    <button onClick={() => handleSendRequest(player.id)}>
                                        Send Friend Request
                                    </button>
                                )}
                            </article>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}