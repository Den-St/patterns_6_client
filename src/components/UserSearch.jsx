import { useState } from "react";
import { api } from "../api.js";

/**
 * Reusable user search component for admin & super admin pages.
 */
export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const results = query.trim()
        ? await api.searchUsers(query.trim())
        : await api.getAllUsers();
      setUsers(results);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Search Users</h2>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by nickname (empty = all)"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="message error">{error}</div>}

      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nickname</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nickname}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && !error && <p className="muted">No users to display.</p>
      )}
    </section>
  );
}
