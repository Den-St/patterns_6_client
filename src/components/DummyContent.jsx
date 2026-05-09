import { useEffect, useState } from "react";

/**
 * Renders dummy content fetched from a role-specific endpoint.
 * Pass a `fetcher` (() => Promise<data>) and an optional `title`.
 */
export default function DummyContent({ title = "Content", fetcher }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="card">
      <div className="card-header">
        <h2>{title}</h2>
        <button onClick={load} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && <div className="message error">{error}</div>}

      {data && (
        <div className="dummy-content">
          <p><strong>Role:</strong> {data.role}</p>
          <p><strong>Message:</strong> {data.message}</p>

          {data.permissions && (
            <>
              <h3>Permissions</h3>
              <ul>
                {data.permissions.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </>
          )}

          {data.secretCode && (
            <p><strong>Secret Code:</strong> <code>{data.secretCode}</code></p>
          )}

          {data.dashboard && (
            <>
              <h3>Dashboard</h3>
              <ul>
                {Object.entries(data.dashboard).map(([k, v]) => (
                  <li key={k}>{k}: {String(v)}</li>
                ))}
              </ul>
            </>
          )}

          {data.feed && (
            <>
              <h3>Feed</h3>
              <ul>
                {data.feed.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}
