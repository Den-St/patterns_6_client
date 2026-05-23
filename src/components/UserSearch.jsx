import { useState, useCallback, useEffect, useRef } from "react";
import { api } from "../api.js";
import { debounce } from "../utils/debounce.js";
import { throttle } from "../utils/throttle.js";

/**
 * Reusable user search component for admin & super admin pages.
 * - Uses DEBOUNCE for live search-as-you-type (300ms delay)
 * - Uses THROTTLE to limit how often window resize info updates (500ms)
 */
export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // --- Debounced live search ---
  const performSearch = async (searchQuery) => {
    setError(null);
    setLoading(true);
    try {
      const results = searchQuery
        ? await api.searchUsers(searchQuery)
        : await api.getAllUsers();
      setUsers(results);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search: waits 300ms after user stops typing
  const debouncedSearch = useRef(
    debounce((value) => performSearch(value), 300)
  ).current;

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value.trim());
  };

  // Manual submit still works immediately
  const handleSearch = async (e) => {
    e.preventDefault();
    debouncedSearch.cancel();
    performSearch(query.trim());
  };

  // --- Throttled window resize tracking ---
  useEffect(() => {
    const throttledResize = throttle(() => {
      setWindowWidth(window.innerWidth);
      console.log(`[THROTTLE] Window resized: ${window.innerWidth}px`);
    }, 500);

    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
      throttledResize.cancel();
    };
  }, []);

  return (
    <section className="card">
      <h2>Search Users</h2>
      <p className="muted" style={{ fontSize: "0.8rem" }}>
        Window width (throttled): {windowWidth}px • Live search (debounced 300ms)
      </p>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type to search by nickname (debounced)"
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
